export type ContextItemType = "SNIPPET" | "AI_CONVERSATION" | "NOTE" | "LINK" | "IMAGE";

export interface SidebarCounts {
  total: number;
  favorites: number;
  inbox: number;
  archived: number;
}

export interface SidebarFolder {
  id: string;
  name: string;
  count: number;
}

export interface SidebarTag {
  id: string;
  name: string;
  count: number;
}
