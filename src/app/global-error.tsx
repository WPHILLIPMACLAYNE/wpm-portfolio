"use client";

import "./globals.css";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset?: () => void;
  unstable_retry?: () => void;
}

export default function GlobalError({
  error,
  reset,
  unstable_retry,
}: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const retry = unstable_retry ?? reset;

  return (
    <html lang="en">
      <body className="min-h-screen bg-wpm-black text-wpm-white">
        <title>Runtime fault | WPM.OS</title>
        <main className="min-h-screen px-6 py-20">
          <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">
              Global runtime fault
            </p>
            <h1 className="mt-5 text-4xl font-light tracking-wide text-wpm-white/90 md:text-6xl">
              WPM.OS could not boot this view
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-wpm-gray/90">
              A root-level rendering error occurred. Retry the render or reload
              from the browser if the fault persists.
            </p>
            {error.digest && (
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-gray/90">
                Digest: {error.digest}
              </p>
            )}
            {retry && (
              <button
                type="button"
                onClick={() => retry()}
                className="mt-8 inline-flex min-h-12 w-fit items-center justify-center border border-wpm-cyan/55 bg-wpm-cyan/10 px-5 font-mono text-xs uppercase tracking-[0.16em] text-wpm-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
              >
                Retry
              </button>
            )}
          </section>
        </main>
      </body>
    </html>
  );
}
