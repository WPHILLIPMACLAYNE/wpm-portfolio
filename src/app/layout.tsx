import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WPM.OS — Wallace Phillip Maclayne | Interactive Portfolio",
  description:
    "Creative Developer / Designer / Builder of Digital Experiences. Interactive portfolio system blending creative coding, UX, and motion design.",
  keywords: ["portfolio", "creative developer", "front-end", "UX", "motion design", "WebGL", "React", "Next.js"],
  openGraph: {
    title: "WPM.OS — Wallace Phillip Maclayne",
    description: "Interactive Portfolio System",
    siteName: "WPM.OS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-wpm-black text-wpm-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]
                     font-mono text-xs text-wpm-cyan bg-wpm-black border border-wpm-purple/30 px-4 py-2 rounded-sm
                     focus:outline-none focus:ring-2 focus:ring-wpm-purple/50 focus:ring-offset-2 focus:ring-offset-wpm-black"
        >
          Skip to content
        </a>
        {children}
        <Cursor />
      </body>
    </html>
  );
}
