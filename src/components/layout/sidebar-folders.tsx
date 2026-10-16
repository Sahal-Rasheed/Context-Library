"use client";

import { Folder, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { createFolderAction } from "@/actions/folders";
import { useSidebar } from "@/context/sidebar-context";
import { cn } from "@/lib/utils";
import type { SidebarFolder } from "@/types/item";

export default function SidebarFolders({ folders }: { folders: SidebarFolder[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeSidebar } = useSidebar();
  const currentFolder = searchParams.get("folder")?.toLowerCase();

  const [draft, setDraft] = useState("");
  const [isComposerOpen, setComposerOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const query = draft.trim().toLowerCase();
  const filteredFolders = query
    ? folders.filter((folder) => folder.name.toLowerCase().includes(query))
    : folders;
  const hasExactMatch = folders.some((folder) => folder.name.toLowerCase() === query);
  const canCreate = query.length > 0 && !hasExactMatch;

  const closeComposer = () => {
    setComposerOpen(false);
    setDraft("");
  };

  const handleCreate = async () => {
    const name = draft.trim();
    if (!name || isCreating) return;

    setIsCreating(true);
    const result = await createFolderAction(name);
    setIsCreating(false);

    if (result.success) {
      closeComposer();
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-1 select-none">
      <div className="flex items-center justify-between pr-1 pl-2">
        <span className="text-xs font-semibold text-muted-foreground">Folders</span>
        <button
          className="cursor-pointer rounded-md px-2 text-xl leading-none text-muted-foreground hover:bg-muted hover:text-primary"
          title="New folder"
          // using onMouseDown and preventDefault to stop the input's onBlur from fighting with this button click
          onMouseDown={(e) => {
            e.preventDefault();
            if (isComposerOpen) {
              closeComposer();
            } else {
              setComposerOpen(true);
            }
          }}
        >
          +
        </button>
      </div>

      {isComposerOpen && (
        <div className="flex flex-1 gap-1 px-1 py-1">
          <input
            type="text"
            placeholder="Create or search folders..."
            className="w-full rounded-sm-ds border border-border bg-background px-2 py-1 text-xs text-foreground placeholder:text-sm-ds focus:ring-2 focus:ring-accent focus:outline-none"
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (canCreate) {
                  void handleCreate();
                }
              } else if (e.key === "Escape") {
                closeComposer();
              }
            }}
            onBlur={closeComposer}
          />
        </div>
      )}

      <nav className="flex flex-col gap-1">
        {isComposerOpen && canCreate && (
          <button
            type="button"
            className="flex items-center gap-2.5 rounded-md-ds px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary disabled:opacity-50"
            disabled={isCreating}
            // prevent the input's onBlur from firing before the click handler
            onMouseDown={(e) => {
              e.preventDefault();
              void handleCreate();
            }}
          >
            <Plus className="size-4 shrink-0" />
            <span className="truncate">Create &quot;{draft.trim()}&quot;</span>
          </button>
        )}

        {filteredFolders.map((folder) => {
          const isActive = currentFolder === folder.name.toLowerCase();
          return (
            <Link
              key={folder.id}
              href={`/?folder=${encodeURIComponent(folder.name)}`}
              onClick={closeSidebar}
              className={cn(
                "flex items-center justify-between rounded-md-ds px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary",
                isActive ? "bg-muted font-semibold text-primary" : "",
              )}
            >
              <span className="flex items-center gap-2.5 truncate">
                <Folder className="size-4 shrink-0" />
                <span className="truncate">{folder.name}</span>
              </span>
              <span className="ml-auto shrink-0 text-md-ds font-medium text-muted-foreground">
                {folder.count}
              </span>
            </Link>
          );
        })}

        {filteredFolders.length === 0 && !canCreate && (
          <p className="px-2 py-1 text-xs text-muted-foreground">
            {folders.length === 0 ? "No folders yet." : "No folders found."}
          </p>
        )}
      </nav>
    </div>
  );
}
