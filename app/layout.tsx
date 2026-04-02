/**
 * Root layout that establishes global typography, metadata, and the dark product theme.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full ",
        geistSans.variable,
        geistMono.variable,
        jetbrainsMono.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
