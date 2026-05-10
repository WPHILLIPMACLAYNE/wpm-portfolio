import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import type { MenuItem } from "@/data/profile";
import { getModuleScene, toneClasses } from "./moduleSceneData";
import TacticalVisualStage from "./TacticalVisualStage";

interface ModulePreviewPanelProps {
  item: MenuItem;
  variant?: "stage" | "panel";
}

export default function ModulePreviewPanel({ item, variant = "stage" }: ModulePreviewPanelProps) {
  const scene = getModuleScene(item.id);
  const tone = toneClasses[scene.tone];

  return (
    <article
      className={`relative min-w-0 overflow-hidden border ${tone.border} bg-[#02040a]/80 backdrop-blur-md ${tone.glow} ${
        variant === "stage" ? "min-h-[34rem] p-5 md:p-8" : "p-5 md:p-7"
      }`}
    >
      {/* Decorative HUD background layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_36%),radial-gradient(circle_at_82%_18%,rgba(116,247,255,0.06),transparent_28%)]" />
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        {/* Animated Scanning Line */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-px bg-wpm-cyan/10 z-0"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 flex h-full flex-col"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                 <span className={`h-2 w-2 ${tone.bg} animate-pulse shadow-[0_0_8px_currentColor] ${tone.text}`} />
                 <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${tone.text}`}>
                   {scene.signal}
                 </p>
              </div>
              
              <h2 className="mt-4 max-w-2xl font-sans text-4xl font-bold leading-none tracking-tight text-wpm-white sm:text-5xl lg:text-6xl uppercase italic">
                {item.label}
              </h2>
              
              <p className="mt-4 max-w-xl text-lg font-medium leading-relaxed text-wpm-text-secondary">
                {scene.value}
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className={`inline-flex border ${tone.border} ${tone.bg} px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] ${tone.text} shadow-sm`}>
                {scene.status}
              </span>
              <span className="font-mono text-[9px] text-wpm-muted tracking-widest uppercase">
                CRC: 0xFD42A
              </span>
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-wpm-gray border-l-2 border-white/5 pl-4 py-1 italic">
            {scene.summary}
          </p>

          {/* New Tactical Center Stage */}
          <div className="mt-8 grid flex-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative min-h-[22rem] border border-white/5 bg-[#05070a] shadow-inner group">
              <TacticalVisualStage id={item.id} items={scene.visual} />
            </div>

            <div className="flex flex-col justify-between gap-8">
               <div className="grid gap-4">
                  <p className="wpm-section-title !text-[10px] opacity-60">Matriz de Dados</p>
                  <div className="grid grid-cols-2 gap-3">
                    {scene.meta.map((meta) => (
                      <div key={meta.label} className="border border-white/[0.04] bg-white/[0.01] px-4 py-3 hover:bg-white/[0.03] transition-colors">
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-wpm-muted">{meta.label}</p>
                        <p className="mt-1 font-mono text-sm uppercase font-bold text-wpm-white/90">{meta.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {scene.tags.map((tag) => (
                      <span key={tag} className="border border-white/[0.06] bg-wpm-black px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-wpm-cyan/70 hover:text-wpm-cyan hover:border-wpm-cyan/40 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
               </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={item.href}
                  className={`group wpm-btn-ripple relative inline-flex min-h-14 items-center justify-center gap-4 border ${tone.border} ${tone.bg} px-8 font-mono text-[13px] font-bold uppercase tracking-[0.2em] ${tone.text} transition-all hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70`}
                >
                  <span className="relative z-10">{scene.primaryCta}</span>
                  <span className="relative z-10 transition-transform group-hover:translate-x-2">/&gt;</span>
                </Link>
                
                {scene.secondaryCta && (
                  <Link
                    href={item.href}
                    className="wpm-btn-ripple inline-flex min-h-12 items-center justify-center border border-white/[0.08] bg-transparent px-8 font-mono text-[11px] uppercase tracking-[0.18em] text-wpm-muted transition-colors hover:border-white/[0.15] hover:text-wpm-white"
                  >
                    {scene.secondaryCta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </article>
  );
}
