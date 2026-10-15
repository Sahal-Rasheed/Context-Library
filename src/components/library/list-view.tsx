import { Folder, Star } from "lucide-react";
import Link from "next/link";

import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { SourceIndicator } from "./source-indicator";

export function ListView({ items }: { items: ContextItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-sidebar-border">
      {items.map((item) => (
        <Link key={item.id} href={`/library/${item.id}`}>
          <ListItem item={item} />
        </Link>
      ))}
    </div>
  );
}

function ListItem({ item }: { item: ContextItem }) {
  return (
    <div className="group flex p-2 transition-colors hover:cursor-pointer hover:bg-muted dark:hover:bg-muted/60">
      <div className="flex w-full justify-between gap-3">
        {/* left side - icon */}
        <SourceIndicator title={item.title} type={item.type} url={item.url} />

        {/* middle main content */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          {/* title + hostname + fav */}
          <div className="flex items-center gap-2">
            {/* title */}
            <span className="text-base-ds font-semibold text-foreground group-hover:text-primary">
              {item.title}
            </span>

            {/* hostname */}
            {item.url && (
              <span className="truncate font-mono text-xs-ds text-muted-foreground">
                {new URL(item.url).hostname.replace("www.", "")}
              </span>
            )}

            {/* favorite */}
            <div className="shrink-0 text-muted-foreground">
              {item.fav && (
                <Star className="mr-2 ml-auto size-3.5 shrink-0 fill-foreground text-foreground md:ml-2" />
              )}
              {!item.fav && (
                <Star className="mr-2 ml-auto size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-40 md:ml-2" />
              )}
            </div>
          </div>

          {/* desc */}
          <p className="text-md-ds text-muted-foreground">{item.desc}</p>

          {/* ctx */}
          {item.ctx && (
            <div className="line-clamp-3 bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 font-serif text-lg-sm-ds font-medium tracking-wide text-foreground shadow-[inset_2px_0px_0px_#B8931A]">
              {item.ctx}
            </div>
          )}

          {/* badges */}
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {/* folder */}
            {item.folder && (
              <Badge
                variant="outline"
                className="flex items-center gap-1 rounded-sm-ds border border-border bg-background text-xs text-muted-foreground capitalize"
              >
                <Folder className="size-3" />
                {item.folder}
              </Badge>
            )}

            {/* tags */}
            {item.tags?.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-sm-ds bg-neutral-400/10 text-xs-ds text-muted-foreground hover:bg-neutral-400/40 hover:text-foreground dark:bg-black/75 dark:hover:bg-muted"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* right side - time */}
        <div className="shrink-0 self-start pt-0.5 text-xs text-muted-foreground">
          {formatTimeAgo(item.savedAt)}
        </div>
      </div>
    </div>
  );
}
