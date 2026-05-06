# WPM.OS — Interactive Portfolio System

> Documentação completa do projeto. Índice e visão geral.

---

## Índice da Documentação

| Arquivo | Conteúdo |
|---------|----------|
| [`00-OVERVIEW.md`](./00-OVERVIEW.md) | Visão geral, conceito criativo, referências, stack (este arquivo) |
| [`01-STEP-BY-STEP.md`](./01-STEP-BY-STEP.md) | Diário de desenvolvimento passo a passo — cada tarefa documentada em ordem cronológica |
| [`02-TECHNICAL-REFERENCE.md`](./02-TECHNICAL-REFERENCE.md) | Referência técnica completa — frameworks, bibliotecas, arquitetura, estrutura de pastas, componentes |
| [`03-CREATIVE-BRIEF.md`](./03-CREATIVE-BRIEF.md) | Briefing criativo completo — conceito, direção de arte, paleta, tipografia, referências |
| [`04-CREATIVE-SPEC.md`](./04-CREATIVE-SPEC.md) | **Especificação criativa formal** — conceito visual, tom de voz, paleta, tipografia, componentes, interações, microcopy, riscos de UX, plano de MVP |
| [`05-ARCHITECTURE.md`](./05-ARCHITECTURE.md) | **Arquitetura técnica completa** — estrutura de pastas, catálogo de 30+ componentes, fluxo de estado, estratégia de animação (5 camadas), acessibilidade (4 níveis), performance mobile, ordem de implementação (5 fases), padrões de código |
| [`06-UX-AUDIT.md`](./06-UX-AUDIT.md) | **Auditoria crítica de UX** — 37 problemas mapeados (4 críticos, 7 alta, 7 média, 7 baixa, 12 de design), checklist pré-deploy com 28 itens |
| [`AVAILABLE_SERVICES.md`](./AVAILABLE_SERVICES.md) | Catálogo de ferramentas disponíveis via GitHub Student Developer Pack e regra de priorização antes de sugerir serviços externos |
| [`09-AUDIT-HARDENING-2026-05-06.md`](./09-AUDIT-HARDENING-2026-05-06.md) | Hardening da auditoria técnica: segurança, SEO, performance inicial, contraste, mobile e limpeza de artefatos internos |
| `07-DATA-MODELS.md` | Modelos de dados, interfaces TypeScript, schemas (a ser criado com evolução) |
| `08-DEPLOYMENT.md` | Guia de deploy, CI/CD, otimizações (a ser criado quando chegarmos nessa fase) |

---

## Visão Geral do Projeto

### Nome
**WPM.OS — Interactive Portfolio System**

### Autor
**Wallace Phillip Maclayne (WPM)**

### Descrição
Portfólio web interativo com experiência imersiva inspirada em boot de consoles retro (PS2), menus de seleção de jogos e interfaces de computador experimental. O visitante acessa uma "máquina digital abstrata" que liga, carrega a marca WPM e abre uma interface de navegação gamificada para projetos, sobre, skills, currículo e contato.

### Tom visual
Escuro, minimalista, misterioso, tecnológico, com brilho azul/roxo, ruído digital, partículas, linhas vetoriais, scanlines discretas, tipografia limpa e momentos de impacto cinematográfico.

### Objetivo
Criar um portfólio autoral que una criatividade, UX, motion design e desenvolvimento front-end em uma experiência navegável, performática e acessível.

### Estado atual em 2026-05-06

- Hardening técnico aplicado após auditoria de 9 módulos: links externos sem HTML interativo aninhado, headers de segurança, metadata/canonical/robots/sitemap, contraste reforçado e home mobile sem clipping.
- WebGL da home foi adiado para o estágio Console, evitando carregar a camada 3D durante boot/start.
- Artefatos internos de agentes, screenshots temporários e SVGs padrão não usados foram removidos do pacote público.
- Repositório privado preparado em `https://github.com/WPHILLIPMACLAYNE/wpm-portfolio`.

---

