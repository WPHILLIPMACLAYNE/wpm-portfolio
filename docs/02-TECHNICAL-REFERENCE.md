# 02 — Referência Técnica

> Documentação técnica detalhada do WPM.OS — arquitetura, frameworks, componentes, padrões e decisões técnicas.

---

## Stack Tecnológica

### Core

| Tecnologia | Versão | Tipo | Descrição |
|-----------|--------|------|-----------|
| **Next.js** | 16.2.4 | Framework React full-stack | App Router, Server Components, SSR/SSG, Turbopack |
| **React** | 19.2.4 | Biblioteca UI | Server Components por padrão, Client Components com `"use client"` |
| **TypeScript** | 5.x | Linguagem | Tipagem estática, interfaces, enums |

### Estilização

| Tecnologia | Versão | Tipo | Descrição |
|-----------|--------|------|-----------|
| **Tailwind CSS** | 4.x | Framework CSS utility-first | Classes utilitárias, `@theme inline`, sem arquivo de config |
| **CSS Modules** | - | Nativo Next.js | Isolamento de estilos por componente (não usado ativamente) |
| **CSS Custom Properties** | - | Nativo | Tokens de cor e animação definidos em `@theme inline` |

### Animação

| Tecnologia | Versão | Tipo | Descrição |
|-----------|--------|------|-----------|
| **Motion** | 12.38.0 | Biblioteca de animação React | Antigo Framer Motion. Componentes via `motion/react` |
| **GSAP** | removido | Biblioteca de animação JS | Nao esta instalado; scroll reveals ficam no backlog |
| **CSS Animations** | - | Nativo | Keyframes para scanlines, CRT, glow (globals.css) |

### 3D / WebGL

| Tecnologia | Versão | Tipo | Descrição |
|-----------|--------|------|-----------|
| **Three.js** | 0.184.0 | Biblioteca 3D | Motor WebGL usado no estagio Console desktop |
| **@react-three/fiber** | 9.6.1 | Renderer React p/ Three | Cenas 3D declarativas em React |
| **@react-three/drei** | removido | Helpers R3F | Removido como dependencia morta; nao ha imports runtime |

### Utilidades

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **clsx** | latest | Constrói strings de classes CSS condicionais |
| **tailwind-merge** | latest | Merge inteligente de classes Tailwind, resolve conflitos |
| **Geist Font** | - | Fonte do sistema Next.js — Sans para UI, Mono para código |

### Testes E Cobertura

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **Vitest** | 4.1.5 | Runner unitario para `src/**/*.test.{ts,tsx}` |
| **@testing-library/react** | 16.3.2 | Renderizacao de hooks e componentes em `jsdom` |
| **@testing-library/user-event** | 14.6.1 | Simulacao de teclado, Tab e Shift+Tab em testes de acessibilidade |
| **@testing-library/jest-dom** | 6.9.1 | Matchers DOM como foco, visibilidade e presenca no documento |
| **@vitest/coverage-v8** | 4.1.5 | Cobertura V8 com saidas `text`, `json` e `lcov` |
| **Codecov Action** | v5 | Upload de `coverage/lcov.info` no workflow `.github/workflows/test.yml` usando `CODECOV_TOKEN` |

Comandos relevantes:

```bash
npm run test
npm run test:coverage
npx vitest run
```

`coverage/`, `test-results/` e `playwright-report/` sao artefatos gerados e ficam fora do lint/versionamento.

---

## Arquitetura do Projeto

### App Router (Next.js 16)

O projeto usa o **App Router** com a convenção de arquivos:

```
src/app/
├── layout.tsx          ← Root layout (HTML, body, metadados, fontes)
├── page.tsx            ← Rota / (home)
├── globals.css         ← Estilos globais
├── console/
│   └── page.tsx        ← Rota /console
├── projects/
│   └── [slug]/
│       └── page.tsx    ← Rota dinâmica /projects/:slug
├── about/
│   └── page.tsx        ← Rota /about
├── contact/
│   └── page.tsx        ← Rota /contact
├── lab/
│   └── page.tsx        ← Rota /lab
├── skills/
│   └── page.tsx        ← Rota /skills
├── hobbies/
│   └── page.tsx        ← Rota /hobbies
└── resume/
    └── page.tsx        ← Rota /resume
```

