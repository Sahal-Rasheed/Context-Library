import { prisma } from "@/lib/prisma";

import { Prisma } from "../../prisma/generated/client";

export async function getFolders(userId: string) {
  return prisma.folder.findMany({
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
      name: "asc",
    },
  });
}

export async function searchFoldersByName(userId: string, query?: string) {
  const trimmed = query?.trim();

  return prisma.folder.findMany({
    where: {
      userId,
      ...(trimmed ? { name: { contains: trimmed, mode: "insensitive" as const } } : {}),
    },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
    take: 50,
  });
}

/**
 * Resolve a folder by name, creating it if needed.
 * `db` lets callers run this inside an existing transaction so folder creation
 * is atomic with the item that references it.
 */
export async function findOrCreateFolder(
  userId: string,
  folderName: string,
  db: Prisma.TransactionClient = prisma,
) {
  const name = folderName.trim();
  if (!name) return null;

  return db.folder.upsert({
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
  });
}

export async function deleteFolder(userId: string, folderId: string) {
  return prisma.folder.delete({
    where: {
      id: folderId,
      userId,
    },
  });
}
