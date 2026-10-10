import {
  Code,
  Link,
  MessageCircle,
  NotepadText,
  Image as ImageIcon,
} from "lucide-react";

import LibraryToolbar from "./library-toolbar";
import type { ContextItemType } from "@/data";

export const CONTENT_TYPES: {
  type: ContextItemType;
  name: string;
  icon: React.ReactNode;
}[] = [
  {
    type: "link",
    name: "Link",
    icon: <Link className="size-3.5 text-muted-foreground" />,
  },
  {
    type: "snippet",
    name: "Snippet",
    icon: <Code className="size-3.5 text-muted-foreground" />,
  },
  {
    type: "note",
    name: "Note",
    icon: <NotepadText className="size-3.5 text-muted-foreground" />,
  },
  {
    type: "chat",
    name: "AI Conversation",
    icon: <MessageCircle className="size-3.5 text-muted-foreground" />,
  },
  {
    type: "image",
    name: "Image",
    icon: <ImageIcon className="size-3.5 text-muted-foreground" />,
  },
];

type LibraryPageProps = {
  title: string;
  count: number;
  view: "grid" | "list" | "compact";
  children: React.ReactNode;
};

export function LibraryPage({
  title,
  count,
  view,
  children,
}: LibraryPageProps) {
  return (
    <div className="mt-2.5 mb-10">
      <LibraryToolbar title={title} count={count} view={view} />
      {children}
    </div>
  );
}
