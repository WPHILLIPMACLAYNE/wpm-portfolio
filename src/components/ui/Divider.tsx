"use client";

import { cn } from "@/lib/utils";

interface DividerProps {
  label?: string;
  className?: string;
  variant?: "subtle" | "accent";
}

export default function Divider({ label, className, variant = "subtle" }: DividerProps) {
  const lineClass =
    variant === "accent"
      ? "bg-wpm-purple/30"
      : "bg-white/[0.04]";

  return (
    <div className={cn("flex items-center gap-3 w-full", className)}>
      <div className={cn("flex-1 h-[1px]", lineClass)} />
      {label && (
        <span className="font-mono text-[11px] text-wpm-gray uppercase tracking-wider whitespace-nowrap">
          {label}
        </span>
      )}
      <div className={cn("flex-1 h-[1px]", lineClass)} />
    </div>
  );
}
