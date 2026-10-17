import { prisma } from "@/lib/prisma";
import type { ItemFormData } from "@/lib/schemas";

import { Prisma } from "../../prisma/generated/client";
import { ItemType } from "../../prisma/generated/enums";
import type { ContextItemType } from "../types/item";
import { findOrCreateFolder } from "./folders";
import { findOrCreateTags } from "./tags";

export interface ItemQueryFilters {
  folder?: string;
  tag?: string;
  section?: "inbox" | "favorites" | "archived" | "all";
  type?: ContextItemType[] | [] | undefined;
  sort?: "latest" | "oldest" | "asc" | "desc";
  query?: string;
}

// relations every item view needs,
// so we can reuse it in multiple queries without repeating the same.
export const itemWithRelationsInclude = {
  folder: { select: { id: true, name: true } },
  tags: { select: { id: true, name: true } },
  link: true,
  note: true,
  snippet: true,
  conversation: true,
} satisfies Prisma.ItemInclude;

export type ItemWithRelations = Prisma.ItemGetPayload<{
  include: typeof itemWithRelationsInclude;
}>;

export const relatedItemInclude = {
  folder: { select: { id: true, name: true } },
  tags: { select: { id: true, name: true } },
  link: { select: { url: true } },
} satisfies Prisma.ItemInclude;

export type RelatedItem = Prisma.ItemGetPayload<{
  include: typeof relatedItemInclude;
}>;

export async function getItems(userId: string, filters: ItemQueryFilters = {}) {
  const { folder, tag, section, type, sort = "latest", query } = filters;

  const where: Prisma.ItemWhereInput = { userId };

  // section handling
  if (section === "archived") {
    where.archivedAt = { not: null };
  } else {
    where.archivedAt = null;
    if (section === "favorites") {
      where.isFavorite = true;
    } else if (section === "inbox") {
      where.folderId = null;
    }
  }

  // folder filter (matched by name, folders are unique per user)
  if (folder) {
    where.folder = {
      name: {
        equals: folder,
        mode: "insensitive",
      },
    };
  }

  // tag filter
  if (tag) {
    const cleanTag = tag.trim().toLowerCase().replace(/^#/, "");
    where.tags = {
      some: {
        name: {
          equals: cleanTag,
          mode: "insensitive",
        },
      },
    };
  }

  // type filter — only real enum members reach the database
  if (type && type.length > 0) {
    const validTypes = type.filter((t) =>
      (Object.values(ItemType) as string[]).includes(t),
    ) as ItemType[];
    where.type = { in: validTypes };
  }

  // search query (matches title, description, context, or tag)
  if (query && query.trim()) {
    const q = query.trim();
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
      { context: { contains: q, mode: "insensitive" } },
      {
        tags: {
          some: {
            name: { contains: q, mode: "insensitive" },
          },
        },
      },
    ];
  }

  // sorting
  let orderBy: Prisma.ItemOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "oldest") {
    orderBy = { createdAt: "asc" };
  } else if (sort === "asc") {
    orderBy = { title: "asc" };
  } else if (sort === "desc") {
    orderBy = { title: "desc" };
  }

  return prisma.item.findMany({
    where,
    orderBy,
    include: itemWithRelationsInclude,
  });
}

export async function getItemById(userId: string, itemId: string) {
  return prisma.item.findFirst({
    where: {
      id: itemId,
      userId,
    },
    include: itemWithRelationsInclude,
  });
}

export async function getRelatedItems(
  userId: string,
  itemId: string,
  {
    folderId,
    tagNames,
    limit = 3,
  }: { folderId?: string | null; tagNames?: string[]; limit?: number },
): Promise<RelatedItem[]> {
  const or: Prisma.ItemWhereInput[] = [];

  if (folderId) {
    or.push({ folderId });
  }
  if (tagNames && tagNames.length > 0) {
    or.push({ tags: { some: { name: { in: tagNames } } } });
  }

  if (or.length === 0) return [];

  return prisma.item.findMany({
    where: {
      userId,
      id: { not: itemId },
      archivedAt: null,
      OR: or,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      folder: { select: { id: true, name: true } },
      tags: { select: { id: true, name: true } },
      link: { select: { url: true } },
    },
  });
}

