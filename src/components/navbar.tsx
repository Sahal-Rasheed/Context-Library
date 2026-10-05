"use client";

import { Search, Plus, Menu } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";
import { Button } from "./ui/button";
import { useSidebar } from "../context/sidebar-context";

const NavBar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="h-14 shrink-0 border-b border-border bg-background flex items-center justify-between px-5 gap-4 z-10">
      {/* menu button for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="md:hidden shrink-0"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar"
      >
        <Menu className="size-4" />
      </Button>

      {/* search input */}
      <div
        className="relative flex-1 max-w-165 hidden sm:block"
        title="Search Context Library"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          placeholder="Search titles, context, tags…"
          className="w-full h-8.5 pl-9 pr-8 rounded-md-ds border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs-ds font-medium px-1.5 py-0.5 rounded border border-input text-muted-foreground">
          /
        </kbd>
      </div>

      {/* action buttons */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button className="h-8 gap-1.5 px-3 text-xs font-semibold">
          <Plus className="size-3.5" />
          <span>Save</span>
          <kbd className="ml-1 text-[10px] font-medium px-1.5 py-0.5 rounded border border-input">
            C
          </kbd>
        </Button>
      </div>
    </header>
  );
};

export default NavBar;
