export * from "@/types/item";
import type { ContextItem } from "@/types/item";

export const contextItems: ContextItem[] = [
  {
    id: "1",
    type: "link",
    title: "Server Components",
    url: "https://react.dev/reference/rsc/server-components",
    desc: "Reference for React Server Components: what runs on the server, how they compose with Client Components, and how async components work.",
    ctx: "The clearest explanation of the server/client boundary I have found. Re-read the async components section before we migrate the dashboard routes, because it changes where data fetching lives.",
    ctxAt: "2026-10-06T10:00:00Z",
    folder: "frontend",
    tags: ["react", "nextjs", "docs"],
    fav: true,
    savedAt: "2026-10-06T10:00:00Z",
    meta: {
      author: "React team",
      len: "14 min read",
      site: "react.dev",
    },
    attach: [
      { name: "rsc-boundary-diagram.png", kind: "image", size: "184 KB" },
    ],
    connectedIds: ["3", "7", "5", "2"],
  },
  {
    id: "2",
    type: "image",
    title: "Lighthouse after the RSC migration",
    desc: "Before/after evidence for the migration writeup.",
    folder: "frontend",
    tags: ["performance", "nextjs", "frontend"],
    savedAt: "2026-10-06T08:00:00Z",
    meta: {
      len: "1440×900 · PNG",
    },
    attach: [
      { name: "lighthouse-audit-rsc.png", kind: "image", size: "620 KB" },
    ],
  },
  {
    id: "3",
    type: "note",
    title: "Next.js caching gotchas",
    desc: "My own cheat sheet. Update it when I get burned again.",
    body: "1. fetch() requests are cached by default in Data Cache unless cache: 'no-store' is set.\n2. Router cache stores RSC payload in browser for 30s (dynamic) or 5m (static).\n3. revalidatePath invalidates both data cache and router cache.\n4. Route Handlers default to static unless using cookies(), headers(), or request.url.",
    folder: "frontend",
    tags: ["nextjs", "caching"],
    savedAt: "2026-10-05T12:00:00Z",
    meta: {
      len: "94 words",
    },
  },
  {
    id: "4",
    type: "link",
    title: "Tailwind CSS v4.0",
    url: "https://tailwindcss.com/blog/tailwindcss-v4",
    desc: "Announcement of Tailwind CSS v4 with CSS-first configuration and a new high-performance engine. The screenshot is the diff the upgrade tool generated.",
    ctx: "Check whether the config migration codemod handles our custom plugin.",
    ctxAt: "2026-10-04T09:00:00Z",
    folder: "frontend",
    tags: ["css", "frontend", "docs"],
    savedAt: "2026-10-04T09:00:00Z",
    meta: {
      author: "Tailwind Labs",
      len: "9 min read",
      site: "tailwindcss.com",
    },
  },
  {
    id: "5",
    type: "snippet",
    title: "useDebouncedValue hook",
    desc: "Cleaner than pulling in lodash just for the search box. 250ms felt right for the docs search.",
    code: `import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}`,
    ctx: "Cleaner than pulling in lodash just for the search box. 250ms felt right for the docs search.",
    folder: "frontend",
    tags: ["react", "typescript", "snippet"],
    savedAt: "2026-10-04T11:00:00Z",
    meta: {
      len: "12 lines",
      lang: "TypeScript snippet",
    },
  },
  {
    id: "6",
    type: "link",
    title: "Caching in Next.js",
    url: "https://nextjs.org/docs/app/guides/caching",
    desc: "Keep this open when debugging stale data after revalidatePath. The table showing which cache each API touches is the useful part.",
    ctx: "Keep this open when debugging stale data after revalidatePath. The table showing which cache each API touches is the useful part.",
    folder: "frontend",
    tags: ["nextjs", "caching", "docs"],
    fav: true,
    savedAt: "2026-10-03T14:00:00Z",
    meta: {
      author: "Vercel",
      len: "18 min read",
      site: "nextjs.org",
    },
  },
  {
    id: "7",
    type: "link",
    title: "shadcn-ui/ui",
    url: "https://github.com/shadcn-ui/ui",
    desc: "Look at how the registry and CLI are structured, not just the components. Good reference for distributing our internal design system.",
    ctx: "Look at how the registry and CLI are structured, not just the components. Good reference for distributing our internal design system.",
    folder: "frontend",
    tags: ["react", "css", "github"],
    savedAt: "2026-09-29T10:00:00Z",
    meta: {
      author: "shadcn",
      len: "Repository",
      site: "github.com",
    },
  },
  {
    id: "8",
    type: "chat",
    title: "Debugging a hydration mismatch in Next.js",
    desc: "The checklist in the second answer found our bug: a locale-formatted date rendered on the server.",
    ctx: "The checklist in the second answer found our bug: a locale-formatted date rendered on the server.",
    folder: "frontend",
    tags: ["react", "nextjs"],
    savedAt: "2026-09-27T16:00:00Z",
    meta: {
      source: "ChatGPT",
      len: "4 messages",
    },
  },
  {
    id: "9",
    type: "snippet",
    title: "Container query card layout",
    desc: "Drop-in pattern for any reusable card. No JS and no breakpoint props.",
    code: `@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 16px;
  }
}`,
    ctx: "Drop-in pattern for any reusable card. No JS and no breakpoint props.",
    folder: "frontend",
    tags: ["css", "snippet"],
    savedAt: "2026-09-26T15:00:00Z",
    meta: {
      len: "15 lines",
      lang: "CSS snippet",
    },
  },
  {
    id: "10",
    type: "link",
    title: "Container queries, MDN",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries",
    desc: "This is the thing that finally makes the card components reusable in both the sidebar and the main column.",
    ctx: "This is the thing that finally makes the card components reusable in both the sidebar and the main column.",
    folder: "frontend",
    tags: ["css", "docs"],
    savedAt: "2026-09-25T11:00:00Z",
    meta: {
      author: "MDN contributors",
      len: "6 min read",
      site: "developer.mozilla.org",
    },
  },
  {
    id: "11",
    type: "chat",
    title: "Container queries vs media queries for a component library",
    desc: "When to size components from their container and when viewport breakpoints are still right.",
    folder: "frontend",
    tags: ["css"],
    savedAt: "2026-09-25T09:00:00Z",
    meta: {
      source: "Gemini",
      len: "4 messages",
    },
  },
  {
    id: "12",
    type: "link",
    title: "Connection pool (Prisma ORM)",
    url: "https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-pool",
    desc: "How Prisma Client manages its connection pool, how to size it, and what changes in serverless environments.",
    ctx: "Lambda cold starts were exhausting Postgres connections. The fix was connection_limit=1 per function plus PgBouncer in transaction mode. Ticket PLAT-482.",
    folder: "data",
    tags: ["prisma", "postgres", "performance"],
    savedAt: "2026-09-20T10:00:00Z",
    meta: { author: "Prisma", len: "9 min read", site: "prisma.io" },
  },
  {
    id: "13",
    type: "link",
    title: "Islands architecture",
    url: "https://www.patterns.dev/vanilla/islands-architecture/",
    desc: "Describes the islands pattern: render the page on the server and hydrate only the interactive regions.",
    ctx: "Useful mental model for the marketing site. Compare with RSC, since the goal is the same but the mechanism is different.",
    folder: "arch",
    tags: ["patterns", "performance"],
    savedAt: "2026-09-18T10:00:00Z",
    meta: {
      author: "Lydia Hallie, Addy Osmani",
      len: "6 min read",
      site: "patterns.dev",
    },
  },
  {
    id: "14",
    type: "link",
    title: "drizzle-team/drizzle-orm",
    url: "https://github.com/drizzle-team/drizzle-orm",
    desc: "TypeScript ORM with a SQL-like query builder and a companion migration tool, designed for serverless and edge runtimes.",
    ctx: "Compare with Prisma for the edge-runtime service. Check how drizzle-kit generates migrations and whether it works with our shadow database setup.",
    folder: "data",
    tags: ["typescript", "github"],
    savedAt: "2026-09-15T12:00:00Z",
    meta: { author: "Drizzle Team", len: "Repository", site: "github.com" },
  },
];
