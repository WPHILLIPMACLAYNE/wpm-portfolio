"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { getModuleScene, toneClasses } from "./moduleSceneData";

interface ModuleSceneLayoutProps {
  moduleId: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export default function ModuleSceneLayout({
  moduleId,
  title,
  subtitle,
  children,
  aside,
}: ModuleSceneLayoutProps) {
  const scene = getModuleScene(moduleId);
  const tone = toneClasses[scene.tone];

  return (
    <div className="relative min-h-screen bg-[#02040a] px-4 py-8 pb-20 md:px-8 lg:px-12">
      {/* Background HUD Layer */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(116,247,255,0.05),transparent_40%)]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(108,77,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(108,77,255,0.5)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Navigation Breadcrumb - Tactical Style */}
        <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-4">
           <Link
            href="/console"
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-muted transition-colors hover:text-wpm-cyan"
          >
            <span className="border border-white/10 px-1.5 py-0.5 group-hover:border-wpm-cyan/40">ESC</span>
            <span className="hidden sm:inline">Retornar ao Command Deck</span>
            <span className="sm:hidden">Retornar</span>
          </Link>
          <div className="flex items-center gap-4 font-mono text-[9px] text-wpm-muted uppercase tracking-[0.15em]">
             <span>Status: <span className="text-wpm-success">Criptografado</span></span>
             <span className="hidden md:inline">ID: AX-8801</span>
          </div>
        </div>

        <header className="relative mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-w-0"
          >
            <div className="flex items-center gap-3">
               <span className={`h-3 w-3 ${tone.bg} shadow-[0_0_10px_currentColor] ${tone.text}`} />
               <p className={`font-mono text-[11px] uppercase tracking-[0.25em] ${tone.text}`}>
                 WPM.OS // Dossie_{scene.id.toUpperCase()}
               </p>
            </div>
            
            <h1 className="mt-6 font-sans text-5xl font-black leading-[0.9] tracking-tighter text-wpm-white md:text-7xl lg:text-8xl uppercase italic">
              {title}
            </h1>
            
            <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-wpm-text-secondary md:text-xl border-l-4 border-wpm-cyan/30 pl-6">
                {subtitle}
              </p>
              
              <div className="flex shrink-0 flex-wrap gap-3">
                {scene.meta.map((meta) => (
                  <div key={meta.label} className="border border-white/10 bg-white/[0.02] px-4 py-3 min-w-[120px]">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wpm-muted">{meta.label}</p>
                    <p className="mt-1 font-mono text-xs font-bold uppercase text-wpm-white/90">{meta.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="absolute -bottom-6 left-0 h-px w-full bg-gradient-to-r from-wpm-cyan/40 via-white/5 to-transparent" />
        </header>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <main className="min-w-0">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
             >
               {children}
             </motion.div>
          </main>
          
          <aside className="min-w-0">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8 sticky top-8"
            >
              <section className={`border-l-2 ${tone.border} bg-white/[0.02] p-6 shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${tone.text}`}>Resumo do Modulo</p>
                  <span className={`h-1.5 w-1.5 rounded-full ${tone.text.replace('text-', 'bg-')} animate-pulse`} />
                </div>
                <p className="text-sm leading-relaxed text-wpm-gray italic">
                  &quot;{scene.summary}&quot;
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                   <span className="font-mono text-[9px] text-wpm-muted uppercase tracking-widest">Acesso</span>
                   <span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${tone.text}`}>{scene.status}</span>
                </div>
              </section>

              <section className="border border-white/5 bg-wpm-black/40 p-6 backdrop-blur-sm">
                <p className="wpm-section-title mb-5 opacity-70">Metadados e Tags</p>
                <div className="flex flex-wrap gap-2">
                  {scene.tags.map((tag) => (
                    <span key={tag} className="border border-white/10 bg-wpm-black px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-wpm-muted hover:text-wpm-cyan hover:border-wpm-cyan/30 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

              {aside && (
                <div className="pt-4">
                  {aside}
                </div>
              )}

              <div className="border-t border-white/5 pt-8">
                 <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-wpm-muted/50 mb-4">Acoes do Console</p>
                 <Link 
                   href="/console"
                   className="wpm-btn-ripple flex min-h-12 items-center justify-center border border-wpm-cyan/40 bg-wpm-cyan/[0.05] font-mono text-[11px] uppercase tracking-[0.2em] text-wpm-cyan transition-all hover:bg-wpm-cyan/10 active:scale-[0.98]"
                 >
                   Encerrar Dossie
                 </Link>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
