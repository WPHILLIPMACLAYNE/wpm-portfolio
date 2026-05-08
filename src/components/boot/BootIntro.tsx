"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";

interface BootIntroProps {
  onComplete: () => void;
}

const bootMessages = [
  "Initializing WPM.OS kernel...",
  "Loading creative modules...",
  "Calibrating visual systems...",
  `User: ${profile.name}`,
  "Access granted.",
];

const LOADING_DURATION = 600;
const REVEAL_DURATION = 300;
const EXIT_DELAY = 50;

export default function BootIntro({ onComplete }: BootIntroProps) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompleted = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  }, []);

  const scheduleTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      timeoutRefs.current = timeoutRefs.current.filter((item) => item !== timeout);
      callback();
    }, delay);
    timeoutRefs.current.push(timeout);
    return timeout;
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHydrated(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const finish = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    clearTimers();

    if (prefersReduced) {
      onComplete();
      return;
    }

    setPhase("done");
    scheduleTimeout(onComplete, EXIT_DELAY);
  }, [clearTimers, onComplete, prefersReduced, scheduleTimeout]);

  useEffect(() => {
    // Reduced motion: skip to done immediately, auto-advance after brief pause
    if (prefersReduced) {
      const raf = requestAnimationFrame(() => {
        setProgress(100);
        setMessageIndex(bootMessages.length - 1);
      });
      scheduleTimeout(finish, 350);
      return () => {
        cancelAnimationFrame(raf);
        clearTimers();
      };
    }

    const startTime = Date.now();
    const msgCount = bootMessages.length;

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / LOADING_DURATION) * 100, 99);
      setProgress(Math.floor(pct));

      const msgIdx = Math.min(
        Math.floor((elapsed / LOADING_DURATION) * msgCount),
        msgCount - 1
      );
      setMessageIndex(msgIdx);

      if (elapsed >= LOADING_DURATION) {
        clearInterval(timerRef.current!);
        timerRef.current = null;

        // Brief pause before reveal
        setProgress(100);
        scheduleTimeout(() => {
          setPhase("reveal");
          scheduleTimeout(finish, REVEAL_DURATION);
        }, 50);
      }
    }, 40);

    return clearTimers;
  }, [clearTimers, finish, prefersReduced, scheduleTimeout]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReduced ? 0.1 : 0.4 }}
    >
      <h1 className="sr-only">WPM.OS — Wallace Phillip Maclayne Interactive Portfolio</h1>
      {/* Digital noise layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.04]" />

      {/* Subtle scanline pulse at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(108,77,255,0.4), transparent)",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="flex flex-col items-center gap-8 z-10 px-6"
            exit={hydrated && !prefersReduced ? { opacity: 0, scale: 0.95 } : undefined}
            transition={{ duration: 0.3 }}
          >
            {/* Progress track */}
            <div className="w-72 h-[1px] bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(108,77,255,0.6), rgba(116,247,255,0.8))",
                }}
              initial={hydrated ? { width: "0%" } : { width: `${progress}%` }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: prefersReduced ? 0 : 0.08 }}
              />
            </div>

            {/* Boot log */}
            <div className="space-y-[2px] font-mono text-xs">
              {bootMessages.slice(0, messageIndex + 1).map((msg, i) => (
                <motion.p
                  key={i}
                  className="text-wpm-gray"
                  initial={hydrated && !prefersReduced ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-wpm-lavender/90">{">"}</span>{" "}
                  <span className={i === messageIndex ? "text-wpm-cyan/80" : ""}>
                    {msg}
                  </span>
                  {i === messageIndex && (
                    <motion.span
                      className="ml-0.5 text-wpm-cyan/80"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      _
                    </motion.span>
                  )}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            className="flex flex-col items-center z-10 px-6"
            initial={
              hydrated && !prefersReduced
                ? { opacity: 0, scale: 0.92 }
                : { opacity: 1, scale: 1 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* WPM */}
            <motion.div
              className="text-7xl md:text-9xl font-bold tracking-[0.15em] select-none"
              initial={
                hydrated && !prefersReduced
                  ? { opacity: 0, filter: "blur(16px)" }
                  : { opacity: 1, filter: "blur(0px)" }
              }
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.28, delay: 0.03, ease: "easeOut" }}
            >
              <span
                className="block"
                style={{
                  color: "#EAF2FF",
                  textShadow:
                    "0 0 20px rgba(116,247,255,0.4), 0 0 60px rgba(108,77,255,0.2), 0 0 100px rgba(108,77,255,0.1)",
                }}
              >
                {profile.initials}
              </span>
            </motion.div>

            {/* Name */}
            <motion.p
              className="mt-6 font-mono text-xs md:text-sm tracking-[0.16em] uppercase text-wpm-gray"
              initial={
                hydrated && !prefersReduced
                  ? { opacity: 0, y: 10 }
                  : { opacity: 1, y: 0 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.12, ease: "easeOut" }}
            >
              {profile.name}
            </motion.p>

            {/* Tagline */}
            <motion.p
              className="mt-8 text-[11px] md:text-xs text-wpm-cyan/70 font-mono tracking-wider"
              initial={hydrated && !prefersReduced ? { opacity: 0 } : { opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.18, delay: 0.18 }}
            >
              System ready. Welcome.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button — always visible */}
      {phase !== "done" && (
        <motion.button
          className="absolute bottom-10 z-10 text-[11px] font-mono tracking-wider uppercase
                     text-wpm-gray hover:text-wpm-gray transition-colors
                     cursor-pointer focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-wpm-purple/50 focus-visible:ring-offset-2
                     focus-visible:ring-offset-wpm-black rounded-sm px-3 py-2"
          onClick={finish}
          initial={hydrated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          [ Skip Intro ]
        </motion.button>
      )}

      {/* CRT overlays */}
      {!prefersReduced && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-50"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 4px)",
            }}
          />
          <div
            className="pointer-events-none fixed inset-0 z-49"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(5,5,9,0.6) 100%)",
            }}
          />
        </>
      )}
    </motion.div>
  );
}