### Metadata por Segmento
Rotas Tier 1 (`/projects`, `/about`, `/contact`) e Tier 2 (`/skills`, `/resume`, `/lab`, `/hobbies`) possuem `layout.tsx` de segmento que exporta `metadata` estatico (title, description, canonical, OpenGraph, Twitter). Os layouts sao Server Components e apenas envolvem `{children}` — as paginas client sob eles permanecem inalteradas. O `title` usa o template global `%s | ${SITE_TITLE}` definido no Root Layout.

Cada rota possui:
- `title` especifico por pagina
- `description` verificada por string completa no E2E (nao substring)
- `alternates.canonical` apontando para o caminho da rota
- `openGraph` com title, description, url e type
- `twitter` com title e description
```ts
// src/app/about/layout.tsx (exemplo do padrao)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "...",
  alternates: { canonical: "/about" },
  openGraph: { ... },
  twitter: { ... },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

### Server vs Client Components

| Arquivo | Tipo | Motivo |
|---------|------|--------|
| `layout.tsx` | Server | Apenas HTML estático + fontes |
| `page.tsx` | Client | Gerencia estado do fluxo (boot/start/console) |
| `BootIntro.tsx` | Client | Animações Motion, timers, callbacks |
| `PressStart.tsx` | Client | Primeiro paint estatico + eventos de teclado |
| `ConsoleShell.tsx` | Client | Drawer mobile, ESC e replay da intro |
| `StaticConsoleShell.tsx` | Server | Shell estatico para rotas de listagem sensiveis a LCP |
| `ConsoleMenu.tsx` | Client | Animações Motion, grid animado |
| `ProjectCartridge.tsx` | Server | Cards de projeto com hover CSS e `next/image` |
| `projects/[slug]/page.tsx` | Server (async) | Precisa `await params`, dados estáticos |
| `about/page.tsx` | Client | Animações Motion |
| Demais páginas | Client | Animações Motion |

### Guard de Traducao e Hidratacao

O `RootLayout` marca `html` e `body` com `translate="no"` e `notranslate`, alem de emitir `meta name="google" content="notranslate"` via metadata. Essa protecao evita que tradutores automaticos/extensoes injetem classes ou atributos no `div hidden` interno de metadata do Next antes da hidratacao, o que pode disparar o overlay `Hydration failed` em ambiente de desenvolvimento.

### Console Chrome: PT-BR e Organizacao Visual (TASK-20260507-001)

A chrome do console (topbar, ribbon de modulos, sidebar de telemetria, drawer mobile) foi localizada para PT-BR e reorganizada visualmente para melhorar a percepcao da interface no desktop.

#### Textos traduzidos (EN → PT-BR)

| Componente | Texto original | Texto PT-BR |
|---|---|---|
| ConsoleMenu | `// Interactive portfolio system` | `// Sistema interativo de portfolio` |
| ConsoleMenu | `Operating evidence for work that ships` | `Evidencia operacional de projetos que entregam` |
| ConsoleMenu | `Inspect work` | `Inspecionar projetos` |
| ConsoleMenu | `Open signal` | `Abrir contato` |
| ConsoleMenu | `System ready.` | `Sistema pronto.` |
| ConsoleMenu | `Type, click or inspect...` | `Digite, clique ou inspecione...` |
| ConsoleMenu | `/ Artifacts loaded` | `/ Artefatos carregados` |
| ConsoleModuleRibbon | `Modules` | `Modulos` |
| ConsoleModuleRibbon | modulo labels (EN) | labels PT-BR (`Biblioteca de Projetos`, `Perfil do Jogador`, etc.) |
| ConsoleChrome | `SYS / ONLINE / SIGNAL / STRONG / MODE / DOSSIER / USER` | `SISTEMA / ATIVO / SINAL / FORTE / MODO / DOSSIER / USUARIO` |
| ConsoleChrome | `ONLINE` (LED label) | `ATIVO` |
| ConsoleChrome | primaryNav labels | `Projetos`, `Perfil`, `Skills`, `Contato` |
| ConsoleShell | `open main menu` | `Abrir menu de navegacao` |
| ConsoleShell | `Replay Intro` | `Repetir Intro` |
| ConsoleShell | `ESC / BACK to return` | `ESC / VOLTAR para retornar` |
| ConsoleShell | topbar nav labels (`opacity-0 group-hover:opacity-100`) | labels agora sempre visiveis em `lg:` (sem hover) |
| MobileNavDrawer | drawer header/dica | `Navegacao` / `Selecione um modulo` |
| MobileNavDrawer | footer hints | `ESC ou toque fora para fechar` |
| MobileNavDrawer | locked hint | `Este modulo ainda nao esta disponivel no portfolio publico.` |
| StaticConsoleShell | default `currentLabel` | `Biblioteca de Projetos` |
| ModulePanelFrame | `Open full page` | `Abrir pagina completa` |
| ModulePanelFrame | close button | `Fechar painel` |
| MenuModule | `PRESS ENTER` / `LOCKED` | `PRESSIONE ENTER` / `BLOQUEADO` |
| MenuModule | status labels | `ATIVO` / `BLOQUEADO` / `EM BREVE` |
| MenuModule | type labels (EN) | PT-BR (`Biblioteca`, `Perfil`, `Arvore`, `Slot de Save`, `Prototipo`, `Missao`, `Sinal`, `Configuracao`, `Criptografado`) |
| ModulePreview | `BROWSE PROJECTS` / `ENTER TO OPEN` | `EXPLORAR PROJETOS` / `ENTER PARA ABRIR` |

