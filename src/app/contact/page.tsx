"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import Link from "next/link";
import { profile } from "@/data/profile";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

function isValidContactHref(href: string, label: string): boolean {
  if (label === "GitHub") return href.length > 0 && href.startsWith("http");
  if (label === "Email") return href.length > 0 && href !== "mailto:";
  return href.length > 0;
}

const contactMethods: { label: string; href: string; icon: IconName }[] = ([
  { label: "GitHub", href: profile.social.github, icon: "github" },
  { label: "LinkedIn", href: profile.social.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.social.email}`, icon: "email" },
] as { label: string; href: string; icon: IconName }[]).filter((m) => isValidContactHref(m.href, m.label));

export default function ContactPage() {
  return (
    <ConsoleShell>
      <div className="px-6 py-12 max-w-3xl mx-auto">
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
            Send Signal
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-8">
            Contact
          </h1>

          {contactMethods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {contactMethods.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 p-6 bg-wpm-card border border-white/[0.04]
                         rounded-sm hover:border-wpm-purple/30 transition-all duration-300 text-center
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  aria-label={`Contact via ${item.label}`}
                >
                  <span className="text-wpm-lavender/90 group-hover:text-wpm-lavender transition-colors">
                    <Icon name={item.icon} size="lg" />
                  </span>
                  <span className="font-mono text-sm text-wpm-gray/90 group-hover:text-wpm-cyan/90 transition-colors">
                    {item.label}
                  </span>
                </motion.a>
              ))}
            </div>
          ) : (
            <p className="font-mono text-sm text-wpm-gray/90 py-6">
              No public contact methods available
            </p>
          )}
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
