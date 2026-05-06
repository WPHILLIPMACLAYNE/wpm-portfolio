import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Wallace Phillip Maclayne via public channels — GitHub and LinkedIn. Open for collaboration and professional inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `Contact | ${SITE_TITLE}`,
    description:
      "Contact Wallace Phillip Maclayne via public channels — GitHub and LinkedIn. Open for collaboration and professional inquiries.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    title: `Contact | ${SITE_TITLE}`,
    description:
      "Contact Wallace Phillip Maclayne via public channels — GitHub and LinkedIn. Open for collaboration and professional inquiries.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
