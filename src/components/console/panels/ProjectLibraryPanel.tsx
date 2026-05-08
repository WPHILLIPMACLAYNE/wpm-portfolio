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
      initial={prefersReduced ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.018]"
    >
      <div
        className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 28%, ${project.accentColor}18, transparent 48%)` }}
      />
      <div className="relative z-10 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] text-wpm-cyan">{String(index + 1).padStart(2, "0")}</p>
          <span
            className="shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: project.accentColor, borderColor: `${project.accentColor}35`, backgroundColor: `${project.accentColor}10` }}
          >
            {project.status}
          </span>
        </div>
        <h3 className="mt-3 max-w-full break-words font-mono text-base uppercase leading-relaxed tracking-[0.16em] text-wpm-white/88 sm:text-lg">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-gray">
          {project.category} / {project.year}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-wpm-gray">{project.subtitle}</p>
        <div className="mt-5 relative h-48 sm:h-56 rounded-lg overflow-hidden border border-white/[0.05]">
          {isBook ? (
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }}>
              <div className="relative h-36 w-24 overflow-hidden rounded-sm border border-wpm-purple/30 shadow-[0_20px_60px_rgba(108,77,255,0.25)] sm:h-44 sm:w-28"
                style={{ transform: "rotateY(-15deg) rotateX(3deg)" }}>
                {thumbnailImage && (
                  <Image
                    src={publicAssetPath(thumbnailImage)}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/40" />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full border border-emerald-400/20 bg-emerald-400/5 flex items-center justify-center">
                <span className="font-mono text-emerald-300/80 text-lg">&gt;_</span>
              </div>
              <div className="flex gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-sm border border-emerald-400/15 bg-emerald-400/5 px-2 py-0.5 font-mono text-[11px] uppercase text-emerald-300/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-wpm-cyan/80 transition-all hover:text-wpm-cyan hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/50"
        >
          Inspect full case <span>-&gt;</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function ProjectLibraryPanel() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">
          Real Work / {realProjects.length.toString().padStart(2, "0")}
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-wpm-gray">
          Each artifact represents a shipped project. Inspect the full case study for deep-dive details.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {realProjects.map((project, index) => (
          <ProjectCartridgePanel key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}
