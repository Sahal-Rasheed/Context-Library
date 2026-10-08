import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder, Star } from "lucide-react";
import Link from "next/link";

export function GridView({ items }: { items: ContextItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function GridItem({ item }: { item: ContextItem }) {
  const getSubMeta = () => {
    if (item.type === "image") {
      return item.meta?.len ? `Image • ${item.meta.len}` : "Image";
    }
    if (item.type === "note") {
      return item.meta?.len ? `Note • ${item.meta.len}` : "Note";
    }
    if (item.type === "snippet") {
      return item.meta?.lang
        ? `${item.meta.lang} • ${item.meta.len ?? ""}`
        : "Snippet";
    }
    if (item.type === "chat") {
      return item.meta?.source
        ? `${item.meta.source} • ${item.meta.len ?? ""}`
        : "Chat";
    }
    if (item.url) {
      try {
        return new URL(item.url).hostname.replace("www.", "");
      } catch {
        return item.url;
      }
    }
    return item.type;
  };

  const extraTagsCount = item.tags.length > 2 ? item.tags.length - 2 : 0;

  return (
    <Link
      href={`/library/${item.id}`}
      className="flex flex-col justify-between gap-3 bg-card border border-border p-3 rounded-md-ds hover:bg-muted/60 hover:border-input transition-colors min-h-52 h-full group"
    >
      {/* top section: indicator + source/meta + star + title + desc + ctx */}
      <div className="flex flex-col gap-2.5">
        {/* source indicator + meta info */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <SourceIndicator
              title={item.title}
              type={item.type}
              url={item.url}
              className="size-5.5"
            />
            <span className="text-muted-foreground text-xs truncate font-mono">
              {getSubMeta()}
            </span>
          </div>

          {/* favorite */}
          <div className="shrink-0 text-muted-foreground">
            {item.fav && (
              <Star className="size-3.5 fill-foreground text-foreground" />
            )}
            {!item.fav && (
              <Star className="size-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
            )}
          </div>
        </div>

        {/* title */}
        <h2 className="text-md-ds font-semibold text-foreground line-clamp-1">
          {item.title}
        </h2>

        {/* desc */}
        <p
          className="text-md-ds text-muted-foreground line-clamp-2"
          title={item.desc}
        >
          {item.desc}
        </p>

        {/* ctx */}
        {item.ctx && (
          <div className="font-serif tracking-wide text-lg-sm-ds text-foreground font-medium bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 shadow-[inset_2px_0px_0px_#B8931A] line-clamp-4">
            {item.ctx}
          </div>
        )}
      </div>

      {/* footer section: folder + tags + time */}
      <div className="flex justify-between items-end mt-auto pt-2">
        <div className="flex gap-1.5 flex-wrap items-center max-w-[75%]">
          {/* folder */}
          {item.folder && (
            <Badge
              variant="outline"
              className="bg-background text-muted-foreground border border-border rounded-sm-ds text-xs flex items-center gap-1 capitalize whitespace-nowrap"
            >
              <Folder className="size-3" />
              {item.folder}
            </Badge>
          )}

          {/* tags */}
          {item.tags?.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="dark:bg-black/75 bg-neutral-400/10 text-xs-ds rounded-sm-ds text-muted-foreground dark:hover:bg-muted hover:bg-neutral-400/40 hover:text-foreground whitespace-nowrap"
            >
              #{tag}
            </Badge>
          ))}

          {/* tags left */}
          {extraTagsCount > 0 && (
            <span className="text-xs-ds text-muted-foreground font-medium">
              +{extraTagsCount}
            </span>
          )}
        </div>

        {/* time */}
        <div className="text-xs text-muted-foreground shrink-0 pb-0.5 self-end">
          <span className="whitespace-nowrap">
            {formatTimeAgo(item.savedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
note:
`line-clamp` is similar to `truncate`, but with one major difference:
• truncate cuts off text and adds an ellipsis (...) on a single line only.
• line-clamp-[n] cuts off text and adds an ellipsis after a specific number of lines (e.g., 2, 3, or 4 lines).
*/

/**
tooltip for ctx:
{item.ctx && (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <span className="font-serif tracking-wide text-lg-sm-ds text-foreground font-medium bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 shadow-[inset_2px_0px_0px_#B8931A] line-clamp-3 block cursor-help">
          {item.ctx}
        </span>
      </TooltipTrigger>

      <TooltipContent
        side="bottom"
        className="max-w-xs sm:max-w-md bg-zinc-900 border border-zinc-800 text-zinc-100 p-3 text-sm rounded-md shadow-xl font-sans"
      >
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-500">
            Full Context Note
          </span>
          <p className="leading-relaxed">{item.ctx}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)}
*/
