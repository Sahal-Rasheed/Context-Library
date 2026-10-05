"use client";

import { Inbox, Layers, Star } from "lucide-react";
import Link from "next/link";
import Folders from "./folders";
import Tags from "./tags";
import { cn } from "cn";
import { useSidebar } from "../../context/sidebar-context";

const SideBar = () => {
  const { isOpen, closeSidebar } = useSidebar();

  const navigationItems = [
    { name: "Inbox", href: "#", logo: <Inbox className="size-4" />, count: 20 },
    {
      name: "All Items",
      href: "#",
      logo: <Layers className="size-4" />,
      count: 10,
    },
    {
      name: "Favorites",
      href: "#",
      logo: <Star className="size-4" />,
      count: 5,
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
          "w-60 h-full min-h-0 shrink-0 bg-sidebar border-r border-r-sidebar-border py-3 px-2 space-y-4 overflow-y-auto scrollbar-none",
          // mobile overlay drawer styling:
          "fixed inset-y-0 left-0 z-50 shadow-2xl transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // desktop static grid column styling:
          "md:static md:translate-x-0 md:shadow-none md:z-0",
        )}
      >
        {/* logo */}
        <div className="flex items-center gap-2.5 text-sm px-2 pt-1 pb-1 font-semibold text-foreground select-none">
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
        </div>

        {/* quick navigation */}
        <nav className="flex flex-col gap-1 select-none">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className="flex items-center justify-center text-sm px-2 py-1 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary hover:font-semibold"
            >
              <span className="flex items-center gap-2.5">
                {item.logo}
                {item.name}
              </span>
              <span className="ml-auto text-md-ds text-muted-foreground font-medium">
                {item.count}
              </span>
            </Link>
          ))}
        </nav>

        {/* folders */}
        <Folders />

        {/* tags */}
        <Tags />
      </aside>
    </>
  );
};

export default SideBar;
