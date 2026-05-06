"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/data/profile";

/* ── metadata ────────────────────────────────────────────── */

export const statusMeta: Record<MenuItem["status"], { color: string; label: string }> = {
  Active:        { color: "#74F7FF", label: "ACTIVE" },
  Locked:        { color: "#6C4DFF", label: "LOCKED" },
  "Coming Soon": { color: "#7E8797", label: "SOON" },
};

export const typeColors: Record<string, string> = {
  Library:    "#6C4DFF",
  Profile:    "#6C4DFF",
  Tree:       "#74F7FF",
  "Save Slot":"#74F7FF",
  Prototype:  "#6C4DFF",
  Quest:      "#7E8797",
  Signal:     "#74F7FF",
  Config:     "#7E8797",
  Encrypted:  "#6C4DFF",
};

/* ── component ────────────────────────────────────────────── */

interface MenuModuleProps {
  item: MenuItem;
  index: number;
  isFocused: boolean;
  isHovered: boolean;
  onMouseMove: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>, idx: number) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onFocus: () => void;
  onSelect?: () => void;
  ref: (el: HTMLAnchorElement | null) => void;
}

export default function MenuModule({
  item,
  index,
  isFocused,
  isHovered,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onSelect,
  ref,
}: MenuModuleProps) {
  const isActive = item.status === "Active";
  const sMeta = statusMeta[item.status];
  const typeColor = typeColors[item.type] ?? "#7E8797";

  return (
    <motion.a
      ref={ref}
      href={isActive ? item.href : undefined}
      onClick={(e) => {
        if (!isActive) e.preventDefault();
        else onSelect?.();
      }}
      role="gridcell"
      aria-label={`${item.label} — ${item.type} — ${sMeta.label}`}
      aria-disabled={!isActive}
      tabIndex={isFocused ? 0 : -1}
      className="group relative block p-5 rounded-sm cursor-pointer select-none
                 focus:outline-none"
      style={{
        transform: isHovered
          ? "perspective(600px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))"
          : "perspective(600px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.15s ease-out",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
      onMouseMove={onMouseMove}
      onMouseEnter={(e) => onMouseEnter(e, index)}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
    >
      {/* Card background */}
      <div
        className="absolute inset-0 rounded-sm transition-colors duration-300"
        style={{
          background:
            isFocused || isHovered
              ? `linear-gradient(135deg, ${typeColor}10 0%, transparent 60%)`
              : "#0D1020",
          border: isFocused
            ? `1px solid ${typeColor}50`
            : isHovered
            ? `1px solid ${typeColor}25`
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: isFocused
            ? `0 0 30px ${typeColor}15, inset 0 0 30px ${typeColor}05`
            : "none",
        }}
      />

      {/* Focus ring */}
      {isFocused && (
        <motion.div
          className="absolute -inset-[2px] rounded-sm pointer-events-none"
          layoutId="focus-ring"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          style={{ boxShadow: `0 0 0 2px ${typeColor}40` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span
            className="font-mono text-[10px] uppercase tracking-widest"
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

        <h3 className="font-sans text-lg font-medium tracking-wide text-wpm-white/80 group-hover:text-wpm-white transition-colors">
          {item.label}
        </h3>

        <p className="text-xs text-wpm-gray/50 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.03]">
          <span className="font-mono text-[10px] text-wpm-gray/30">
            {isActive ? "PRESS ENTER" : "LOCKED"}
          </span>
          {isActive && (
            <motion.span
              className="font-mono text-[10px] text-wpm-purple/40"
              animate={{ opacity: isFocused ? [0.4, 1, 0.4] : 0.4 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              »
            </motion.span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
