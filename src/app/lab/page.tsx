"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import Link from "next/link";

const experiments = [
  { title: "Shader Playground", desc: "GLSL shaders interativos em tempo real", status: "Prototype" },
  { title: "Particle System", desc: "Sistema de part\u00edculas reativas com Framer Motion", status: "Completed" },
  { title: "Audio Visualizer", desc: "Visualizador de \u00e1udio com Three.js + Web Audio API", status: "In Progress" },
  { title: "Generative Type", desc: "Tipografia generativa com canvas e perlin noise", status: "Prototype" },
];

export default function LabPage() {
  return (
    <ConsoleShell>
      <div className="px-6 py-12 max-w-3xl mx-auto">
        <Link
          href="/console"
          className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray hover:text-wpm-cyan transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
        >
          <span className="text-wpm-lavender/90">{">"}</span> BACK TO CONSOLE
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90 mb-3">
            Experimental Lab
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-4">
            Experimental Lab
          </h1>
          <p className="text-wpm-gray mb-10">
            Experimentos, prot\u00f3tipos, shaders e estudos criativos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {experiments.map((exp, i) => (
              <motion.div
                key={exp.title}
                className="p-5 bg-wpm-card border border-white/[0.04] rounded-sm hover:border-wpm-purple/20 transition-colors"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    exp.status === "Completed" ? "bg-wpm-cyan/60" : exp.status === "In Progress" ? "bg-wpm-purple/60" : "bg-wpm-gray/40"
                  }`} />
                  <span className="font-mono text-[11px] text-wpm-gray">{exp.status}</span>
                </div>
                <h3 className="text-wpm-white/70 mb-1">{exp.title}</h3>
                <p className="text-sm text-wpm-gray">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
