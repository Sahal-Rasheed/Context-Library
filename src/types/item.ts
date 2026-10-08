export type ContextItemType = "snippet" | "chat" | "note" | "link" | "image";

export interface Attachment {
  name: string;
  kind: "image" | "pdf" | "file";
  size: string;
  url?: string;
}

export interface ItemMeta {
  author?: string;
  len?: string; // e.g. "14 min read", "12 lines", "94 words", "4 messages", "1440x900 · PNG"
  site?: string;
  lang?: string; // for snippets e.g. "TypeScript", "CSS"
  source?: string; // for chats e.g. "ChatGPT", "Gemini", "Claude"
}

export interface ContextItem {
  id: string;
  type: ContextItemType;
  title: string;
  url?: string;
  desc: string;
  ctx?: string; // personal "Why I saved this" note
  ctxAt?: string; // when context was written
  body?: string; // for notes
  code?: string; // for code snippets
  folder?: string;
  tags: string[];
  fav?: boolean;
  archived?: boolean;
  savedAt: string; // ISO string or date
  meta?: ItemMeta;
  attach?: Attachment[];
  connectedIds?: string[]; // IDs of items explicitly linked
}

export interface FolderItem {
  id: string;
  name: string;
  slug: string;
  count?: number;
}