#### Melhorias de layout aplicadas

- **ConsoleModuleRibbon**: reposicionado para dentro da secao principal do ConsoleMenu, logo abaixo do header (WPM.OS v1.0 + ConsoleNav) e acima do grid hero+projetos. Isso coloca os modulos visiveis na primeira dobra no desktop, sem esconder os cards de projeto. O ribbon usa `border-t border-white/[0.06] bg-wpm-black/25 backdrop-blur-xl`, grid responsivo com indicadores de cor por tipo (`typeColors`) e shortcut numerico.
- **Topbar (ConsoleShell / StaticConsoleShell)**: labels dos links de navegacao agora sao sempre visiveis em telas `lg:` (`hidden lg:inline`), removida a dependencia de `opacity-0 group-hover:opacity-100`. A navegacao fica perceptivel sem depender de hover.
- **ConsoleChrome (SystemTelemetry)**: labels traduzidas para PT-BR. LED indicador com pulso `animate-pulse` e `motion-reduce:animate-none`. Texto "ATIVO" abaixo do LED como status do sistema.
- **Acessibilidade preservada**: `focus-visible:ring-2`, `aria-label` em PT-BR, `aria-expanded`/`aria-controls` nos botoes de modulo, `prefers-reduced-motion` respeitado.
### Fluxo de Dados

```
src/data/
├── projects.ts   ← Array de projetos + getProjectBySlug()
└── profile.ts    ← Objeto de perfil + menuItems[]

         ↓ import

src/components/   ← Consomem dados via props ou import direto
src/app/          ← Pages importam dados e passam para componentes
```

**Padrão:** Dados mockados em `src/data/`. No futuro, podem vir de um CMS ou API.

### Performance de carregamento

- A home abre diretamente no `PressStart` para expor o H1 no primeiro paint; `BootIntro` permanece disponivel via replay.
- `BootIntro`, Console, WebGL e transicao CRT da home sao carregados sob demanda com `next/dynamic`.
- `ClientCursor` atrasa o cursor customizado e so carrega em desktop com ponteiro fino.
- `/projects` usa `StaticConsoleShell` e `ProjectCartridge` server-side para reduzir hidratacao acima da dobra.

---

## Motion (React)

### Subpath: `motion/react`

A partir da versão 12, o pacote `motion` separou a API React do core. **Todas as importações de componentes React devem usar `motion/react`:**

```typescript
// Correto ✅
import { motion, AnimatePresence } from "motion/react";

// Errado ❌
import { motion } from "motion";
```

### APIs utilizadas no projeto

#### `motion` (componente)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.2 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  exit={{ opacity: 0 }}
>
  conteúdo
