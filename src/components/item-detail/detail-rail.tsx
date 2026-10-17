import Link from "next/link";

import { SourceIndicator } from "@/components/library/source-indicator";
import type { ItemWithRelations, RelatedItem } from "@/dal/items";

interface DetailRailProps {
  item: ItemWithRelations;
  related: RelatedItem[];
}

export function DetailRail({ item, related }: DetailRailProps) {
  const savedDateStr = new Date(item.createdAt.toISOString()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <aside className="space-y-4 text-sm lg:mt-10 lg:divide-y lg:divide-border">
      {/* details */}
      <section className="flex flex-col gap-3 pt-4 pb-4 lg:gap-3 lg:pt-0">
        <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Details
        </h2>
        <dl className="grid grid-cols-[80px_1fr] gap-x-8 gap-y-3 text-xs lg:gap-x-2">
          <dt className="text-muted-foreground">Content</dt>
          <dd className="font-medium text-foreground capitalize">{item.type}</dd>

          {item.link?.url && (
            <>
              <dt className="text-muted-foreground">Site</dt>
              <dd className="truncate font-mono font-medium text-foreground">
                {new URL(item.link.url).hostname.replace("www.", "")}
              </dd>
            </>
          )}

          {item.link?.author && (
            <>
              <dt className="text-muted-foreground">Author</dt>
              <dd className="font-medium text-foreground">{item.link.author}</dd>
            </>
          )}

          {item.snippet?.language && (
            <>
              <dt className="text-muted-foreground">Language</dt>
              <dd className="font-medium text-foreground">{item.snippet.language}</dd>
            </>
          )}

          {item.conversation?.provider && (
            <>
              <dt className="text-muted-foreground">Source</dt>
              <dd className="font-medium text-foreground">{item.conversation.provider}</dd>
            </>
          )}

          <dt className="text-muted-foreground">Saved</dt>
          <dd className="font-medium text-foreground">{savedDateStr}</dd>

          {/*<dt className="text-muted-foreground">Attachments</dt>
          <dd className="font-medium text-foreground">{item.attach ? item.attach.length : 0}</dd>*/}

          <dt className="text-muted-foreground">Location</dt>
          <dd className="font-medium text-foreground capitalize">{item.folder?.name || "Inbox"}</dd>
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
          <h2 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Related
          </h2>
          <p className="text-xs-ds text-muted-foreground">Suggested</p>
        </div>

        <div className="space-y-3">
          {related.length === 0 && (
            <p className="text-xs-ds text-muted-foreground italic">No related items yet.</p>
          )}

          {related.map((rel) => {
            const sharedTags = rel.tags.filter(({ name }) =>
              item.tags.map((t) => t.name).includes(name),
            );
            return (
              <Link
                key={rel.id}
                href={`/library/${rel.id}`}
                className="group flex items-start gap-2.5"
              >
                <SourceIndicator
                  title={rel.title}
                  type={rel.type}
                  url={rel.link?.url}
                  className="mt-0.5 size-5 text-[10px]"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate pb-0.5 text-xs font-medium text-foreground underline-offset-2 transition-colors group-hover:underline">
                    {rel.title}
                  </p>
                  <p className="truncate text-xs-ds text-muted-foreground">
                    {sharedTags.length > 0
                      ? `Shares ${sharedTags.map((t) => `#${t.name}`).join(" ")}`
                      : `Same folder (${rel.folder?.name})`}
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
