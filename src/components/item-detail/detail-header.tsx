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
  X,
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
    <div className="space-y-4">
      {/* Breadcrumb back button */}
      <div>
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-xs-ds text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>{backLabel}</span>
        </Link>
      </div>

      {/* Source URL & indicator */}
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
            className="hover:underline hover:text-foreground truncate"
          >
            {item.url.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        ) : (
          <span>{item.type}</span>
        )}
      </div>

      {/* Item Title */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        {item.title}
      </h1>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 flex-wrap pt-1">
        {item.url && (
          <Button className="h-8 gap-1.5 px-3 text-xs font-semibold bg-foreground text-background hover:bg-foreground/90">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-3.5" />
              <span>Open original</span>
            </a>
          </Button>
        )}

        <Button
          variant="outline"
          className="h-8 gap-1.5 px-3 text-xs font-medium"
        >
          <Star className={`size-3.5 ${item.fav ? "fill-foreground" : ""}`} />
          <span>{item.fav ? "Favorited" : "Favorite"}</span>
        </Button>

        <Button
          variant="outline"
          className="h-8 gap-1.5 px-3 text-xs font-medium"
        >
          <Archive className="size-3.5" />
          <span>Archive</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          title="More actions"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </div>

      {/* Organization: Folder pill & Tag chips */}
      <div className="flex items-center gap-2 flex-wrap pt-1 pb-2">
        {item.folder && (
          <Badge
            variant="outline"
            className="bg-card text-foreground border-border rounded-sm-ds text-xs flex items-center gap-1.5 py-1 px-2.5 capitalize"
          >
            <Folder className="size-3 text-muted-foreground" />
            <span>{item.folder}</span>
          </Badge>
        )}

        <div className="h-4 w-px bg-border mx-1" />

        {item.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="dark:bg-black/75 bg-neutral-400/10 text-xs rounded-sm-ds text-muted-foreground flex items-center gap-1 py-1 px-2 hover:bg-muted"
          >
            <span>#{tag}</span>
            <X className="size-3 hover:text-foreground cursor-pointer" />
          </Badge>
        ))}

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-dashed border-border hover:border-input transition-colors"
        >
          <Plus className="size-3" />
          <span>Tag</span>
        </button>
      </div>
    </div>
  );
}
