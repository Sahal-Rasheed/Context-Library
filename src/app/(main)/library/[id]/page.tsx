import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

import { getCurrentSession } from "@/actions/auth";
import { DetailContent } from "@/components/item-detail/detail-content";
import { DetailContextCard } from "@/components/item-detail/detail-context-card";
import { DetailHeader } from "@/components/item-detail/detail-header";
import { DetailRail } from "@/components/item-detail/detail-rail";
import { getItemById, getRelatedItems } from "@/dal/items";

export default async function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getCurrentSession();

  if (!session || new Date(session.session.expiresAt) < new Date()) {
    redirect("/signin", RedirectType.replace);
  }

  const { id } = await params;
  const dbItem = await getItemById(session.user.id, id);

  if (!dbItem) {
    return (
      <div className="space-y-4 py-20 text-center">
        <h1 className="text-xl font-bold">Item not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested item may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block rounded bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
        >
          Back to all items
        </Link>
      </div>
    );
  }

  const relatedRecords = await getRelatedItems(session.user.id, dbItem.id, {
    folderId: dbItem.folderId,
    tagNames: dbItem.tags.map((t) => t.name),
  });

  return (
    <section className="py-6 pb-20">
      {/* 2-column layout */}
      <div className="grid grid-cols-1 items-start gap-3 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-8 xl:gap-12">
        {/* left side main area */}
        <div className="min-w-0">
          <DetailHeader item={dbItem} />
          <DetailContextCard
            itemId={dbItem.id}
            ctx={dbItem.context}
            ctxAt={dbItem.contextUpdatedAt?.toISOString()}
            savedAt={dbItem.createdAt.toISOString()}
          />
          <DetailContent item={dbItem} />
        </div>

        {/* right side info rail */}
        <div className="lg:pl-7.5">
          <DetailRail item={dbItem} related={relatedRecords} />
        </div>
      </div>
    </section>
  );
}