export async function getSidebarCounts(userId: string) {
  const [total, favorites, inbox, archived] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.item.count({ where: { userId, archivedAt: null, isFavorite: true } }),
    prisma.item.count({ where: { userId, archivedAt: null, folderId: null } }),
    prisma.item.count({ where: { userId, archivedAt: { not: null } } }),
  ]);

  return { total, favorites, inbox, archived };
}

export async function createItemRecord(userId: string, data: ItemFormData) {
  return prisma.$transaction(async (tx) => {
    // resolve folder if provided (fkey on items.folderId)
    let folderId: string | null = null;
    if (data.folder && data.folder.trim()) {
      const folderRecord = await findOrCreateFolder(userId, data.folder, tx);
      folderId = folderRecord?.id ?? null;
    }

    // resolve tags if provided (fkey on items.tags)
    let tagConnect: { id: string }[] = [];
    if (data.tags && data.tags.length > 0) {
      const tagRecords = await findOrCreateTags(userId, data.tags, tx);
      tagConnect = tagRecords.map((t) => ({ id: t.id }));
    }

    // parent item
    const item = await tx.item.create({
      data: {
        userId,
        type: data.type as ItemType,
        title: data.title.trim(),
        description: data.description?.trim() || null,
        context: data.ctx?.trim() || null,
        contextUpdatedAt: data.ctx?.trim() ? new Date() : null,
        folderId,
        tags: {
          connect: tagConnect,
        },
      },
    });

    // relations based on type
    if (data.type === "LINK") {
      await tx.linkContent.create({
        data: {
          itemId: item.id,
          url: data.url,
          canonicalUrl: new URL(data.url).origin,
          metadataFetchedAt: new Date(),
          // TODO: add support in itemFormData
          // previewImageUrl: "",
        },
      });
    } else if (data.type === "NOTE") {
      await tx.noteContent.create({
        data: {
          itemId: item.id,
          body: data.body,
        },
      });
    } else if (data.type === "SNIPPET") {
      await tx.snippetContent.create({
        data: {
          itemId: item.id,
          code: data.code,
          // TODO: add support in itemFormData
          language: "text",
        },
      });
    } else if (data.type === "AI_CONVERSATION") {
      await tx.aIConversationContent.create({
        data: {
          itemId: item.id,
          // TODO: add support in itemFormData
          provider: "other",
          originalUrl: "",
          transcript: "",
        },
      });
    }

    return item;
  });
}

export async function updateItemContext(userId: string, itemId: string, contextText: string) {
  const trimmed = contextText.trim();

  return prisma.item.updateMany({
    where: { id: itemId, userId },
    data: {
      context: trimmed || null,
      contextUpdatedAt: trimmed ? new Date() : null,
    },
  });
}

export async function toggleItemFavorite(userId: string, itemId: string) {
  const item = await prisma.item.findFirst({
    where: { id: itemId, userId },
    select: { id: true, isFavorite: true },
  });

  if (!item) return null;

  return prisma.item.update({
    where: { id: item.id },
    data: {
      isFavorite: !item.isFavorite,
    },
  });
}

export async function toggleItemArchive(userId: string, itemId: string) {
  const item = await prisma.item.findFirst({
    where: { id: itemId, userId },
    select: { id: true, archivedAt: true },
  });

  if (!item) return null;

  const isArchived = Boolean(item.archivedAt);

  return prisma.item.update({
    where: { id: item.id },
    data: {
      archivedAt: isArchived ? null : new Date(),
    },
  });
}

export async function deleteItemRecord(userId: string, itemId: string) {
  return prisma.item.delete({
    where: { id: itemId, userId },
  });
}
