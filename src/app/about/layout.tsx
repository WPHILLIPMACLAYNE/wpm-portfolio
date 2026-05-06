import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional profile of Wallace Phillip Maclayne — Commercial Manager, Marketing Technologist, and systems builder combining business, people, and technology from Brazil.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About | ${SITE_TITLE}`,
    description:
      "Professional profile of Wallace Phillip Maclayne — Commercial Manager, Marketing Technologist, and systems builder combining business, people, and technology from Brazil.",
    url: absoluteUrl("/about"),
    type: "profile",
  },
  twitter: {
    title: `About | ${SITE_TITLE}`,
    description:
      "Professional profile of Wallace Phillip Maclayne — Commercial Manager, Marketing Technologist, and systems builder combining business, people, and technology from Brazil.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
