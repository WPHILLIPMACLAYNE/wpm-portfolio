import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project Library",
  description:
    "Real projects and case studies by Wallace Phillip Maclayne — operational systems, editorial products, and documented results built from real-world constraints.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Project Library | ${SITE_TITLE}`,
    description:
      "Real projects and case studies by Wallace Phillip Maclayne — operational systems, editorial products, and documented results built from real-world constraints.",
    url: absoluteUrl("/projects"),
    type: "website",
  },
  twitter: {
    title: `Project Library | ${SITE_TITLE}`,
    description:
      "Real projects and case studies by Wallace Phillip Maclayne — operational systems, editorial products, and documented results built from real-world constraints.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
