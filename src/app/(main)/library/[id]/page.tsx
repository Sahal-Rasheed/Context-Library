import Link from "next/link";
import { contextItems } from "@/data";
import { DetailHeader } from "@/components/item-detail/detail-header";
import { DetailContextCard } from "@/components/item-detail/detail-context-card";
import { DetailContent } from "@/components/item-detail/detail-content";
import { DetailRail } from "@/components/item-detail/detail-rail";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = contextItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="py-20 text-center space-y-4">
        <h1 className="text-xl font-bold">Item not found</h1>
        <p className="text-sm text-muted-foreground">
          The requested item may have been moved or removed.
        </p>
        <Link
          href="/"
          className="inline-block text-xs font-semibold px-3 py-1.5 rounded bg-primary text-primary-foreground"
        >
          Back to all items
        </Link>
      </div>
    );
  }

  return (
    <section className="py-6 pb-20">
      {/* 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_290px] gap-3 lg:gap-8 xl:gap-12 items-start">
        {/* left side main area */}
        <div className="min-w-0">
          <DetailHeader item={item} />
          <DetailContextCard
            ctx={item.ctx}
            ctxAt={item.ctxAt}
            savedAt={item.savedAt}
          />
          <DetailContent item={item} />
        </div>

        {/* right side info rail */}
        <div className="lg:pl-7.5">
          <DetailRail item={item} />
        </div>
      </div>
    </section>
  );
}
