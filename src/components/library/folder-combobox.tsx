"use client";

import { Folder, Plus } from "lucide-react";
import * as React from "react";

import { searchFoldersAction } from "@/actions/folders";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

interface FolderComboboxProps {
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}

export function FolderCombobox({ value = "", onChange, disabled = false }: FolderComboboxProps) {
  const [folders, setFolders] = React.useState<{ id: string; name: string }[]>([]);
  const [query, setQuery] = React.useState("");

  // load the user's folders on mount, then search server-side (debounced) as the
  // user types. an empty query restores the full list.
  React.useEffect(() => {
    let active = true;
    const trimmed = query.trim();

    const timer = setTimeout(
      () => {
        void searchFoldersAction(trimmed).then((result) => {
          if (active && result.success) setFolders(result.folders);
        });
      },
      trimmed ? 250 : 0,
    );

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query]);

  const folderNames = folders.map((folder) => folder.name);
  const trimmedQuery = query.trim();
  const hasExactMatch = folderNames.some(
    (name) => name.toLowerCase() === trimmedQuery.toLowerCase(),
  );
  // offer "create" when the typed name doesn't exist yet; selecting it sets the
  // folder value and the folder is created with the item on save.
  const createOption = trimmedQuery.length > 0 && !hasExactMatch ? trimmedQuery : null;
  const items = createOption ? [...folderNames, createOption] : folderNames;

  return (
    <Combobox
      items={items}
      value={value || null}
      onValueChange={(val) => {
        onChange?.(val);
      }}
      onInputValueChange={(val) => setQuery(val)}
      disabled={disabled}
    >
      <ComboboxInput
        id="folder"
        placeholder="Select or create a folder"
        className="min-h-10.5 rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
      />
      <ComboboxContent className="w-90.5" sideOffset={10}>
        <ComboboxEmpty>No folders found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => {
            const isCreate = item === createOption;
            return (
              <ComboboxItem
                key={item}
                value={item}
                className="cursor-pointer rounded-sm-ds text-sm tracking-wide text-foreground"
              >
                {isCreate ? (
                  <Plus className="size-4 text-muted-foreground" />
                ) : (
                  <Folder className="size-4 text-muted-foreground dark:focus:text-muted-foreground!" />
                )}
                {isCreate ? `Create "${item}"` : item}
              </ComboboxItem>
            );
          }}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
