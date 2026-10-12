import type { Metadata } from "next";

import "../globals.css";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { SidebarProvider } from "@/context/sidebar-context";
import { ThemeProvider } from "@/components/theme-provider";
import { geistSans, geistMono, newsreader } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Context Library | Dashboard",
  description: "Context Library application dashboard",
};

export default function MainRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] h-screen w-full overflow-hidden">
              {/* sidebar */}
              <Sidebar />

              {/* right column */}
              <div className="flex flex-col h-full min-h-0 min-w-0 overflow-hidden">
                <Navbar />
                <main className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-muted">
                  <div className="mx-auto w-full max-w-6xl px-6">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
