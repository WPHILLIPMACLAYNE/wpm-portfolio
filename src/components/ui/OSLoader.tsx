"use client";

import { motion } from "motion/react";

interface OSLoaderProps {
  label?: string;
}

export default function OSLoader({ label = "CARREGANDO DADOS" }: OSLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[200px] w-full bg-wpm-black/20">
      <div className="flex items-center gap-2 mb-3">
        <motion.div
          animate={{
            opacity: [1, 0.4, 1],
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-2 h-2 bg-wpm-cyan shadow-[0_0_8px_rgba(116,247,255,0.6)]"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-cyan/80">
          {label}
        </span>
      </div>
      
      <div className="w-48 h-px bg-white/10 relative overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-wpm-cyan/50 to-transparent w-full"
        />
      </div>
      
      <div className="mt-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            className="w-1 h-1 bg-wpm-cyan/40"
          />
        ))}
      </div>
    </div>
  );
}
