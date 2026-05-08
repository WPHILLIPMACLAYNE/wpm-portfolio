"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { publicAssetPath } from "@/lib/site";

function OperationalArtifact({ project }: { project: Project }) {
  const features = ["Dashboard", "NPS", "Turnos", "Backups"];
  const pipeline = project.stack.slice(0, 5);

  return (
    <div className="relative h-[23rem] sm:h-[29rem] lg:h-[34rem]" aria-hidden="true">
      <div className="absolute bottom-5 left-1/2 h-24 w-[82%] -translate-x-1/2 rounded-[50%] border border-wpm-cyan/25 bg-wpm-cyan/[0.035] shadow-[0_0_70px_rgba(116,247,255,0.12)]" />
      <div className="absolute bottom-12 left-1/2 h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent via-wpm-cyan/65 to-transparent" />

      {[2, 1, 0].map((layer) => (
        <motion.div
          key={layer}
          className="absolute left-1/2 top-[18%] h-64 w-[88%] max-w-[35rem] -translate-x-1/2 rounded-lg border border-wpm-cyan/20 bg-[#07111d]/72 p-4 shadow-[0_28px_90px_rgba(116,247,255,0.11)] backdrop-blur-xl sm:h-80 sm:p-5"
          style={{
            transform: `translateX(-50%) translateY(${layer * 16}px) rotateX(56deg) rotateZ(${layer * -1.3}deg)`,
            opacity: 1 - layer * 0.22,
            transformStyle: "preserve-3d",
          }}
          animate={layer === 0 ? { y: [0, -5, 0] } : undefined}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {layer === 0 && (
            <>
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-cyan/75">
                  Reception ops / map
                </span>
                <span className="rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300/80">
                  PWA
                </span>
              </div>

              <div className="grid grid-cols-[0.82fr_1.18fr] gap-3">
                <div className="rounded-md border border-white/[0.07] bg-wpm-black/45 p-3">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-wpm-gray">Operations</p>
                  <div className="space-y-2.5">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-wpm-cyan shadow-[0_0_8px_rgba(116,247,255,0.85)]" />
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-white/65">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-white/[0.07] bg-wpm-black/45 p-3">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-wpm-gray">Workflow rail</p>
                  <div className="space-y-3">
                    {pipeline.map((tech, index) => (
                      <div key={tech} className="grid grid-cols-[5rem_1fr] items-center gap-2">
                        <span className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-gray">
                          {tech}
                        </span>
                        <span className="h-1 rounded-full bg-white/10">
                          <span
                            className="block h-full rounded-full bg-gradient-to-r from-wpm-cyan to-wpm-purple"
                            style={{ width: `${42 + index * 10}%` }}
                          />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-md border border-white/[0.07] bg-wpm-black/45 p-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-wpm-gray">System modules</p>
                  <div className="flex gap-2">
                    {project.stack.slice(1, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-wpm-cyan/15 bg-wpm-cyan/5 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-cyan/65"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-[23%] h-[18rem] w-[92%] -translate-x-1/2 rounded-md border border-wpm-cyan/10 opacity-70" />
      <div className="absolute left-[12%] top-[58%] h-16 w-px bg-gradient-to-b from-transparent via-wpm-cyan/60 to-transparent" />
    </div>
  );
}

function BookArtifact({ project }: { project: Project }) {
  return (
    <div className="relative h-[23rem] sm:h-[29rem] lg:h-[34rem]" aria-hidden="true">
      <div className="absolute bottom-6 left-1/2 h-24 w-[72%] -translate-x-1/2 rounded-[50%] border border-wpm-purple/30 bg-wpm-purple/[0.055] shadow-[0_0_80px_rgba(108,77,255,0.16)]" />
      <motion.div
        className="absolute left-1/2 top-[8%] h-[18.5rem] w-[13rem] -translate-x-1/2 overflow-hidden rounded-md border border-wpm-purple/35 bg-wpm-black shadow-[0_38px_110px_rgba(108,77,255,0.25)] sm:h-[25rem] sm:w-[17.5rem] lg:h-[29rem] lg:w-[20rem]"
        style={{
          transform: "translateX(-50%) rotateY(-17deg) rotateX(3deg) rotateZ(2deg)",
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [0, -8, 0], rotateZ: [2, 1.2, 2] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut" }}
      >
        {project.coverImage && (
          <Image
            src={publicAssetPath(project.coverImage)}
            alt=""
            fill
            sizes="(max-width: 640px) 208px, (max-width: 1024px) 280px, 320px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-wpm-black/45" />
        <div className="absolute inset-y-0 left-0 w-6 bg-black/45" />
      </motion.div>
      <div className="absolute left-1/2 top-[30%] h-44 w-[90%] -translate-x-1/2 rounded-[50%] border border-wpm-cyan/10 opacity-60" />
      <div className="absolute right-[14%] top-[18%] h-[20rem] w-px bg-gradient-to-b from-transparent via-wpm-purple/55 to-transparent" />
    </div>
  );
}

export default function ProjectArtifact({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isBook = Boolean(project.coverImage);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block w-[calc(100vw-2.5rem)] max-w-full min-w-0 overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.018] transition-all duration-500 hover:-translate-y-1 hover:border-wpm-cyan/35 hover:bg-white/[0.032] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 sm:w-full"
      aria-label={`Inspect ${project.title}`}
    >
      <div
        className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 28%, ${project.accentColor}18, transparent 48%)`,
        }}
      />
      <div className="absolute inset-x-5 top-5 z-20 flex min-w-0 items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] text-wpm-cyan">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-3 max-w-80 break-words font-mono text-base uppercase leading-relaxed tracking-[0.18em] text-wpm-white/88 sm:text-lg sm:tracking-[0.16em]">
            {project.title}
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-gray">
            {project.category} / {project.year}
          </p>
        </div>
        <span
          className="shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em]"
          style={{
            color: project.accentColor,
            borderColor: `${project.accentColor}35`,
            backgroundColor: `${project.accentColor}10`,
          }}
        >
          {project.status}
        </span>
      </div>

      <div className="relative z-10 pt-28">
        {isBook ? <BookArtifact project={project} /> : <OperationalArtifact project={project} />}
      </div>

      <div className="absolute inset-x-5 bottom-5 z-20 flex items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
        <p className="line-clamp-2 text-sm leading-relaxed text-wpm-gray">{project.subtitle}</p>
        <span className="shrink-0 font-mono text-xs text-wpm-cyan/80 transition-transform group-hover:translate-x-1">
          Inspect -&gt;
        </span>
      </div>
    </Link>
  );
}
