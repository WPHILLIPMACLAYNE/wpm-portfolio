"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset?: () => void;
  unstable_retry?: () => void;
}

export default function ErrorPage({
  error,
  reset,
  unstable_retry,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = unstable_retry ?? reset;

  return (
    <main className="min-h-screen bg-wpm-black px-6 py-20 text-wpm-white">
      <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">
          Runtime fault
        </p>
        <h1 className="mt-5 text-4xl font-light tracking-wide text-wpm-white/90 md:text-6xl">
          Something broke in this panel
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-wpm-gray">
          The route failed to render. Try recovering the current view or return
          to the console map.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-gray">
            Digest: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {retry && (
            <button
              type="button"
              onClick={() => retry()}
              className="inline-flex min-h-12 items-center justify-center border border-wpm-cyan/55 bg-wpm-cyan/10 px-5 font-mono text-xs uppercase tracking-[0.16em] text-wpm-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
            >
              Retry
            </button>
          )}
          <Link
            href="/console"
            className="inline-flex min-h-12 items-center justify-center border border-white/[0.10] bg-white/[0.025] px-5 font-mono text-xs uppercase tracking-[0.16em] text-wpm-lavender/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/60"
          >
            Back to console
          </Link>
        </div>
      </section>
    </main>
  );
}
