"use client";

import * as React from "react";

import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { FilterDropdownMenu } from "./filter";
import ViewSwitcher from "./view-switcher";
import { SortDropdownMenu } from "./sort";

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
};

export default function LibraryToolbar({
  title,
  count,
  view,
}: LibraryToolbarProps) {
  const [activeFilters, setActiveFilters] = React.useState<{
    link: boolean;
    snippet: boolean;
    note: boolean;
    chat: boolean;
  }>({
    link: true,
    snippet: false,
    note: false,
    chat: false,
  });

  const handleFilterChange = (name: string, checked: boolean) => {
    setActiveFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({
      link: false,
      snippet: false,
      note: false,
      chat: false,
    });
  };

  const enabledFilters = Object.entries(activeFilters)
    .filter(([_, isActive]) => isActive)
    .map(([key]) => key);

  const hasActiveFilters = enabledFilters.length > 0;

  const activeFilterCount = enabledFilters.length;

  return (
    <section className="py-4 border-b border-sidebar-border">
      {/* top section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-lg tracking-wide text-foreground font-semibold">
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
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {enabledFilters.map((filterKey) => (
            <Badge
              key={filterKey}
              variant="outline"
              className="bg-blue-50 text-sky-800 dark:bg-ring dark:text-accent-foreground flex justify-between items-center"
            >
              {FILTER_LABELS[filterKey]}
              <span
                className="p-px rounded-full hover:bg-muted-foreground/35 text-sky-800 dark:text-accent-foreground cursor-pointer"
                onClick={() => handleFilterChange(filterKey, false)}
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
