import { Folder, Star } from "lucide-react";
import Link from "next/link";

import type { ItemWithRelations } from "@/dal/items";
import { formatTimeAgo } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { SourceIndicator } from "./source-indicator";

export function GridView({ items }: { items: ItemWithRelations[] }) {
  return (
    <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
}

function GridItem({ item }: { item: ItemWithRelations }) {
  const getSubMeta = () => {
    // if (item.type === "IMAGE") {
    //   return item.meta?.len ? `Image • ${item.meta.len}` : "Image";
    // }
    if (item.type === "NOTE") {
      // return item.meta?.len ? `Note • ${item.meta.len}` : "Note";
      return "Note";
    }
    if (item.type === "SNIPPET") {
      return item.snippet?.language ? `Snippet • ${item.snippet.language}` : "Snippet";
    }
    if (item.type === "AI_CONVERSATION") {
      return item.conversation?.provider ? `Chat • ${item.conversation.provider}` : "Chat";
    }
    if (item.link?.url) {
      try {
        return new URL(item.link.url).hostname.replace("www.", "");
      } catch {
        return item.link.url;
      }
    }
    return item.type;
  };

  const extraTagsCount = item.tags.length > 2 ? item.tags.length - 2 : 0;

  return (
    <Link
      href={`/library/${item.id}`}
      className="group flex h-full min-h-52 flex-col justify-between gap-3 rounded-md-ds border border-border bg-card p-3 transition-colors hover:border-input hover:bg-muted/60"
    >
      {/* top section: indicator + source/meta + star + title + desc + ctx */}
      <div className="flex flex-col gap-2.5">
        {/* source indicator + meta info */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <SourceIndicator
              title={item.title}
              type={item.type}
              url={item.link?.url}
              className="size-5.5"
            />
            <span className="truncate font-mono text-xs text-muted-foreground">{getSubMeta()}</span>
          </div>

          {/* favorite */}
          <div className="shrink-0 text-muted-foreground">
            {item.isFavorite && <Star className="size-3.5 fill-foreground text-foreground" />}
            {!item.isFavorite && (
              <Star className="size-3.5 opacity-0 transition-opacity group-hover:opacity-40" />
            )}
          </div>
        </div>

        {/* title */}
        <h2 className="line-clamp-1 text-md-ds font-semibold text-foreground">{item.title}</h2>

        {/* desc */}
        <p className="line-clamp-2 text-md-ds text-muted-foreground">
          {item.description || "No description available."}
        </p>

        {/* ctx */}
        {item.context && (
          <div className="line-clamp-4 bg-linear-to-r from-amber-500/15 via-amber-700/10 to-transparent px-1.5 py-0.5 font-serif text-lg-sm-ds font-medium tracking-wide text-foreground shadow-[inset_2px_0px_0px_#B8931A]">
            {item.context}
          </div>
        )}
      </div>

      {/* footer section: folder + tags + time */}
      <div className="mt-auto flex items-end justify-between pt-2">
        <div className="flex max-w-[75%] flex-wrap items-center gap-1.5">
          {/* folder */}
          {item.folder && (
            <Badge
              variant="outline"
              className="flex items-center gap-1 rounded-sm-ds border border-border bg-background text-xs whitespace-nowrap text-muted-foreground capitalize"
            >
              <Folder className="size-3" />
              {item.folder.name}
            </Badge>
          )}

          {/* tags */}
          {item.tags?.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="rounded-sm-ds bg-neutral-400/10 text-xs-ds whitespace-nowrap text-muted-foreground hover:bg-neutral-400/40 hover:text-foreground dark:bg-black/75 dark:hover:bg-muted"
            >
              #{tag.name}
            </Badge>
          ))}

          {/* tags left */}
          {extraTagsCount > 0 && (
            <span className="text-xs-ds font-medium text-muted-foreground">+{extraTagsCount}</span>
          )}
        </div>

        {/* time */}
        <div className="shrink-0 self-end pb-0.5 text-xs text-muted-foreground">
          <span className="whitespace-nowrap">{formatTimeAgo(item.createdAt.toISOString())}</span>
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
