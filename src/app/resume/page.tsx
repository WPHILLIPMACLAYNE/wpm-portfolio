"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import Link from "next/link";
import { profile } from "@/data/profile";
import Divider from "@/components/ui/Divider";

const experiences = [
  {
    role: "Hostess",
    company: "Smart Fit",
    period: "2024 — Presente",
    details:
      "Gestao da experiencia do cliente em academia de grande porte. Hospitalidade, disciplina operacional e suporte a indicadores de satisfacao.",
  },
  {
    role: "Promotor / Auxiliar de Vendas",
    company: "Laticinios Verde Campo",
    period: "2022 — 2024",
    details:
      "Execucao de trade marketing, degustacao, relacionamento com PDVs e metas de sell-out. Apoio a estrategia de ponto de venda.",
  },
  {
    role: "Promotor",
    company: "Grupo Tagg",
    period: "2022",
    details:
      "Promocao e merchandising de produtos alimenticios em redes de supermercados.",
  },
  {
    role: "Promotor Lider",
    company: "Bauducco",
    period: "2021 — 2022",
    details:
      "Lideranca de equipe de promotores. Organizacao de escalas, treinamento e execucao de acoes promocionais em pontos de venda.",
  },
  {
    role: "Promotor / Visual Merchandiser",
    company: "GPA (Grupo Pao de Acucar)",
    period: "2019 — 2021",
    details:
      "Visual merchandising, organizacao de gondolas e execucao de campanhas promocionais nas lojas do grupo.",
  },
  {
    role: "Promotor",
    company: "Coca-Cola FEMSA",
    period: "2013 — 2018",
    details:
      "Atuacao em grandes eventos incluindo Olimpiadas Rio 2016. Execucao de trade, relacionamento com clientes e metas de volume.",
    highlight: "Destaque: atuacao nas Olimpiadas Rio 2016",
  },
  {
    role: "Aprendiz",
    company: "DMA / EPA",
    period: "2011 — 2012",
    details:
      "Inicio da carreira no varejo. Rotinas operacionais, atendimento ao cliente e suporte a equipe comercial.",
  },
];

const education = [
  {
    course: "Gestao Comercial",
    institution: "UNINTER",
    period: "Em andamento",
  },
  {
    course: "Marketing",
    institution: "UniCesumar",
    period: "Concluido",
  },
];

const certifications = [
  "Google Project Management (Professional Certificate)",
  "Novos Lideres — Smart Fit",
  "Tecnico em Marketing",
];

const statusColors: Record<string, string> = {
  current: "#74F7FF",
  past: "#6C4DFF",
  first: "#8B5CF6",
};

export default function ResumePage() {
  return (
    <ConsoleShell>
      <div className="px-6 py-12 pb-20 max-w-3xl mx-auto">
        <Link
          href="/console"
          className="inline-flex items-center gap-2 font-mono text-xs text-wpm-gray/90 hover:text-wpm-cyan transition-colors mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-purple/50 rounded-sm"
        >
          <span className="text-wpm-lavender/90">&lt;-</span> BACK TO CONSOLE
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-wpm-lavender/90 mb-3">
            Career Save
          </p>
          <h1 className="text-3xl md:text-5xl font-light text-wpm-white/80 tracking-wide mb-2">
            Career Save
          </h1>
          <p className="font-mono text-sm text-wpm-cyan/80 mb-8">{profile.name}</p>

          {/* Timeline */}
          <section className="mb-12">
            <h2 className="font-mono text-sm text-wpm-lavender/90 mb-6 tracking-wider uppercase">
              Experience
            </h2>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-[1px] bg-white/[0.04]" />

              <div className="space-y-6">
                {experiences.map((exp, i) => {
                  const dotColor =
                    i === 0
                      ? statusColors.current
                      : i === experiences.length - 1
                        ? statusColors.first
                        : statusColors.past;

                  return (
                    <motion.div
                      key={`${exp.company}-${exp.period}`}
                      className="relative pl-8"
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      {/* Dot */}
                      <span
                        className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-white/[0.06]"
                        style={{
                          backgroundColor: dotColor,
                          boxShadow: `0 0 8px ${dotColor}40`,
                        }}
                      />

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0 min-w-0">
                        <div className="min-w-0 max-w-full break-words">
                          <p className="text-wpm-white/80 font-medium break-words">{exp.role}</p>
                          <p className="text-sm text-wpm-gray/90 break-words">{exp.company}</p>
                        </div>
                        <span className="font-mono text-[11px] text-wpm-gray/90 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-wpm-gray/90 mt-2 leading-relaxed break-words">
                        {exp.details}
                      </p>
                      {exp.highlight && (
                        <p className="text-xs text-wpm-cyan/70 mt-1 font-mono">
                          {exp.highlight}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <Divider variant="accent" className="mb-10" />

          {/* Education + Certifications grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {/* Education */}
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="font-mono text-sm text-wpm-lavender/90 mb-4 tracking-wider uppercase">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((ed) => (
                  <div
                    key={ed.course}
                    className="p-3 bg-wpm-card border border-white/[0.04] rounded-sm min-w-0 max-w-full overflow-hidden"
                  >
                    <p className="text-wpm-white/70 text-sm">{ed.course}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-wpm-gray/90">{ed.institution}</p>
                      <span className="font-mono text-[11px] text-wpm-gray/90">
                        {ed.period}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Certifications */}
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="font-mono text-sm text-wpm-lavender/90 mb-4 tracking-wider uppercase">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert, i) => {
                  const isHighlight = i === 0;
                  return (
                    <div
                      key={cert}
                      className={`p-3 bg-wpm-card border rounded-sm min-w-0 max-w-full overflow-hidden ${
                        isHighlight
                          ? "border-wpm-cyan/20"
                          : "border-white/[0.04]"
                      }`}
                    >
                      <p className="text-wpm-white/70 text-sm break-words">{cert}</p>
                      {isHighlight && (
                        <span className="font-mono text-[11px] text-wpm-cyan/70">
                          Em andamento
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </ConsoleShell>
  );
}
