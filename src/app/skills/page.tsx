"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import Link from "next/link";
import { profile } from "@/data/profile";
import Badge from "@/components/ui/Badge";

export default function SkillsPage() {
  return (
    <ConsoleShell>
      <div className="px-4 md:px-6 py-12 max-w-3xl mx-auto pb-20">
        <Link
          href="/console"
          className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray/90 hover:text-wpm-cyan transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
        >
          <span className="text-wpm-lavender/90">&lt;-</span> BACK TO CONSOLE
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90 mb-3">
            Skill Tree
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-2">
            Skill Tree
          </h1>
          <p className="font-mono text-sm text-wpm-gray/90 mb-10 max-w-md break-words">
            Competences grouped by domain — each card represents a working
            cluster of skills acquired through real projects and professional
            experience.
          </p>

          {profile.skillGroups ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.skillGroups.map((group, gi) => (
                <motion.div
                  key={group.name}
                  className="p-5 bg-wpm-card border border-white/[0.04] rounded-sm min-w-0 max-w-full overflow-hidden"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + gi * 0.1 }}
                >
                  <p className="font-mono text-xs text-wpm-lavender/90 mb-4 uppercase tracking-wider">
                    {">"} {group.name}
                  </p>
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {group.skills.map((s) => (
                      <Badge key={s} variant="system" size="sm">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  className="flex items-center gap-4 p-4 bg-wpm-card border border-white/[0.04] rounded-sm hover:border-wpm-purple/20 transition-colors min-w-0"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="font-mono text-xs text-wpm-lavender/90 flex-shrink-0">{">_"}</span>
                  <span className="text-wpm-white/70 break-words">{skill}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
