-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('LINK', 'NOTE', 'SNIPPET', 'AI_CONVERSATION');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "ItemType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "context" TEXT,
    "contextUpdatedAt" TIMESTAMP(3),
    "folderId" TEXT,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "inboxAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkContent" (
    "itemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "canonicalUrl" TEXT,
    "author" TEXT,
    "faviconUrl" TEXT,
    "previewImageUrl" TEXT,
    "publishedAt" TIMESTAMP(3),
    "readingTimeMinutes" INTEGER,
    "metadataFetchedAt" TIMESTAMP(3),

    CONSTRAINT "LinkContent_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "NoteContent" (
    "itemId" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "NoteContent_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "SnippetContent" (
    "itemId" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'text',
    "code" TEXT NOT NULL,

    CONSTRAINT "SnippetContent_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "AIConversationContent" (
    "itemId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'other',
    "originalUrl" TEXT,
    "transcript" TEXT,

    CONSTRAINT "AIConversationContent_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "_ItemToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ItemToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Item_userId_createdAt_idx" ON "Item"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Item_userId_type_createdAt_idx" ON "Item"("userId", "type", "createdAt");

-- CreateIndex
CREATE INDEX "Item_userId_folderId_idx" ON "Item"("userId", "folderId");

-- CreateIndex
CREATE INDEX "Item_userId_inboxAt_idx" ON "Item"("userId", "inboxAt");

-- CreateIndex
CREATE INDEX "Item_userId_archivedAt_idx" ON "Item"("userId", "archivedAt");

-- CreateIndex
CREATE INDEX "Item_userId_isFavorite_idx" ON "Item"("userId", "isFavorite");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_userId_name_key" ON "Folder"("userId", "name");

-- CreateIndex
CREATE INDEX "Tag_userId_idx" ON "Tag"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_userId_name_key" ON "Tag"("userId", "name");

-- CreateIndex
CREATE INDEX "_ItemToTag_B_index" ON "_ItemToTag"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LinkContent" ADD CONSTRAINT "LinkContent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NoteContent" ADD CONSTRAINT "NoteContent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SnippetContent" ADD CONSTRAINT "SnippetContent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIConversationContent" ADD CONSTRAINT "AIConversationContent_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTag" ADD CONSTRAINT "_ItemToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToTag" ADD CONSTRAINT "_ItemToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
