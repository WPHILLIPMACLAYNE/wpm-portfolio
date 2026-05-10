"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";
import { profile } from "@/data/profile";

const identityStats = [
  ["classe", profile.class],
  ["diretriz", "Gestao comercial + marketing"],
  ["operacao", "Tecnologia aplicada"],
];

export default function AboutPage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="about"
        title="Perfil do Jogador"
        subtitle="Dossie operacional de Wallace Phillip Maclayne: uma sintese de trajetoria, especializacao e posicionamento estratégico."
        aside={
          <div className="space-y-6">
            <div className="border border-white/10 bg-white/[0.02] p-5">
              <p className="wpm-section-title mb-4">Canais Externos</p>
              <div className="flex flex-col gap-3">
                {profile.social.github && (
                  <a 
                    href={profile.social.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="wpm-btn-ripple flex min-h-11 items-center justify-between border border-white/5 bg-white/[0.03] px-4 font-mono text-[10px] uppercase tracking-widest text-wpm-muted hover:text-wpm-cyan hover:border-wpm-cyan/40 transition-colors"
                  >
                    GITHUB <span className="opacity-50">01</span>
                  </a>
                )}
                {profile.social.linkedin && (
                  <a 
                    href={profile.social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="wpm-btn-ripple flex min-h-11 items-center justify-between border border-white/5 bg-white/[0.03] px-4 font-mono text-[10px] uppercase tracking-widest text-wpm-muted hover:text-wpm-cyan hover:border-wpm-cyan/40 transition-colors"
                  >
                    LINKEDIN <span className="opacity-50">02</span>
                  </a>
                )}
              </div>
            </div>
            
            <div className="border border-wpm-cyan/20 bg-wpm-cyan/[0.02] p-5">
               <p className="font-mono text-[9px] uppercase tracking-widest text-wpm-cyan mb-2">Sinal de Rede</p>
               <p className="text-xs text-wpm-cyan/60 leading-relaxed italic">
                 &quot;O profissional do futuro transita com fluencia entre negocios, pessoas e tecnologia.&quot;
               </p>
            </div>
          </div>
        }
      >
        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative border border-white/5 bg-[#0a0d14]/40 p-6 md:p-8 overflow-hidden"
          >
            <div className="absolute right-0 top-0 h-1 w-32 bg-gradient-to-l from-wpm-cyan/30 to-transparent" />
            <div className="absolute left-0 bottom-0 h-16 w-1 bg-gradient-to-t from-wpm-cyan/30 to-transparent" />

            <div className="flex items-center gap-3 mb-8">
               <span className="h-px w-10 bg-wpm-cyan/30" />
               <p className="wpm-section-title opacity-80">Relatorio de Campo</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
              <div className="space-y-4">
                {identityStats.map(([label, value]) => (
                  <div key={label} className="border-l border-white/10 bg-white/[0.01] px-4 py-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-wpm-muted">{label}</p>
                    <p className="mt-2 text-xs font-bold leading-relaxed text-wpm-white/90 uppercase tracking-tight">{value}</p>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                 <div className="absolute -left-6 top-0 bottom-0 w-px bg-white/5 hidden lg:block" />
                 <div className="space-y-6">
                    {profile.bio.map((paragraph, idx) => (
                      <p key={idx} className="font-sans text-base md:text-lg leading-relaxed text-wpm-text-secondary">
                        {paragraph}
                      </p>
                    ))}
                 </div>
              </div>
            </div>
          </motion.section>

          <section className="grid gap-6 md:grid-cols-2">
            {profile.skillGroups.map((group, index) => (
              <motion.article
                key={group.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="group relative border border-white/5 bg-wpm-elevated/40 p-6 transition-all hover:border-white/15"
              >
                <div className="flex items-center justify-between mb-6">
                   <p className="wpm-section-title opacity-70 group-hover:opacity-100 transition-opacity">{group.name}</p>
                   <span className="font-mono text-[9px] text-white/10">NODE_0{index + 1}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="border border-white/5 bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-wpm-muted transition-colors hover:text-wpm-cyan hover:border-wpm-cyan/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-white/10 group-hover:border-wpm-cyan/40 transition-colors" />
              </motion.article>
            ))}
          </section>
        </div>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
