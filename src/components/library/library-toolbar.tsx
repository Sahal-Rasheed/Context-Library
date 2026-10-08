"use client";

import * as React from "react";
import { X, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FilterDropdownMenu } from "./filter-dropdown";
import ViewSwitcher from "./view-switcher";
import { SortDropdownMenu } from "./sort-dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type LibraryToolbarProps = {
  title: string;
  count: number;
  view: "grid" | "list" | "compact";
};

const FILTER_LABELS: Record<string, string> = {
  link: "Link",
  snippet: "Snippet",
  note: "Note",
  chat: "AI conversation",
  image: "Image",
};

export default function LibraryToolbar({
  title,
  count,
  view,
}: LibraryToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // read active type filters from searchParams e.g. ?type=link,snippet
  const rawTypes = searchParams.get("type");
  const activeTypeArray = React.useMemo(() => {
    return rawTypes ? rawTypes.split(",").filter(Boolean) : [];
  }, [rawTypes]);

  const activeFilters = React.useMemo(() => {
    return {
      link: activeTypeArray.includes("link"),
      snippet: activeTypeArray.includes("snippet"),
      note: activeTypeArray.includes("note"),
      chat: activeTypeArray.includes("chat"),
      image: activeTypeArray.includes("image"),
    };
  }, [activeTypeArray]);

  const handleFilterChange = (type: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    let nextTypes = [...activeTypeArray];

    if (checked) {
      if (!nextTypes.includes(type)) nextTypes.push(type);
    } else {
      nextTypes = nextTypes.filter((t) => t !== type);
    }

    if (nextTypes.length === 0) {
      params.delete("type");
    } else {
      params.set("type", nextTypes.join(","));
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("type");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const activeFilterCount = activeTypeArray.length;

  return (
    <section className="py-4 border-b border-sidebar-border">
      {/* top section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg tracking-wide text-foreground font-semibold capitalize flex items-center gap-2">
            {searchParams.get("folder") && (
              <span className="text-muted-foreground/80">
                <Folder className="size-4.5" />
              </span>
            )}
            {title}
          </h1>
          <p className="text-sm-ds text-muted-foreground">{count} items</p>
        </div>

        {/* view switcher + filters */}
        <div className="flex items-center gap-2">
          <ViewSwitcher value={view} />
          <SortDropdownMenu />
          <FilterDropdownMenu
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>
      </div>

      {/* bottom filter badges */}
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {activeTypeArray.map((filterKey) => (
            <Badge
              key={filterKey}
              variant="outline"
              className="bg-accent/10 text-accent-foreground border-accent/30 flex justify-between items-center gap-1.5 py-0.5 text-xs-ds"
            >
              <span>{FILTER_LABELS[filterKey] || filterKey}</span>
              <span
                className="p-px rounded-full hover:bg-muted-foreground/35 text-sky-800 dark:text-accent-foreground cursor-pointer"
                onClick={() => handleFilterChange(filterKey, false)}
                title={`Remove ${filterKey}`}
              >
                <X className="size-3" />
              </span>
            </Badge>
          ))}

          <button
            type="button"
            className="text-xs-ds text-muted-foreground hover:text-foreground ml-1 font-medium cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}
