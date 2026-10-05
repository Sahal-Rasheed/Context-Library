import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder } from "lucide-react";

export function CompactView({ items }: { items: ContextItem[] }) {
  return (
    <div className="divide-y divide-sidebar-border">
      {items.map((item, key) => (
        <CompactItem key={key} item={item} />
      ))}
    </div>
  );
}

function CompactItem({ item }: { item: ContextItem }) {
  return (
    <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_0.8fr_0.8fr_1.5fr_0.5fr] items-center p-2 dark:hover:bg-muted/60 hover:bg-muted hover:cursor-pointer gap-5 md:gap-2">
      {/* icon + title */}
      <div className="flex items-center gap-2 min-w-0">
        <SourceIndicator title={item.title} type={item.type} />
        <span className="text-md-ds font-semibold text-foreground truncate">
          {item.title}
        </span>
      </div>

      {/* url host */}
      <div className="hidden lg:block min-w-0">
        {item.url ? (
          <span className="text-muted-foreground text-xs truncate block">
            {new URL(item.url).hostname.replace("www.", "")}
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">N/A</span>
        )}
      </div>

      {/* folder */}
      <div className="hidden lg:flex items-center justify-start">
        {item.folder && (
          <Badge
            variant="outline"
            className="bg-background text-muted-foreground group-hover:bg-background border border-border rounded-sm-ds text-xs inline-flex items-center gap-1 capitalize"
          >
            <Folder className="size-3" />
            {item.folder}
          </Badge>
        )}
      </div>

      {/* tags */}
      <div className="hidden lg:flex gap-1 justify-start items-center flex-wrap">
        {item.tags?.slice(0, 3).map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="dark:bg-black/75 bg-neutral-400/10 text-xs rounded-sm-ds text-muted-foreground whitespace-nowrap"
          >
            #{tag}
          </Badge>
        ))}
      </div>

      {/* time */}
      <div className="text-xs text-muted-foreground lg:text-right">
        <span className="whitespace-nowrap">{formatTimeAgo(item.savedAt)}</span>
      </div>
    </div>
  );
}
