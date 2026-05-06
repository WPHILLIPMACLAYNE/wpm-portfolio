"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-wpm-purple/30 bg-wpm-purple/10 text-wpm-cyan hover:border-wpm-purple/60 hover:bg-wpm-purple/20 hover:text-glow-cyan",
  ghost:
    "border border-transparent text-wpm-gray/60 hover:text-wpm-cyan hover:border-white/[0.06]",
  icon:
    "border border-transparent text-wpm-gray/40 hover:text-wpm-purple hover:bg-wpm-purple/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px]",
  md: "px-5 py-2.5 text-xs",
  lg: "px-8 py-3.5 text-sm tracking-[0.3em]",
};

export default function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      className={cn(
        "font-mono rounded-sm cursor-pointer transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black",
        disabled && "opacity-40 pointer-events-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
