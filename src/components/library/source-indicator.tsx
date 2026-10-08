import { cn } from "cn";
import type { ContextItemType } from "@/data";
import {
  MessageCircle,
  NotepadText,
  Link as LinkIcon,
  Code,
  Image as ImageIcon,
} from "lucide-react";

const COLOR_VARIANTS = [
  "bg-sky-500/12 text-sky-600 border border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20",
  "bg-indigo-500/12 text-indigo-600 border border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20",
  "bg-violet-500/12 text-violet-600 border border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20",
  "bg-emerald-500/12 text-emerald-600 border border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
  "bg-teal-500/12 text-teal-600 border border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20",
  "bg-amber-500/15 text-amber-700 border border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
  "bg-orange-500/12 text-orange-600 border border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20",
  "bg-rose-500/12 text-rose-600 border border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20",
  "bg-zinc-500/12 text-zinc-600 border border-zinc-500/20 dark:bg-zinc-400/10 dark:text-zinc-300 dark:border-zinc-400/20",
];

function getColorIndex(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return (hash >>> 0) % COLOR_VARIANTS.length;
}

export function SourceIndicator({
  title,
  type,
  url,
  className,
}: {
  title: string;
  type: ContextItemType;
  url?: string;
  className?: string;
}) {
  const colorIndex = getColorIndex(url || title);
  const colorClass = COLOR_VARIANTS[colorIndex];

  let content = null;

  if (type === "link" && url) {
    try {
      const hostname = new URL(url).hostname.replace("www.", "");
      if (hostname.includes("github.com")) {
        content = "GH";
      } else {
        content = hostname.charAt(0).toUpperCase();
      }
    } catch {
      content = <LinkIcon className="size-3.5" />;
    }
  } else if (type === "snippet") {
    content = <Code className="size-3.5" />;
  } else if (type === "note") {
    content = <NotepadText className="size-3.5" />;
  } else if (type === "chat") {
    content = <MessageCircle className="size-3.5" />;
  } else if (type === "image") {
    content = <ImageIcon className="size-3.5" />;
  } else {
    content = <LinkIcon className="size-3.5" />;
  }

  return (
    <div
      className={cn(
        "size-7.5 aspect-square flex items-center justify-center text-xs font-semibold uppercase select-none shrink-0 rounded-md-ds",
        colorClass,
        className,
      )}
    >
      {content}
    </div>
  );
}
