"use client";

import * as React from "react";
import { PenSquare } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DetailContextCardProps {
  ctx?: string;
  ctxAt?: string;
  savedAt: string;
}

export function DetailContextCard({
  ctx,
  ctxAt,
  savedAt,
}: DetailContextCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(ctx || "");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === "e" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsEditing(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const timeLabel = formatTimeAgo(ctxAt || savedAt);

  if (!ctx && !isEditing) {
    return (
      <div className="border border-dashed border-input rounded-md-ds p-5 my-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            No context yet
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Add a note about why this matters, how you plan to use it, or what
            to remember.
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="h-0 px-3.5 py-4 gap-1.5 text-xs font-semibold shrink-0"
        >
          <PenSquare className="size-3.5" />
          <span>Add context</span>
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="bg-amber-500/10 dark:bg-amber-500/10 border-l-3 border-[#B8931A] rounded-r-sm-ds p-4.5 my-6 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <PenSquare className="size-3.5 text-[#B8931A]" />
            Why I saved this
          </span>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="What is this useful for? When will you need it again?"
          className="w-full text-base font-serif bg-card border border-input rounded-md-ds p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          autoFocus
        />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsEditing(false)}
            className="text-xs h-0 py-4 px-3.5 rounded-md-ds text-secondary transition-colors"
          >
            Save context
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="h-0 text-xs py-4 px-3.5 rounded-md-ds text-muted-foreground hover:dark:bg-muted-foreground/10 hover:bg-muted-foreground/10 transition-colors"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-amber-500/10 dark:bg-amber-500/10 border-l-3 border-[#B8931A] rounded-r-sm-ds p-5 my-6 space-y-3 shadow-xs">
      <div className="flex items-center justify-between text-xs text-foreground/80 font-medium">
        <span className="flex items-center gap-1.5">
          <PenSquare className="size-3.5 text-[#B8931A]" />
          Why I saved this
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <span>Edit</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded-xs-ds border border-input bg-background">
            E
          </kbd>
        </button>
      </div>

      <div className="font-serif text-[17px] leading-relaxed text-foreground tracking-wide font-normal">
        {draft}
      </div>

      <div className="text-xs text-muted-foreground pt-1">
        Written {timeLabel}
      </div>
    </section>
  );
}