</motion.div>
```

#### `AnimatePresence`
```tsx
<AnimatePresence mode="wait">
  {condition && (
    <motion.div key="unique" exit={{ opacity: 0 }}>
      conteúdo com animação de saída
    </motion.div>
  )}
</AnimatePresence>
```

#### Props de animação usadas
- `initial` — estado inicial da animação
- `animate` — estado final
- `exit` — estado de saída (requer `AnimatePresence`)
- `transition` — duração, delay, easing
- `whileHover` — animação no hover
- `whileTap` — animação no clique/toque

---

## Sistema de Design (Tokens)

### Cores

| Token | Valor Hex | Uso |
|-------|-----------|-----|
| `--color-wpm-black` | `#050509` | Fundo principal |
| `--color-wpm-deep-blue` | `#071B3A` | Fundo secundário |
| `--color-wpm-purple` | `#6C4DFF` | Acento principal, glow |
| `--color-wpm-cyan` | `#74F7FF` | Acento secundário, glow |
| `--color-wpm-white` | `#EAF2FF` | Texto principal |
| `--color-wpm-gray` | `#7E8797` | Texto secundário, labels |
| `--color-wpm-dark-surface` | `#0A0D14` | Superfícies escuras |
| `--color-wpm-card` | `#0D1020` | Fundo de cards |

### Tipografia

| Fonte | Uso |
|-------|-----|
| **Geist Sans** (via `--font-geist-sans`) | Texto geral, headings, UI |
| **Geist Mono** (via `--font-geist-mono`) | Código, terminal, labels técnicos, status |

Escala de tamanhos usada:
- `text-[11px]` — tamanho mínimo para labels pequenas, status, versão
- `text-xs` (12px) — texto secundário, botões
- `text-sm` (14px) — descrições, corpo
- `text-base` — (não usado ativamente)
- `text-lg` (18px) — títulos de cards
- `text-2xl` (24px) — títulos de seção
- `text-3xl` (30px) — headings principais
- `text-5xl` (48px) — título "Console"
- `text-7xl` (72px) — sigla WPM na intro (mobile)
- `text-9xl` (128px) — sigla WPM na intro (desktop)

### Efeitos Visuais

#### Scanlines (CRT)
```css
.crt-overlay {
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.04) 0px,
    rgba(0, 0, 0, 0.04) 2px,
    transparent 2px,
    transparent 4px
  );
}
```

#### Vignette
```css
.crt-vignette {
  background: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(5, 5, 9, 0.55) 100%
  );
}
```

#### Grid Background
```css
background-image:
  linear-gradient(rgba(108,77,255,0.3) 1px, transparent 1px),
  linear-gradient(90deg, rgba(108,77,255,0.3) 1px, transparent 1px);
background-size: 80px 80px;
```

#### Noise/Grain
```css
background-image: url("data:image/svg+xml,..."); /* SVG com feTurbulence */
```

---

## Estrutura de Componentes

### Hierarquia de Componentes

```
RootLayout (layout.tsx)
└── HomePage (page.tsx)
    ├── BootIntro (condicional)
    ├── PressStart (condicional)
    └── ConsoleShell (condicional)
        └── ConsoleMenu
            ├── Menu Items (7 links)
            └── ProjectCard[] (grid)

Outras rotas:
/console → ConsoleShell > ConsoleMenu
/projects/[slug] → ConsoleShell > ProjectPage (server)
/about → ConsoleShell > AboutPage
/skills → ConsoleShell > SkillsPage
/resume → ConsoleShell > ResumePage
/lab → ConsoleShell > LabPage
/hobbies → ConsoleShell > HobbiesPage
/contact → ConsoleShell > ContactPage
```

### Padrão de Composição

- `ConsoleShell` é o layout wrapper das páginas internas
- Recebe `children` e opcionalmente `showNav`
- Cada página é responsável por seu próprio conteúdo
- Botão "BACK TO CONSOLE" está em cada página individual

---

## Roteamento

### Rotas Estáticas (○)
Pré-renderizadas no build:
- `/` — Home (fluxo Boot → Start → Console)
- `/about` — Perfil
- `/console` — Menu principal
- `/contact` — Contato
- `/hobbies` — Hobbies
- `/lab` — Laboratório
- `/resume` — Currículo
- `/skills` — Habilidades

