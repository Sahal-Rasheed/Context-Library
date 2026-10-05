import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

import SideBar from "@/components/sidebar/sidebar";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/context/sidebar-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Context Library",
  description: "Context Library application",
};

export default function RootLayout({
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
              <SideBar />

              {/* right column */}
              <div className="flex flex-col h-full min-h-0 min-w-0 overflow-hidden">
                <NavBar />
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
