"use client";

import { motion } from "motion/react";
import ConsoleShell from "@/components/console/ConsoleShell";
import ModuleSceneLayout from "@/components/console/ModuleSceneLayout";

const techStack = [
  { category: "Framework", items: ["Next.js 16", "React 19", "TypeScript"] },
  { category: "Visual & 3D", items: ["Three.js", "React Three Fiber", "GLSL Shaders"] },
  { category: "Motion", items: ["Motion (Framer)", "CSS Keyframes"] },
  { category: "Estilizacao", items: ["Tailwind CSS v4", "Vanilla CSS"] },
];

const designPrinciples = [
  { title: "Brutalismo Industrial", desc: "Uso de bordas de 1px, cores sólidas e tipografia monoespaçada agressiva." },
  { title: "Identidade FUI", "desc": "Design focado em Fictional User Interfaces, simulando sistemas de hardware real." },
  { title: "Densidade de Dados", desc: "Preenchimento de espaços vazios com metadados técnicos para imersão total." },
];

export default function SpecsPage() {
  return (
    <ConsoleShell>
      <ModuleSceneLayout
        moduleId="specs"
        title="Dossiê do Sistema"
        subtitle="Analise profunda da engenharia, arquitetura e escolhas criativas que sustentam o Kernel do WPM.OS."
        aside={
          <div className="border border-white/10 bg-white/[0.02] p-6 space-y-6">
             <div>
                <p className="wpm-section-title mb-4">Core_Engine</p>
                <div className="flex items-center gap-3">
                   <div className="h-10 w-1 bg-wpm-cyan animate-pulse" />
                   <p className="font-mono text-[10px] text-wpm-white leading-relaxed">
                      WPM.OS opera sob um Kernel hibrido de Gestao e Tecnologia.
                   </p>
                </div>
             </div>
             <div className="h-px w-full bg-white/5" />
             <p className="font-mono text-[8px] text-wpm-muted uppercase tracking-widest">
               BUILD_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}
             </p>
          </div>
        }
      >
        <div className="space-y-16 pb-20">
          {/* Sessão 1: A Stack de Combate */}
          <section>
            <div className="flex items-center gap-4 mb-10">
               <span className="font-mono text-[10px] text-wpm-cyan">01 //</span>
               <h2 className="font-sans text-2xl font-black uppercase italic tracking-tighter text-wpm-white">A Stack de Combate</h2>
               <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {techStack.map((group) => (
                <div key={group.category} className="border border-white/5 bg-[#0a0d14]/40 p-5">
                   <p className="font-mono text-[9px] uppercase tracking-widest text-wpm-muted mb-4">{group.category}</p>
                   <ul className="space-y-2">
                      {group.items.map(item => (
                        <li key={item} className="flex items-center gap-2">
                           <div className="h-1 w-1 bg-wpm-cyan/40" />
                           <span className="font-mono text-xs text-wpm-white/80">{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Sessão 2: Filosofia de Design */}
          <section className="relative border border-white/5 bg-white/[0.01] p-8 overflow-hidden">
             <div className="absolute right-0 top-0 h-20 w-1 bg-gradient-to-b from-wpm-cyan/40 to-transparent" />
             
             <div className="flex items-center gap-4 mb-12">
               <span className="font-mono text-[10px] text-wpm-cyan">02 //</span>
               <h2 className="font-sans text-2xl font-black uppercase italic tracking-tighter text-wpm-white">Direção Criativa</h2>
            </div>

            <div className="grid gap-12 lg:grid-cols-3">
               {designPrinciples.map((principle) => (
                 <div key={principle.title}>
                    <h3 className="font-mono text-sm font-bold text-wpm-cyan uppercase tracking-widest mb-4">
                      {principle.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-wpm-gray italic">
                      &quot;{principle.desc}&quot;
                    </p>
                 </div>
               ))}
            </div>
          </section>

          {/* Sessão 3: Engenharia de Efeitos */}
          <section>
            <div className="flex items-center gap-4 mb-10">
               <span className="font-mono text-[10px] text-wpm-cyan">03 //</span>
               <h2 className="font-sans text-2xl font-black uppercase italic tracking-tighter text-wpm-white">Engenharia Visual</h2>
               <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-10 lg:grid-cols-2">
               <div className="space-y-8">
                  <div className="border-l-2 border-wpm-cyan/20 pl-6">
                     <p className="font-mono text-[11px] font-bold text-wpm-white uppercase mb-2">Hologramas 3D</p>
                     <p className="text-sm text-wpm-muted leading-relaxed">
                        Renderizados via Three.js puro, cada artefato é uma composição de geometrias matemáticas (Wireframes) que giram independentemente, simulando hardware holográfico sem o peso de modelos 3D tradicionais.
                     </p>
                  </div>
                  <div className="border-l-2 border-wpm-cyan/20 pl-6">
                     <p className="font-mono text-[11px] font-bold text-wpm-white uppercase mb-2">Sistema de Transição Lateral</p>
                     <p className="text-sm text-wpm-muted leading-relaxed">
                        Inspirado na multitarefa do Windows (Win+Tab), o sistema de rotas calcula a posição relativa dos módulos para deslizar a tela na direção correta durante a troca de contexto.
                     </p>
                  </div>
               </div>

               <div className="border border-white/5 bg-black/40 p-8 flex flex-col justify-center items-center text-center">
                  <div className="h-16 w-16 border border-wpm-cyan/20 flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 animate-spin-slow border-t border-wpm-cyan" />
                     <span className="font-mono text-wpm-cyan font-black text-xl">W</span>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-wpm-muted">
                     WPM.OS — Engineered for performance.
                  </p>
               </div>
            </div>
          </section>

          {/* Sessão 4: Manifesto de Autoria */}
          <section className="relative border border-wpm-cyan/20 bg-wpm-cyan/[0.02] p-8 md:p-12 overflow-hidden">
             <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-wpm-cyan/50 via-transparent to-transparent" />
             <div className="absolute right-0 bottom-0 h-32 w-px bg-gradient-to-t from-wpm-cyan/50 to-transparent" />
             
             <div className="flex items-center gap-4 mb-10">
               <span className="font-mono text-[10px] text-wpm-cyan">04 //</span>
               <h2 className="font-sans text-3xl font-black uppercase italic tracking-tighter text-wpm-white">Manifesto de Autoria</h2>
            </div>

            <div className="max-w-4xl">
               <p className="font-sans text-xl md:text-2xl leading-relaxed text-wpm-white font-medium mb-8">
                  Todo o conceito, projeto, direção criativa, visual e autoria deste sistema são <span className="text-wpm-cyan underline decoration-wpm-cyan/30 underline-offset-8">100% originais</span>. 
               </p>
               
               <div className="space-y-6 text-wpm-text-secondary leading-relaxed">
                  <p>
                     Este projeto nasceu de um desafio pessoal: testar a minha capacidade de criar algo completamente autoral, partindo do zero absoluto, sem utilizar recursos pré-prontos ou me apoiar em inspirações existentes para copiar padrões de mercado.
                  </p>
                  <p>
                     A meta foi provar que a visão humana, quando aliada ao potencial de um agente de código, pode transformar uma ideia abstrata e complexa em um sistema real, funcional e de altíssimo nível. O WPM.OS não é apenas um portfólio; é a evidência de que a orquestração estratégica de IA pode materializar a criatividade bruta.
                  </p>
               </div>

               <div className="mt-12 flex items-center gap-6">
                  <div className="flex flex-col">
                     <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-wpm-muted">Architect_Signature</span>
                     <span className="font-mono text-sm text-wpm-white font-bold tracking-widest uppercase">Wallace Phillip Maclayne</span>
                  </div>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="font-mono text-[10px] text-wpm-cyan/40">AUTH_TOKEN: ORIGINAL_GENESIS</span>
               </div>
            </div>
          </section>
        </div>
      </ModuleSceneLayout>
    </ConsoleShell>
  );
}
