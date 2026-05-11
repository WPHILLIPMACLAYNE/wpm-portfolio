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
| [`10-PROFESSIONAL-AUDIT-2026-05-06.md`](./10-PROFESSIONAL-AUDIT-2026-05-06.md) | Auditoria profissional baseada no roteiro GPT-5.5 deep thinking, matriz de severidade, correções aplicadas e validação final |
| [`11-MD-CLOSURE-2026-05-06.md`](./11-MD-CLOSURE-2026-05-06.md) | Fechamento dos Markdown: itens resolvidos, bloqueios externos, backlog intencional e validação esperada |
| [`12-EXECUTION-PLAN.md`](./12-EXECUTION-PLAN.md) | Plano operacional mestre: fases, processo Codex + DeepSeek, gates de qualidade e backlog priorizado |
| [`../ENGINEERING_GUIDE.md`](../ENGINEERING_GUIDE.md) | Guia de padrões técnicos para componentes, dados, motion, acessibilidade, performance e segurança |
| `07-DATA-MODELS.md` | Modelos de dados, interfaces TypeScript, schemas (a ser criado com evolução) |
| [`08-DEPLOYMENT.md`](./08-DEPLOYMENT.md) | Guia de deploy com build Next.js server e export estatico GitHub Pages |

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

### Estado atual em 2026-05-08

- Hardening técnico aplicado após auditoria de 9 módulos: links externos sem HTML interativo aninhado, headers de segurança, metadata/canonical/robots/sitemap, contraste reforçado e home mobile sem clipping.
- WebGL da home foi adiado para o estágio Console, evitando carregar a camada 3D durante boot/start; mobile usa fallback CSS sem carregar o chunk pesado Three/R3F.
- Artefatos internos de agentes, screenshots temporários e SVGs padrão não usados foram removidos do pacote público.
- Auditoria visual de 2026-05-08 removeu `gsap` e `@react-three/drei`, localizou labels do console para PT-BR, removeu `ModulePreview.tsx` como código morto e reforçou tokens visuais.
- Repositório público publicado em `https://github.com/WPHILLIPMACLAYNE/wpm-portfolio`.
- GitHub Pages publicado em `https://wphillipmaclayne.github.io/wpm-portfolio/` pelo commit `07a38bf` e workflow `Deploy GitHub Pages` run `25581405242`.
- Fechamento documental e QA visual tecnico live registrados no commit `81996a8` e no workflow `Deploy GitHub Pages` run `25581839825`, com status `success`.
- Dominio customizado `https://wpmsmartwonkey.me/` publicado diretamente pelo repo `WPHILLIPMACLAYNE/wpm-portfolio`.
- HTTPS do dominio customizado esta aprovado pelo GitHub Pages e com **Enforce HTTPS** habilitado no projeto WPM.OS.
- O repo raiz `WPHILLIPMACLAYNE/WPHILLIPMACLAYNE.github.io` nao deve manter `wpmsmartwonkey.me` como custom domain, para nao afetar os outros GitHub Pages da conta.
- Pendencia restante: aprovacao visual humana de Wallace no site publicado (`APROVADO VISUAL` ou `AJUSTAR: ...`) ou lista objetiva de ajustes visuais.

---

## Stack Principal

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework | Next.js (App Router) | 16.2.4 |
| Biblioteca UI | React | 19.2.4 |
| Linguagem | TypeScript | 5.x |
| Animações | Motion (ex-Framer Motion) | 12.38.0 |
| Estilização | Tailwind CSS | 4.x |
| 3D / WebGL | Three.js + React Three Fiber | ativo no estágio Console desktop |
| Scroll | GSAP + ScrollTrigger | removido; scroll effects ficam no backlog |
| Utilidades | clsx, tailwind-merge | latest |

### Handoff para retomada em outra conta Codex

Antes de retomar qualquer trabalho:

```bash
cd /home/acewallthemac/Documentos/portifoliomain/wpm-portfolio
git status --short --branch
git log -3 --oneline --decorate
gh run view 25581839825 --json conclusion,status,headSha,url,createdAt,updatedAt
curl -I https://wphillipmaclayne.github.io/wpm-portfolio/
```

Estado esperado:

- `main...origin/main` sem alteracoes locais pendentes.
- HEAD minimo: `81996a8 docs: record live technical visual qa` ou commit posterior de documentacao/handoff.
- Workflow `25581839825`: `completed/success`.
- Site live: `HTTP/2 200`.
- Pendencia funcional/tecnica conhecida: nenhuma.
- Pendencia humana: Wallace precisa aprovar visualmente o site publicado ou pedir ajuste concreto.

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

### MVP 2 — Identidade (backlog)
- [backlog] Paleta refinada
- [backlog] Tipografia final
- [backlog] Ícones customizados
- [backlog] Labels técnicos
- [backlog] Ruído e grain
- [backlog] Animações Motion mais elaboradas

### MVP 3 — Imersão (backlog)
- [backlog] Fundo WebGL com partículas
- [backlog] Shader reativo ao mouse
- [backlog] Cursor interativo
- [backlog] Transição "reverse CRT"
- [backlog] Som opcional

### MVP 4 — Conteúdo Forte (backlog)
- [backlog] Cases reais com métricas
- [backlog] Screenshots e vídeos
- [backlog] Narrativa de cada projeto
- [backlog] Currículo completo
- [blocked-owner] Email público aprovado ou decisão de manter só GitHub/LinkedIn

### MVP 5 — Refinamento (backlog)
- [backlog] Performance e bundle size
- [closed] Mobile responsivo/hardening inicial
- [closed] Acessibilidade base: reduced motion, keyboard nav, contraste, focus, aria-live
- [closed] SEO técnico local
- [blocked-service] Analytics, se aprovado
- [x] Deploy local documentado: build Node e export GitHub Pages
- [backlog] Easter eggs
