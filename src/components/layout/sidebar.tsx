"use client";

import { Inbox, Layers, Star, Archive } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useSidebar } from "@/context/sidebar-context";
import { contextItems } from "@/data";
import { cn } from "@/lib/utils";

import SidebarFolders from "./sidebar-folders";
import SidebarTags from "./sidebar-tags";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalCount = contextItems.length;
  const favoritesCount = contextItems.filter((i) => i.fav).length;
  const inboxCount = contextItems.filter((i) => !i.folder).length;
  const archivedCount = contextItems.filter((i) => i.archived).length;

  const currentSection = searchParams.get("section");
  const currentFolder = searchParams.get("folder");
  const currentTag = searchParams.get("tag");

  const navigationItems = [
    {
      name: "Inbox",
      href: "/?section=inbox",
      logo: <Inbox className="size-4" />,
      count: inboxCount,
      active: currentSection === "inbox",
    },
    {
      name: "All items",
      href: "/",
      logo: <Layers className="size-4" />,
      count: totalCount,
      active: pathname === "/" && !currentSection && !currentFolder && !currentTag,
    },
    {
      name: "Favorites",
      href: "/?section=favorites",
      logo: <Star className="size-4" />,
      count: favoritesCount,
      active: currentSection === "favorites",
    },
  ];

  return (
    <>
      {/* sidebar backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "flex h-full min-h-0 w-60 shrink-0 scrollbar-none flex-col justify-between overflow-y-auto border-r border-r-sidebar-border bg-sidebar px-2 py-3",
          // mobile overlay drawer styling:
          "fixed inset-y-0 left-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // desktop static grid column styling:
          "md:static md:z-0 md:translate-x-0 md:shadow-none",
        )}
      >
        <div className="space-y-4">
          {/* logo */}
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-2.5 px-2 pt-1 pb-1 text-sm font-semibold text-foreground select-none"
          >
            <span className="grid size-5 place-items-center rounded-sm-ds bg-primary text-primary-foreground">
              <svg
                className="size-3.5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="4"></rect>
                <path d="M9 8h6M9 12h6M9 16h3"></path>
              </svg>
            </span>
            Context Library
          </Link>

          {/* quick navigation */}
          <nav className="flex flex-col gap-1 select-none">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center justify-between rounded-md-ds px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
                  item.active ? "bg-muted font-semibold text-primary" : "",
                )}
              >
                <span className="flex items-center gap-2.5">
                  {item.logo}
                  {item.name}
                </span>
                <span className="text-xs-ds font-medium text-muted-foreground">{item.count}</span>
              </Link>
            ))}
          </nav>

          {/* folders */}
          <SidebarFolders />

          {/* tags */}
          <SidebarTags />
        </div>

        {/* bottom footer nav */}
        <div className="mt-4 flex flex-col gap-1 border-t border-border pt-4 text-xs text-muted-foreground select-none">
          <Link
            href="/?section=archived"
            onClick={closeSidebar}
            className="flex items-center gap-2 rounded-md-ds px-2 py-1 hover:bg-muted hover:text-foreground"
          >
            <Archive className="size-3.5" />
            <span>Archived</span>
            <span className="ml-auto text-xs-ds">{archivedCount}</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
