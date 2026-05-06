"use client";

import { motion, useReducedMotion } from "motion/react";
import type { MenuItem } from "@/data/profile";
import { statusMeta, typeColors } from "./MenuModule";

interface ModuleRailProps {
  items: MenuItem[];
  focusedIdx: number;
  onSelect: (index: number) => void;
  onFocus: (index: number) => void;
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

export default function ModuleRail({
  items,
  focusedIdx,
  onSelect,
  onFocus,
  itemRefs,
}: ModuleRailProps) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="flex flex-col gap-1 px-4 py-10" role="listbox" aria-label="Module selection">
      {/* Active modules */}
      {items
        .filter((m) => m.status === "Active")
        .map((item, idx) => {
          const realIdx = items.indexOf(item);
          const isFocused = focusedIdx === realIdx;
          const typeColor = typeColors[item.type] ?? "#7E8797";

          return (
            <motion.button
              key={item.id}
              ref={(el) => {
                itemRefs.current[realIdx] = el;
              }}
              role="option"
              aria-selected={isFocused}
              tabIndex={isFocused ? 0 : -1}
              onClick={() => onSelect(realIdx)}
              onFocus={() => onFocus(realIdx)}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-sm text-left
                         focus:outline-none cursor-pointer min-h-[48px]
                         transition-colors duration-200"
              style={{
                backgroundColor: isFocused ? `${typeColor}0D` : "transparent",
              }}
              initial={prefersReduced ? {} : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {/* Left glow bar */}
              <motion.div
                className="w-[3px] h-6 rounded-full flex-shrink-0"
                animate={{
                  backgroundColor: isFocused ? `${typeColor}80` : `${typeColor}30`,
                  boxShadow: isFocused ? `0 0 8px ${typeColor}40` : "none",
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p
                  className="font-sans text-sm tracking-wide truncate transition-colors duration-200"
                  style={{
                    color: isFocused ? "#EAF2FF" : "#7E8797",
                  }}
                >
                  {item.label}
                </p>
                <p className="font-mono text-[10px] text-wpm-gray/50 truncate mt-0.5">
                  {item.type}
                </p>
              </div>

              {/* Focus indicator */}
              {isFocused && (
                <motion.span
                  className="font-mono text-xs flex-shrink-0"
                  style={{ color: `${typeColor}80` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  ▶
                </motion.span>
              )}
            </motion.button>
          );
        })}

      {/* Divider */}
      <div className="h-px bg-white/[0.03] my-3 mx-3" />

      {/* Locked / Coming Soon */}
      {items
        .filter((m) => m.status !== "Active")
        .map((item) => {
          const realIdx = items.indexOf(item);
          const isFocused = focusedIdx === realIdx;
          const sMeta = statusMeta[item.status];

          return (
            <motion.button
              key={item.id}
              ref={(el) => {
                itemRefs.current[realIdx] = el as HTMLElement | null;
              }}
              role="option"
              aria-disabled="true"
              aria-selected={isFocused}
              tabIndex={isFocused ? 0 : -1}
              onClick={(e) => e.preventDefault()}
              onFocus={() => onFocus(realIdx)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-sm text-left
                         focus:outline-none min-h-[48px] opacity-30 cursor-default"
            >
              <div className="w-[3px] h-6 rounded-full flex-shrink-0 bg-wpm-gray/30" />

              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm tracking-wide truncate text-wpm-gray/50">
                  {item.label}
                </p>
                <p className="font-mono text-[10px] text-wpm-gray/40 truncate mt-0.5">
                  {sMeta.label}
                </p>
              </div>

              <span className="font-mono text-[10px] text-wpm-gray/40 flex-shrink-0">
                🔒
              </span>
            </motion.button>
          );
        })}
    </div>
  );
}
