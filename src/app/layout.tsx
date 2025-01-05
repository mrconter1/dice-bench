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
  keywords: ["AI benchmark", "superintelligent AI", "dice prediction", "AI testing", "post-human level AI"],
  authors: [{ name: "DiceBench Team" }],
  openGraph: {
    title: "DiceBench | Post-Human Level Benchmark",
    description: "A post-human level benchmark for testing superintelligent AI systems through dice prediction",
    type: "website",
    locale: "en_US",
    siteName: "DiceBench",
    images: [
      {
        url: "/og-image.png", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "DiceBench - Post-Human Level Benchmark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiceBench | Post-Human Level Benchmark",
    description: "A post-human level benchmark for testing superintelligent AI systems through dice prediction",
    images: ["/og-image.png"], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // You'll need to add this from Google Search Console
  },
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
