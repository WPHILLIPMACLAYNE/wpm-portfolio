"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";

const experiences = [
  {
    role: "Hostess",
    company: "Smart Fit",
    period: "2024 - Presente",
    era: "Current save",
    details:
      "Gestao da experiencia do cliente em academia de grande porte. Hospitalidade, disciplina operacional e suporte a indicadores de satisfacao.",
  },
  {
    role: "Promotor / Auxiliar de Vendas",
    company: "Laticinios Verde Campo",
    period: "2022 - 2024",
    era: "Trade execution",
    details:
      "Execucao de trade marketing, degustacao, relacionamento com PDVs e metas de sell-out. Apoio a estrategia de ponto de venda.",
  },
  {
    role: "Promotor Lider",
    company: "Bauducco",
    period: "2021 - 2022",
    era: "Leadership unlock",
    details:
      "Lideranca de equipe de promotores. Organizacao de escalas, treinamento e execucao de acoes promocionais em pontos de venda.",
  },
  {
    role: "Promotor / Visual Merchandiser",
    company: "GPA (Grupo Pao de Acucar)",
    period: "2019 - 2021",
    era: "Retail systems",
    details:
      "Visual merchandising, organizacao de gondolas e execucao de campanhas promocionais nas lojas do grupo.",
  },
  {
    role: "Promotor",
    company: "Coca-Cola FEMSA",
    period: "2013 - 2018",
    era: "Field foundation",
    details:
      "Atuacao em grandes eventos incluindo Olimpiadas Rio 2016. Execucao de trade, relacionamento com clientes e metas de volume.",
    highlight: "Marco desbloqueado: Olimpiadas Rio 2016",
  },
  {
    role: "Aprendiz",
    company: "DMA / EPA",
    period: "2011 - 2012",
    era: "Initial slot",
    details:
      "Inicio da carreira no varejo. Rotinas operacionais, atendimento ao cliente e suporte a equipe comercial.",
  },
];

const education = [
  ["Gestao Comercial", "UNINTER", "Em andamento"],
  ["Marketing", "UniCesumar", "Concluido"],
];

const certifications = [
  "Google Project Management (Professional Certificate)",
  "Novos Lideres - Smart Fit",
  "Tecnico em Marketing",
];

export default function ResumePage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="resume"
        title="Save de Carreira"
        subtitle="Linha de progresso profissional organizada como slots de experiencia, marcos, formacao e certificacoes."
      >
        <section className="wpm-data-surface p-5 md:p-6">
          <p className="wpm-section-title">Timeline / save slots</p>
          <div className="mt-6 space-y-4">
            {experiences.map((exp, index) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                className="relative grid gap-4 border border-white/[0.07] bg-white/[0.02] p-4 md:grid-cols-[9rem_minmax(0,1fr)]"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.045 }}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-wpm-warning">{exp.era}</p>
                  <p className="mt-2 font-mono text-xs text-wpm-gray">{exp.period}</p>
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold tracking-normal text-wpm-white">{exp.role}</h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-wpm-text-secondary">{exp.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-wpm-gray">{exp.details}</p>
                  {exp.highlight && <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-cyan">{exp.highlight}</p>}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-white/[0.07] bg-wpm-elevated/70 p-5">
            <p className="wpm-section-title">Educacao</p>
            <div className="mt-4 space-y-3">
              {education.map(([course, institution, period]) => (
                <div key={course} className="border border-white/[0.06] bg-white/[0.025] p-3">
                  <p className="text-sm font-medium text-wpm-white/85">{course}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-wpm-gray">
                    {institution} / {period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/[0.07] bg-wpm-elevated/70 p-5">
            <p className="wpm-section-title">Certificacoes</p>
            <div className="mt-4 space-y-3">
              {certifications.map((cert, index) => (
                <div key={cert} className={`border bg-white/[0.025] p-3 ${index === 0 ? "border-wpm-cyan/24" : "border-white/[0.06]"}`}>
                  <p className="text-sm text-wpm-white/80">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
