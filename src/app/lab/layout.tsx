import type { Metadata } from "next";
import { SITE_TITLE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Experimental Lab",
  description:
    "Experimental lab by Wallace Phillip Maclayne — prototype catalog, interface studies, and creative coding explorations inside the WPM.OS portfolio.",
  alternates: {
    canonical: "/lab",
  },
  openGraph: {
    title: `Experimental Lab | ${SITE_TITLE}`,
    description:
      "Experimental lab by Wallace Phillip Maclayne — prototype catalog, interface studies, and creative coding explorations inside the WPM.OS portfolio.",
    url: absoluteUrl("/lab"),
    type: "website",
  },
  twitter: {
    title: `Experimental Lab | ${SITE_TITLE}`,
    description:
      "Experimental lab by Wallace Phillip Maclayne — prototype catalog, interface studies, and creative coding explorations inside the WPM.OS portfolio.",
  },
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
