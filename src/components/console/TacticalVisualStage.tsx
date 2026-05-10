"use client";

import dynamic from "next/dynamic";

const HologramStage = dynamic(() => import("./HologramStage"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-wpm-cyan/5 animate-pulse">
       <span className="font-mono text-[10px] text-wpm-cyan/40 tracking-[0.3em]">CARREGANDO_HOLOGRAMA...</span>
    </div>
  ),
});

interface TacticalVisualStageProps {
  id: string;
  items: string[];
}

export default function TacticalVisualStage({ id }: TacticalVisualStageProps) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#05070a]">
      {/* HUD Background elements */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      {/* TACTICAL HOLOGRAM - CENTRAL PIECE */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
         <HologramStage id={id} />
      </div>

      {/* Decorative Corners */}
      <div className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-white/20 z-20" />
      <div className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/20 z-20" />
      <div className="absolute left-3 bottom-3 h-4 w-4 border-l-2 border-b-2 border-white/20 z-20" />
      <div className="absolute right-3 bottom-3 h-4 w-4 border-r-2 border-b-2 border-white/20 z-20" />

      {/* Bottom info bar */}
      <div className="absolute bottom-3 left-6 right-6 flex justify-between items-center opacity-40 z-20">
        <div className="flex items-center gap-3">
           <div className="h-1.5 w-1.5 bg-wpm-cyan animate-pulse" />
           <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wpm-muted font-bold">Diag_Visual.Stage_v2.1</span>
        </div>
        <div className="flex gap-2">
           <div className="w-1 h-1 bg-wpm-cyan/40" />
           <div className="w-1 h-1 bg-wpm-cyan/40" />
           <div className="w-1 h-1 bg-wpm-cyan/40" />
        </div>
      </div>
      
      {/* Side measurement markers */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 opacity-20 pointer-events-none">
         {[0, 25, 50, 75, 100].map(m => (
           <div key={m} className="flex items-center gap-2 justify-end">
              <span className="font-mono text-[6px] text-white">{m}</span>
              <div className="h-px w-2 bg-white" />
           </div>
         ))}
      </div>
    </div>
  );
}
