"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortDesc } from "lucide-react";

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
    sortOptions.find((sort) => sort.type === activeSort)?.name ||
    sortOptions[0].name;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            className="text-xs dark:bg-popover bg-popover text-foreground rounded-md dark:hover:bg-popover-foreground/10 hover:bg-muted/40 cursor-pointer flex gap-2 items-center justify-center"
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
              className="flex items-center gap-2 rounded-sm-ds text-xs-ds text-foreground focus:text-foreground dark:hover:bg-popover-foreground/10! hover:bg-muted/85! cursor-pointer"
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
