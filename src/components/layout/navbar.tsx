"use client";

import * as React from "react";
import { Search, Plus, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/context/sidebar-context";
import { useRouter, useSearchParams } from "next/navigation";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [query, setQuery] = React.useState(searchParams.get("q") || "");

  // press "/" to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (query.trim()) {
      params.set("q", query.trim());
    } else {
      params.delete("q");
    }
    router.replace(`/?${params.toString()}`);
  };

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
      <form
        onSubmit={handleSearchSubmit}
        className="relative flex-1 max-w-165 hidden sm:block"
        title="Search Context Library"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, context, tags…"
          className="w-full h-8.5 pl-9 pr-8 rounded-md-ds border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs-ds font-medium px-1.5 py-0.5 rounded border border-input text-muted-foreground select-none">
          /
        </kbd>
      </form>

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
}
