import Image from "next/image";
import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCartridgeProps {
  project: Project;
  index: number;
  /** Optional: display sequence number (01, 02) */
  number?: number;
}

const statusColors: Record<string, string> = {
  Completed: "bg-wpm-cyan/60",
  "In Progress": "bg-wpm-purple/60",
  Active: "bg-emerald-500/60",
  Prototype: "bg-wpm-gray/40",
  Archived: "bg-wpm-gray/30",
};

export default function ProjectCartridge({ project, number }: ProjectCartridgeProps) {
  const accent = project.accentColor || "#6C4DFF";

  if (project.locked) {
    return (
      <article
        className="relative bg-wpm-card border border-white/[0.02] rounded-sm p-6
                   flex flex-col gap-4 h-full opacity-50 pointer-events-none select-none"
        role="article"
        aria-label={`${project.title} — Locked`}
      >
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-wider text-wpm-gray/70 whitespace-nowrap">
            {project.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-wpm-gray/30" />
          <span className="font-mono text-[10px] text-wpm-gray/65 whitespace-nowrap">{project.year}</span>
        </div>
        <h3 className="text-lg font-medium text-wpm-gray/65 break-words">{project.title}</h3>
        <p className="text-sm text-wpm-gray/55 leading-relaxed line-clamp-2 flex-1 break-words">
          {project.subtitle}
        </p>
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.02]">
          <span className="w-1.5 h-1.5 rounded-full bg-wpm-purple/30" />
          <span className="font-mono text-[10px] text-wpm-purple/65">LOCKED</span>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block group focus-visible:outline-none"
    >
      <article
        className="relative bg-wpm-card border border-white/[0.04] rounded-sm
                   group-focus-visible:ring-2 group-focus-visible:ring-wpm-purple/50
                   group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-wpm-black
                   flex flex-col h-full transition-colors transition-transform duration-300 overflow-hidden
                   hover:-translate-y-1 hover:border-white/[0.14]"
        style={{ borderColor: "rgba(255,255,255,0.04)" }}
        role="article"
        aria-label={`${project.title} — ${project.category}, ${project.year}`}
      >
        {/* Glow on hover — uses project accentColor */}
        <div
          className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at center, ${accent}10, transparent 70%)`,
          }}
        />

        {/* Cover image or visual fallback */}
        {project.coverImage ? (
          <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden border-b border-white/[0.04]">
            <Image
              src={project.coverImage}
              alt={`${project.title} cover`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient overlay to blend with card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-wpm-card via-wpm-card/40 to-transparent pointer-events-none" />
          </div>
        ) : (
          /* Abstract visual fallback for projects without coverImage */
          <div
            className="relative w-full aspect-[16/9] sm:aspect-[2/1] overflow-hidden border-b border-white/[0.04]"
            style={{
              background: `linear-gradient(135deg, ${accent}15 0%, transparent 50%, ${accent}0a 100%)`,
            }}
          >
            {/* Abstract system grid */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(${accent}30 1px, transparent 1px),
                  linear-gradient(90deg, ${accent}30 1px, transparent 1px)
                `,
                backgroundSize: "24px 24px",
              }}
            />
            {/* Flowing lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="space-y-2 w-3/4">
                {[60, 80, 40, 70, 50].map((w, i) => (
                  <div
                    key={i}
                    className="h-[3px] rounded-full"
                    style={{
                      width: `${w}%`,
                      backgroundColor: `${accent}30`,
                      opacity: 0.3 + i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Module label */}
            <div className="absolute bottom-3 left-4 font-mono text-[9px] text-wpm-gray/70 uppercase tracking-[0.2em]">
              system.modules.active
            </div>
          </div>
        )}

        {/* Card body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 flex-1">
          {/* Number badge */}
          {number && (
            <span className="font-mono text-[14px] text-wpm-purple/80 font-bold tracking-wide select-none">
              {String(number).padStart(2, "0")}
            </span>
          )}

          {/* Top: category + year */}
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-mono text-[10px] uppercase tracking-wider text-wpm-purple/90 whitespace-nowrap">
              {project.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-wpm-purple/30 flex-shrink-0" />
            <span className="font-mono text-[10px] text-wpm-gray/75 whitespace-nowrap">{project.year}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium text-wpm-white/90 group-hover:text-glow-cyan transition-all duration-300 break-words">
            {project.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-wpm-gray/80 leading-relaxed line-clamp-2 flex-1 break-words">
            {project.subtitle}
          </p>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04] min-w-0">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] text-wpm-gray/75 bg-white/[0.035] px-2 py-0.5 rounded-sm break-words max-w-full"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="font-mono text-[10px] text-wpm-purple/85 whitespace-nowrap flex-shrink-0">
                +{project.stack.length - 3}
              </span>
            )}
          </div>

          {/* Footer: status + hint */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusColors[project.status] ?? "bg-wpm-gray/70"}`} />
              <span className="font-mono text-[10px] text-wpm-gray/75 whitespace-nowrap">{project.status}</span>
            </div>
            <span className="font-mono text-[10px] text-wpm-gray/70 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap flex-shrink-0">
              SELECT »
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
