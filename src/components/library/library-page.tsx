import LibraryToolbar from "./library-toolbar";

type LibraryPageProps = {
  title: string;
  count: number;
  view: "grid" | "list" | "compact";
  children: React.ReactNode;
};

export function LibraryPage({
  title,
  count,
  view,
  children,
}: LibraryPageProps) {
  return (
    <div className="mt-2.5 mb-10">
      <LibraryToolbar title={title} count={count} view={view} />
      {children}
    </div>
  );
}
