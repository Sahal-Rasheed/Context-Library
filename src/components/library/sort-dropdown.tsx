"use client";

import { SortDesc } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SortDropdownMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSort = searchParams.get("sort") ?? "latest";

  const handleSortChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", type);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const sortOptions = [
    {
      type: "latest",
      name: "Recently saved",
    },
    {
      type: "oldest",
      name: "Oldest first",
    },
    {
      type: "asc",
      name: "A-Z",
    },
    {
      type: "desc",
      name: "Z-A",
    },
  ];

  const currentSortName =
    sortOptions.find((sort) => sort.type === activeSort)?.name || sortOptions[0].name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-popover text-xs text-foreground hover:bg-muted/40 dark:bg-popover dark:hover:bg-popover-foreground/10"
          >
            <SortDesc className="size-3" />
            <span>{currentSortName}</span>
          </Button>
        }
      />
      <DropdownMenuContent className="min-w-45 border-sidebar-border shadow-xl">
        <DropdownMenuGroup>
          {sortOptions.map((sort) => (
            <DropdownMenuCheckboxItem
              key={sort.name}
              className="flex cursor-pointer items-center gap-2 rounded-sm-ds text-xs-ds text-foreground hover:bg-muted/85! focus:text-foreground dark:hover:bg-popover-foreground/10!"
              checked={activeSort === sort.type}
              onCheckedChange={() => handleSortChange(sort.type)}
            >
              <span>{sort.name}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
