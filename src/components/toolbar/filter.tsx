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
import { Code, Filter, Link, MessageCircle, NotepadText } from "lucide-react";

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
  const contentTypes = [
    {
      type: "link",
      name: "Link",
      icon: <Link className="size-3.5 text-muted-foreground" />,
    },
    {
      type: "snippet",
      name: "Snippet",
      icon: <Code className="size-3.5 text-muted-foreground" />,
    },
    {
      type: "note",
      name: "Note",
      icon: <NotepadText className="size-3.5 text-muted-foreground" />,
    },
    {
      type: "chat",
      name: "AI Conversation",
      icon: <MessageCircle className="size-3.5 text-muted-foreground" />,
    },
  ];

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
              <span className="text-xs tracking-widest">
                ({activeFilterCount})
              </span>
            )}
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-45 border-sidebar-border shadow-xl">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs-ds font-semibold text-muted-foreground">
            Content type
          </DropdownMenuLabel>

          {contentTypes.map((type) => (
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
        {/*<DropdownMenuGroup>
          <DropdownMenuItem
            className="text-xs-ds text-foreground focus:text-foreground dark:hover:bg-popover-foreground/10! hover:bg-muted/85! cursor-pointer"
            onSelect={(e) => e.preventDefault()}
            onClick={handleClearFilters}
          >
            Clear filters
          </DropdownMenuItem>
        </DropdownMenuGroup>*/}
        <DropdownMenuGroup>
          <Button
            variant="ghost"
            className="flex items-center font-normal rounded-sm-ds text-xs-ds text-foreground focus:text-foreground dark:hover:bg-popover-foreground/10! hover:bg-muted/85! cursor-pointer w-full justify-start p-1 ml-0"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
