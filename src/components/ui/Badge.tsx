"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type BadgeVariant = "system" | "action" | "info" | "status";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  system: "text-wpm-purple/70 border-wpm-purple/20 bg-wpm-purple/5",
  action: "text-wpm-cyan/70 border-wpm-cyan/20 bg-wpm-cyan/5",
  info: "text-wpm-gray/50 border-white/[0.06] bg-white/[0.02]",
  status: "text-wpm-gray/40 border-transparent bg-transparent",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[10px]",
};

export default function Badge({
  variant = "info",
  size = "sm",
  dot = false,
  dotColor,
  children,
}: BadgeProps) {
  return (
    <motion.span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono uppercase tracking-wider border rounded-sm max-w-full overflow-hidden break-words",
        variantClasses[variant],
        sizeClasses[size]
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {dot && (
        <span
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            dotColor || (variant === "action" ? "bg-wpm-cyan/60" : variant === "system" ? "bg-wpm-purple/60" : "bg-wpm-gray/40")
          )}
        />
      )}
      {children}
    </motion.span>
  );
}
