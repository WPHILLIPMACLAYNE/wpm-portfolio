"use client";

import { motion } from "motion/react";
import type { MenuItem } from "@/data/profile";

/* ── metadata ────────────────────────────────────────────── */

export const statusMeta: Record<MenuItem["status"], { color: string; label: string }> = {
  Active:        { color: "#74F7FF", label: "ATIVO" },
  Locked:        { color: "#6C4DFF", label: "BLOQUEADO" },
  "Coming Soon": { color: "#8B95A5", label: "EM BREVE" },
};

export const typeColors: Record<string, string> = {
  Biblioteca:      "#6C4DFF",
  Perfil:          "#6C4DFF",
  Arvore:          "#74F7FF",
  "Slot de Save":  "#74F7FF",
  Prototipo:       "#6C4DFF",
  Missao:          "#8B95A5",
  Sinal:           "#74F7FF",
  Configuracao:    "#8B95A5",
  Criptografado:   "#6C4DFF",
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
  const typeColor = typeColors[item.type] ?? "#8B95A5";
  const statusDescriptionId = `module-status-${item.id}`;

  return (
    <motion.a
      ref={ref}
      href={isActive ? item.href : undefined}
      onClick={(e) => {
        if (!isActive) e.preventDefault();
        else onSelect?.();
      }}
      role="link"
      aria-label={`${item.label} — ${item.type} — ${sMeta.label}`}
      aria-disabled={!isActive}
      aria-describedby={!isActive ? statusDescriptionId : undefined}
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
      transition={{ duration: 0.35, delay: index * 0.03, ease: "easeOut" }}
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
            className="font-mono text-[11px] uppercase tracking-[0.12em]"
            style={{ color: `${typeColor}99` }}
          >
            {item.type}
          </span>
          <span
            className="font-mono text-[11px] tracking-[0.12em] flex items-center gap-1.5"
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

        <p className="text-xs text-wpm-gray leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.03]">
          <span className="font-mono text-[11px] text-wpm-gray">
            {isActive ? "PRESSIONE ENTER" : "BLOQUEADO"}
          </span>
          {!isActive && (
            <span id={statusDescriptionId} className="sr-only">
              Este modulo ainda nao esta disponivel no portfolio publico.
            </span>
          )}
          {isActive && (
            <motion.span
              className="font-mono text-[11px] text-wpm-lavender/90"
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
