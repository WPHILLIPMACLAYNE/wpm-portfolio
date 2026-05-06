import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Career Save",
  description:
    "Career timeline of Wallace Phillip Maclayne — commercial operations, trade marketing, customer experience, education, and professional certifications.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: `Career Save | ${SITE_TITLE}`,
    description:
      "Career timeline of Wallace Phillip Maclayne — commercial operations, trade marketing, customer experience, education, and professional certifications.",
    url: absoluteUrl("/resume"),
    type: "website",
  },
  twitter: {
    title: `Career Save | ${SITE_TITLE}`,
    description:
      "Career timeline of Wallace Phillip Maclayne — commercial operations, trade marketing, customer experience, education, and professional certifications.",
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