## Stack Principal

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework | Next.js (App Router) | 16.2.4 |
| Biblioteca UI | React | 19.2.4 |
| Linguagem | TypeScript | 5.x |
| Animações | Motion (ex-Framer Motion) | 12.38.0 |
| Estilização | Tailwind CSS | 4.x |
| 3D / WebGL | Three.js + React Three Fiber | (instalado, MVP 3) |
| Scroll | GSAP + ScrollTrigger | (instalado, MVP 3) |
| Utilidades | clsx, tailwind-merge | latest |

---

## Estrutura de Pastas

```
wpm-portfolio/
├── docs/                    ← Documentação do projeto
│   ├── 00-OVERVIEW.md
│   ├── 01-STEP-BY-STEP.md
│   ├── 02-TECHNICAL-REFERENCE.md
│   ├── 03-CREATIVE-BRIEF.md
│   └── 09-AUDIT-HARDENING-2026-05-06.md
├── src/
│   ├── app/                 ← Rotas (App Router)
│   │   ├── layout.tsx       ← Root layout + metadados
│   │   ├── globals.css      ← Tema, tokens, animações
│   │   ├── page.tsx         ← Home: fluxo Boot → Start → Console
│   │   ├── console/         ← /console — Menu principal
│   │   ├── projects/[slug]/ ← /projects/[slug] — Detalhes
│   │   ├── about/           ← /about — Perfil
│   │   ├── skills/          ← /skills — Habilidades
│   │   ├── resume/          ← /resume — Currículo
│   │   ├── lab/             ← /lab — Experimentos
│   │   ├── hobbies/         ← /hobbies — Passatempos
│   │   └── contact/         ← /contact — Contato
│   ├── components/          ← Componentes React
│   │   ├── boot/            ← BootIntro, PressStart
│   │   ├── console/         ← ConsoleShell, ConsoleMenu, ProjectCard
│   │   ├── motion/          ← Transições (placeholder)
│   │   ├── webgl/           ← WebGL (placeholder)
│   │   └── ui/              ← Componentes genéricos (placeholder)
│   ├── data/                ← Dados estáticos
│   │   ├── projects.ts      ← Lista de projetos
│   │   └── profile.ts       ← Perfil, skills, menus
│   └── lib/                 ← Utilitários
│       └── utils.ts         ← cn() helper
├── public/                  ← Assets estáticos
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## MVPs e Roadmap

### MVP 1 — Navegável e Bonito ✅ CONCLUÍDO
- [x] Intro boot com loading fake e reveal da sigla WPM
- [x] Tela "PRESS START" com efeito CRT ligando
- [x] Console menu com grid de 7 opções
- [x] Grid de projetos estilo cartuchos
- [x] Página de detalhe de projeto
- [x] Páginas: About, Skills, Resume, Lab, Hobbies, Contact
- [x] Shell com top bar, bottom bar, scanlines, vignette
- [x] Build funcional sem erros

### MVP 2 — Identidade (em breve)
- [ ] Paleta refinada
- [ ] Tipografia final
- [ ] Ícones customizados
- [ ] Labels técnicos
- [ ] Ruído e grain
- [ ] Animações Motion mais elaboradas

### MVP 3 — Imersão (em breve)
- [ ] Fundo WebGL com partículas
- [ ] Shader reativo ao mouse
- [ ] Cursor interativo
- [ ] Transição "reverse CRT"
- [ ] Som opcional

### MVP 4 — Conteúdo Forte (em breve)
- [ ] Cases reais com métricas
- [ ] Screenshots e vídeos
- [ ] Narrativa de cada projeto
- [ ] Currículo completo
- [ ] Links externos

### MVP 5 — Refinamento (em breve)
- [ ] Performance e bundle size
- [ ] Mobile responsivo
- [ ] Acessibilidade (prefers-reduced-motion, keyboard nav, contraste)
- [ ] SEO
- [ ] Analytics
- [ ] Deploy
- [ ] Easter eggs
