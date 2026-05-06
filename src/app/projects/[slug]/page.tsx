import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import ConsoleShell from "@/components/console/ConsoleShell";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
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

const statusVariant: Record<string, "action" | "system" | "info"> = {
  Completed: "action",
  "In Progress": "system",
  Active: "system",
  Prototype: "info",
  Archived: "info",
};
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const links = project.links;
  const hasAnyLink = Object.values(links).some(
    (v) => v && v !== "#"
  );

  return (
    <ConsoleShell showNav={false}>
        <div className="px-6 py-12 pb-20 max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/console"
            className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray/90 hover:text-wpm-cyan transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
          >
          <span className="text-wpm-lavender/90">&lt;-</span> BACK TO CONSOLE
        </Link>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap min-w-0 overflow-hidden">
            <Badge variant="system">{project.category}</Badge>
            <span className="font-mono text-[11px] text-wpm-gray/90">{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-wpm-purple/30" />
            <Badge variant={statusVariant[project.status] ?? "info"} dot>
              {project.status}
            </Badge>
            {project.featured && (
              <Badge variant="action" size="sm">FEATURED</Badge>
            )}
          </div>

          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-3 break-words">
            {project.title}
          </h1>

          <p className="font-mono text-sm text-wpm-cyan/85 mb-6 break-words">{project.subtitle}</p>

          {/* Project cover image */}
          {project.coverImage && (
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] mb-6 overflow-hidden rounded-sm border border-white/[0.04]">
              <Image
                src={publicAssetPath(project.coverImage)}
                alt={`${project.title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wpm-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          <p className="text-wpm-gray/90 text-sm leading-relaxed break-words">
            {project.problem.slice(0, 200)}...
          </p>
        </div>

        {/* Role & Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 p-6 bg-wpm-card border border-white/[0.04] rounded-sm min-w-0 max-w-full overflow-hidden">
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-wpm-lavender/90 mb-2 uppercase tracking-wider">Role</p>
            <p className="text-wpm-white/70 break-words">{project.role}</p>
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[11px] text-wpm-lavender/90 mb-2 uppercase tracking-wider">Stack</p>
            <div className="flex flex-wrap gap-2 min-w-0 overflow-hidden">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="info" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Divider variant="subtle" className="mb-10" />

        {/* Case Study */}
        <div className="space-y-10 mb-12">
          <section>
            <h2 className="font-mono text-sm text-wpm-lavender/90 mb-3 tracking-wider uppercase">The Problem</h2>
            <p className="text-wpm-gray/90 leading-relaxed break-words">{project.problem}</p>
          </section>

          <section>
            <h2 className="font-mono text-sm text-wpm-lavender/90 mb-3 tracking-wider uppercase">The Solution</h2>
            <p className="text-wpm-gray/90 leading-relaxed break-words">{project.solution}</p>
          </section>

          <section>
            <h2 className="font-mono text-sm text-wpm-lavender/90 mb-3 tracking-wider uppercase">Process</h2>
            <p className="text-wpm-gray/90 leading-relaxed break-words">{project.process}</p>
          </section>

          <section>
            <h2 className="font-mono text-sm text-wpm-lavender/90 mb-3 tracking-wider uppercase">Results</h2>
            <p className="text-wpm-gray/90 leading-relaxed break-words">{project.results}</p>
          </section>
        </div>

        {/* Links */}
          {hasAnyLink && (
        <div className="flex gap-3 p-6 bg-wpm-card border border-white/[0.04] rounded-sm flex-wrap">
          {project.links.live && project.links.live !== "#" && (
            <Button as="a" href={project.links.live} target="_blank" rel="noopener noreferrer" variant="primary" size="sm">
              [ LIVE DEMO ]
            </Button>
          )}
          {project.links.github && project.links.github !== "#" && (
            <Button as="a" href={project.links.github} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
              [ GITHUB ]
            </Button>
          )}
          {project.links.figma && project.links.figma !== "#" && (
            <Button as="a" href={project.links.figma} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
              [ FIGMA ]
            </Button>
          )}
          {project.links.video && project.links.video !== "#" && (
            <Button as="a" href={project.links.video} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
              [ VIDEO ]
            </Button>
          )}
          {project.links.caseStudy && project.links.caseStudy !== "#" && (
            <Button as="a" href={project.links.caseStudy} target="_blank" rel="noopener noreferrer" variant="ghost" size="sm">
              [ CASE STUDY ]
            </Button>
          )}
        </div>
        )}
      </div>
    </ConsoleShell>
  );
}
