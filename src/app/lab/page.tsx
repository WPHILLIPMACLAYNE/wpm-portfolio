"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";

const experiments = [
  { title: "Shader Playground", desc: "Estudos GLSL e visual background com fallback CSS.", status: "Prototype", axis: "visual" },
  { title: "Particle System", desc: "Particulas reativas com controle de custo e reduced motion.", status: "Completed", axis: "motion" },
  { title: "Audio Visualizer", desc: "Pesquisa de Web Audio API para futura camada opt-in.", status: "In Progress", axis: "sound" },
  { title: "Generative Type", desc: "Tipografia generativa para estudos editoriais e micro-interacoes.", status: "Prototype", axis: "type" },
];

export default function LabPage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="lab"
        title="Laboratorio Experimental"
        subtitle="Area de pesquisa visual para prototipos, shaders, motion e tipografia generativa, com disciplina de performance e fallback."
      >
        <section className="grid gap-4 md:grid-cols-2">
          {experiments.map((exp, index) => (
            <motion.article
              key={exp.title}
              className="relative min-h-56 overflow-hidden border border-wpm-experimental/20 bg-wpm-elevated/75 p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,122,217,0.10),transparent_36%)]" aria-hidden="true" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-wpm-experimental">{exp.axis}</p>
                    <span className="border border-wpm-experimental/25 bg-wpm-experimental/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-wpm-experimental">
                      {exp.status}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-normal text-wpm-white">{exp.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-wpm-gray">{exp.desc}</p>
                </div>
                <div className="mt-8 grid grid-cols-5 gap-1 opacity-60" aria-hidden="true">
                  {Array.from({ length: 20 }).map((_, dot) => (
                    <span key={dot} className="h-1 bg-wpm-experimental/30" />
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </section>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
