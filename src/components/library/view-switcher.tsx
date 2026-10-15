"use client";

import { cn } from "cn";
import { AlignJustify, LayoutGridIcon, List } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

export default function ViewSwitcher({ value }: { value: "list" | "grid" | "compact" }) {
  const router = useRouter();
  const pathname = usePathname(); // returns "/dashboard" on /dashboard?foo=bar
  const searchParams = useSearchParams(); // returns 'bar' when ?foo=bar

  const handleViewChange = (view: "list" | "grid" | "compact") => {
    const params = new URLSearchParams(searchParams);
    params.set("view", view);
    // router.push(`${pathname}?${params.toString()}`); or [preserve history]
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="m-0 flex divide-x divide-white overflow-hidden rounded-md bg-popover text-muted-foreground">
      <Button
        className={cn(
          "cursor-pointer rounded-l-md rounded-r-none border-r-0 hover:bg-muted/65 dark:hover:bg-popover-foreground/5",
          value === "list" &&
            "bg-muted text-foreground hover:bg-muted dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
        )}
        variant="outline"
        aria-label="List View"
        title="List View"
        onClick={() => handleViewChange("list")}
        data-active={value === "list"}
      >
        <List className="size-3.5" />
      </Button>
      <Button
        className={cn(
          "cursor-pointer rounded-none hover:bg-muted/65 dark:hover:bg-popover-foreground/5",
          value === "compact" &&
            "bg-muted text-foreground hover:bg-muted dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
        )}
        variant="outline"
        aria-label="Compact View"
        title="Compact View"
        onClick={() => handleViewChange("compact")}
        data-active={value === "compact"}
      >
        <AlignJustify className="size-3.5" />
      </Button>
      <Button
        className={cn(
          "cursor-pointer rounded-l-none rounded-r-md border-l-0 hover:bg-muted/65 dark:hover:bg-popover-foreground/5",
          value === "grid" &&
            "bg-muted text-foreground hover:bg-muted dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
        )}
        variant="outline"
        aria-label="Grid View"
        title="Grid View"
        onClick={() => handleViewChange("grid")}
        data-active={value === "grid"}
      >
        <LayoutGridIcon className="size-3.5" />
      </Button>
    </div>
  );
}
