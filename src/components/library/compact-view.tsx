import { Folder } from "lucide-react";
import Link from "next/link";

import type { ItemWithRelations } from "@/dal/items";
import { formatTimeAgo } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { SourceIndicator } from "./source-indicator";

export function CompactView({ items }: { items: ItemWithRelations[] }) {
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

function CompactItem({ item }: { item: ItemWithRelations }) {
  const extraTagsCount = item.tags.length > 3 ? item.tags.length - 3 : 0;

  return (
    <div className="group grid grid-cols-[1fr_auto] items-center gap-5 p-2 transition-colors hover:cursor-pointer hover:bg-muted md:gap-2 lg:grid-cols-[2fr_0.8fr_0.8fr_1.5fr_0.5fr] dark:hover:bg-muted/60">
      {/* icon + title */}
      <div className="flex min-w-0 items-center gap-2">
        <SourceIndicator
          title={item.title}
          type={item.type}
          url={item.link?.url}
          className="size-5 text-[10px]"
        />
        <span className="truncate text-md-ds font-semibold text-foreground group-hover:text-primary">
          {item.title}
        </span>
      </div>

      {/* url host */}
      <div className="hidden min-w-0 lg:block">
        {item.link?.url ? (
          <span className="block truncate font-mono text-xs text-muted-foreground">
            {new URL(item.link.url).hostname.replace("www.", "")}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">N/A</span>
        )}
      </div>

      {/* folder */}
      <div className="hidden items-center justify-start lg:flex">
        {item.folder && (
          <Badge
            variant="outline"
            className="inline-flex items-center gap-1 rounded-sm-ds border border-border bg-background py-0.5 text-xs-ds text-muted-foreground capitalize"
          >
            <Folder className="size-3" />
            {item.folder.name}
          </Badge>
        )}
      </div>

      {/* tags */}
      <div className="hidden flex-wrap items-center justify-start gap-1 lg:flex">
        {item.tags?.slice(0, 3).map((tag, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="rounded-sm-ds bg-neutral-400/10 py-0.5 text-xs-ds whitespace-nowrap text-muted-foreground dark:bg-black/75"
          >
            #{tag.name}
          </Badge>
        ))}

        {extraTagsCount > 0 && (
          <span className="text-xs-ds font-medium text-muted-foreground">+{extraTagsCount}</span>
        )}
      </div>

      {/* time */}
      <div className="text-xs text-muted-foreground lg:text-right">
        <span className="whitespace-nowrap">{formatTimeAgo(item.createdAt.toISOString())}</span>
      </div>
    </div>
  );
}
