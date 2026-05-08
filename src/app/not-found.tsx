import type { Metadata } from "next";
import Link from "next/link";
import { SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Signal not found | ${SITE_TITLE}`,
  description: "The requested WPM.OS route does not exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-wpm-black px-6 py-20 text-wpm-white">
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">
          404 / Missing Signal
        </p>
        <h1 className="mt-5 text-4xl font-light tracking-wide text-wpm-white/90 md:text-6xl">
          Route not found
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-wpm-gray">
          This path is outside the current WPM.OS map. Return to the console or
          inspect the published work library.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/console"
            className="inline-flex min-h-12 items-center justify-center border border-wpm-cyan/55 bg-wpm-cyan/10 px-5 font-mono text-xs uppercase tracking-[0.16em] text-wpm-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
          >
            Back to console
          </Link>
          <Link
            href="/projects"
            className="inline-flex min-h-12 items-center justify-center border border-white/[0.10] bg-white/[0.025] px-5 font-mono text-xs uppercase tracking-[0.16em] text-wpm-lavender/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/60"
          >
            Project library
          </Link>
        </div>
      </section>
    </main>
  );
}
