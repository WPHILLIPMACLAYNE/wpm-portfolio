import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skill Tree",
  description:
    "Skill tree of Wallace Phillip Maclayne — operations, trade marketing, product, UX, web systems, and AI competencies grouped by real project domains.",
  alternates: {
    canonical: "/skills",
  },
  openGraph: {
    title: `Skill Tree | ${SITE_TITLE}`,
    description:
      "Skill tree of Wallace Phillip Maclayne — operations, trade marketing, product, UX, web systems, and AI competencies grouped by real project domains.",
    url: absoluteUrl("/skills"),
    type: "website",
  },
  twitter: {
    title: `Skill Tree | ${SITE_TITLE}`,
    description:
      "Skill tree of Wallace Phillip Maclayne — operations, trade marketing, product, UX, web systems, and AI competencies grouped by real project domains.",
  },
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
