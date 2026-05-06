"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import ModuleSlideSystem from "./ModuleSlideSystem";
import ModulePanelFrame from "./ModulePanelFrame";
import ProjectLibraryPanel from "./panels/ProjectLibraryPanel";
import { menuItems } from "@/data/profile";
import { projects } from "@/data/projects";
import { ConsoleNav, SystemTelemetry } from "./ConsoleChrome";
import ConsoleModuleRibbon from "./ConsoleModuleRibbon";
import ProjectArtifact from "./ConsoleProjectArtifacts";

const featuredProjects = projects.filter((project) => project.featured && !project.locked).slice(0, 2);

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
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-gray/90">
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
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90 sm:text-xs">
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

                <p className="mt-9 max-w-md text-base leading-relaxed text-wpm-gray/90 sm:text-lg">
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
                    className="inline-flex min-h-14 w-[calc(100vw-2.5rem)] max-w-full items-center justify-center border border-white/[0.10] bg-white/[0.025] px-5 font-mono text-[13px] uppercase tracking-[0.12em] text-wpm-lavender/90 transition-all hover:-translate-y-0.5 hover:border-wpm-purple/40 hover:text-wpm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/60 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.16em]"
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
	                    initial={prefersReduced ? false : { opacity: 0, y: 28, rotateX: 4 }}
	                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
	                    transition={{ duration: 0.75, delay: 0.12 + index * 0.04, ease: "easeOut" }}
	                  >
                    <ProjectArtifact project={project} index={index} />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-white/[0.06] pt-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.16em] text-wpm-cyan">&gt; System ready.</p>
                <p className="mt-2 font-mono text-xs text-wpm-gray/90">Type, click or inspect the loaded artifacts.</p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-lavender/90">
                <span>/ Artifacts loaded</span>
                <span className="h-px w-24 bg-gradient-to-r from-wpm-purple/60 to-transparent" />
              </div>
            </div>
          </section>

          <ConsoleModuleRibbon activeModule={activeModule} onModuleSelect={setActiveModule} />
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
                <p className="font-mono text-sm text-wpm-gray/90">
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
