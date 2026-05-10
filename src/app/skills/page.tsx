"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";
import { profile } from "@/data/profile";
import Badge from "@/components/ui/Badge";

const strengthByGroup: Record<string, string> = {
  "Operacao & Gestao": "core",
  "Vendas & Trade Marketing": "field",
  "Produto & UX": "design",
  "Tecnologia & IA": "systems",
};

export default function SkillsPage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="skills"
        title="Arvore de Skills"
        subtitle="Mapa de competencias por dominios conectados: operacao comercial, trade, produto, UX, desenvolvimento web e IA generativa."
      >
        <section className="grid gap-4 md:grid-cols-2">
          {profile.skillGroups.map((group, index) => (
            <motion.article
              key={group.name}
              className="relative overflow-hidden border border-white/[0.07] bg-wpm-elevated/75 p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="pointer-events-none absolute inset-x-5 top-14 h-px bg-gradient-to-r from-wpm-success/40 via-white/10 to-transparent" aria-hidden="true" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-wpm-success/80">
                    cluster / {strengthByGroup[group.name] ?? "domain"}
                  </p>
                  <h2 className="mt-2 text-xl font-semibold tracking-normal text-wpm-white">{group.name}</h2>
                </div>
                <span className="border border-wpm-success/25 bg-wpm-success/[0.06] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-wpm-success">
                  nivel {index + 1}
                </span>
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="system" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </motion.article>
          ))}
        </section>

        <section className="wpm-data-surface p-5">
          <p className="wpm-section-title">Leitura do mapa</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-wpm-gray">
            A arvore nao separa negocio de tecnologia: cada cluster representa uma frente de execucao usada em projetos reais, desde atendimento e indicadores ate interfaces, documentacao, testes e automacao com IA.
          </p>
        </section>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
