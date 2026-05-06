"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface ReverseCrtTransitionProps {
  active: boolean;
  onComplete?: () => void;
}

const EXPAND_MS = 420;
const LINE_MS = 60;
const FADE_MS = 120;
// Total: 600ms before onComplete fires

export default function ReverseCrtTransition({
  active,
  onComplete,
}: ReverseCrtTransitionProps) {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<"line" | "expand" | "fade-out" | "done">("done");
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    // Reset when deactivated
    if (!active) {
      const raf = requestAnimationFrame(() => {
        setPhase("done");
        hasCalledComplete.current = false;
      });
      return () => cancelAnimationFrame(raf);
    }

    // Reduced motion: instant empty overlay → fade → done
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => setPhase("fade-out"));
      const t = setTimeout(() => {
        setPhase("done");
        if (!hasCalledComplete.current) {
          hasCalledComplete.current = true;
          onComplete?.();
        }
      }, 200);
      return () => { cancelAnimationFrame(raf); clearTimeout(t); };
    }

    // Full CRT sequence
    hasCalledComplete.current = false;
    const raf = requestAnimationFrame(() => setPhase("line"));

    const expandTimer = setTimeout(() => setPhase("expand"), LINE_MS);
    const fadeTimer = setTimeout(() => setPhase("fade-out"), LINE_MS + EXPAND_MS);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }, LINE_MS + EXPAND_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(expandTimer);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [active, prefersReduced, onComplete]);

  // Never render when done
  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        {prefersReduced ? (
          <motion.div
            className="absolute inset-0 bg-[#050509]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        ) : (
          <>
            {/* Black backdrop */}
            <div className="absolute inset-0 bg-[#050509]" />

            {/* Bright line */}
            <motion.div
              className="absolute left-0 right-0"
              style={{ top: "50%", height: 2, marginTop: -1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "line" ? 1 : 0 }}
              transition={{ duration: 0.08 }}
            >
              <div className="absolute inset-0 bg-white" />
              <div
                className="absolute inset-0"
                style={{
                  boxShadow:
                    "0 0 8px 2px rgba(255,255,255,0.9), 0 0 20px 6px rgba(108,77,255,0.6), 0 0 40px 12px rgba(108,77,255,0.3)",
                }}
              />
            </motion.div>

            {/* Expanding aperture */}
            <motion.div
              className="absolute inset-0 bg-[#050509]"
              initial={{ clipPath: "inset(49% 0 49% 0)" }}
              animate={{
                clipPath:
                  phase === "expand" || phase === "fade-out"
                    ? "inset(0% 0 0% 0)"
                    : "inset(49% 0 49% 0)",
              }}
              transition={{
                duration: EXPAND_MS / 1000,
                ease: [0.33, 0, 0.1, 1],
              }}
            />

            {/* Bloom during expand */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "expand" ? 1 : 0 }}
              transition={{ duration: 0.15 }}
              style={{
                backdropFilter: "blur(3px) brightness(1.15)",
                WebkitBackdropFilter: "blur(3px) brightness(1.15)",
              }}
            />

            {/* Scanlines */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: phase === "fade-out" ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                background:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 2px, transparent 2px, transparent 4px)",
              }}
            />

            {/* Final fade */}
            <motion.div
              className="absolute inset-0 bg-[#050509]"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === "fade-out" ? [1, 0] : 0 }}
              transition={{ duration: FADE_MS / 1000, ease: "easeOut" }}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
