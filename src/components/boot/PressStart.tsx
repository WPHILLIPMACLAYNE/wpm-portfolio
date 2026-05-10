"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

interface PressStartProps {
  onStart: () => void;
  /** Skip the CRT turn-on effect when a transition already handles it */
  skipCrt?: boolean;
}

export default function PressStart({ onStart }: PressStartProps) {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    
    const interval = setInterval(() => setBlink(b => !b), 500);
    return () => {
       window.removeEventListener("keydown", handleKey);
       clearInterval(interval);
    };
  }, [onStart]);

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden bg-[#02040a]">
      {/* Tactical Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(116,247,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(116,247,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#02040a_80%)]" />

      {/* Top HUD Elements */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 text-wpm-cyan/40 font-mono text-[8px] uppercase tracking-widest">
         <span>SYS_ID: AX-77B_SECURE</span>
         <span>LOC: BRAZIL_SERVER_01</span>
      </div>
      <div className="absolute top-6 right-6 flex items-center gap-2">
         <span className="font-mono text-[8px] text-wpm-cyan/40 uppercase tracking-widest animate-pulse">SECURE_LINK</span>
         <div className="h-1.5 w-1.5 rounded-full bg-wpm-success" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full px-6">
        
        <div className="flex items-center gap-4 mb-10 w-full justify-center opacity-80">
           <div className="h-px w-16 bg-gradient-to-r from-transparent to-wpm-cyan/50" />
           <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-wpm-cyan">
             WPM.OS // Protocolo de Acesso
           </p>
           <div className="h-px w-16 bg-gradient-to-l from-transparent to-wpm-cyan/50" />
        </div>

        <h1 className="text-center font-sans text-5xl md:text-7xl font-black leading-none text-wpm-white tracking-tighter uppercase italic wpm-glitch" data-text="INTERACTIVE DOSSIER">
          INTERACTIVE DOSSIER
        </h1>

        <div className="mt-12 flex flex-col items-center">
           <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-muted mb-4">
             Aguardando autorizacao do usuario
           </p>

          <button
            className="group relative flex items-center justify-center border border-wpm-cyan/30 bg-wpm-cyan/[0.03] px-10 py-4 cursor-pointer hover:bg-wpm-cyan/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
            onClick={onStart}
          >
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 h-3 w-3 border-t border-l border-wpm-cyan/60" />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r border-wpm-cyan/60" />
            
            <span className="font-mono text-sm tracking-[0.25em] font-bold text-wpm-cyan group-hover:text-glow-cyan transition-all">
              INICIAR SISTEMA
            </span>
            <span className={`ml-3 font-mono text-sm font-bold text-wpm-cyan ${blink ? 'opacity-100' : 'opacity-0'}`}>
              _
            </span>
          </button>
        </div>

        <div className="absolute bottom-10 flex w-full justify-between px-10 text-[9px] font-mono text-wpm-gray uppercase tracking-widest">
          <span className="opacity-50">Tecle [ENTER] para confirmar</span>
          <span className="opacity-50 text-wpm-cyan">{profile.name}</span>
        </div>
      </div>

      {/* Scanning Line */}
      <div className="absolute left-0 right-0 h-[2px] bg-wpm-cyan/20 animate-scanline shadow-[0_0_15px_rgba(116,247,255,0.4)]" />

      {/* CRT overlay */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
    </div>
  );
}
