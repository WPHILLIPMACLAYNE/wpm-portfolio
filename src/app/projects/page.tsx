import StaticConsoleShell from "@/components/console/StaticConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";
import ProjectCartridge from "@/components/console/ProjectCartridge";
import { projects, getFeaturedProjects } from "@/data/projects";

const featuredProofs: Record<string, string[]> = {
  "wpm-gestao-interna": ["PWA", "Offline", "Supabase", "Recepção de academias"],
  "livro-llm-agentes": ["290 páginas", "7 partes", "26 capítulos", "3 apêndices"],
};

export default function ProjectsPage() {
  const featured = getFeaturedProjects();
  const more = projects.filter((p) => !p.locked && !p.featured);
  const locked = projects.filter((p) => p.locked);

  return (
    <StaticConsoleShell currentHref="/projects" currentLabel="Project Library">
      <ModuleSceneLayout
        moduleId="projects"
        title="Biblioteca de Projetos"
        subtitle="Arquivo principal de cases: estudos publicados, artefatos, metadados e entrada direta nos dossies de projeto."
      >
        {/* Featured Projects */}
        {featured.length > 0 && (
          <section className="wpm-data-surface p-5 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "#74F7FF",
                  boxShadow: "0 0 6px rgba(116,247,255,0.4)",
                }}
              />
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-wpm-cyan/80">
                Work index / featured
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((project, i) => (
                <div key={project.slug} className="flex flex-col gap-4">
                  <ProjectCartridge
                    project={project}
                    index={i}
                    number={i + 1}
                  />
                  {/* Proof chips below each card */}
                  <div className="flex flex-wrap gap-2 px-1 min-w-0 overflow-hidden">
                    {(featuredProofs[project.slug] ?? []).map((chip) => (
                      <span
                        key={chip}
                    className="font-mono text-[11px] text-wpm-gray bg-white/[0.035] border border-white/[0.08] px-2 py-0.5 rounded-sm break-words max-w-full"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Role legend */}
        <section className="border border-white/[0.07] bg-white/[0.02] p-5">
          <p className="font-mono text-[11px] text-wpm-gray uppercase tracking-[0.14em] leading-relaxed">
            Each project represents a complete body of work — problem
            identification, solution design, implementation, and documented
            results.
          </p>
        </section>

        {/* More Projects — only if any exist */}
        {more.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-wpm-gray/40" />
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-wpm-gray">
                More Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {more.map((project, i) => (
                <ProjectCartridge
                  key={project.slug}
                  project={project}
                  index={featured.length + i}
                />
              ))}
            </div>
          </section>
        )}

        {/* Locked — only if any exist */}
        {locked.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-wpm-purple/30" />
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-wpm-lavender/90">
                Encrypted
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locked.map((project, i) => (
                <ProjectCartridge
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </section>
        )}
      </ModuleSceneLayout>
    </StaticConsoleShell>
  );
}
