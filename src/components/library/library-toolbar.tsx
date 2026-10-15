"use client";

import { X, Folder } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Badge } from "@/components/ui/badge";

import { FilterDropdownMenu } from "./filter-dropdown";
import { SortDropdownMenu } from "./sort-dropdown";
import ViewSwitcher from "./view-switcher";

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

export default function LibraryToolbar({ title, count, view }: LibraryToolbarProps) {
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
    <section className="border-b border-sidebar-border py-4">
      {/* top section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="flex items-center gap-2 text-lg font-semibold tracking-wide text-foreground capitalize">
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
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activeTypeArray.map((filterKey) => (
            <Badge
              key={filterKey}
              variant="outline"
              className="flex items-center justify-between gap-1.5 border-accent/30 bg-accent/10 py-0.5 text-xs-ds text-accent-foreground"
            >
              <span>{FILTER_LABELS[filterKey] || filterKey}</span>
              <span
                className="cursor-pointer rounded-full p-px text-sky-800 hover:bg-muted-foreground/35 dark:text-accent-foreground"
                onClick={() => handleFilterChange(filterKey, false)}
                title={`Remove ${filterKey}`}
              >
                <X className="size-3" />
              </span>
            </Badge>
          ))}

          <button
            type="button"
            className="ml-1 cursor-pointer text-xs-ds font-medium text-muted-foreground hover:text-foreground"
            onClick={handleClearFilters}
          >
            Clear all
          </button>
        </div>
      )}
    </section>
  );
}
