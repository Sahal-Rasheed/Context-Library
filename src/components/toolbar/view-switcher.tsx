"use client";

import { AlignJustify, LayoutGridIcon, List } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "cn";

export default function ViewSwitcher({
  value,
}: {
  value: "list" | "grid" | "compact";
}) {
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
    <div className="flex bg-popover text-muted-foreground rounded-md divide-x divide-white overflow-hidden m-0">
      <Button
        className={cn(
          "rounded-l-md rounded-r-none border-r-0 dark:hover:bg-popover-foreground/5 hover:bg-muted/65 cursor-pointer",
          value === "list" &&
            "bg-muted hover:bg-muted text-foreground dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
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
          "rounded-none dark:hover:bg-popover-foreground/5 hover:bg-muted/65 cursor-pointer",
          value === "compact" &&
            "bg-muted hover:bg-muted text-foreground dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
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
          "rounded-r-md rounded-l-none border-l-0 dark:hover:bg-popover-foreground/5 hover:bg-muted/65 cursor-pointer",
          value === "grid" &&
            "bg-muted hover:bg-muted text-foreground dark:bg-popover-foreground/10 dark:hover:dark:bg-popover-foreground/10",
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
