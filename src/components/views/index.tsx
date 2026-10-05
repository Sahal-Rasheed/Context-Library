import { GridView } from "./grid-view";
import { ListView } from "./list-view";
import { CompactView } from "./compact-view";
import type { ContextItem } from "@/data";

interface LibraryViewProps {
  view: "grid" | "list" | "compact";
  items: ContextItem[];
}

export function LibraryView({ view, items }: LibraryViewProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-175 py-20 text-center">
        <p className="text-sm text-muted-foreground">
          No items found in this section.
        </p>
      </div>
    );
  }

  switch (view) {
    // case "grid":
    //   return <GridView items={items} />;

    // case "compact":
    //   return <CompactView items={items} />;

    case "list":
    default:
      return <ListView items={items} />;
  }
}
