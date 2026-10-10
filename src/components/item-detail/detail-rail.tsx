import Link from "next/link";
import { Plus, X, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SourceIndicator } from "@/components/library/source-indicator";
import type { ContextItem } from "@/data";
import { contextItems } from "@/data";

interface DetailRailProps {
  item: ContextItem;
}

export function DetailRail({ item }: DetailRailProps) {
  // Find connected items
  const connectedItems = (item.connectedIds || [])
    .map((id) => contextItems.find((i) => i.id === id))
    .filter(Boolean) as ContextItem[];

  // Find related items (items sharing tags or in same folder, excluding current item)
  const relatedItems = contextItems
    .filter((i) => i.id !== item.id)
    .filter((i) => {
      const shareTag = i.tags.some((t) => item.tags.includes(t));
      const sameFolder = item.folder && i.folder === item.folder;
      return shareTag || sameFolder;
    })
    .slice(0, 3);

  const savedDateStr = new Date(item.savedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <aside className="space-y-4 lg:mt-10 text-sm lg:divide-y lg:divide-border">
      {/* details */}
      <section className="flex flex-col gap-3 pb-4 pt-4 lg:pt-0">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Details
        </h2>
        <dl className="grid grid-cols-[80px_1fr] gap-y-3 gap-x-2 text-xs">
          <dt className="text-muted-foreground">Content</dt>
          <dd className="font-medium text-foreground capitalize">
            {item.type}
          </dd>

          {item.meta?.site && (
            <>
              <dt className="text-muted-foreground">Site</dt>
              <dd className="font-medium text-foreground font-mono truncate">
                {item.meta.site}
              </dd>
            </>
          )}

          {item.meta?.author && (
            <>
              <dt className="text-muted-foreground">Author</dt>
              <dd className="font-medium text-foreground">
                {item.meta.author}
              </dd>
            </>
          )}

          {item.meta?.len && (
            <>
              <dt className="text-muted-foreground">Length</dt>
              <dd className="font-medium text-foreground">{item.meta.len}</dd>
            </>
          )}

          <dt className="text-muted-foreground">Saved</dt>
          <dd className="font-medium text-foreground">{savedDateStr}</dd>

          <dt className="text-muted-foreground">Attachments</dt>
          <dd className="font-medium text-foreground">
            {item.attach ? item.attach.length : 0}
          </dd>

          <dt className="text-muted-foreground">Location</dt>
          <dd className="font-medium text-foreground capitalize">
            {item.folder || "Inbox"}
          </dd>
        </dl>
      </section>

      {/* attachments */}
      {/*<section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Attachments
            </h2>
            <p className="text-[11px] text-muted-foreground">
              Supporting files
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 text-xs text-muted-foreground"
          >
            <Plus className="size-3" />
            <span>Add</span>
          </Button>
        </div>

        {item.attach && item.attach.length > 0 ? (
          <div className="space-y-2">
            {item.attach.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 p-2 rounded-md bg-card border border-border"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-7 rounded bg-muted grid place-items-center shrink-0">
                    {file.kind === "image" ? (
                      <ImageIcon className="size-3.5 text-muted-foreground" />
                    ) : (
                      <FileText className="size-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {file.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground p-1"
                  title="Remove attachment"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No attachments yet.
          </p>
        )}
      </section>*/}

      {/* connected */}
      {/*<section className="space-y-3 pt-6">
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Connected
          </h2>
          <p className="text-[11px] text-muted-foreground">Linked by you</p>
        </div>

        {connectedItems.length > 0 ? (
          <div className="space-y-2.5">
            {connectedItems.map((conn) => (
              <Link
                key={conn.id}
                href={`/library/${conn.id}`}
                className="flex items-start gap-2.5 group"
              >
                <SourceIndicator
                  title={conn.title}
                  type={conn.type}
                  url={conn.url}
                  className="size-5 text-[10px] mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {conn.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {conn.meta?.len || conn.meta?.site || conn.type}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground italic">
            No connected links.
          </p>
        )}
      </section>*/}

      {/* related ttems (suggested) */}
      <section className="space-y-3">
        <div>
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Related
          </h2>
          <p className="text-xs-ds text-muted-foreground">Suggested</p>
        </div>

        <div className="space-y-3">
          {relatedItems.map((rel) => {
            const sharedTags = rel.tags.filter((t) => item.tags.includes(t));
            return (
              <Link
                key={rel.id}
                href={`/library/${rel.id}`}
                className="flex items-start gap-2.5 group"
              >
                <SourceIndicator
                  title={rel.title}
                  type={rel.type}
                  url={rel.url}
                  className="size-5 text-[10px] mt-0.5"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-foreground group-hover:underline underline-offset-2 transition-colors truncate pb-0.5">
                    {rel.title}
                  </p>
                  <p className="text-xs-ds text-muted-foreground truncate">
                    {sharedTags.length > 0
                      ? `Shares ${sharedTags.map((t) => `#${t}`).join(" ")}`
                      : `Same folder (${rel.folder})`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
