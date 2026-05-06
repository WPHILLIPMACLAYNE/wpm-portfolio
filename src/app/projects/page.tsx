import Link from "next/link";
import StaticConsoleShell from "@/components/console/StaticConsoleShell";
import ProjectCartridge from "@/components/console/ProjectCartridge";
import { projects, getFeaturedProjects } from "@/data/projects";
import Divider from "@/components/ui/Divider";

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
      <div className="px-4 md:px-6 py-12 max-w-4xl mx-auto pb-20">
        {/* Back link */}
        <Link
          href="/console"
            className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray/90 hover:text-wpm-cyan transition-colors mb-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
        >
          <span className="text-wpm-lavender/90">&lt;-</span> BACK TO CONSOLE
        </Link>

        {/* Header — curated work index */}
        <header className="mb-14">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90 mb-4">
            REAL WORK / 02
          </p>
          <h1 className="font-sans text-3xl md:text-5xl font-light tracking-tight text-wpm-white/90 max-w-2xl break-words">
            Two shipped bodies of work
          </h1>
          <p className="mt-3 font-sans text-sm text-wpm-gray/90 leading-snug max-w-md break-words">
            One operational system. One editorial product. Both shipped from
            real constraints.
          </p>
        </header>

        {/* Featured Projects */}
        {featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: "#74F7FF",
                  boxShadow: "0 0 6px rgba(116,247,255,0.4)",
                }}
              />
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-wpm-cyan/80">
                Work Index
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
                    className="font-mono text-[11px] text-wpm-gray/90 bg-white/[0.035] border border-white/[0.08] px-2 py-0.5 rounded-sm break-words max-w-full"
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

        <Divider variant="accent" className="mb-14 opacity-30" />

        {/* Role legend */}
        <section className="mb-10">
          <p className="font-mono text-[11px] text-wpm-gray/90 uppercase tracking-wider">
            Each project represents a complete body of work — problem
            identification, solution design, implementation, and documented
            results.
          </p>
        </section>

        {/* More Projects — only if any exist */}
        {more.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-wpm-gray/40" />
              <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-wpm-gray/90">
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
          <section className="mb-14">
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
      </div>
    </StaticConsoleShell>
  );
}
