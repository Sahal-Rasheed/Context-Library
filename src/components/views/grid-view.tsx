import type { ContextItem } from "@/data";
import { formatTimeAgo } from "@/lib/utils";
import { SourceIndicator } from "./source-indicator";
import { Badge } from "../ui/badge";
import { Folder } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "../ui/tooltip";

export function GridView({ items }: { items: ContextItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
      {items.map((item, key) => (
        <GridItem key={key} item={item} />
      ))}
    </div>
  );
}

function GridItem({ item }: { item: ContextItem }) {
  return (
    <div className="flex flex-col justify-between gap-3 bg-card border border-border p-3 rounded-md-ds dark:hover:bg-muted/60 hover:bg-muted/60 dark:hover:border-input hover:border-input hover:cursor-pointer min-h-50 h-full">
      {/* header: icon + url host + title + desc + ctx */}
      <div className="flex flex-col gap-2.5">
        {/* icon + url host */}
        <div className="flex items-center gap-2">
          <SourceIndicator
            title={item.title}
            type={item.type}
            className="size-5.5"
          />
          {item.url && (
            <span className="text-muted-foreground text-xs truncate">
              {new URL(item.url).hostname.replace("www.", "")}
            </span>
          )}
          {/* favourite */}
        </div>

        {/* title */}
        <span className="text-md-ds font-semibold text-foreground line-clamp-1">
          {item.title}
        </span>

        {/* desc */}
        <span
          className="text-md-ds text-muted-foreground line-clamp-2"
          title={item.desc}
        >
          {item.desc}
        </span>

        {/* ctx */}
        {item.ctx && (
          <span className="font-serif tracking-wide text-lg-sm-ds text-foreground font-medium bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 shadow-[inset_2px_0px_0px_#B8931A] line-clamp-4">
            {item.ctx}
          </span>
        )}
      </div>

      {/* footer: folder + tags + time */}
      <div className="flex justify-between items-end mt-auto pt-2">
        <div className="flex gap-1.5 flex-wrap items-center max-w-[75%]">
          {/* folder */}
          {item.folder && (
            <Badge
              variant="outline"
              className="bg-background text-muted-foreground group-hover:bg-background border border-border rounded-sm-ds text-xs flex items-center gap-1 capitalize whitespace-nowrap"
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
              # {tag}
            </Badge>
          ))}
        </div>

        {/* time */}
        <div className="text-xs text-muted-foreground pb-0.5 self-end">
          <span className="whitespace-nowrap">
            {formatTimeAgo(item.savedAt)}
          </span>
        </div>
      </div>
    </div>
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
