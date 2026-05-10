"use client";

import { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import ModuleSlideSystem from "./ModuleSlideSystem";
import ModulePanelFrame from "./ModulePanelFrame";
import ModulePreviewPanel from "./ModulePreviewPanel";
import ProjectLibraryPanel from "./panels/ProjectLibraryPanel";
import { menuItems } from "@/data/profile";
import { projects } from "@/data/projects";
import { ConsoleNav, SystemTelemetry } from "./ConsoleChrome";
import ProjectArtifact from "./ConsoleProjectArtifacts";
import { getModuleScene, toneClasses } from "./moduleSceneData";

const activeMenuItems = menuItems.filter((item) => item.status === "Active");
const featuredProjects = projects.filter((project) => project.featured && !project.locked).slice(0, 2);

export default function ConsoleMenu() {
  const prefersReduced = useReducedMotion();
  const [focusedModule, setFocusedModule] = useState(activeMenuItems[0]?.id ?? "projects");
  const [openModule, setOpenModule] = useState<string | null>(null);

  const focusedItem = useMemo(
    () => activeMenuItems.find((item) => item.id === focusedModule) ?? activeMenuItems[0],
    [focusedModule]
  );
  const openItem = openModule ? menuItems.find((item) => item.id === openModule) ?? null : null;

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (prefersReduced) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      event.currentTarget.style.setProperty("--wpm-parallax-x", `${x * 14}px`);
      event.currentTarget.style.setProperty("--wpm-parallax-y", `${y * 10}px`);
    },
    [prefersReduced]
  );

  const handleModuleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const count = activeMenuItems.length;
    let next = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;

    event.preventDefault();
    const nextItem = activeMenuItems[next];
    setFocusedModule(nextItem.id);
    document.querySelector<HTMLButtonElement>(`[data-module-command="${nextItem.id}"]`)?.focus();
  }, []);

  return (
    <div
      className="relative min-h-[calc(100vh-7rem)] overflow-hidden bg-[#02040a]"
      onPointerMove={handlePointerMove}
    >
      <h1 className="sr-only">WPM.OS - command deck premium do portfolio Wallace Phillip Maclayne</h1>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_18%,rgba(7,27,58,0.94),transparent_42%),radial-gradient(circle_at_84%_14%,rgba(116,247,255,0.09),transparent_28%),linear-gradient(180deg,rgba(5,5,9,0.24),#02040a_84%)]" />
        <div className="absolute inset-0 bg-noise opacity-45" />
        <div className="absolute left-[8%] top-[12%] h-px w-[78%] bg-gradient-to-r from-wpm-cyan/55 via-white/10 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-[63%] h-80 w-[60rem] -translate-x-1/2 rounded-[50%] border border-wpm-cyan/10 bg-wpm-cyan/[0.018]"
          style={{
            transform:
              "translateX(calc(-50% + var(--wpm-parallax-x, 0px))) translateY(var(--wpm-parallax-y, 0px)) rotateX(68deg)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)]">
        <SystemTelemetry />

        <section className="flex min-w-0 flex-1 flex-col px-4 py-6 md:px-8 md:py-8 xl:px-10">
          <div className="mb-6 flex flex-col gap-4 border-b border-white/[0.06] pb-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-wpm-cyan/75">WPM.OS / Command Deck</p>
              <p className="mt-3 max-w-2xl font-sans text-4xl font-semibold leading-[0.96] tracking-normal text-wpm-white sm:text-6xl lg:text-7xl">
                Dossie operacional interativo
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-wpm-text-secondary">
                Um launcher autoral para navegar entre projetos reais, perfil, skills, carreira, laboratorio e contato sem perder clareza.
              </p>
            </div>
            <ConsoleNav />
          </div>

          <div className="grid flex-1 gap-5 xl:grid-cols-[22rem_minmax(0,1fr)] 2xl:grid-cols-[24rem_minmax(0,1fr)]">
            <nav aria-label="Modulos WPM.OS" className="min-w-0">
              <div className="wpm-data-surface p-3">
                <div className="mb-3 flex items-center justify-between px-2">
                  <p className="wpm-section-title">Module rail</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-wpm-muted">
                    {activeMenuItems.length} ativos
                  </span>
                </div>

                <div className="space-y-3" role="list">
                  {activeMenuItems.map((item, index) => {
                    const scene = getModuleScene(item.id);
                    const tone = toneClasses[scene.tone];
                    const selected = item.id === focusedModule;
                    const isPrincipal = scene.weight === "principal";

                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        data-module-command={item.id}
                        onClick={() => setFocusedModule(item.id)}
                        onFocus={() => setFocusedModule(item.id)}
                        onKeyDown={(event) => handleModuleKeyDown(event, index)}
                        initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                        aria-pressed={selected}
                        className={`group relative w-full overflow-hidden border px-4 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70 ${
                          selected 
                            ? `${tone.border} ${tone.bg} shadow-[inset_0_0_20px_rgba(0,0,0,0.4)]` 
                            : "border-white/[0.04] bg-transparent hover:border-white/[0.1] hover:bg-white/[0.01]"
                        } ${isPrincipal ? "min-h-32" : "min-h-24"}`}
                      >
                        {/* Selector indicator */}
                        {selected && (
                          <motion.div 
                            layoutId="module-selector"
                            className={`absolute left-0 top-0 h-full w-[4px] ${tone.bg.replace('/[0.075]', '')} shadow-[0_0_12px_currentColor] ${tone.text}`} 
                          />
                        )}
                        
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                               <span className={`font-mono text-[9px] uppercase tracking-[0.2em] ${selected ? tone.text : "text-wpm-muted"}`}>
                                 {scene.signal}
                               </span>
                               {selected && (
                                 <motion.span 
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: [0, 1, 0] }}
                                   transition={{ duration: 1, repeat: Infinity }}
                                   className={`h-1 w-1 rounded-full ${tone.text.replace('text-', 'bg-')}`}
                                 />
                               )}
                            </div>
                            <span className={`mt-2 block font-sans text-lg font-bold tracking-tight uppercase italic ${selected ? "text-wpm-white" : "text-wpm-white/60"}`}>
                              {item.label}
                            </span>
                            <span className="mt-1 block text-[11px] leading-relaxed text-wpm-muted group-hover:text-wpm-gray transition-colors line-clamp-1">
                              {item.description}
                            </span>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 shrink-0">
                             <span className={`border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] ${selected ? `${tone.border} ${tone.text}` : "border-white/[0.06] text-wpm-muted"}`}>
                               {scene.weight}
                             </span>
                             {selected && (
                               <span className="font-mono text-[8px] text-wpm-cyan/40 animate-pulse">
                                 READ_OP
                               </span>
                             )}
                          </div>
                        </div>

                        {/* Background subtle number */}
                        <span className="absolute -bottom-2 -right-1 font-mono text-4xl font-black text-white/[0.02] select-none pointer-events-none">
                          0{index + 1}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <Link
                  href="/projects"
                  className="wpm-btn-ripple inline-flex min-h-12 items-center justify-center border border-wpm-cyan/40 bg-wpm-cyan/[0.07] px-4 font-mono text-[12px] uppercase tracking-[0.14em] text-wpm-cyan transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
                >
                  Inspecionar projetos
                </Link>
                <button
                  type="button"
                  onClick={() => setOpenModule(focusedItem.id)}
                  className="wpm-btn-ripple inline-flex min-h-12 items-center justify-center border border-white/[0.09] bg-white/[0.018] px-4 font-mono text-[12px] uppercase tracking-[0.14em] text-wpm-gray transition-colors hover:border-white/[0.18] hover:text-wpm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/60"
                >
                  Abrir preview tatico
                </button>
              </div>
            </nav>

            <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_22rem]">
              <ModulePreviewPanel item={focusedItem} />

              <aside className="grid min-w-0 gap-5">
                <div className="wpm-data-surface hidden p-4 lg:block">
                  <p className="wpm-section-title">Artefatos em foco</p>
                  <div className="mt-4 grid gap-4">
                    {featuredProjects.map((project, index) => (
                      <ProjectArtifact key={project.slug} project={project} index={index} />
                    ))}
                  </div>
                </div>

                <div className="border border-white/[0.07] bg-white/[0.018] p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-wpm-cyan">Sistema pronto</p>
                  <p className="mt-2 text-sm leading-relaxed text-wpm-gray">
                    Selecione um modulo para atualizar o preview. Enter abre comandos, Tab percorre as acoes, Esc retorna ao console nas paginas internas.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <ModuleSlideSystem activeModule={openModule} onClose={() => setOpenModule(null)}>
        {openItem && (
          <ModulePanelFrame
            moduleLabel={openItem.label}
            moduleId={openItem.id}
            pageHref={openItem.href}
            onClose={() => setOpenModule(null)}
          >
            {openItem.id === "projects" ? (
              <ProjectLibraryPanel />
            ) : (
              <ModulePreviewPanel item={openItem} variant="panel" />
            )}
          </ModulePanelFrame>
        )}
      </ModuleSlideSystem>
    </div>
  );
}