### Rotas Dinâmicas (ƒ)
Renderizadas sob demanda:
- `/projects/[slug]` — Detalhe de projeto

### Parâmetros Dinâmicos (Next.js 16)

No Next.js 16, `params` é uma **Promise** que precisa de `await`:

```typescript
// Server Component
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  // ...
}
```

---

## TypeScript

### Interfaces

```typescript
// src/data/projects.ts
interface Project {
  slug: string;
  title: string;
  genre: string;
  year: number;
  status: "Completed" | "In Progress" | "Prototype";
  role: string;
  stack: string[];
  thumbnail: string;
  description: string;
  problem: string;
  solution: string;
  results: string;
  links: {
    live?: string;
    github?: string;
    figma?: string;
    caseStudy?: string;
  };
}
```

### Configuração (`tsconfig.json`)
- `target: ES2017`
- `strict: true`
- `moduleResolution: "bundler"`
- `paths: { "@/*": ["./src/*"] }`

---

## Acessibilidade

Implementado desde o MVP 1:

| Feature | Implementação |
|---------|---------------|
| `prefers-reduced-motion` | Media query desabilita animações e scanlines |
| Navegação por teclado | ENTER/ESPAÇO no PressStart, ESC nas páginas internas, foco contido em drawer/painel |
| Skip intro | Botão visível após 1.5s |
| Contraste | Texto claro sobre fundo escuro |
| Links semânticos | `<Link>` e `<a>` com props adequadas |
| Contexto de rota | Top bar mostra seção atual e destaca item ativo |
| Live region | Home anuncia transições de stage com `aria-live="polite"` |
| Mobile back | Botão fixo `Back` nas páginas internas em telas pequenas |

---

## Performance

### Atual
- 16 páginas/rotas estáticas no build, incluindo `_not-found`, `robots.txt` e `sitemap.xml`
- Imagens servidas por `next/image` quando aparecem em cards/detalhes
- WebGL carregado apenas no estagio Console da home em desktop
- Mobile usa fallback CSS (ShaderBackgroundFallback), sem carregar o bundle Three.js/R3F
- Export estático GitHub Pages com `NEXT_PUBLIC_DEPLOY_TARGET=github-pages`
- CSS via Tailwind e tokens WPM
- Animações via Motion usando `transform`/`opacity` onde possivel
- Headers de seguranca configurados em `next.config.ts`

### Planejado / Monitorar
- bundle analysis
- novas otimizações mobile para `/console`
- Mobile: ShaderBackgroundWrapper detecta dispositivo e redireciona para ShaderBackgroundFallback (CSS puro), evitando carregar o bundle pesado de Three.js/R3F (~200 KB gzip). Desktop com WebGL mantem a experiencia completa de particulas.
- futuras mídias devem seguir o padrão WebP/JPG otimizado já usado no livro

---

## Comandos

```bash
# Desenvolvimento
npm run dev         # Inicia servidor de dev (Turbopack)

# Build
npm run build       # Build de produção
npm run build:github-pages  # Export estático para GitHub Pages

# Produção
npm run start       # Inicia servidor de produção

# Lint
npm run lint        # ESLint

# Tipagem
npm run typecheck   # TypeScript sem emit

# Dependencias
npm audit --audit-level=low

# E2E
npm run test:e2e
```

Cobertura atual de regressao E2E:
- Smoke: 16 rotas criticas retornam 200 com conteudo.
- Fluxo: Press Start entra no Console (WPM.OS + System ready).
- SEO: 7 rotas Tier 1 + Tier 2 validam title, description (string completa), canonical.
- WebGL mobile: guarda especifica em `mobile-chrome` prova que o fallback CSS nao cria canvas, nao chama `getContext("webgl"|"webgl2")` e nao carrega o chunk pesado Three/R3F. A descoberta do chunk e dinamica (marcador `WebGLRenderer` + `react-three`) — sem hash fixo.
- Projetos: media otimizada (.webp) e imagem social OG por slug.
- 404: pagina customizada renderiza para rotas desconhecidas.
- Acessibilidade: links de contato alcancaveis via Tab.

