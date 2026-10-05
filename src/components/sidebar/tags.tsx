"use client";

import Link from "next/link";
import { Tag } from "lucide-react";
import { useState } from "react";

const TAGS_COUNT = 8;

const Tags = () => {
  const tags = [
    {
      name: "postgres",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 5,
    },
    {
      name: "docs",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 4,
    },
    {
      name: "performance",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 4,
    },
    {
      name: "nextjs",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 3,
    },
    {
      name: "react",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 3,
    },
    {
      name: "typescript",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 3,
    },
    {
      name: "tailwind",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 2,
    },
    {
      name: "github",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 2,
    },
    {
      name: "prisma",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 2,
    },
    {
      name: "supabase",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 2,
    },
    {
      name: "nodejs",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 1,
    },
    {
      name: "express",
      href: "#",
      icon: <Tag className="size-4" />,
      count: 1,
    },
  ];

  const [visibleTags, setVisibleTags] = useState(TAGS_COUNT);

  return (
    <div className="flex flex-col gap-1 select-none">
      <p className="text-xs font-semibold px-2 pt-1 text-muted-foreground">
        Tags
      </p>

      <nav className="flex flex-col gap-1">
        {tags.slice(0, visibleTags).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center justify-center text-sm px-2 py-1 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary hover:font-semibold"
          >
            <span className="flex items-center gap-2.5">
              {item.icon}
              {item.name}
            </span>
            <span className="ml-auto text-md-ds text-muted-foreground font-medium">
              {item.count}
            </span>
          </Link>
        ))}
        {visibleTags < tags.length && (
          <button
            className="text-sm px-2 py-1 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary"
            onClick={() => setVisibleTags(tags.length)}
          >
            Show more...
          </button>
        )}
        {visibleTags === tags.length && (
          <button
            className="text-sm px-2 py-1 rounded-md-ds text-muted-foreground hover:bg-muted hover:text-primary"
            onClick={() => setVisibleTags(TAGS_COUNT)}
          >
            Show less...
          </button>
        )}
      </nav>
    </div>
  );
};

export default Tags;
