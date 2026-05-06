"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ModuleSlideSystem from "./ModuleSlideSystem";
import ModulePanelFrame from "./ModulePanelFrame";
import ProjectLibraryPanel from "./panels/ProjectLibraryPanel";
import { menuItems } from "@/data/profile";
import { projects, type Project } from "@/data/projects";
import { typeColors } from "./MenuModule";

const featuredProjects = projects.filter((project) => project.featured && !project.locked).slice(0, 2);
const activeMenuItems = menuItems.filter((item) => item.status === "Active");
const primaryNav = [
  { label: "Work", href: "/projects" },
  { label: "Profile", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

const telemetry = [
  ["SYS", "ONLINE"],
  ["SIGNAL", "STRONG"],
  ["MODE", "DOSSIER"],
  ["USER", "WPM"],
];

function SystemTelemetry() {
  return (
    <aside
      className="hidden xl:flex w-20 shrink-0 flex-col items-center justify-between border-r border-white/[0.06] bg-wpm-black/45 px-4 py-7"
      aria-label="System telemetry"
    >
      <div className="relative h-10 w-10 rounded-full border border-wpm-cyan/30">
        <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wpm-cyan shadow-[0_0_18px_rgba(116,247,255,0.8)]" />
        <div className="absolute inset-1 rounded-full border border-wpm-purple/20" />
        <div className="absolute -left-2 top-1/2 h-px w-3 bg-wpm-cyan/30" />
        <div className="absolute -right-2 top-1/2 h-px w-3 bg-wpm-cyan/30" />
        <div className="absolute -top-2 left-1/2 h-3 w-px bg-wpm-cyan/30" />
        <div className="absolute -bottom-2 left-1/2 h-3 w-px bg-wpm-cyan/30" />
      </div>

      <div className="flex w-full flex-col gap-8">
        {telemetry.map(([label, value]) => (
          <div key={label} className="text-left font-mono">
            <div className="mb-2 h-px w-3 bg-wpm-gray/35" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-wpm-gray/50">{label}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-wpm-cyan/80">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1 opacity-35" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="h-0.5 w-0.5 rounded-full bg-wpm-cyan/70" />
        ))}
      </div>
    </aside>
  );
}

function ConsoleNav() {
  return (
    <nav
      aria-label="Primary portfolio navigation"
      className="hidden items-center justify-end gap-9 md:flex"
    >
      {primaryNav.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className="group relative font-mono text-xs uppercase tracking-[0.24em] text-wpm-gray/65 transition-colors hover:text-wpm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#02040a]"
        >
          <span>{item.label}</span>
          <span
            className={`absolute -bottom-4 left-0 h-px bg-wpm-cyan transition-all duration-300 ${
              index === 0 ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-80"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
}

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
                <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-wpm-cyan/75">
                  Reception ops / map
                </span>
                <span className="rounded-sm border border-emerald-400/25 bg-emerald-400/10 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-emerald-300/80">
                  PWA
                </span>
              </div>

              <div className="grid grid-cols-[0.82fr_1.18fr] gap-3">
                <div className="rounded-md border border-white/[0.07] bg-wpm-black/45 p-3">
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-wpm-gray/55">Operations</p>
                  <div className="space-y-2.5">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-wpm-cyan shadow-[0_0_8px_rgba(116,247,255,0.85)]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-wpm-white/65">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border border-white/[0.07] bg-wpm-black/45 p-3">
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-wpm-gray/55">Workflow rail</p>
                  <div className="space-y-3">
                    {pipeline.map((tech, index) => (
                      <div key={tech} className="grid grid-cols-[5rem_1fr] items-center gap-2">
                        <span className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-wpm-gray/55">
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
                  <p className="font-mono text-[9px] uppercase tracking-widest text-wpm-gray/55">System modules</p>
                  <div className="flex gap-2">
                    {project.stack.slice(1, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-wpm-cyan/15 bg-wpm-cyan/5 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-wpm-cyan/65"
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
            src={project.coverImage}
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

function ProjectArtifact({ project, index }: { project: Project; index: number }) {
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
          <h2 className="mt-3 max-w-80 break-words font-mono text-base uppercase leading-relaxed tracking-[0.18em] text-wpm-white/88 sm:text-lg sm:tracking-[0.24em]">
            {project.title}
          </h2>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-gray/55">
            {project.category} / {project.year}
          </p>
        </div>
        <span
          className="shrink-0 rounded-sm border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]"
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
        <p className="line-clamp-2 text-sm leading-relaxed text-wpm-gray/65">{project.subtitle}</p>
        <span className="shrink-0 font-mono text-xs text-wpm-cyan/80 transition-transform group-hover:translate-x-1">
          Inspect -&gt;
        </span>
      </div>
    </Link>
  );
}

function ModuleRibbon({
  activeModule,
  onModuleSelect,
}: {
  activeModule: string | null;
  onModuleSelect: (id: string) => void;
}) {
  return (
    <section className="border-t border-white/[0.06] bg-wpm-black/25 px-5 py-5 backdrop-blur-xl md:px-10 xl:px-12">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-wpm-purple/70">Modules</p>
          <p className="mt-2 max-w-xl text-sm text-wpm-gray/55">
            Explore the operating profile without leaving the WPM.OS visual system.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:flex xl:flex-wrap xl:justify-end" role="list" aria-label="Module shortcuts">
          {activeMenuItems.map((item) => {
            const typeColor = typeColors[item.type] ?? "#7E8797";
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModuleSelect(item.id)}
                aria-expanded={isActive}
                aria-controls="module-panel"
                className="group relative min-h-14 min-w-40 overflow-hidden rounded-sm border border-white/[0.06] bg-white/[0.018] px-3 py-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-white/[0.14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
                style={{
                  background: `linear-gradient(90deg, ${typeColor}10, rgba(255,255,255,0.018))`,
                }}
              >
                <span
                  className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full"
                  style={{ backgroundColor: isActive ? `${typeColor}ff` : `${typeColor}88` }}
                />
                <span className="block truncate pl-2 font-sans text-sm text-wpm-white/75 group-hover:text-wpm-white">
                  {item.label}
                </span>
                <span className="mt-1 block pl-2 font-mono text-[9px] uppercase tracking-[0.14em] text-wpm-gray/45">
                  {item.type}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function ConsoleMenu() {
  const prefersReduced = useReducedMotion();
  const [activeModule, setActiveModule] = useState<string | null>(null);

  const activeItem = activeModule
    ? menuItems.find((item) => item.id === activeModule) ?? null
    : null;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      event.currentTarget.style.setProperty("--wpm-parallax-x", `${x * 18}px`);
      event.currentTarget.style.setProperty("--wpm-parallax-y", `${y * 12}px`);
    },
    [prefersReduced]
  );

  return (
    <div
      className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-[#02040a]"
      onPointerMove={handlePointerMove}
    >
      <h1 className="sr-only">WPM.OS — Operating evidence for work that ships</h1>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_43%_32%,rgba(7,27,58,0.92),transparent_43%),radial-gradient(circle_at_80%_25%,rgba(108,77,255,0.15),transparent_34%),linear-gradient(180deg,rgba(5,5,9,0.55),#02040a_82%)]" />
        <div className="absolute inset-0 bg-noise opacity-50" />
        <div className="absolute left-[8%] top-[12%] h-px w-[78%] bg-gradient-to-r from-wpm-cyan/65 via-white/10 to-transparent" />
        <div className="absolute bottom-28 left-[28%] h-px w-[56%] bg-gradient-to-r from-transparent via-wpm-cyan/35 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-[64%] h-72 w-[58rem] -translate-x-1/2 rounded-[50%] border border-wpm-cyan/10 bg-wpm-cyan/[0.025]"
          style={{
            transform:
              "translateX(calc(-50% + var(--wpm-parallax-x, 0px))) translateY(var(--wpm-parallax-y, 0px)) rotateX(68deg)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)]">
        <SystemTelemetry />

        <div className="flex min-w-0 flex-1 flex-col">
          <section className="flex min-w-0 flex-1 flex-col px-5 py-7 md:px-10 md:py-9 xl:px-12">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-wpm-gray/45">
                <span className="text-wpm-cyan/70">WPM.OS</span>
                <span className="ml-3">v1.0</span>
              </div>
              <ConsoleNav />
            </div>

            <div className="grid flex-1 min-w-0 gap-10 xl:grid-cols-[0.85fr_1.15fr] xl:items-center 2xl:grid-cols-[0.7fr_1.3fr]">
              <motion.div
                initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="min-w-0"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-wpm-purple/75 sm:text-xs">
                  {"// Interactive portfolio system"}
                </p>
                <div className="mt-7">
                  <p className="max-w-full font-sans text-[clamp(3.7rem,17vw,10rem)] font-black leading-[0.78] tracking-[-0.09em] text-wpm-white md:text-[clamp(5.5rem,11vw,11.5rem)]">
                    WPM<span className="text-wpm-cyan drop-shadow-[0_0_28px_rgba(116,247,255,0.55)]">.OS</span>
                  </p>
                  <p className="mt-7 max-w-[20rem] break-words font-mono text-[clamp(0.82rem,3.8vw,1.55rem)] uppercase leading-snug tracking-[0.01em] text-wpm-white/85 sm:max-w-[38rem] sm:tracking-[0.13em] xl:text-[clamp(1.15rem,1.65vw,1.75rem)]">
                    <span className="block sm:inline">Operating evidence</span>
                    <span className="block sm:inline">
                      {" "}
                      for work that <span className="text-wpm-cyan">ships</span>
                    </span>
                  </p>
                </div>

                <p className="mt-9 max-w-md text-base leading-relaxed text-wpm-gray/75 sm:text-lg">
                  Product thinking, operations, UX and web systems built from <span className="text-wpm-cyan">real constraints</span>.
                </p>

                <div className="mt-9 flex w-full max-w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Link
                    href="/projects"
                    className="group inline-flex min-h-14 w-[calc(100vw-2.5rem)] max-w-full items-center justify-center gap-3 border border-wpm-cyan/55 bg-wpm-cyan/10 px-5 font-mono text-[13px] uppercase tracking-[0.12em] text-wpm-cyan shadow-[0_0_35px_rgba(116,247,255,0.13)] transition-all hover:-translate-y-0.5 hover:bg-wpm-cyan/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.16em]"
                  >
                    <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
                    Inspect work
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-14 w-[calc(100vw-2.5rem)] max-w-full items-center justify-center border border-white/[0.10] bg-white/[0.025] px-5 font-mono text-[13px] uppercase tracking-[0.12em] text-wpm-purple/80 transition-all hover:-translate-y-0.5 hover:border-wpm-purple/40 hover:text-wpm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/60 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.16em]"
                  >
                    Open signal
                  </Link>
                </div>
              </motion.div>

              <div className="grid min-w-0 gap-5 lg:grid-cols-2 [perspective:1600px]">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    className="min-w-0"
                    initial={prefersReduced ? false : { opacity: 0, y: 28, rotateX: 7 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.75, delay: 0.12 + index * 0.1, ease: "easeOut" }}
                  >
                    <ProjectArtifact project={project} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.16em] text-wpm-cyan">&gt; System ready.</p>
                <p className="mt-2 font-mono text-xs text-wpm-gray/50">Type, click or inspect the loaded artifacts.</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-wpm-purple/55">
                <span>/ Artifacts loaded</span>
                <span className="h-px w-24 bg-gradient-to-r from-wpm-purple/60 to-transparent" />
              </div>
            </div>
          </section>

          <ModuleRibbon activeModule={activeModule} onModuleSelect={setActiveModule} />
        </div>
      </div>

      <ModuleSlideSystem activeModule={activeModule} onClose={() => setActiveModule(null)}>
        {activeItem && (
          <ModulePanelFrame
            moduleLabel={activeItem.label}
            moduleId={activeItem.id}
            pageHref={activeItem.href}
            onClose={() => setActiveModule(null)}
          >
            {activeModule === "projects" ? (
              <ProjectLibraryPanel />
            ) : (
              <div className="py-12 text-center">
                <p className="font-mono text-sm text-wpm-gray/55">
                  Full content available on the dedicated page.
                </p>
                <Link
                  href={activeItem.href}
                  className="mt-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.16em] text-wpm-cyan/80 transition-all hover:text-wpm-cyan hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/50"
                >
                  Open full page <span>-&gt;</span>
                </Link>
              </div>
            )}
          </ModulePanelFrame>
        )}
      </ModuleSlideSystem>
    </div>
  );
}
