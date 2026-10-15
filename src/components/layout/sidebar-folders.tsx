"use client";

import { Folder } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useSidebar } from "@/context/sidebar-context";
import { contextItems } from "@/data";
import { cn } from "@/lib/utils";

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
  }).filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase().trim()));

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between pr-1 pl-2">
        <span className="text-xs font-semibold text-muted-foreground">Folders</span>
        <button
          className="cursor-pointer rounded-md px-2 text-xl leading-none text-muted-foreground hover:bg-muted hover:text-primary"
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
            className="w-full rounded-sm-ds border border-border bg-background px-2 py-1 text-xs text-foreground placeholder:text-sm-ds focus:ring-2 focus:ring-accent focus:outline-none"
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
              "flex items-center justify-between rounded-md-ds px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
              item.active ? "bg-muted font-semibold text-primary" : "",
            )}
          >
            <span className="flex items-center gap-2.5 truncate">
              <Folder className="size-4 shrink-0" />
              <span className="truncate">{item.name}</span>
            </span>
            <span className="ml-auto shrink-0 text-md-ds font-medium text-muted-foreground">
              {item.count}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
