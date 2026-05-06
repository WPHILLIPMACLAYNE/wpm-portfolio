"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MenuItem } from "@/data/profile";
import { projects } from "@/data/projects";
import { statusMeta, typeColors } from "./MenuModule";

interface ModulePreviewProps {
  item: MenuItem;
  isActive: boolean;
}

function ProjectPips() {
  const prefersReduced = useReducedMotion();
  const featured = projects.filter((p) => p.featured && !p.locked).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <div className="flex gap-3 flex-wrap">
      {featured.map((p, i) => (
        <motion.div
          key={p.slug}
          className="flex items-center gap-2 px-3 py-2 rounded-sm border border-white/[0.06] bg-wpm-card/60"
          initial={prefersReduced ? {} : { opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: 0.1 + i * 0.08 }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: p.accentColor, boxShadow: `0 0 6px ${p.accentColor}60` }}
          />
          <span className="font-sans text-sm text-wpm-white/70">{p.title}</span>
          <span className="font-mono text-[10px] text-wpm-gray/50">{p.year}</span>
        </motion.div>
      ))}
    </div>
  );
}

export default function ModulePreview({ item, isActive }: ModulePreviewProps) {
  const prefersReduced = useReducedMotion();
  const typeColor = typeColors[item.type] ?? "#7E8797";
  const sMeta = statusMeta[item.status];

  return (
    <motion.div
      key={item.id}
      className="flex flex-col justify-center gap-5 p-5 md:p-6"
      initial={prefersReduced ? {} : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReduced ? 0 : 0.22 }}
    >
      {/* Type badge */}
      <div className="flex items-center gap-3">
        <span
          className="font-mono text-[11px] tracking-[0.15em] uppercase"
          style={{ color: `${typeColor}99` }}
        >
          {item.type}
        </span>
        <span
          className="font-mono text-[10px] tracking-wider flex items-center gap-1.5"
          style={{ color: `${sMeta.color}99` }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: sMeta.color,
              boxShadow: isActive ? `0 0 6px ${sMeta.color}` : "none",
            }}
          />
          {sMeta.label}
        </span>
      </div>

      {/* Title */}
      <div>
        <h2
          className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-wpm-white/90"
          style={{
            textShadow: `0 0 40px ${typeColor}30, 0 0 80px ${typeColor}15`,
          }}
        >
          {item.label}
        </h2>
      </div>

      {/* Description */}
      <p className="font-sans text-sm md:text-base text-wpm-gray/60 leading-relaxed max-w-md">
        {item.description}
      </p>

      {/* Project pips (only for Project Library) */}
      {item.id === "projects" && <ProjectPips />}

      {/* CTA */}
      <div className="pt-2">
        <motion.div
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em]"
          style={{ color: `${typeColor}99` }}
          animate={
            prefersReduced
              ? { opacity: 1 }
              : isActive
                ? { opacity: [0.5, 1, 0.5] }
                : { opacity: 0.5 }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span>▶</span>
          <span>
            {item.id === "projects" ? "BROWSE PROJECTS" : "ENTER TO OPEN"}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
