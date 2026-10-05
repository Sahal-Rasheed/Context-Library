import { LibraryPage } from "@/components/library";
import { LibraryView } from "@/components/views";
import { contextItems } from "@/data";

export default async function AllItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: "grid" | "list" | "compact" }>;
}) {
  const params = await searchParams;
  const view = params.view ?? "list";

  const items = {
    total: contextItems.length,
    items: contextItems,
  };

  return (
    <LibraryPage title="All items" count={items.total} view={view}>
      <LibraryView items={items.items} view={view} />
      {/* bottom gradient */}
      {/*<div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />*/}
    </LibraryPage>
  );
}
