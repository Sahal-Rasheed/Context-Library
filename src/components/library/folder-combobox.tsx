import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Folder } from "lucide-react";

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
  "Create React App",
  "Vite",
  "Gatsby",
  "SolidStart",
  "Qwik",
  "Eleventy",
  "Laravel",
  "Django",
  "Rails",
  "Express",
  "NestJS",
  "Flask",
  "Spring Boot",
  "Symfony",
  "Phoenix",
] as const;

export function FolderCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput
        placeholder="Select a folder"
        className="min-h-10.5 text-xs-ds rounded-sm-ds placeholder:text-xs-ds placeholder:tracking-wide placeholder:text-muted-foreground"
      />
      <ComboboxContent className="w-55.75" sideOffset={10}>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem
              key={item}
              value={item}
              className="text-sm tracking-wide text-foreground cursor-pointer rounded-sm-ds"
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
