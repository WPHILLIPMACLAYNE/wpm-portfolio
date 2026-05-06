"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-wpm-purple/30 bg-wpm-purple/10 text-wpm-cyan hover:border-wpm-purple/60 hover:bg-wpm-purple/20 hover:text-glow-cyan",
  ghost:
    "border border-transparent text-wpm-gray/90 hover:text-wpm-cyan hover:border-white/[0.12]",
  icon:
    "border border-transparent text-wpm-gray/90 hover:text-wpm-lavender hover:bg-wpm-purple/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[11px]",
  md: "px-5 py-2.5 text-xs",
  lg: "px-8 py-3.5 text-sm tracking-[0.16em]",
};

export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className,
  children,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "font-mono rounded-sm transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2 focus-visible:ring-offset-wpm-black",
    disabled ? "opacity-40 pointer-events-none cursor-default" : "cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.03 },
    whileTap: disabled ? undefined : { scale: 0.97 },
  };

  if (as === "a") {
    return (
      <motion.a
        className={classes}
        href={disabled ? undefined : href}
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : props.tabIndex}
        {...motionProps}
        {...(props as HTMLMotionProps<"a">)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}
