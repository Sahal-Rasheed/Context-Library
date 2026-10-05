"use client";

import Link from "next/link";
import { Folder } from "lucide-react";
import { useState } from "react";

const Folders = () => {
  const folders = [
    {
      name: "Frontend",
      href: "#",
      icon: <Folder className="size-4" />,
      count: 4,
    },
    {
      name: "Data & Backend",
      href: "#",
      icon: <Folder className="size-4" />,
      count: 2,
    },
    {
      name: "Design",
      href: "#",
      icon: <Folder className="size-4" />,
      count: 3,
    },
    {
      name: "Marketing",
      href: "#",
      icon: <Folder className="size-4" />,
      count: 1,
    },
    {
      name: "Learning",
      href: "#",
      icon: <Folder className="size-4" />,
      count: 5,
    },
  ];

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

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between pl-2 pr-1">
        <span className="text-xs font-semibold text-muted-foreground">
          Folders
        </span>
        <button
          className="text-xl text-muted-foreground rounded-md hover:bg-muted hover:text-primary hover:font-medium px-2 hover:cursor-pointer"
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
      {isSearchOpen ? (
        <div className="flex flex-1 px-1 py-2">
          <input
            type="text"
            placeholder="Search folders..."
            className="text-sm px-2 py-1 rounded-sm-ds border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent w-full placeholder:text-sm-ds"
            autoFocus
            onChange={handleSearchInput}
            value={searchQuery}
            onBlur={handleSearchToggle}
          />
        </div>
      ) : null}
      <nav className="flex flex-col gap-1">
        {folders.map((item) => (
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
      </nav>
    </div>
  );
};

export default Folders;
