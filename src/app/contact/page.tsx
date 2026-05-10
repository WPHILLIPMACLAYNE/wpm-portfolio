"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";
import { profile } from "@/data/profile";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/components/ui/Icon";

function isValidContactHref(href: string, label: string): boolean {
  if (label === "GitHub") return href.length > 0 && href.startsWith("http");
  if (label === "Email") return href.length > 0 && href !== "mailto:";
  return href.length > 0;
}

const contactMethods: { label: string; href: string; icon: IconName; desc: string }[] = ([
  { label: "GitHub", href: profile.social.github, icon: "github", desc: "Repositorio publico, historico tecnico e projetos publicados." },
  { label: "LinkedIn", href: profile.social.linkedin, icon: "linkedin", desc: "Contato profissional, trajetoria e networking." },
  { label: "Email", href: `mailto:${profile.social.email}`, icon: "email", desc: "Canal direto por e-mail." },
] as { label: string; href: string; icon: IconName; desc: string }[]).filter((m) => isValidContactHref(m.href, m.label));

export default function ContactPage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="contact"
        title="Enviar Sinal"
        subtitle="Canal de comunicacao claro, publico e sem falsas promessas: GitHub e LinkedIn estao disponiveis agora."
      >
        <section className="wpm-data-surface p-5 md:p-6">
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="wpm-section-title">Sinal aberto</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-normal text-wpm-white">Vamos conversar sobre produto, operacao e sistemas reais.</h2>
              <p className="mt-4 text-sm leading-relaxed text-wpm-gray">
                Use um dos canais publicos abaixo. O portfolio nao exibe email enquanto o dado estiver vazio no perfil.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {contactMethods.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group min-h-48 border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-wpm-cyan/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wpm-cyan/70"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  aria-label={`Contact via ${item.label}`}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center border border-wpm-cyan/25 bg-wpm-cyan/[0.06] text-wpm-cyan">
                    <Icon name={item.icon} size="md" />
                  </span>
                  <h3 className="mt-5 font-mono text-sm uppercase tracking-[0.14em] text-wpm-white">{item.label}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-wpm-gray">{item.desc}</p>
                  <span className="mt-5 inline-flex font-mono text-[11px] uppercase tracking-[0.14em] text-wpm-cyan/80">
                    Abrir canal -&gt;
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
