import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ConsoleShell from "@/components/console/ConsoleShell";
import Image from "next/image";
import { SITE_TITLE, absoluteUrl, publicAssetPath } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects
    .filter((project) => !project.locked)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: `Project not found | ${SITE_TITLE}`,
    };
  }

  const description = project.description ?? project.subtitle;
  const url = absoluteUrl(`/projects/${project.slug}`);
  const socialImage = project.ogImage ?? project.coverImage;
  const image = socialImage
    ? {
        url: absoluteUrl(socialImage),
        alt: `${project.title} cover`,
      }
    : undefined;

  return {
    title: project.title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | ${SITE_TITLE}`,
      description,
      url,
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${SITE_TITLE}`,
      description,
      images: socialImage ? [absoluteUrl(socialImage)] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = project.links;
  const hasAnyLink = Object.values(links).some(
    (v) => v && v !== "#"
  );

  return (
    <ConsoleShell mode="page" showNav={true}>
      <div className="relative min-h-screen bg-[#02040a] px-4 py-8 pb-32 md:px-8 lg:px-12">
        <div 
          className="pointer-events-none fixed inset-0 z-0 opacity-10"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.accentColor}, transparent 50%)` }}
        />

        <div className="mx-auto max-w-6xl relative z-10">
          <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-4">
            <Link
              href="/console"
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-muted transition-colors hover:text-wpm-cyan"
            >
              <span className="border border-white/10 px-1.5 py-0.5 group-hover:border-wpm-cyan/40">ESC</span>
              <span>Retornar ao Command Deck</span>
            </Link>
            <div className="flex items-center gap-4 font-mono text-[9px] text-wpm-muted uppercase tracking-[0.15em]">
               <span>Artifact_ID: <span style={{ color: project.accentColor }}>{project.slug.toUpperCase()}</span></span>
               <span className="hidden md:inline">Ver: 2.1.0</span>
            </div>
          </div>

          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-8">
               <span className="border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest font-bold" 
                     style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, backgroundColor: `${project.accentColor}08` }}>
                 {project.category}
               </span>
               <span className="font-mono text-[10px] text-wpm-muted uppercase tracking-[0.2em]">Deploy_Year: {project.year}</span>
               <div className="h-1 w-1 rounded-full bg-white/20" />
               <span className="font-mono text-[10px] text-wpm-success uppercase tracking-[0.2em] font-bold">{project.status}</span>
            </div>

            <h1 className="font-sans text-5xl md:text-7xl lg:text-9xl font-black uppercase italic tracking-tighter text-wpm-white mb-6 wpm-glitch leading-[0.85]" data-text={project.title}>
              {project.title}
            </h1>
            
            <p className="max-w-3xl text-xl md:text-2xl font-medium leading-relaxed text-wpm-text-secondary border-l-4 pl-6" style={{ borderColor: `${project.accentColor}60` }}>
              {project.subtitle}
            </p>
          </header>

          {project.coverImage && (
            <div className="relative w-full aspect-[21/9] mb-20 overflow-hidden border border-white/10 bg-black/40 group shadow-2xl">
               <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" aria-hidden="true" />
               <Image
                src={publicAssetPath(project.coverImage)}
                alt={`${project.title} cover`}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
                 <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">Visual_Capture_Ref</span>
                 <span className="font-mono text-[10px] uppercase font-bold text-white/90">IMG_SOURCE_STABLE</span>
              </div>
            </div>
          )}

          <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
            <main className="space-y-16">
              <section className="relative border border-white/5 bg-[#0a0d14]/40 p-8 md:p-10">
                 <div className="absolute top-0 left-0 h-4 w-4 border-t border-l border-white/20" />
                 <div className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-white/20" />
                 
                 <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-8 bg-wpm-cyan/40" />
                    <h2 className="wpm-section-title !text-[12px] opacity-100 uppercase font-black italic">Análise de Operação</h2>
                 </div>
                 
                 <div className="space-y-12">
                   <div>
                     <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-wpm-muted mb-4">01_O Problema</p>
                     <p className="font-sans text-lg leading-relaxed text-wpm-text-secondary">{project.problem}</p>
                   </div>
                   <div>
                     <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-wpm-muted mb-4">02_A Solução</p>
                     <p className="font-sans text-lg leading-relaxed text-wpm-text-secondary">{project.solution}</p>
                   </div>
                   <div>
                     <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-wpm-muted mb-4">03_Processo_Executivo</p>
                     <p className="font-sans text-lg leading-relaxed text-wpm-text-secondary">{project.process}</p>
                   </div>
                 </div>
              </section>

              <section className="border-l-2 border-white/5 pl-8 py-2">
                 <div className="flex items-center gap-3 mb-6">
                    <h2 className="wpm-section-title !text-[12px] opacity-80 uppercase font-black">Evidências e Resultados</h2>
                 </div>
                 <p className="font-sans text-xl font-medium italic leading-relaxed text-wpm-white/90">
                   &quot;{project.results}&quot;
                 </p>
              </section>
            </main>

            <aside className="space-y-8">
              <section className="border border-white/10 bg-white/[0.02] p-6">
                 <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-cyan mb-6 font-bold">Specs_Hardware</p>
                 
                 <div className="space-y-6">
                    <div>
                       <span className="font-mono text-[8px] uppercase tracking-widest text-wpm-muted block mb-2">SPECS_ROLE</span>
                       <p className="font-mono text-[11px] uppercase font-bold text-wpm-white/80">{project.role}</p>
                    </div>
                    
                    <div className="h-px w-full bg-white/5" />
                    
                    <div>
                       <span className="font-mono text-[8px] uppercase tracking-widest text-wpm-muted block mb-4">TECH_STACK_DUMP</span>
                       <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span key={tech} className="border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[9px] uppercase text-wpm-white/60">
                               {tech}
                            </span>
                          ))}
                       </div>
                    </div>
                 </div>
              </section>

              {hasAnyLink && (
                <section className="border border-wpm-cyan/20 bg-wpm-cyan/[0.02] p-6">
                   <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-wpm-cyan mb-6 font-bold">Protocolos_Acao</p>
                   <div className="flex flex-col gap-3">
                      {project.links.live && project.links.live !== "#" && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" 
                           className="wpm-btn-ripple flex min-h-12 items-center justify-between border border-wpm-cyan/40 bg-wpm-cyan/[0.05] px-4 font-mono text-[10px] uppercase tracking-widest text-wpm-cyan transition-all hover:bg-wpm-cyan/10">
                           Acessar Deploy <span className="opacity-50">01</span>
                        </a>
                      )}
                      {project.links.github && project.links.github !== "#" && (
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer" 
                           className="wpm-btn-ripple flex min-h-12 items-center justify-between border border-white/10 bg-white/[0.02] px-4 font-mono text-[10px] uppercase tracking-widest text-wpm-muted hover:text-wpm-white">
                           Code_Repository <span className="opacity-50">02</span>
                        </a>
                      )}
                      {project.links.caseStudy && project.links.caseStudy !== "#" && (
                        <a href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" 
                           className="wpm-btn-ripple flex min-h-12 items-center justify-between border border-white/10 bg-white/[0.02] px-4 font-mono text-[10px] uppercase tracking-widest text-wpm-muted hover:text-wpm-white">
                           Doc_Case_Study <span className="opacity-50">03</span>
                        </a>
                      )}
                   </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </div>
    </ConsoleShell>
  );
}
