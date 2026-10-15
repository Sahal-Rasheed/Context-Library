"use client";

import { Search, Plus, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useSidebar } from "@/context/sidebar-context";

import { LibraryModal } from "../library/library-modal";
import { AvatarDropdown } from "../user/avatar-dropdown";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [query, setQuery] = React.useState(searchParams.get("q") || "");
  const [isLibraryModalOpen, setIsLibraryModalOpen] = React.useState(false);

  // press "/" to focus search
  // press "C" to open library modal
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

      if (
        e.key &&
        e.key.toLowerCase() === "c" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setIsLibraryModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLibraryModalOpen = () => {
    setIsLibraryModalOpen(true);
  };

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
    <header className="z-10 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-5">
      {/* menu button for mobile */}
      <Button
        variant="outline"
        size="icon"
        className="shrink-0 md:hidden"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
        title="Toggle Sidebar"
      >
        <Menu className="size-4" />
      </Button>

      {/* search input */}
      <form
        onSubmit={handleSearchSubmit}
        className="relative hidden max-w-165 flex-1 sm:block"
        title="Search Context Library"
      >
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search titles, context, tags…"
          className="h-8.5 w-full rounded-md-ds border border-input bg-card pr-8 pl-9 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <kbd className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded border border-input px-1.5 py-0.5 text-xs-ds font-medium text-muted-foreground select-none">
          /
        </kbd>
      </form>

      {/* action buttons */}
      <div className="flex items-center gap-2.5">
        <ThemeToggle />
        <Button className="h-8 gap-1.5 px-3 text-xs font-semibold" onClick={handleLibraryModalOpen}>
          <Plus className="size-3.5" />
          <span>Save</span>
          <kbd className="ml-1 rounded border border-input px-1.5 py-0.5 text-[10px] font-medium">
            C
          </kbd>
        </Button>
        <AvatarDropdown />
      </div>

      {/* library modal
      {/* no need of condition since we are using the modal as a controlled component and we are handling open or not via props automatically via shadcn */}
      <LibraryModal open={isLibraryModalOpen} onOpenChange={setIsLibraryModalOpen} />
    </header>
  );
}
