import ViewSwitcher from "./view-switcher";

type LibraryToolbarProps = {
  title: string;
  count: number;
  view: "grid" | "list" | "compact";
};

export default function LibraryToolbar({
  title,
  count,
  view,
}: LibraryToolbarProps) {
  return (
    <section className="flex items-center justify-between py-4 border-b border-sidebar-border">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-lg tracking-wide text-foreground font-semibold">
          {title}
        </h1>
        <p className="text-sm-ds text-muted-foreground">{count} items</p>
      </div>

      <ViewSwitcher value={view} />
      {/*<FilterButton />*/}
    </section>
  );
}
