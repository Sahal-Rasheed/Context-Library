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
            className="text-xs dark:bg-popover bg-popover text-foreground rounded-md dark:hover:bg-popover-foreground/10 hover:bg-muted/40 cursor-pointer flex gap-2 items-center justify-center"
          >
            <Filter className="size-3" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="text-xs tracking-widest font-semibold text-primary">
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
              className="flex items-center gap-2 rounded-sm-ds text-xs-ds text-foreground focus:text-foreground dark:hover:bg-popover-foreground/10! hover:bg-muted/85! cursor-pointer"
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
            className="flex items-center font-normal rounded-sm-ds text-xs-ds text-foreground focus:text-foreground dark:hover:bg-popover-foreground/10! hover:bg-muted/85! cursor-pointer w-full justify-start p-1.5 ml-0"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
