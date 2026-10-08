import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder } from "lucide-react";
import Link from "next/link";

export function CompactView({ items }: { items: ContextItem[] }) {
  return (
    <div className="divide-y divide-sidebar-border">
      {items.map((item) => (
        <Link key={item.id} href={`/library/${item.id}`} className="block">
          <CompactItem item={item} />
        </Link>
      ))}
    </div>
  );
}

function CompactItem({ item }: { item: ContextItem }) {
  const extraTagsCount = item.tags.length > 3 ? item.tags.length - 3 : 0;

  return (
    <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_0.8fr_0.8fr_1.5fr_0.5fr] items-center p-2 dark:hover:bg-muted/60 hover:bg-muted hover:cursor-pointer gap-5 md:gap-2 group transition-colors">
      {/* icon + title */}
      <div className="flex items-center gap-2 min-w-0">
        <SourceIndicator
          title={item.title}
          type={item.type}
          url={item.url}
          className="size-5 text-[10px]"
        />
        <span className="text-md-ds font-semibold text-foreground truncate group-hover:text-primary">
          {item.title}
        </span>
      </div>

      {/* url host */}
      <div className="hidden lg:block min-w-0">
        {item.url ? (
          <span className="text-muted-foreground text-xs font-mono truncate block">
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
            className="bg-background text-muted-foreground border border-border rounded-sm-ds text-xs-ds inline-flex items-center gap-1 capitalize py-0.5"
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
            className="dark:bg-black/75 bg-neutral-400/10 text-xs-ds rounded-sm-ds text-muted-foreground whitespace-nowrap py-0.5"
          >
            #{tag}
          </Badge>
        ))}

        {extraTagsCount > 0 && (
          <span className="text-xs-ds text-muted-foreground font-medium">
            +{extraTagsCount}
          </span>
        )}
      </div>

      {/* time */}
      <div className="text-xs text-muted-foreground lg:text-right">
        <span className="whitespace-nowrap">{formatTimeAgo(item.savedAt)}</span>
      </div>
    </div>
  );
}
