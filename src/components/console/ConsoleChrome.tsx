"use client";

import Link from "next/link";
import { motion } from "motion/react";

const primaryNav = [
  { label: "Projetos", href: "/projects" },
  { label: "Perfil", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Contato", href: "/contact" },
];

export function SystemTelemetry() {
  return (
    <aside
      className="hidden xl:flex w-24 shrink-0 flex-col items-center justify-between border-r border-white/10 bg-[#050509]/60 px-2 py-8 backdrop-blur-md relative overflow-hidden"
      aria-label="Telemetria do sistema"
    >
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2" />

      {/* TACTICAL RADAR / COMPASS */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          {/* Rotating Rings */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-dashed border-wpm-cyan/30" 
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border border-wpm-purple/20" 
          />
          
          {/* Core LED */}
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wpm-cyan shadow-[0_0_15px_rgba(116,247,255,1)]" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wpm-cyan"
          />

          {/* Crosshair */}
          <div className="absolute -left-1 top-1/2 h-px w-2 bg-wpm-cyan/40" />
          <div className="absolute -right-1 top-1/2 h-px w-2 bg-wpm-cyan/40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-wpm-cyan/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-px bg-wpm-cyan/5" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-wpm-cyan/80 font-black">
          SYS_SYNC
        </span>
      </div>

      {/* DATA STREAM / GAUGES */}
      <div className="flex w-full flex-col items-center gap-10 z-10">
        {/* Signal Gauge */}
        <div className="flex flex-col items-center gap-3">
           <div className="flex gap-1">
              {[0, 1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  className={`w-1 h-3 border border-wpm-cyan/40 ${i < 3 ? 'bg-wpm-cyan/40' : 'bg-transparent'}`}
                />
              ))}
           </div>
           <span className="font-mono text-[8px] uppercase tracking-widest text-wpm-muted vertical-text">SIGNAL_LINK</span>
        </div>

        {/* Load Monitor */}
        <div className="relative w-4 h-32 bg-white/5 border border-white/10 flex flex-col justify-end p-0.5">
           <motion.div 
             animate={{ height: ["20%", "85%", "45%", "90%", "30%"] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-full bg-gradient-to-t from-wpm-purple/60 to-wpm-cyan/60 shadow-[0_0_10px_rgba(116,247,255,0.3)]"
           />
           <div className="absolute -right-6 top-0 bottom-0 flex flex-col justify-between font-mono text-[6px] text-white/20">
              <span>100%</span>
              <span>50%</span>
              <span>0%</span>
           </div>
        </div>

        <div className="flex flex-col items-center gap-1">
           <span className="font-mono text-[8px] text-wpm-muted">OS_BOOT_OK</span>
           <span className="font-mono text-[8px] text-wpm-cyan/40">CORE_42_ACTIVE</span>
        </div>
      </div>

      {/* BOTTOM DOT GRID */}
      <div className="flex flex-col gap-1.5 opacity-30" aria-hidden="true">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="h-0.5 w-0.5 rounded-full bg-wpm-cyan" />
          ))}
        </div>
        <span className="font-mono text-[7px] text-center tracking-tighter text-wpm-muted uppercase">Diagnostic_v1</span>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
      `}</style>
    </aside>
  );
}

export function ConsoleNav() {
  return (
    <div className="hidden items-center md:flex">
      <span className="mr-6 h-10 w-px bg-white/10" aria-hidden="true" />
      <nav
        aria-label="Navegacao principal"
        className="flex items-center gap-8"
      >
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex flex-col items-start gap-1 focus-visible:outline-none"
          >
            <div className="flex items-center gap-2">
               <div className="h-1 w-1 bg-white/20 group-hover:bg-wpm-cyan transition-colors" />
               <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-wpm-muted group-hover:text-wpm-white transition-colors">
                {item.label}
              </span>
            </div>
            <span className="h-px w-0 bg-wpm-cyan/40 transition-all duration-300 group-hover:w-full" />
          </Link>
        ))}
      </nav>
    </div>
  );
}
