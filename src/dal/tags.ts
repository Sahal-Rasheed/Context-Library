import { prisma } from "@/lib/prisma";

import { Prisma, type Tag } from "../../prisma/generated/client";

export async function getTags(userId: string) {
  return prisma.tag.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          items: {
            where: {
              archivedAt: null,
            },
          },
        },
      },
    },
    orderBy: {
      items: {
        _count: "desc",
      },
    },
  });
}

/**
 * Resolve a set of tag names, creating the missing ones.
 * `db` allows callers to include tag creation in their transaction.
 */
export async function findOrCreateTags(
  userId: string,
  tagNames: string[],
  db: Prisma.TransactionClient = prisma,
) {
  const normalized = Array.from(
    new Set(tagNames.map((t) => t.trim().toLowerCase().replace(/^#/, "")).filter(Boolean)),
  );

  if (normalized.length === 0) return [];

  // sequential (not Promise.all): prisma interactive transactions run queries
  // serially, so parallel execution is not safe inside one.
  const tags: Tag[] = [];
  for (const name of normalized) {
    tags.push(
      await db.tag.upsert({
        where: {
          userId_name: {
            userId,
            name,
          },
        },
        update: {},
        create: {
          userId,
          name,
        },
      }),
    );
  }

  return tags;
}
