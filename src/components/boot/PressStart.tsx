"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { profile } from "@/data/profile";

interface PressStartProps {
  onStart: () => void;
  /** Skip the CRT turn-on effect when a transition already handles it */
  skipCrt?: boolean;
}

export default function PressStart({ onStart }: PressStartProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onStart]);

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,77,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,77,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="flex flex-col items-center gap-8 z-10">
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90">
          WPM.OS v1.0
        </p>

        <h1 className="w-full max-w-[min(34rem,calc(100vw-2rem))] px-4 text-center text-[clamp(2rem,8vw,3rem)] md:text-5xl font-light leading-tight text-wpm-white/85 tracking-wide break-words">
          Interactive Portfolio System
        </h1>

        <div className="h-[1px] w-16 bg-wpm-purple/40" />

        <motion.button
          className="group relative mt-2 cursor-pointer"
          onClick={onStart}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="font-mono text-sm tracking-[0.16em] text-wpm-cyan group-hover:text-glow-cyan transition-all duration-300">
            PRESS START
          </span>
          <motion.span
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-wpm-cyan"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.button>

        <div className="absolute bottom-10 flex gap-8 text-[11px] font-mono text-wpm-gray/90">
          <span>[ENTER] or click</span>
          <span>{profile.name}</span>
        </div>
      </div>

      {/* CRT overlay */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
}
