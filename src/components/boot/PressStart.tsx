"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";

interface PressStartProps {
  onStart: () => void;
  /** Skip the CRT turn-on effect when a transition already handles it */
  skipCrt?: boolean;
}

export default function PressStart({ onStart, skipCrt = false }: PressStartProps) {
  const [visible, setVisible] = useState(skipCrt);
  const [crtOn, setCrtOn] = useState(!skipCrt);

  useEffect(() => {
    if (skipCrt) {
      const raf = requestAnimationFrame(() => {
        setVisible(true);
        setCrtOn(false);
      });
      return () => cancelAnimationFrame(raf);
    }
    const t = setTimeout(() => setVisible(true), 200);
    const crt = setTimeout(() => setCrtOn(false), 1200);
    return () => {
      clearTimeout(t);
      clearTimeout(crt);
    };
  }, [skipCrt]);

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
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* CRT turn-on effect overlay */}
      <AnimatePresence>
        {crtOn && (
          <motion.div
            className="absolute inset-0 z-30 bg-white"
            initial={{ clipPath: "inset(49.5% 0 49.5% 0)", filter: "brightness(10) blur(6px)" }}
            animate={{ clipPath: "inset(0 0 0 0)", filter: "brightness(1) blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(108,77,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(108,77,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <AnimatePresence>
        {visible && (
          <motion.div
            className="flex flex-col items-center gap-8 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* System label */}
            <motion.p
              className="font-mono text-[10px] tracking-[0.5em] uppercase text-wpm-purple/60"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              WPM.OS v1.0
            </motion.p>

            {/* Main title */}
            <motion.h1
              className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Interactive Portfolio System
            </motion.h1>

            {/* Divider */}
            <motion.div
              className="h-[1px] w-16 bg-wpm-purple/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* Press Start button */}
            <motion.button
              className="group relative mt-2 cursor-pointer"
              onClick={onStart}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="font-mono text-sm tracking-[0.4em] text-wpm-cyan group-hover:text-glow-cyan transition-all duration-300">
                PRESS START
              </span>
              <motion.span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-wpm-cyan"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.button>

            {/* Bottom info */}
            <motion.div
              className="absolute bottom-10 flex gap-8 text-[10px] font-mono text-wpm-gray/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span>[ENTER] or click</span>
              <span>{profile.name}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRT overlay */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </motion.div>
  );
}
