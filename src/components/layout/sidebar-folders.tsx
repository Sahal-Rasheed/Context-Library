"use client";

import Link from "next/link";
import { Folder } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { contextItems } from "@/data";
import { useSidebar } from "@/context/sidebar-context";

const FOLDER_LIST = [
  { name: "Frontend", slug: "frontend" },
  { name: "Data & Backend", slug: "data" },
  { name: "Architecture", slug: "arch" },
  { name: "Tooling & DX", slug: "tooling" },
  { name: "Learning", slug: "learning" },
];

export default function SidebarFolders() {
  const searchParams = useSearchParams();
  const { closeSidebar } = useSidebar();
  const currentFolder = searchParams.get("folder")?.toLowerCase();

  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setSearchOpen((prev) => {
      if (prev) setSearchQuery(""); // reset query when closing
      return !prev;
    });
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const foldersWithCounts = FOLDER_LIST.map((f) => {
    const count = contextItems.filter(
      (item) => item.folder?.toLowerCase() === f.slug.toLowerCase(),
    ).length;
    return {
      ...f,
      count,
      href: `/?folder=${f.slug}`,
      active: currentFolder === f.slug.toLowerCase(),
    };
  }).filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between pl-2 pr-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Folders
        </span>
        <button
          className="text-xl text-muted-foreground rounded-md hover:bg-muted hover:text-primary px-2 cursor-pointer leading-none"
          title="New Folder"
          // using onMouseDown and preventDefault to stop the input's onBlur from fighting with this button click
          onMouseDown={(e) => {
            e.preventDefault();
            handleSearchToggle();
          }}
        >
          +
        </button>
      </div>

      {isSearchOpen && (
        <div className="flex flex-1 px-1 py-1">
          <input
            type="text"
            placeholder="Search folders..."
            className="text-xs px-2 py-1 rounded-sm-ds border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent w-full placeholder:text-sm-ds"
            autoFocus
            onChange={handleSearchInput}
            value={searchQuery}
            onBlur={handleSearchToggle}
          />
        </div>
      )}

      <nav className="flex flex-col gap-1">
        {foldersWithCounts.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            onClick={closeSidebar}
            className={cn(
              "flex items-center justify-between text-sm px-2 py-1.5 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary transition-colors",
              item.active ? "bg-muted text-primary font-semibold" : "",
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <Folder className="size-4 shrink-0" />
              <span className="truncate">{item.name}</span>
            </span>
            <span className="text-md-ds text-muted-foreground font-medium shrink-0 ml-auto">
              {item.count}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
