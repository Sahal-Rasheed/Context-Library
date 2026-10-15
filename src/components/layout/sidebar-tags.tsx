"use client";

import { Tag } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useMemo } from "react";

import { useSidebar } from "@/context/sidebar-context";
import { contextItems } from "@/data";
import { cn } from "@/lib/utils";

const TAGS_COUNT = 8;

export default function SidebarTags() {
  const searchParams = useSearchParams();
  const { closeSidebar } = useSidebar();
  const currentTag = searchParams.get("tag")?.toLowerCase();

  const [visibleTags, setVisibleTags] = useState(TAGS_COUNT);

  // compute tag counts from live mock data
  const tagsList = useMemo(() => {
    const counts: Record<string, number> = {};
    contextItems.forEach((item) => {
      item.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        href: `/?tag=${encodeURIComponent(name)}`,
      }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, []);

  return (
    <div className="flex flex-col gap-1 select-none">
      <p className="px-2 pt-1 text-xs font-semibold text-muted-foreground">Tags</p>

      <nav className="flex flex-col gap-1">
        {tagsList.slice(0, visibleTags).map((item) => {
          const isActive = currentTag === item.name.toLowerCase();
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={closeSidebar}
              className={cn(
                "flex items-center justify-between rounded-md-ds px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
                isActive ? "bg-muted font-semibold text-primary" : "",
              )}
            >
              <span className="flex items-center gap-2.5 truncate">
                <Tag className="size-4 shrink-0" />
                <span className="truncate">{item.name}</span>
              </span>
              <span className="ml-auto shrink-0 text-xs-ds font-medium text-muted-foreground">
                {item.count}
              </span>
            </Link>
          );
        })}

        {visibleTags < tagsList.length && (
          <button
            type="button"
            className="cursor-pointer px-2 py-1 text-left text-xs text-muted-foreground transition-colors hover:text-primary"
            onClick={() => setVisibleTags(tagsList.length)}
          >
            Show all {tagsList.length}
          </button>
        )}
        {visibleTags === tagsList.length && tagsList.length > TAGS_COUNT && (
          <button
            type="button"
            className="cursor-pointer px-2 py-1 text-left text-xs text-muted-foreground transition-colors hover:text-primary"
            onClick={() => setVisibleTags(TAGS_COUNT)}
          >
            Show less
          </button>
        )}
      </nav>
    </div>
  );
}