---

## Dependências Completas

```json
{
  "dependencies": {
    "@react-three/fiber": "^9.6.1",
    "clsx": "^2.1.1",
    "motion": "^12.38.0",
    "next": "16.2.4",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "tailwind-merge": "^3.5.0",
    "three": "^0.184.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.184.1",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

---

## Fechamento de Publicacao 2026-05-08

- Commit publicado: `07a38bf audit: apply visual portfolio hardening`
- Commit documental/QA tecnico live: `81996a8 docs: record live technical visual qa`
- GitHub Actions: `Deploy GitHub Pages` run `25581405242`, sucesso
- GitHub Actions mais recente auditado: run `25581839825`, `completed/success`, head `81996a88c595e9b7c63f0adb59f5aeedfae61476`
- URL live: `https://wphillipmaclayne.github.io/wpm-portfolio/`
- Gates locais: `npm run lint`, `npm run typecheck`, `npm ci --dry-run`, `npm run build`, `npm run build:github-pages`, `npm run test:e2e`
- E2E local: 13 passed, 1 skipped
- Validacao live automatizada: rotas principais 200 em desktop/mobile, imagens sem quebra, drawer mobile abriu com `aria-expanded=true`, sem falhas coletadas.
- QA visual tecnico live adicional: desktop/mobile entram no console, drawer mobile abre, GitHub/LinkedIn corretos, nenhum `mailto:` ou email exposto, sem page/console errors capturados.
- Nota operacional: GitHub Actions emitiu aviso de deprecacao futura do runtime Node.js 20 para actions; acompanhar antes de 2026-06-02.
- Pendencia unica para encerramento humano: Wallace revisar o site live e responder `APROVADO VISUAL` ou `AJUSTAR: ...`.

---

## Handoff Operacional — 2026-05-08

Para retomar em outro terminal/conta Codex:

1. Entrar em `/home/acewallthemac/Documentos/portifoliomain/wpm-portfolio`.
2. Confirmar `git status --short --branch`.
3. Confirmar o ultimo workflow com `gh run view 25581839825 --json conclusion,status,headSha,url,createdAt,updatedAt`.
4. Confirmar a URL com `curl -I https://wphillipmaclayne.github.io/wpm-portfolio/`.
5. Nao refazer a publicacao nem marcar fechamento completo sem a aprovacao visual humana de Wallace.

Se Wallace responder `AJUSTAR: ...`, aplicar somente o ajuste pedido, validar, documentar, commitar, publicar e pedir novo aceite visual.

> **Regra do projeto:** Esta referência técnica deve ser atualizada sempre que novas tecnologias, padrões ou decisões arquiteturais forem introduzidos.

---

## Premium Redesign 2026-05-08

Novos contratos visuais:

- `src/components/console/moduleSceneData.ts`: fonte dos metadados visuais por modulo.
- `src/components/console/ModulePreviewPanel.tsx`: preview stage reutilizavel para command deck e slide panel.
- `src/components/console/ModuleSceneLayout.tsx`: template de paginas internas em formato scene/dossier.

Tokens adicionados em `src/app/globals.css`:

- `wpm-surface`
- `wpm-elevated`
- `wpm-text-secondary`
- `wpm-muted`
- `wpm-success`
- `wpm-warning`
- `wpm-experimental`

Comandos finais executados nesta rodada:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run build:github-pages
```

Resultado: todos passaram; E2E final com `13 passed, 1 skipped`.

Relatorio de design/QA: `docs/13-WPMOS-PREMIUM-REDESIGN-2026-05-08.md`.

### Nota de QA local: Hydration overlay por extensao

Um erro manual de hidratacao no navegador local foi investigado apos a rodada. A mensagem continha `translate-tooltip-mtz translator-hidden`, classe injetada por extensao/tradutor antes da hidratacao React. O erro nao foi reproduzido em Chromium limpo via Playwright nas rotas `/projects`, `/console` e `/about`.

Decisao: nao alterar codigo do app para esse caso. Para QA visual, usar janela anonima sem extensoes ou desativar o tradutor na URL local.
