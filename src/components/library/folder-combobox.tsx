"use client";

import { Folder } from "lucide-react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const DEFAULT_FOLDERS = [
  "Frontend",
  "Data & Backend",
  "Architecture",
  "Tooling & DX",
  "Learning",
] as const;

interface FolderComboboxProps {
  value?: string;
  onChange?: (value: string | null) => void;
  disabled?: boolean;
}

export function FolderCombobox({ value = "", onChange, disabled = false }: FolderComboboxProps) {
  return (
    <Combobox
      items={DEFAULT_FOLDERS}
      value={value || null}
      onValueChange={(val) => {
        onChange?.(val);
      }}
      disabled={disabled}
    >
      <ComboboxInput
        id="folder"
        placeholder="Select a folder"
        className="min-h-10.5 rounded-sm-ds text-xs-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
      />
      <ComboboxContent className="w-55.75" sideOffset={10}>
        <ComboboxEmpty>No folders found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              className="cursor-pointer rounded-sm-ds text-sm tracking-wide text-foreground"
            >
              <Folder className="size-4 text-muted-foreground dark:focus:text-muted-foreground!" />
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
