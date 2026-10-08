"use client";

import { Inbox, Layers, Star, Archive } from "lucide-react";
import Link from "next/link";
import SidebarFolders from "./sidebar-folders";
import SidebarTags from "./sidebar-tags";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar-context";
import { usePathname, useSearchParams } from "next/navigation";
import { contextItems } from "@/data";

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
      active:
        pathname === "/" && !currentSection && !currentFolder && !currentTag,
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
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "w-60 h-full min-h-0 shrink-0 bg-sidebar border-r border-r-sidebar-border py-3 px-2 flex flex-col justify-between overflow-y-auto scrollbar-none",
          // mobile overlay drawer styling:
          "fixed inset-y-0 left-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // desktop static grid column styling:
          "md:static md:translate-x-0 md:shadow-none md:z-0",
        )}
      >
        <div className="space-y-4">
          {/* logo */}
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-2.5 text-sm px-2 pt-1 pb-1 font-semibold text-foreground select-none"
          >
            <span className="size-5 rounded-sm-ds bg-primary text-primary-foreground grid place-items-center">
              <svg
                className="size-3.5 stroke-2 stroke-current fill-none"
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
                  "flex items-center justify-between text-sm px-2 py-1 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary transition-colors",
                  item.active ? "bg-muted text-primary font-semibold" : "",
                )}
              >
                <span className="flex items-center gap-2.5">
                  {item.logo}
                  {item.name}
                </span>
                <span className="text-xs-ds text-muted-foreground font-medium">
                  {item.count}
                </span>
              </Link>
            ))}
          </nav>

          {/* folders */}
          <SidebarFolders />

          {/* tags */}
          <SidebarTags />
        </div>

        {/* bottom footer nav */}
        <div className="pt-4 border-t border-border flex flex-col gap-1 select-none text-xs text-muted-foreground mt-4">
          <Link
            href="/?section=archived"
            onClick={closeSidebar}
            className="flex items-center gap-2 px-2 py-1 rounded-md-ds hover:bg-muted hover:text-foreground"
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
