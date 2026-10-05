import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder } from "lucide-react";

export function ListView({ items }: { items: ContextItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-sidebar-border">
      {items.map((item, key) => (
        <ListItem key={key} item={item} />
      ))}
    </div>
  );
}

function ListItem({ item }: { item: ContextItem }) {
  return (
    <div className="flex p-2 dark:hover:bg-muted/60 hover:bg-muted hover:cursor-pointer group">
      <div className="flex justify-between gap-3">
        {/* left side - icon */}
        <SourceIndicator title={item.title} type={item.type} />

        {/* middle main content */}
        <div className="flex flex-1 flex-col gap-1.5">
          {/* title and hostname */}
          <div className="flex gap-2 items-center">
            <span className="text-base-ds font-semibold text-foreground">
              {item.title}
            </span>
            {item.url && (
              <span className="text-xs-ds text-muted-foreground">
                {new URL(item.url).hostname.replace("www.", "")}
              </span>
            )}
          </div>

          {/* desc */}
          <span className="text-md-ds text-muted-foreground"> {item.desc}</span>

          {/* ctx */}
          {item.ctx && (
            <span className="font-serif tracking-wide text-lg-sm-ds text-foreground font-medium bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 shadow-[inset_2px_0px_0px_#B8931A]">
              {item.ctx}
            </span>
          )}

          {/* badges */}
          <div className="flex gap-1.5">
            {/* folder */}
            {item.folder && (
              <Badge
                variant="outline"
                className="bg-background text-muted-foreground group-hover:bg-background border border-border rounded-sm-ds text-xs flex items-center gap-1 capitalize"
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
                # {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* right side - time */}
      <div className="shrink-0 no-wrap ml-auto text-xs text-muted-foreground">
        {formatTimeAgo(item.savedAt)}
      </div>
    </div>
  );
}
