"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContextItem } from "@/data";

interface DetailContentProps {
  item: ContextItem;
}

export function DetailContent({ item }: DetailContentProps) {
  const [copyButtonText, setCopyButtonText] = React.useState("Copy");

  const handleCopyCode = () => {
    if (item.code) {
      navigator.clipboard.writeText(item.code);
    }
    setCopyButtonText("Copied!");

    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };
  return (
    <div className="space-y-6">
      {/* description or summary section */}
      {item.desc && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Description
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90 max-w-2xl">
            {item.desc}
          </p>
        </section>
      )}

      {/* code snippet block if item is snippet */}
      {item.type === "snippet" && item.code && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Snippet
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="px-3.5 h-6 flex items-center gap-1 text-xs text-muted-foreground"
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
          <pre className="p-4 rounded-sm-ds bg-muted/40 border border-input text-xs font-mono overflow-x-auto leading-relaxed text-foreground">
            <code>{item.code}</code>
          </pre>
        </section>
      )}

      {/* note body if item is note */}
      {item.type === "note" && item.body && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Note
          </h2>
          <div className="p-4 rounded-sm-ds bg-card border border-input text-sm leading-6 whitespace-pre-wrap text-foreground">
            {item.body}
          </div>
        </section>
      )}
    </div>
  );
}
