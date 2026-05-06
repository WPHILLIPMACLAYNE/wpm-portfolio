"use client";

interface PageTransitionProps {
  children: React.ReactNode;
  /** Unique key for the page — usually the pathname */
  pageKey?: string;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return <div>{children}</div>;
}
