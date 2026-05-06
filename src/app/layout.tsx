import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientCursor from "@/components/ui/ClientCursor";
import { profile } from "@/data/profile";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_TITLE,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  applicationName: "WPM.OS",
  title: {
    default: `${SITE_TITLE} | Interactive Portfolio`,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "WPM.OS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl("/project-livro-cover-og.jpg"),
        width: 1200,
        height: 630,
        alt: "WPM.OS portfolio featured work preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/project-livro-cover-og.jpg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: SITE_URL,
    jobTitle: profile.class,
    description: SITE_DESCRIPTION,
    sameAs: [profile.social.github, profile.social.linkedin].filter(Boolean),
    knowsAbout: profile.skills,
    mainEntityOfPage: absoluteUrl("/"),
  };

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
        <script type="application/ld+json">
          {JSON.stringify(personSchema).replace(/</g, "\\u003c")}
        </script>
        {children}
        <ClientCursor />
      </body>
    </html>
  );
}
