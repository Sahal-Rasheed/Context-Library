import type { Metadata } from "next";
import { redirect, RedirectType } from "next/navigation";

import "../globals.css";
import { getCurrentSession } from "@/actions/auth";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/context/sidebar-context";
import { getFolders } from "@/dal/folders";
import { getSidebarCounts } from "@/dal/items";
import { getTags } from "@/dal/tags";
import { geistSans, geistMono, newsreader } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Context Library | Dashboard",
  description: "Context Library application dashboard",
};

export default async function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  if (!session || new Date(session.session.expiresAt) < new Date()) {
    redirect("/signin", RedirectType.replace);
  }

  // fetch once on the server and pass down to the client sidebar component (as both sidebar & folder component are client components),
  // if we use server actions in the client components, we have manage state and all.
  // mutations revalidate the layout, so these stay fresh without client fetching.
  const [counts, folders, tags] = await Promise.all([
    getSidebarCounts(session.user.id),
    getFolders(session.user.id),
    getTags(session.user.id),
  ]);

  const sidebarFolders = folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    count: folder._count.items,
  }));

  const sidebarTags = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
    count: tag._count.items,
  }));

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full overflow-hidden bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-[auto_1fr]">
              {/* sidebar */}
              <Sidebar counts={counts} folders={sidebarFolders} tags={sidebarTags} />

              {/* right column */}
              <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
                <Navbar />
                <main className="min-h-0 flex-1 scrollbar-thin scrollbar-thumb-muted overflow-y-auto">
                  <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
