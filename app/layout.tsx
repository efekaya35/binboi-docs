/**
 * Root layout that establishes global typography, metadata, and the dark product theme.
 * Satoshi (Sans) ve Space Mono (Mono) entegrasyonu.
 */
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";


// 1. Satoshi Font Yapılandırması
// Not: Font dosyalarının app/fonts/ klasöründe olduğunu varsayıyoruz.
const satoshi = localFont({
  src: [
    {
      path: "./fonts/WEB/fonts/Satoshi-Light.woff2", // Klasör yapısına göre tam yol
      weight: "300",
      style: "normal",
    },
    // Not: Ekran görüntüsünde Regular görünmüyor, 
    // ama varsa alt satırı ekle, yoksa Light'ı 400 olarak da tanımlayabilirsin.
    {
      path: "./fonts/WEB/fonts/Satoshi-Light.woff2", 
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/WEB/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/WEB/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

// 2. Space Mono Font Yapılandırması
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = (
  {
    
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full dark", // Dark mode'u zorunlu kılıyoruz
        satoshi.variable,
        spaceMono.variable
      )}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-full font-sans antialiased bg-[#000000] text-white",
          "selection:text-white selection:bg-red-700"
        )}
      >
        {children}
      </body>
    </html>
  );
}