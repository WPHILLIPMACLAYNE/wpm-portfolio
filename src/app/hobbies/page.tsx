"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import Link from "next/link";
import { profile } from "@/data/profile";

export default function HobbiesPage() {
  return (
    <ConsoleShell>
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <Link
          href="/console"
          className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray hover:text-wpm-cyan transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
        >
          <span className="text-wpm-lavender/90">{">"}</span> BACK TO CONSOLE
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90 mb-3">
            Side Quests
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-8">
            Side Quests
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {profile.hobbies.map((hobby, i) => (
              <motion.div
                key={hobby}
                className="flex flex-col items-center gap-3 p-6 bg-wpm-card border border-white/[0.04] rounded-sm hover:border-wpm-purple/20 transition-colors"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
              >
                <span className="font-mono text-2xl text-wpm-cyan/65">\u25C6</span>
                <span className="text-sm text-wpm-gray text-center">{hobby}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
