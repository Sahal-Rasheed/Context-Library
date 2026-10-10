"use client";

import Link from "next/link";
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SourceIndicator } from "@/components/library/source-indicator";
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
          className="inline-flex items-center gap-1.5 text-md-ds  text-muted-foreground hover:text-foreground font-medium transition-colors group rounded-sm-ds px-1.5 py-0.5 dark:hover:bg-muted/50 hover:bg-muted"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* source & indicator */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
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
            className="underline-offset-3 hover:underline hover:text-foreground truncate"
          >
            {item.url.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <span>{item.type}</span>
        )}
      </div>

      {/* title */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        {item.title}
      </h1>

      {/* action buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        {item.url && (
          <Button className="px-3 text-xs font-medium bg-foreground text-background hover:bg-foreground/90">
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

        <Button
          variant="outline"
          className="flex justify-center gap-1.5 px-3 text-xs font-medium"
        >
          <Star className={`size-3.5 ${item.fav ? "fill-foreground" : ""}`} />
          <span>{item.fav ? "Favorited" : "Favorite"}</span>
        </Button>

        <Button
          variant="outline"
          className="flex justify-center gap-1.5 px-3 text-xs font-medium"
        >
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
      <div className="flex items-center gap-2 flex-wrap pt-0.5">
        {item.folder && (
          <Badge
            variant="outline"
            className="bg-card text-foreground border-border rounded-sm-ds text-md-ds flex items-center gap-1.5 py-3 px capitalize"
          >
            <Folder className="size-3.5 text-muted-foreground" />
            <span>{item.folder}</span>
          </Badge>
        )}

        <div className="h-4 w-px bg-input mx-1" />

        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="dark:bg-black/75 bg-neutral-400/10 text-xs-ds rounded-sm-ds text-muted-foreground dark:hover:bg-muted hover:bg-neutral-400/40 hover:text-foreground"
          >
            #{tag}
          </Badge>
        ))}

        <Button
          variant="outline"
          size="xs"
          className="h-5.5 inline-flex items-center gap-1 dark:bg-black/75  bg-neutral-400/10 text-muted-foreground dark:hover:bg-muted hover:bg-neutral-400/40 hover:text-foreground rounded border border-dashed border-border transition-colors cursor-pointer"
        >
          <Plus className="size-3" />
          <span>Tag</span>
        </Button>
      </div>
    </div>
  );
}
