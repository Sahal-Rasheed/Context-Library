import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CONTENT_TYPES } from "./library-page";

type FilterDropdownMenuProps = {
  activeFilters: Record<string, boolean>;
  onFilterChange: (name: string, checked: boolean) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
};

export function FilterDropdownMenu({
  activeFilters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: FilterDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-popover text-xs text-foreground hover:bg-muted/40 dark:bg-popover dark:hover:bg-popover-foreground/10"
          >
            <Filter className="size-3" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="text-xs font-semibold tracking-widest text-primary">
                ({activeFilterCount})
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-48 border-sidebar-border shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs-ds font-semibold text-muted-foreground">
            Content type
          </DropdownMenuLabel>

          {CONTENT_TYPES.map((type) => (
            <DropdownMenuCheckboxItem
              key={type.name}
              className="flex cursor-pointer items-center gap-2 rounded-sm-ds text-xs-ds text-foreground hover:bg-muted/85! focus:text-foreground dark:hover:bg-popover-foreground/10!"
              checked={!!activeFilters[type.type]}
              onCheckedChange={(checked) => onFilterChange(type.type, checked)}
            >
              {type.icon}
              <span>{type.name}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="dark:bg-input" />
        <DropdownMenuGroup>
          <Button
            variant="ghost"
            className="ml-0 flex w-full cursor-pointer items-center justify-start rounded-sm-ds p-1.5 text-xs-ds font-normal text-foreground hover:bg-muted/85! focus:text-foreground dark:hover:bg-popover-foreground/10!"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
