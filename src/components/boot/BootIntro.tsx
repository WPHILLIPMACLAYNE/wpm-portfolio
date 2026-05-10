"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { profile } from "@/data/profile";

interface BootIntroProps {
  onComplete: () => void;
}

const bootMessages = [
  "INICIANDO KERNEL WPM.OS...",
  "DESCRIPTOGRAFANDO SETORES CRIATIVOS...",
  "MONTANDO INTERFACE TATICA...",
  "VERIFICANDO INTEGRIDADE DOS DADOS...",
  `USUARIO AUTORIZADO: ${profile.name.toUpperCase()}`,
  "SISTEMA PRONTO.",
];

// Fake hex data for memory dump effect
const generateHexDump = () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase());

const LOADING_DURATION = 1200; // Slower for drama
const REVEAL_DURATION = 600;
const EXIT_DELAY = 100;

export default function BootIntro({ onComplete }: BootIntroProps) {
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hexDump, setHexDump] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  
  const prefersReduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hexTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasCompleted = useRef(false);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (hexTimerRef.current) clearInterval(hexTimerRef.current);
    timerRef.current = null;
    hexTimerRef.current = null;
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

    // Fast scrolling hex dump effect
    hexTimerRef.current = setInterval(() => {
      setHexDump(generateHexDump());
    }, 50);

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
        clearInterval(hexTimerRef.current!);
        timerRef.current = null;
        hexTimerRef.current = null;

        setProgress(100);
        scheduleTimeout(() => {
          setPhase("reveal");
          scheduleTimeout(finish, REVEAL_DURATION);
        }, 150);
      }
    }, 40);

    return clearTimers;
  }, [clearTimers, finish, prefersReduced, scheduleTimeout]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#02040a]"
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReduced ? 0.1 : 0.4 }}
    >
      <h1 className="sr-only">WPM.OS — Boot Sequence</h1>
      
      {/* Digital noise and tactical scanline */}
      <div className="absolute inset-0 bg-noise opacity-[0.06]" />
      <div className="absolute left-0 right-0 h-[2px] bg-wpm-cyan/30 animate-scanline shadow-[0_0_20px_rgba(116,247,255,0.5)]" />

      {/* Background Hex Dump (Memory Scan simulation) */}
      {phase === "loading" && !prefersReduced && (
         <div className="absolute left-4 top-4 flex flex-col opacity-20 font-mono text-[8px] text-wpm-cyan pointer-events-none select-none">
            {hexDump.map((hex, i) => (
               <span key={i}>0x000{i}A ... {hex} ... OK</span>
            ))}
         </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            className="flex flex-col w-full max-w-2xl gap-8 z-10 px-8"
            exit={hydrated && !prefersReduced ? { opacity: 0, filter: "blur(4px)", scale: 1.05 } : undefined}
            transition={{ duration: 0.2 }}
          >
            
            <div className="flex justify-between items-end border-b border-wpm-cyan/30 pb-2">
               <span className="font-mono text-[10px] uppercase tracking-widest text-wpm-cyan">Power-On Self-Test</span>
               <span className="font-mono text-[10px] text-wpm-cyan animate-pulse">SYS_DIAG_ACTIVE</span>
            </div>

            {/* Tactical Progress Bar */}
            <div className="relative h-2 w-full bg-white/[0.03] border border-white/10 overflow-hidden">
               <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(116,247,255,0.1)_4px,rgba(116,247,255,0.1)_8px)]" />
               <motion.div
                  className="h-full bg-wpm-cyan relative shadow-[0_0_15px_rgba(116,247,255,0.6)]"
                  initial={hydrated ? { width: "0%" } : { width: `${progress}%` }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: prefersReduced ? 0 : 0.08 }}
               >
                  <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50" />
               </motion.div>
            </div>

            {/* Boot log with brackets */}
            <div className="space-y-[4px] font-mono text-xs border-l border-wpm-cyan/20 pl-4 relative">
               <div className="absolute -left-1 top-0 bottom-0 w-[2px] bg-gradient-to-b from-wpm-cyan/40 to-transparent" />
              {bootMessages.slice(0, messageIndex + 1).map((msg, i) => (
                <motion.p
                  key={i}
                  className="text-wpm-gray flex items-start gap-3"
                  initial={hydrated && !prefersReduced ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <span className="text-wpm-cyan/50 mt-[1px]">[{String(i).padStart(2, '0')}]</span>
                  <span className={`${i === messageIndex ? "text-wpm-white font-bold" : "opacity-60"}`}>
                    {msg}
                  </span>
                  {i === messageIndex && (
                    <motion.span
                      className="ml-1 text-wpm-cyan bg-wpm-cyan/20 px-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.3, repeat: Infinity }}
                    >
                      █
                    </motion.span>
                  )}
                </motion.p>
              ))}
            </div>
            
            <div className="flex justify-between font-mono text-[9px] text-wpm-muted uppercase">
               <span>CPU: 4.2GHz</span>
               <span>MEM: 64TB / OK</span>
            </div>
          </motion.div>
        )}

        {phase === "reveal" && (
          <motion.div
            key="reveal"
            className="flex flex-col items-center z-10 px-6 relative"
            initial={
              hydrated && !prefersReduced
                ? { opacity: 0, scale: 0.9, filter: "blur(10px)" }
                : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tactical Target Brackets */}
            <div className="absolute -top-10 -left-10 w-8 h-8 border-t-2 border-l-2 border-wpm-cyan/60" />
            <div className="absolute -bottom-10 -right-10 w-8 h-8 border-b-2 border-r-2 border-wpm-cyan/60" />
            
            {/* Glitching WPM Initials */}
            <motion.div
              className="text-8xl md:text-[10rem] font-black tracking-tighter italic select-none relative"
            >
              <span
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40"
                style={{
                  textShadow:
                    "0 0 40px rgba(116,247,255,0.4), 0 0 80px rgba(108,77,255,0.3)",
                }}
              >
                {profile.initials}
              </span>
              <motion.span 
                 initial={{ opacity: 1, x: -5 }}
                 animate={{ opacity: 0, x: 0 }}
                 transition={{ duration: 0.2 }}
                 className="absolute inset-0 text-wpm-cyan z-10"
              >
                 {profile.initials}
              </motion.span>
              <motion.span 
                 initial={{ opacity: 1, x: 5 }}
                 animate={{ opacity: 0, x: 0 }}
                 transition={{ duration: 0.2 }}
                 className="absolute inset-0 text-wpm-purple z-10"
              >
                 {profile.initials}
              </motion.span>
            </motion.div>

            {/* Name */}
            <p className="mt-8 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-wpm-cyan border border-wpm-cyan/20 bg-wpm-cyan/[0.03] px-6 py-2">
              {profile.name}
            </p>

            <motion.div
              className="mt-6 flex items-center gap-3 font-mono text-[9px] text-wpm-success tracking-widest uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-wpm-success animate-pulse" />
              Access Granted. System Online.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip button — always visible */}
      {phase !== "done" && (
        <motion.button
          className="absolute bottom-6 z-20 text-[9px] font-mono tracking-[0.2em] uppercase
                     text-wpm-muted hover:text-wpm-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all
                     cursor-pointer px-4 py-2"
          onClick={finish}
          initial={hydrated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          [ OVERRIDE_BOOT ]
        </motion.button>
      )}

      {/* CRT overlays */}
      {!prefersReduced && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-50 mix-blend-overlay"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
            }}
          />
          <div
            className="pointer-events-none fixed inset-0 z-49 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, rgba(2,4,10,0.8) 100%)",
            }}
          />
        </>
      )}
    </motion.div>
  );
}
