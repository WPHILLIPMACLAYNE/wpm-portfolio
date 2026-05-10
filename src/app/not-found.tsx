"use client";

import Link from "next/link";
import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";

export default function NotFound() {
  return (
    <ConsoleShell mode="page" showNav={false}>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
        <div className="relative border border-wpm-experimental/20 bg-[#0a0d14]/60 p-8 md:p-12 max-w-2xl w-full backdrop-blur-md overflow-hidden">
          {/* Decorative Glitch Border */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-wpm-experimental/40 to-transparent" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 bg-wpm-experimental animate-pulse shadow-[0_0_8px_#FF7AD9]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-wpm-experimental">Error_Code: 404 // Signal_Lost</span>
          </div>

          <h1 className="font-sans text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-wpm-white mb-6 wpm-glitch" data-text="ROTA INEXISTENTE">
            ROTA INEXISTENTE
          </h1>

          <div className="h-px w-full bg-white/5 mb-8" />

          <p className="font-mono text-sm leading-relaxed text-wpm-gray mb-10 border-l-2 border-wpm-experimental/30 pl-6 italic">
            O subsistema solicitado nao foi encontrado no mapeamento atual do Kernel. 
            A integridade da sessao permanece estavel, mas este setor esta fora de alcance.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/console"
              className="wpm-btn-ripple flex min-h-12 items-center justify-center border border-wpm-cyan/40 bg-wpm-cyan/[0.05] font-mono text-[11px] uppercase tracking-[0.2em] text-wpm-cyan transition-all hover:bg-wpm-cyan/10"
            >
              Retornar ao Deck
            </Link>
            <Link
              href="/projects"
              className="wpm-btn-ripple flex min-h-12 items-center justify-center border border-white/10 bg-white/[0.02] font-mono text-[11px] uppercase tracking-[0.2em] text-wpm-muted hover:text-wpm-white transition-all"
            >
              Inspecionar Projetos
            </Link>
          </div>

          {/* Technical metadata footer inside the box */}
          <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center opacity-30">
             <span className="font-mono text-[7px] uppercase tracking-widest text-wpm-muted">Loc: Unknown_Sector</span>
             <span className="font-mono text-[7px] uppercase tracking-widest text-wpm-muted">Status: Data_Purged</span>
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
