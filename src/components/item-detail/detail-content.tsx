"use client";

import { Copy, Check } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import type { ItemWithRelations } from "@/dal/items";

interface DetailContentProps {
  item: ItemWithRelations;
}

export function DetailContent({ item }: DetailContentProps) {
  const [copyButtonText, setCopyButtonText] = React.useState("Copy");

  const handleCopyCode = () => {
    if (item.snippet?.code) {
      void navigator.clipboard.writeText(item.snippet?.code);
    }
    setCopyButtonText("Copied!");

    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };
  return (
    <div className="space-y-6">
      {/* description or summary section */}
      {item.description && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Description
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/90">{item.description}</p>
        </section>
      )}

      {/* code snippet block if item is snippet */}
      {item.type === "SNIPPET" && item.snippet?.code && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Snippet
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="flex h-6 items-center gap-1 px-3.5 text-xs text-muted-foreground"
              onClick={handleCopyCode}
            >
              {copyButtonText === "Copy" ? (
                <Copy className="size-3" />
              ) : (
                <Check className="size-3.5" />
              )}
              <span>{copyButtonText}</span>
            </Button>
          </div>
          <pre className="overflow-x-auto rounded-sm-ds border border-input bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground">
            <code>{item.snippet.code}</code>
          </pre>
        </section>
      )}

      {/* note body if item is note */}
      {item.type === "NOTE" && item.note?.body && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Note
          </h2>
          <div className="rounded-sm-ds border border-input bg-card p-4 text-sm leading-6 whitespace-pre-wrap text-foreground">
            {item.note.body}
          </div>
        </section>
      )}
    </div>
  );
}
