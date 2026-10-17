"use client";

import {
  ArrowLeft,
  ExternalLink,
  Star,
  Archive,
  ArchiveRestore,
  MoreHorizontal,
  Folder,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { deleteItemAction, toggleArchiveAction, toggleFavoriteAction } from "@/actions/items";
import { SourceIndicator } from "@/components/library/source-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ItemWithRelations } from "@/dal/items";

import { FolderCombobox } from "../library/folder-combobox";

interface DetailHeaderProps {
  item: ItemWithRelations;
}

export function DetailHeader({ item }: DetailHeaderProps) {
  const [value, setValue] = React.useState<string>("");
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const backHref = item.folder ? `/?folder=${encodeURIComponent(item.folder.name)}` : "/";
  const backLabel = item.folder
    ? item.folder.name.charAt(0).toUpperCase() + item.folder.name.slice(1)
    : "All items";

  const handleToggleFavorite = () => {
    startTransition(async () => {
      const result = await toggleFavoriteAction(item.id);
      if (result.success) router.refresh();
    });
  };

  const handleToggleArchive = () => {
    startTransition(async () => {
      const result = await toggleArchiveAction(item.id);
      if (result.success) {
        router.refresh();
        if (!item.archivedAt) router.push("/");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteItemAction(item.id);
      if (result.success) {
        router.refresh();
        router.push("/");
      }
    });
  };

  const handleFolderChange = (folderId: string | null) => {
    if (!folderId) return;
    setValue(folderId);
  };

  return (
    <div className="space-y-3">
      {/* back button */}
      <div>
        <Link
          href={backHref}
          className="group inline-flex items-center gap-1.5 rounded-sm-ds px-1.5 py-0.5 text-md-ds font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground dark:hover:bg-muted/50"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* source & indicator */}
      <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <SourceIndicator
          title={item.title}
          type={item.type}
          url={item.link?.url}
          className="size-5 text-[10px]"
        />
        {item.link?.url ? (
          <a
            href={item.link?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate underline-offset-3 hover:text-foreground hover:underline"
          >
            {item.link?.url.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <span>{item.type}</span>
        )}
      </div>

      {/* title */}
      <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {item.title}
      </h1>

      {/* action buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {item.link?.url && (
          <Button className="bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90">
            <a
              href={item.link?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-1.5"
            >
              <ExternalLink className="size-3.5" />
              <span>Open original</span>
            </a>
          </Button>
        )}

        <Button
          variant="outline"
          className="flex justify-center gap-1.5 px-3 text-xs font-medium"
          onClick={handleToggleFavorite}
          disabled={isPending}
        >
          <Star className={`size-3.5 ${item.isFavorite ? "fill-foreground" : ""}`} />
          <span>{item.isFavorite ? "Favorited" : "Favorite"}</span>
        </Button>

        <Button
          variant="outline"
          className="flex justify-center gap-1.5 px-3 text-xs font-medium"
          onClick={handleToggleArchive}
          disabled={isPending}
        >
          {item.archivedAt ? (
            <ArchiveRestore className="size-3.5" />
          ) : (
            <Archive className="size-3.5" />
          )}
          <span>{item.archivedAt ? "Unarchive" : "Archive"}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="outline"
                size="icon"
                className="flex justify-center px-3 text-xs font-medium"
                title="More actions"
                disabled={isPending}
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40 border-sidebar-border shadow-xl">
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                className="flex cursor-pointer items-center gap-2 text-xs-ds font-medium"
                onClick={handleDelete}
              >
                <Trash2 className="size-3.5" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* folder pill & tag chips */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        {item.folder ? (
          <Badge
            variant="outline"
            className="px flex items-center gap-1.5 rounded-sm-ds border-border bg-card py-3 text-md-ds text-foreground capitalize"
          >
            <Folder className="size-3.5 text-muted-foreground" />
            <span>{item.folder.name}</span>
          </Badge>
        ) : (
          // select folder from folder combobox
          <FolderCombobox value={value} onChange={handleFolderChange} />
        )}

        <div className="mx-1 h-4 w-px bg-input" />

        {item.tags.map((tag) => (
          <Badge
            key={tag.id}
            variant="secondary"
            className="rounded-sm-ds bg-neutral-400/10 text-xs-ds text-muted-foreground hover:bg-neutral-400/40 hover:text-foreground dark:bg-black/75 dark:hover:bg-muted"
          >
            #{tag.name}
          </Badge>
        ))}

        <Button
          variant="outline"
          size="xs"
          className="inline-flex h-5.5 cursor-pointer items-center gap-1 rounded border border-dashed border-border bg-neutral-400/10 text-muted-foreground transition-colors hover:bg-neutral-400/40 hover:text-foreground dark:bg-black/75 dark:hover:bg-muted"
        >
          <Plus className="size-3" />
          <span>Tag</span>
        </Button>
      </div>
    </div>
  );
}
