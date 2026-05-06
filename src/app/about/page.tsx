"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import { profile } from "@/data/profile";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";

export default function AboutPage() {
  return (
    <ConsoleShell>
      <div className="px-6 py-12 pb-20 max-w-3xl mx-auto">
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
            Character Profile
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-2">
            About {profile.name}
          </h1>
          <p className="font-mono text-sm text-wpm-cyan/80 mb-8 break-words">{profile.tagline}</p>

          {/* Bio */}
          <div className="space-y-4 mb-10">
            {profile.bio.map((p, i) => (
              <motion.p
                key={i}
                    className="text-wpm-gray/90 leading-relaxed break-words"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                {p}
              </motion.p>
            ))}
          </div>

          <Divider variant="accent" className="mb-10" />

          {/* Character stats — skill groups */}
          {profile.skillGroups && (
            <div className="space-y-6 mb-10">
                <p className="font-mono text-[11px] text-wpm-lavender/90 mb-1 uppercase tracking-wider">
                Character Stats
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.skillGroups.map((group, gi) => (
                  <motion.div
                    key={group.name}
                    className="p-5 bg-wpm-card border border-white/[0.04] rounded-sm min-w-0 max-w-full overflow-hidden"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + gi * 0.08 }}
                  >
                    <p className="font-mono text-[11px] text-wpm-lavender/90 mb-3 uppercase tracking-wider">
                      {group.name}
                    </p>
                    <div className="flex flex-wrap gap-2 min-w-0 overflow-hidden">
                      {group.skills.map((s) => (
                        <Badge key={s} variant="system" size="sm">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          <motion.div
            className="p-5 bg-wpm-card border border-white/[0.04] rounded-sm mb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
              <p className="font-mono text-[11px] text-wpm-lavender/90 mb-3 uppercase tracking-wider">
              Hobbies
            </p>
            <div className="flex flex-wrap gap-2 min-w-0 overflow-hidden">
              {profile.hobbies.map((h) => (
                <Badge key={h} variant="info" size="sm">
                  {h}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex gap-3 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {profile.social.github && profile.social.github.startsWith("http") && (
              <Button as="a" href={profile.social.github} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
                [ GITHUB ]
              </Button>
            )}
            {profile.social.linkedin && (
              <Button as="a" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
                [ LINKEDIN ]
              </Button>
            )}
            {profile.social.email && (
              <Button as="a" href={`mailto:${profile.social.email}`} variant="ghost" size="sm">
                [ EMAIL ]
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
