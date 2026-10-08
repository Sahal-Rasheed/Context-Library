import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContextItem } from "@/data";

interface DetailContentProps {
  item: ContextItem;
}

export function DetailContent({ item }: DetailContentProps) {
  return (
    <div className="space-y-6">
      {/* Description / Summary section */}
      {item.desc && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {item.type === "link" ? "From the page" : "Summary"}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/90 max-w-2xl">
            {item.desc}
          </p>
        </section>
      )}

      {/* Code Snippet block if item is snippet */}
      {item.type === "snippet" && item.code && (
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Snippet
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs text-muted-foreground"
              onClick={() => {
                if (item.code) navigator.clipboard.writeText(item.code);
              }}
            >
              <Copy className="size-3" />
              <span>Copy</span>
            </Button>
          </div>
          <pre className="p-4 rounded-lg bg-muted/40 border border-border text-xs font-mono overflow-x-auto leading-relaxed text-foreground">
            <code>{item.code}</code>
          </pre>
        </section>
      )}

      {/* Note body if item is note */}
      {item.type === "note" && item.body && (
        <section className="space-y-2">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Note
          </h2>
          <div className="p-4 rounded-lg bg-card border border-border text-sm leading-relaxed whitespace-pre-wrap text-foreground">
            {item.body}
          </div>
        </section>
      )}
    </div>
  );
}
