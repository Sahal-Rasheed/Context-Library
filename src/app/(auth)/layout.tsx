import type { Metadata } from "next";

import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { geistSans, geistMono, newsreader } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Context Library | Auth",
  description: "Context Library application authentication",
};

export default function AuthRootLayout({
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
