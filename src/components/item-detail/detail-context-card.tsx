"use client";

import { PenSquare } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/utils";

interface DetailContextCardProps {
  ctx?: string;
  ctxAt?: string;
  savedAt: string;
}

export function DetailContextCard({ ctx, ctxAt, savedAt }: DetailContextCardProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(ctx || "");

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key &&
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
      <div className="my-6 flex items-center justify-between gap-4 rounded-md-ds border border-dashed border-input p-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">No context yet</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Add a note about why this matters, how you plan to use it, or what to remember.
          </p>
        </div>
        <Button
          onClick={() => setIsEditing(true)}
          className="h-0 shrink-0 gap-1.5 px-3.5 py-4 text-xs font-semibold"
        >
          <PenSquare className="size-3.5" />
          <span>Add context</span>
        </Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="my-6 space-y-3 rounded-r-sm-ds border-l-3 border-[#B8931A] bg-amber-500/10 p-4.5 shadow-xs dark:bg-amber-500/10">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <PenSquare className="size-3.5 text-[#B8931A]" />
            Why I saved this
          </span>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          placeholder="What is this useful for? When will you need it again?"
          className="w-full rounded-md-ds border border-input bg-card p-3 font-serif text-base text-foreground focus:ring-2 focus:ring-accent focus:outline-none"
          autoFocus
        />
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsEditing(false)}
            className="h-0 rounded-md-ds px-3.5 py-4 text-xs text-secondary transition-colors"
          >
            Save context
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(false)}
            className="h-0 rounded-md-ds px-3.5 py-4 text-xs text-muted-foreground transition-colors hover:bg-muted-foreground/10 hover:dark:bg-muted-foreground/10"
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="my-6 space-y-3 rounded-r-sm-ds border-l-3 border-[#B8931A] bg-amber-500/10 p-5 shadow-xs dark:bg-amber-500/10">
      <div className="flex items-center justify-between text-xs font-medium text-foreground/80">
        <span className="flex items-center gap-1.5">
          <PenSquare className="size-3.5 text-[#B8931A]" />
          Why I saved this
        </span>
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex cursor-pointer items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <span>Edit</span>
          <kbd className="rounded-xs-ds border border-input bg-background px-1.5 py-0.5 font-mono text-[10px]">
            E
          </kbd>
        </button>
      </div>

      <div className="font-serif text-[17px] leading-relaxed font-normal tracking-wide text-foreground">
        {draft}
      </div>

      <div className="pt-1 text-xs text-muted-foreground">Written {timeLabel}</div>
    </section>
  );
}
