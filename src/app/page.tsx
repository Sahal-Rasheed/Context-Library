import { LibraryPage } from "@/components/library/library-page";
import { LibraryView } from "@/components/library/library-views";
import { contextItems } from "@/data";

export default async function AllItemsPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: "grid" | "list" | "compact";
    folder?: string;
    tag?: string;
    section?: "inbox" | "favorites" | "all";
    sort?: "latest" | "oldest" | "asc" | "desc";
    type?: string;
    q?: string;
  }>;
}) {
  const params = await searchParams;
  const view = params.view ?? "grid";
  const folder = params.folder;
  const tag = params.tag;
  const section = params.section;
  const sort = params.sort ?? "latest";
  const typeFilter = params.type ? params.type.split(",").filter(Boolean) : [];
  const q = params.q?.toLowerCase().trim();

  // Filter
  let filtered = contextItems.filter((item) => {
    // 1. Folder filter
    if (folder && item.folder?.toLowerCase() !== folder.toLowerCase()) {
      return false;
    }

    // 2. Tag filter
    if (tag && !item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      return false;
    }

    // 3. Section filter (inbox, favorites)
    if (section === "favorites" && !item.fav) {
      return false;
    }
    if (section === "inbox" && item.folder) {
      return false;
    }

    // 4. Content Type filter
    if (typeFilter.length > 0 && !typeFilter.includes(item.type)) {
      return false;
    }

    // 5. Search query
    if (q) {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchCtx = item.ctx?.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchCtx && !matchTag) {
        return false;
      }
    }

    return true;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime();
    }
    if (sort === "asc") {
      return a.title.localeCompare(b.title);
    }
    if (sort === "desc") {
      return b.title.localeCompare(a.title);
    }
    // Default: latest
    return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
  });

  // compute title
  let title = "All items";
  if (folder) {
    title = folder;
  } else if (tag) {
    title = `#${tag}`;
  } else if (section === "favorites") {
    title = "Favorites";
  } else if (section === "inbox") {
    title = "Inbox";
  }

  return (
    <LibraryPage title={title} count={filtered.length} view={view}>
      <LibraryView items={filtered} view={view} />
      {/* bottom gradient */}
      {/*<div className="absolute bottom-0 left-0 w-full h-10 bg-linear-to-t from-black/80 via-black/50 to-transparent pointer-events-none" />*/}
    </LibraryPage>
  );
}
