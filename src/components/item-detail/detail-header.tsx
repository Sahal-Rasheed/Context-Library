"use client";

import {
  ArrowLeft,
  ExternalLink,
  Star,
  Archive,
  MoreHorizontal,
  Folder,
  Plus,
  // X,
} from "lucide-react";
import Link from "next/link";

import { SourceIndicator } from "@/components/library/source-indicator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ContextItem } from "@/data";

interface DetailHeaderProps {
  item: ContextItem;
}

export function DetailHeader({ item }: DetailHeaderProps) {
  const backHref = item.folder ? `/?folder=${item.folder}` : "/";
  const backLabel = item.folder
    ? item.folder.charAt(0).toUpperCase() + item.folder.slice(1)
    : "All items";

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
          url={item.url}
          className="size-5 text-[10px]"
        />
        {item.url ? (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate underline-offset-3 hover:text-foreground hover:underline"
          >
            {item.url.replace(/^https?:\/\/(www\.)?/, "")}
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
        {item.url && (
          <Button className="bg-foreground px-3 text-xs font-medium text-background hover:bg-foreground/90">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center gap-1.5"
            >
              <ExternalLink className="size-3.5" />
              <span>Open original</span>
            </a>
          </Button>
        )}

        <Button variant="outline" className="flex justify-center gap-1.5 px-3 text-xs font-medium">
          <Star className={`size-3.5 ${item.fav ? "fill-foreground" : ""}`} />
          <span>{item.fav ? "Favorited" : "Favorite"}</span>
        </Button>

        <Button variant="outline" className="flex justify-center gap-1.5 px-3 text-xs font-medium">
          <Archive className="size-3.5" />
          <span>Archive</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="flex justify-center px-3 text-xs font-medium"
          title="More actions"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </div>

      {/* folder pill & tag chips */}
      <div className="flex flex-wrap items-center gap-2 pt-0.5">
        {item.folder && (
          <Badge
            variant="outline"
            className="px flex items-center gap-1.5 rounded-sm-ds border-border bg-card py-3 text-md-ds text-foreground capitalize"
          >
            <Folder className="size-3.5 text-muted-foreground" />
            <span>{item.folder}</span>
          </Badge>
        )}

        <div className="mx-1 h-4 w-px bg-input" />

        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="rounded-sm-ds bg-neutral-400/10 text-xs-ds text-muted-foreground hover:bg-neutral-400/40 hover:text-foreground dark:bg-black/75 dark:hover:bg-muted"
          >
            #{tag}
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
