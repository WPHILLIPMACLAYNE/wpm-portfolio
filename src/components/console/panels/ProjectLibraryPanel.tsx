"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { publicAssetPath } from "@/lib/site";

const realProjects = projects.filter((p) => p.featured && !p.locked);

function ProjectCartridgePanel({ project, index }: { project: typeof realProjects[0]; index: number }) {
  const prefersReduced = useReducedMotion();
  const isBook = Boolean(project.coverImage);
  const thumbnailImage = project.thumbnailImage ?? project.coverImage;

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.08 * index }}
      className="group relative overflow-hidden border border-white/5 bg-[#0a0d14]/60 backdrop-blur-sm transition-all hover:border-white/15"
    >
      <div 
        className="absolute -right-12 -top-12 h-24 w-24 blur-[40px] opacity-20 transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: project.accentColor }}
      />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-wpm-muted">
              Artifact_0{index + 1}
            </span>
            <span className="mt-1 font-mono text-[8px] uppercase tracking-widest text-white/20">
              HASH: AF-992
            </span>
          </div>
          <span
            className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] font-bold"
            style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}10` }}
          >
            {project.status}
          </span>
        </div>

        <h3 className="mt-4 font-sans text-2xl font-black uppercase italic leading-none tracking-tighter text-wpm-white group-hover:text-wpm-cyan transition-colors">
          {project.title}
        </h3>
        
        <div className="mt-3 flex items-center gap-3">
           <span className="h-px w-8 bg-white/10" />
           <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-wpm-muted">
            {project.category} <span className="mx-1 opacity-50">/</span> {project.year}
          </p>
        </div>

        <div className="mt-6 relative h-44 overflow-hidden border border-white/5 bg-black/40 group-hover:border-white/10 transition-colors">
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_3px]" aria-hidden="true" />
          
          {isBook ? (
            <div className="absolute inset-0 flex items-center justify-center bg-wpm-black/20" style={{ perspective: "1000px" }}>
              <div className="relative h-32 w-22 overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-y-[-20deg]"
                style={{ transform: "rotateY(-10deg) rotateX(5deg)" }}>
                {thumbnailImage && (
                  <Image
                    src={publicAssetPath(thumbnailImage)}
                    alt=""
                    fill
                    sizes="88px"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-wpm-black to-transparent">
               <div className="relative mb-4 flex h-10 w-10 items-center justify-center">
                  <div className="absolute inset-0 animate-spin-slow border border-dashed border-wpm-cyan/20 rounded-full" />
                  <span className="font-mono text-wpm-cyan/60 text-lg">[]</span>
               </div>
               <div className="flex flex-wrap justify-center gap-1.5 px-4">
                  {project.stack.slice(0, 3).map((tech) => (
                    <span key={tech} className="border border-white/5 bg-white/[0.02] px-3 py-0.5 font-mono text-[8px] uppercase tracking-wider text-wpm-muted group-hover:text-wpm-white transition-colors">
                      {tech}
                    </span>
                  ))}
               </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
           <p className="text-xs leading-relaxed text-wpm-gray line-clamp-2 max-w-[70%]">
            {project.subtitle}
          </p>
           <Link
            href={`/projects/${project.slug}`}
            className="wpm-btn-ripple flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-wpm-cyan transition-all hover:bg-wpm-cyan hover:text-wpm-black"
            aria-label={`Inspect ${project.title}`}
          >
            <span className="font-mono text-sm">{"->"}</span>
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/10 transition-colors group-hover:border-wpm-cyan/40" />
    </motion.div>
  );
}

export default function ProjectLibraryPanel() {
  return (
    <div className="space-y-8">
      <div className="border-l-2 border-wpm-cyan/40 pl-4 py-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-lavender/90">
          Operative_Index / {realProjects.length.toString().padStart(2, "0")}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-wpm-gray italic">
          Colecao de artefatos e evidencias de entrega real. Cada entrada representa um sistema, produto ou publicacao validada em ambiente de producao.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {realProjects.map((project, index) => (
          <ProjectCartridgePanel key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
