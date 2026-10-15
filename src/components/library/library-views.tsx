import type { ContextItem } from "@/data";

import { CompactView } from "./compact-view";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";

interface LibraryViewProps {
  view: "grid" | "list" | "compact";
  items: ContextItem[];
}

export function LibraryView({ view, items }: LibraryViewProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex h-175 flex-col items-center justify-center py-20 text-center">
        <p className="text-sm text-muted-foreground">No items found in this section.</p>
      </div>
    );
  }

  switch (view) {
    case "list":
      return <ListView items={items} />;

    case "compact":
      return <CompactView items={items} />;

    case "grid":
      return <GridView items={items} />;

    default:
      return <ListView items={items} />;
  }
}
