import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder, Star } from "lucide-react";
import Link from "next/link";

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
    <div className="flex p-2 dark:hover:bg-muted/60 hover:bg-muted hover:cursor-pointer group transition-colors">
      <div className="flex justify-between gap-3 w-full">
        {/* left side - icon */}
        <SourceIndicator title={item.title} type={item.type} url={item.url} />

        {/* middle main content */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          {/* title + hostname + fav */}
          <div className="flex gap-2 items-center">
            {/* title */}
            <span className="text-base-ds font-semibold text-foreground group-hover:text-primary">
              {item.title}
            </span>

            {/* hostname */}
            {item.url && (
              <span className="text-xs-ds text-muted-foreground font-mono truncate">
                {new URL(item.url).hostname.replace("www.", "")}
              </span>
            )}

            {/* favorite */}
            <div className="shrink-0 text-muted-foreground">
              {item.fav && (
                <Star className="size-3.5 fill-foreground text-foreground shrink-0 ml-auto mr-2 md:ml-2" />
              )}
              {!item.fav && (
                <Star className="size-3.5 opacity-0 shrink-0 ml-auto mr-2 md:ml-2 group-hover:opacity-40 transition-opacity" />
              )}
            </div>
          </div>

          {/* desc */}
          <p className="text-md-ds text-muted-foreground">{item.desc}</p>

          {/* ctx */}
          {item.ctx && (
            <div className="font-serif tracking-wide text-lg-sm-ds text-foreground font-medium bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 shadow-[inset_2px_0px_0px_#B8931A] line-clamp-3">
              {item.ctx}
            </div>
          )}

          {/* badges */}
          <div className="flex gap-1.5 flex-wrap items-center mt-1">
            {/* folder */}
            {item.folder && (
              <Badge
                variant="outline"
                className="bg-background text-muted-foreground border border-border rounded-sm-ds text-xs flex items-center gap-1 capitalize"
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
                className="dark:bg-black/75 bg-neutral-400/10 text-xs-ds rounded-sm-ds text-muted-foreground dark:hover:bg-muted hover:bg-neutral-400/40 hover:text-foreground"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* right side - time */}
        <div className="shrink-0 text-xs text-muted-foreground self-start pt-0.5">
          {formatTimeAgo(item.savedAt)}
        </div>
      </div>
    </div>
  );
}
