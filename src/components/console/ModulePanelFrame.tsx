"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface ModulePanelFrameProps {
  moduleLabel: string;
  moduleId: string;
  pageHref: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModulePanelFrame({
  moduleLabel,
  moduleId,
  pageHref,
  onClose,
  children,
}: ModulePanelFrameProps) {
  return (
    <>
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between border-b border-white/[0.06] px-5 py-4 md:px-8">
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-cyan/70">
            WPM.OS / {moduleId}
          </p>
          <h2 className="mt-1 max-w-full truncate font-sans text-lg font-semibold tracking-tight text-wpm-white sm:text-xl">
            {moduleLabel}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={pageHref}
            className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-gray/90 transition-colors hover:text-wpm-cyan/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/50 sm:inline"
          >
            Open full page
          </Link>
          <button
            onClick={onClose}
            className="group flex h-10 w-10 items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.03] transition-all hover:border-wpm-purple/30 hover:bg-wpm-purple/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
            aria-label="Close panel"
          >
            <span className="font-mono text-sm text-wpm-gray/90 transition-colors group-hover:text-wpm-white">
              X
            </span>
          </button>
        </div>
      </header>

      {/* Progress rail */}
      <div className="h-px w-full bg-white/[0.04]">
        <motion.div
          className="h-full bg-gradient-to-r from-wpm-cyan via-wpm-purple to-wpm-cyan"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity }}
        />
      </div>

      {/* Scan lines decoration */}
      <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(116,247,255,0.015)_2px,rgba(116,247,255,0.015)_4px)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-5 py-6 md:px-8 md:py-8 pb-20">
        {children}
      </div>
    </>
  );
}
