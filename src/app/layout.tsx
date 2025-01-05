import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header"
import Favicon from "@/components/favicon"
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DiceBench | Post-Human Level Benchmark",
  description: "A post-human level benchmark for testing superintelligent AI systems through dice prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <Favicon />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased overflow-x-hidden`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden pt-16">
          <SiteHeader />
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
