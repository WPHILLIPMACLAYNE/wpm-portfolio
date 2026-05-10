import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Side Quests",
  description:
    "Side quests of Wallace Phillip Maclayne — music, games, cinema, digital art, photography, and creative writing as personal influences.",
  alternates: {
    canonical: "/hobbies",
  },
  openGraph: {
    title: `Side Quests | ${SITE_TITLE}`,
    description:
      "Side quests of Wallace Phillip Maclayne — music, games, cinema, digital art, photography, and creative writing as personal influences.",
    url: absoluteUrl("/hobbies"),
    type: "website",
  },
  twitter: {
    title: `Side Quests | ${SITE_TITLE}`,
    description:
      "Side quests of Wallace Phillip Maclayne — music, games, cinema, digital art, photography, and creative writing as personal influences.",
  },
};

export default function HobbiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
