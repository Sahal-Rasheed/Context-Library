import { redirect, RedirectType } from "next/navigation";

import { getCurrentSession } from "@/actions/auth";
import { LibraryPage } from "@/components/library/library-page";
import { LibraryView } from "@/components/library/library-views";
import { getItems } from "@/dal/items";
import { toContextItem } from "@/lib/mappers";
import type { ContextItemType } from "@/types/item";

export default async function AllItemsPage({
  searchParams,
}: {
  searchParams: Promise<{
    view?: "grid" | "list" | "compact";
    folder?: string;
    tag?: string;
    section?: "inbox" | "favorites" | "archived" | "all";
    sort?: "latest" | "oldest" | "asc" | "desc";
    type?: string;
    q?: string;
  }>;
}) {
  const session = await getCurrentSession();

  if (!session || new Date(session.session.expiresAt) < new Date()) {
    redirect("/signin", RedirectType.replace);
  }

  const params = await searchParams;
  const view = params.view ?? "grid";
  const folder = params.folder;
  const tag = params.tag;
  const section = params.section;
  const sort = params.sort ?? "latest";
  const typeFilter = params.type
    ? (params.type
        .split(",")
        .filter(Boolean)
        .map((type) => type.toUpperCase()) as ContextItemType[])
    : [];
  const q = params.q;

  const dbItems = await getItems(session.user.id, {
    folder,
    tag,
    section,
    type: typeFilter,
    sort,
    query: q,
  });

  const items = dbItems.map(toContextItem);

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
  } else if (section === "archived") {
    title = "Archived";
  }

  return (
    <LibraryPage title={title} count={items.length} view={view}>
      <LibraryView items={items} view={view} />
    </LibraryPage>
  );
}
