# Arquitetura Técnica — WPM.OS

> Especificação arquitetural para implementação
> Stack: Next.js 16 App Router · React 19 · TypeScript · Motion for React · GSAP · React Three Fiber
> Status: MVP 1 implementado, MVP 2-5 arquitetados

---

## 1. Estrutura de Pastas (Full Architecture)

```
wpm-portfolio/
├── docs/                              ← Documentação do projeto
│   ├── 00-OVERVIEW.md                 ← Índice e visão geral
│   ├── 01-STEP-BY-STEP.md             ← Diário de desenvolvimento
│   ├── 02-TECHNICAL-REFERENCE.md      ← Referência técnica
│   ├── 03-CREATIVE-BRIEF.md           ← Briefing criativo
│   ├── 04-CREATIVE-SPEC.md            ← Especificação criativa (direção de arte)
│   └── 05-ARCHITECTURE.md             ← Este documento
│
├── public/                            ← Assets estáticos
│   ├── fonts/                         ← Fontes locais (fallback)
│   ├── images/                        ← Screenshots, thumbnails
│   └── audio/                         ← Efeitos sonoros (MVP 3)
│       ├── boot.mp3
│       ├── hover.mp3
│       └── transition.mp3
│
├── src/
│   ├── app/                           ← App Router (rotas)
│   │   ├── layout.tsx                 ← Root layout — HTML, body, fontes, providers
│   │   ├── globals.css                ← Tema global, tokens, animações, scanlines
│   │   ├── not-found.tsx              ← 404 customizada ("Address not found in memory")
│   │   ├── loading.tsx                ← Loading global ("Reading sector...")
│   │   ├── error.tsx                  ← Error boundary global
│   │   │
│   │   ├── page.tsx                   ← / — Fluxo Boot → Start → Console
│   │   │
│   │   ├── console/                   ← /console — Hub principal
│   │   │   └── page.tsx               ← Wrapper: ConsoleShell > ConsoleMenu
│   │   │
│   │   ├── projects/                  ← /projects — Projetos
│   │   │   ├── page.tsx               ← Lista completa (MVP 4 — opcional)
│   │   │   └── [slug]/               ← /projects/[slug] — Detalhe
│   │   │       └── page.tsx           ← Server Component (async params)
│   │   │
│   │   ├── about/                     ← /about — Character profile
│   │   │   └── page.tsx
│   │   ├── skills/                    ← /skills — Power-ups
│   │   │   └── page.tsx
│   │   ├── resume/                    ← /resume — Save file
│   │   │   └── page.tsx
│   │   ├── lab/                       ← /lab — Experimental zone
│   │   │   └── page.tsx
│   │   ├── hobbies/                   ← /hobbies — Side quests
│   │   │   └── page.tsx
│   │   ├── contact/                   ← /contact — New message
│   │   │   └── page.tsx
│   │   ├── settings/                  ← /settings — (MVP 3)
│   │   │   └── page.tsx
│   │   └── secret/                    ← /secret — (MVP 5, NDA)
│   │       └── page.tsx
│   │
│   ├── components/                    ← Componentes reutilizáveis
│   │   ├── boot/                      ← Tela de intro
│   │   │   ├── BootIntro.tsx          ← Sequência de boot com loading + reveal
│   │   │   └── PressStart.tsx         ← Tela PRESS START + efeito CRT
│   │   │
│   │   ├── console/                   ← Shell do console e menu
│   │   │   ├── ConsoleShell.tsx       ← Layout wrapper (top bar, bottom bar, overlays)
│   │   │   ├── ConsoleMenu.tsx        ← Grid de menus + seção de projetos
│   │   │   └── ProjectCard.tsx        ← Card de projeto individual
│   │   │
│   │   ├── projects/                  ← Páginas de projeto
│   │   │   ├── ProjectHero.tsx        ← Hero section (MVP 2 — separado do page)
│   │   │   ├── ProjectMeta.tsx        ← Role + Stack card (MVP 2)
│   │   │   ├── ProjectCaseStudy.tsx   ← Problema / Solução / Resultados (MVP 2)
│   │   │   └── ProjectGallery.tsx     ← Galeria de imagens (MVP 4)
│   │   │
│   │   ├── motion/                    ← Componentes de animação
│   │   │   ├── PageTransition.tsx       ← Wrapper de transição entre páginas
│   │   │   ├── ReverseCrtTransition.tsx ← Efeito CRT reverso (MVP 2)
│   │   │   ├── StaggerContainer.tsx     ← Container com stagger animation
│   │   │   └── FadeInView.tsx           ← Fade-in ao entrar no viewport
│   │   │
│   │   ├── webgl/                     ← Componentes WebGL (client-only)
│   │   │   ├── WpmParticles.tsx       ← Sistema de partículas (MVP 3)
│   │   │   ├── ShaderBackground.tsx   ← Background com shader (MVP 3)
│   │   │   ├── GlowField.tsx          ← Campo de luz 3D (MVP 3)
│   │   │   └── WebGLFallback.tsx      ← Fallback estático sem WebGL
│   │   │
│   │   ├── ui/                        ← Componentes de interface atômicos
│   │   │   ├── Button.tsx             ← Botão com variantes (primary, ghost, icon)
│   │   │   ├── Badge.tsx              ← Tag/badge para status e stack
│   │   │   ├── Divider.tsx            ← Linha divisória horizontal
│   │   │   ├── Cursor.tsx             ← Cursor customizado (MVP 2)
│   │   │   ├── Toggle.tsx             ← Switch/Toggle (MVP 3 — Settings)
│   │   │   ├── Icon.tsx               ← Ícone SVG (MVP 2 — substituir ASCII)
│   │   │   ├── Skeleton.tsx           ← Loading skeleton (MVP 5)
│   │   │   └── SkipLink.tsx           ← Link de salto para acessibilidade (MVP 5)
│   │   │
│   │   └── layout/                    ← Componentes de layout reutilizáveis
│   │       ├── TopBar.tsx             ← Barra superior com navegação
│   │       └── BottomBar.tsx          ← Barra inferior com info
│   │
│   ├── hooks/                         ← Hooks customizados
│   │   ├── useReducedMotion.ts        ← Detecta prefers-reduced-motion
│   │   ├── useSound.ts                ← Gerencia áudio (MVP 3)
│   │   ├── useIntroSkip.ts            ← Persiste skip intro via localStorage
│   │   ├── useKeyboardNav.ts          ← Navegação por teclado (MVP 2)
│   │   └── usePerformanceMode.ts      ← Detecta GPU/performance (MVP 3)
│   │
│   ├── providers/                     ← Context Providers
│   │   ├── SoundProvider.tsx           ← Contexto de áudio global (MVP 3)
│   │   ├── SettingsProvider.tsx        ← Configurações (MVP 3)
│   │   └── PerformanceProvider.tsx     ← Modo performance (MVP 3)
│   │
│   ├── data/                          ← Dados estáticos
│   │   ├── projects.ts               ← Array de projetos + getProjectBySlug()
│   │   ├── profile.ts                ← Perfil, skills, menu items
│   │   ├── menu.ts                   ← Configuração de navegação
│   │   └── settings.ts               ← Configurações padrão (MVP 3)
│   │
│   ├── lib/                           ← Utilitários
│   │   ├── utils.ts                   ← cn() — Tailwind merge
│   │   └── constants.ts              ← Constantes do sistema
│   │
│   └── types/                         ← Tipos globais
│       ├── project.ts                 ← Interface Project
│       ├── profile.ts                 ← Interface Profile
│       ├── menu.ts                    ← Interface MenuItem
│       └── settings.ts               ← Interface Settings (MVP 3)
│
├── next.config.ts                     ← Config Next.js
├── tailwind.config.ts                 ← (Tailwind v4 usa @theme inline)
├── tsconfig.json                      ← Config TypeScript
└── package.json                       ← Dependências
```

### Legendas da Estrutura

| Símbolo | Significado |
|---------|-------------|
| ✅ / sem marcação | Implementado no MVP 1 |
| 💭 `(MVP X)` | Planejado para MVP futuro |
| `(vazio)` | Placeholder — diretório existe, arquivos a criar |

---

## 2. Arquitetura de Rotas

### 2.1 Tabela de Rotas

| Rota | Tipo | Renderização | Componente Page | Params |
|------|------|-------------|-----------------|--------|
| `/` | Client | CSR + AnimatePresence | `page.tsx` | — |
| `/console` | Client | CSR | `console/page.tsx` | — |
| `/projects/[slug]` | Server | SSR/SSG | `projects/[slug]/page.tsx` | `Promise<{ slug }>` |
| `/about` | Client | CSR | `about/page.tsx` | — |
| `/skills` | Client | CSR | `skills/page.tsx` | — |
| `/resume` | Client | CSR | `resume/page.tsx` | — |
| `/lab` | Client | CSR | `lab/page.tsx` | — |
| `/hobbies` | Client | CSR | `hobbies/page.tsx` | — |
| `/contact` | Client | CSR | `contact/page.tsx` | — |
| `/settings` | Client | CSR | `settings/page.tsx` | — |
| `/secret` | Client | CSR | `secret/page.tsx` | — |

### 2.2 Server vs Client Components — Critérios de Decisão

```
É Server Component se:
├── Não usa hooks (useState, useEffect, etc.)
├── Não usa Motion (motion.div, AnimatePresence)
├── Não usa event handlers (onClick, onKeyDown)
├── Não usa browser APIs (window, document, localStorage)
├── Precisa de async/await para params (Next.js 16)
└── É puramente renderização de dados

É Client Component ("use client") se:
├── Usa Motion para animações
├── Gerencia estado (useState, useReducer)
├── Usa efeitos colaterais (useEffect, event listeners)
├── Acessa browser APIs
└── Precisa de interatividade (cliques, teclado, hover state)
```

### 2.3 Hierarquia de Layouts

```
RootLayout (layout.tsx)
├── <html> + <body> + fontes
├── Providers (SoundProvider, SettingsProvider, PerformanceProvider)
├── CRT Overlays (scanlines, vignette — fixos, pointer-events: none)
│
└── children
    │
    ├── / (page.tsx)
    │   ├── BootIntro (stage === "boot")
    │   ├── PressStart (stage === "start")
    │   └── ConsoleShell > ConsoleMenu (stage === "console")
    │
    ├── /console (console/page.tsx)
    │   └── ConsoleShell > ConsoleMenu
    │
    ├── /projects/[slug]
    │   └── ConsoleShell > ProjectDetail (server component)
    │
    └── /about, /skills, /resume, /lab, /hobbies, /contact
        └── ConsoleShell > PageContent
```

---

## 3. Catálogo de Componentes

### 3.1 Boot (Intro)

| Componente | Arquivo | Responsabilidade | Props | Estado |
|-----------|---------|-----------------|-------|--------|
| **BootIntro** | `components/boot/BootIntro.tsx` | Sequência de boot: barra de progresso, mensagens, reveal da sigla/Nome, botão skip | `onComplete: () => void` | `"loading" \| "reveal" \| "done"` |
| **PressStart** | `components/boot/PressStart.tsx` | Tela PRESS START com efeito CRT turn-on, detector de tecla ENTER | `onStart: () => void` | `crtOn: boolean`, `visible: boolean` |

### 3.2 Console (Hub)

| Componente | Arquivo | Responsabilidade | Props |
|-----------|---------|-----------------|-------|
| **ConsoleShell** | `components/console/ConsoleShell.tsx` | Layout persistente: top bar (logo + nav), bottom bar (nome + ano), grid bg, overlays CRT. Envolve todo conteúdo interno. | `children: ReactNode`, `showNav?: boolean` |
| **ConsoleMenu** | `components/console/ConsoleMenu.tsx` | Grid de 7 itens de menu + seção Featured Projects com grid de ProjectCards | — (usa dados de `data/`) |
| **ProjectCard** | `components/console/ProjectCard.tsx` | Card de projeto com gênero, ano, título, descrição, stack tags, status indicator. Link para `/projects/[slug]` | `project: Project`, `index: number` |

### 3.3 Projetos (Detail)

| Componente | Arquivo | Responsabilidade | MVP |
|-----------|---------|-----------------|-----|
| **ProjectHero** | `components/projects/ProjectHero.tsx` | Hero do projeto: badge de gênero, ano, status, título, descrição | MVP 2 |
| **ProjectMeta** | `components/projects/ProjectMeta.tsx` | Card com Role + Stack tags | MVP 2 |
| **ProjectCaseStudy** | `components/projects/ProjectCaseStudy.tsx` | Seções Problema / Solução / Resultados | MVP 2 |
| **ProjectGallery** | `components/projects/ProjectGallery.tsx` | Galeria de imagens/vídeos | MVP 4 |

### 3.4 Motion (Animações)

| Componente | Arquivo | Responsabilidade | MVP |
|-----------|---------|-----------------|-----|
| **PageTransition** | `components/motion/PageTransition.tsx` | Wrapper que aplica transição de entrada/saída em páginas. Usa AnimatePresence. | MVP 2 |
| **ReverseCrtTransition** | `components/motion/ReverseCrtTransition.tsx` | Efeito CRT reverso (linha que expande) como overlay de transição entre rotas | MVP 2 |
| **StaggerContainer** | `components/motion/StaggerContainer.tsx` | Container com stagger animation automática nos children | MVP 2 |
| **FadeInView** | `components/motion/FadeInView.tsx` | Fade-in + slide-up quando elemento entra no viewport (Intersection Observer) | MVP 2 |

### 3.5 WebGL (Client-Only)

| Componente | Arquivo | Responsabilidade | MVP |
|-----------|---------|-----------------|-----|
| **WpmParticles** | `components/webgl/WpmParticles.tsx` | Sistema de partículas 3D reativas ao mouse (R3F) | MVP 3 |
| **ShaderBackground** | `components/webgl/ShaderBackground.tsx` | Background com shader GLSL reativo (R3F) | MVP 3 |
| **GlowField** | `components/webgl/GlowField.tsx` | Campo de luz/glow 3D decorativo | MVP 3 |
| **WebGLFallback** | `components/webgl/WebGLFallback.tsx` | Fallback estático (CSS gradient) quando WebGL não está disponível | MVP 3 |

### 3.6 UI (Atômicos)

| Componente | Arquivo | Responsabilidade | MVP |
|-----------|---------|-----------------|-----|
| **Button** | `components/ui/Button.tsx` | Botão com variantes: `primary`, `ghost`, `icon`. Com Motion. | MVP 2 |
| **Badge** | `components/ui/Badge.tsx` | Tag/badge para gênero, status, stack | MVP 2 |
| **Divider** | `components/ui/Divider.tsx` | Linha divisória horizontal com label opcional | MVP 2 |
| **Cursor** | `components/ui/Cursor.tsx` | Cursor customizado magnético (MVP 2) | MVP 2 |
| **Toggle** | `components/ui/Toggle.tsx` | Switch on/off para Settings (MVP 3) | MVP 3 |
| **Icon** | `components/ui/Icon.tsx` | Ícone SVG com variantes de cor e tamanho | MVP 2 |
| **Skeleton** | `components/ui/Skeleton.tsx` | Loading skeleton para conteúdo assíncrono | MVP 5 |
| **SkipLink** | `components/ui/SkipLink.tsx` | Link "Skip to content" para teclado (MVP 5) | MVP 5 |

### 3.7 Layout

| Componente | Arquivo | Responsabilidade | MVP |
|-----------|---------|-----------------|-----|
| **TopBar** | `components/layout/TopBar.tsx` | Extraído do ConsoleShell — barra superior reutilizável | MVP 2 |
| **BottomBar** | `components/layout/BottomBar.tsx` | Extraído do ConsoleShell — barra inferior reutilizável | MVP 2 |

---

## 4. Fluxo de Estado

### 4.1 Máquina de Estados da Home Page

```
                    ┌──────────┐
                    │  (início) │
                    └────┬─────┘
                         │
                    ┌────▼─────┐
              ┌─────│   BOOT   │──────┐
              │     └────┬─────┘      │
              │          │            │
              │   onComplete()    [SKIP INTRO]
              │          │            │
              │     ┌────▼─────┐      │
              │     │  START   │◄─────┘
              │     └────┬─────┘
              │          │
              │     onStart() / ENTER
              │          │
              │     ┌────▼─────┐
              │     │ CONSOLE  │
              │     └──────────┘
              │
              └── (skip direto para START também é possível)
```

**Implementação atual:**
```typescript
type Stage = "boot" | "start" | "console";
const [stage, setStage] = useState<Stage>("boot");
const [bootComplete, setBootComplete] = useState(false);
// BootIntro.onComplete → setStage("start")
// PressStart.onStart → setStage("console")
```

### 4.2 Estado Global (Providers — MVP 3)

```
<SettingsProvider>          ← Persiste em localStorage
├── soundEnabled: boolean   ← Som ligado/desligado
├── performanceMode: "auto" | "low" | "high"
├── reducedMotion: boolean  ← Respeita prefers-reduced-motion
└── introSkipped: boolean   ← Pula intro em visitas seguintes

<SoundProvider>             ← Gerencia áudio
├── isMuted: boolean        ← Estado global de mute
├── volume: number          ← Volume (0-1)
├── play(sound: SoundName)  ← Toca efeito sonoro
└── sounds: Map<SoundName, HTMLAudioElement>

<PerformanceProvider>       ← Detecta capacidade
├── gpuTier: 0 | 1 | 2     ← Tier de GPU (0 = low, 2 = high)
├── isMobile: boolean       ← Dispositivo móvel
├── webglSupported: boolean ← Suporte a WebGL
└── effectiveMode: "low" | "medium" | "high"  ← Modo efetivo
```

### 4.3 Fluxo de Dados

```
src/data/           ← Fonte única de verdade (dados estáticos)
    │
    ├── projects.ts ──── import ──→ ConsoleMenu (lista)
    │                             └─→ ProjectCard (individual)
    │                             └─→ projects/[slug]/page.tsx (detalhe)
    │
    └── profile.ts  ──── import ──→ BootIntro (nome, sigla)
                                  └─→ PressStart (nome)
                                  └─→ ConsoleShell (nome, ano)
                                  └─→ ConsoleMenu (menuItems)
                                  └─→ Páginas (skills, hobbies, social)

Futuro (MVP 5): CMS headless → API Route → fetch → props
```

---

## 5. Estratégia de Animação

### 5.1 Camadas de Animação (Ordem de Prioridade)

```
CAMADA 1 — CSS Puro (sempre ativo)
├── Scanlines (repeating-linear-gradient, loop infinito)
├── Vignette (radial-gradient, fixo)
├── Noise (SVG filter, fixo)
├── Text glow (text-shadow, hover/focus)
└── Border transitions (transition-colors)

CAMADA 2 — Motion for React (MVP 1-2)
├── AnimatePresence (transições entre stages/páginas)
├── motion.div (fade, slide, scale, blur)
├── Stagger animations (grids, listas)
├── Hover/Tap (whileHover, whileTap)
├── Layout animations (layoutId — MVP 2)
└── Exit animations (AnimatePresence mode="wait")

CAMADA 3 — Motion Values (MVP 2-3)
├── useScroll (scroll-linked animations)
├── useTransform (parallax, progress)
├── useSpring (cursor magnético, física suave)
├── useMotionValue (rastreamento de mouse)
└── useInView (trigger ao entrar no viewport)

CAMADA 4 — GSAP (MVP 3-4)
├── ScrollTrigger (animações complexas de scroll)
├── Timelines (sequências multi-etapa)
├── MorphSVG (transições de ícones)
└── TextPlugin (efeitos de texto — MVP 4)

CAMADA 5 — React Three Fiber (MVP 3)
├── useFrame (render loop WebGL)
├── Shaders GLSL (background reativo)
├── Particles (sistema de partículas)
└── Post-processing (bloom, god rays — opcional)
```

### 5.2 Regras de Performance

| Regra | Detalhe |
|-------|---------|
| **Nunca animar width/height** | Usar `transform: scale()` e `opacity` — GPU accelerated |
| **Nunca animar box-shadow** | Usar `opacity` em pseudo-elemento com shadow fixo |
| **Motion: layout animations com cautela** | `layout` prop é caro. Usar só onde essencial. |
| **R3F: DPR máximo 2** | Limitar device pixel ratio para performance |
| **R3F: Frustum culling** | Partículas fora da câmera não renderizam |
| **useReducedMotion() em todo componente animado** | Se true, pular animações e ir direto ao estado final |

### 5.3 Detecção de Prefers-Reduced-Motion

```typescript
// hooks/useReducedMotion.ts
"use client";
import { useReducedMotion as useMotionReducedMotion } from "motion/react";

export function useReducedMotion(): boolean {
  const prefersReduced = useMotionReducedMotion();
  return prefersReduced ?? false;
}
```

**Comportamento quando `prefersReducedMotion === true`:**
- Boot: pular animações, mostrar estado final imediatamente
- PressStart: pular CRT turn-on, mostrar tela direto
- ConsoleMenu: remover stagger, mostrar tudo de uma vez
- Cards: remover hover animations, manter só transição de cor
- WebGL: usar WebGLFallback (CSS estático)
- Transições de página: fade simples de 100ms

---

## 6. Estratégia de Acessibilidade

### 6.1 Camadas de Acessibilidade

```
NÍVEL 1 — Sempre presente (MVP 1+)
├── HTML semântico (<header>, <nav>, <main>, <footer>)
├── Contraste ≥ 4.5:1 (WCAG AA)
├── Todo texto é HTML real (não imagem)
├── ::selection estilizada
├── Scrollbar visível e utilizável
├── prefers-reduced-motion respeitado
├── Botão SKIP INTRO
└── ENTER/ESPAÇO no PressStart

NÍVEL 2 — Navegação (MVP 2+)
├── Foco visível em todos elementos interativos
├── Tab order lógica
├── Skip-to-content link
├── Navegação por teclado completa (setas no menu)
├── ARIA labels em ícones e elementos sem texto
└── Anunciar mudanças de tela/stage

NÍVEL 3 — Leitores de Tela (MVP 5)
├── Roles ARIA apropriados
├── aria-live para conteúdo dinâmico
├── Alt text em todas imagens
├── Labels descritivas em links
└── Testado com NVDA/VoiceOver

NÍVEL 4 — Redução de Movimento (MVP 1+)
├── prefers-reduced-motion
├── Botão explícito "Reduce Motion"
├── Modo "Low Performance" sem WebGL
└── Áudio desligado por padrão
```

### 6.2 Ordem de Tab

```
1. [SKIP INTRO]          ← Visível durante boot
2. PRESS START           ← Foco principal na tela de start
3. WPM.OS (logo link)    ← Volta para home
4. [] Projects           ← Menu item 1
5. ? About               ← Menu item 2
6. {} Skills             ← Menu item 3
7. ■ Resume              ← Menu item 4
8. <> Lab                ← Menu item 5
9. ♦ Hobbies             ← Menu item 6
10. @ Contact            ← Menu item 7
11. Projeto 1            ← Card na grid
12. Projeto 2
13. Projeto 3
14. Footer links         ← GitHub, LinkedIn, Email
```

### 6.3 Estrutura de Headings

```
Página inicial (fluxo):
(Não há headings na intro — é puramente visual)

/console:
h1 — Console
h2 — Featured Projects
h3 — [Nome do Projeto] (em cada card)

/about:
h1 — Wallace Phillip Maclayne
h2 — Skills, Hobbies (implícito nos cards)

/projects/[slug]:
h1 — [Nome do Projeto]
h2 — The Problem, The Solution, Results
```

---

## 7. Performance Mobile

### 7.1 Estratégia Responsiva

```
BREAKPOINTS (Tailwind padrão)
├── sm: 640px   ← Mobile landscape
├── md: 768px   ← Tablet
├── lg: 1024px  ← Desktop pequeno
└── xl: 1280px  ← Desktop grande

COMPORTAMENTO POR BREAKPOINT
├── Mobile (< 640px)
│   ├── Menu: 2 colunas
│   ├── Projetos: 1 coluna
│   ├── Top bar: ícones sem labels
│   ├── Texto WPM: text-7xl (72px)
│   ├── Scanlines: desabilitadas (custo de render)
│   └── WebGL: Fallback CSS
│
├── Tablet (640px - 1024px)
│   ├── Menu: 3-4 colunas
│   ├── Projetos: 2 colunas
│   ├── Top bar: ícones + labels
│   └── Texto WPM: text-9xl (128px)
│
└── Desktop (> 1024px)
    ├── Menu: 7 colunas
    ├── Projetos: 3 colunas
    ├── Cursor customizado (MVP 2)
    ├── WebGL ativo (se suportado)
    └── Hover effects completos
```

### 7.2 Detecção e Adaptação

```typescript
// hooks/usePerformanceMode.ts (MVP 3)
function detectPerformanceTier(): "low" | "medium" | "high" {
  // Mobile → low (sem WebGL, animações reduzidas)
  if (typeof navigator !== "undefined" && /Mobi|Android/i.test(navigator.userAgent)) {
    return "low";
  }
  
  // GPU detection via WebGL renderer string
  // "low" = integrated/old GPU, "high" = dedicated GPU
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  const renderer = gl?.getParameter(gl.RENDERER) ?? "";
  
  if (renderer.includes("Intel") || renderer.includes("Mali")) return "low";
  if (renderer.includes("Apple")) return "medium";
  return "high";
}
```

---

## 8. Estratégia de Carregamento

### 8.1 WebGL — Client-Only com Dynamic Import

```typescript
// components/webgl/WpmParticles.tsx
"use client";

import dynamic from "next/dynamic";
import { WebGLFallback } from "./WebGLFallback";

const WpmParticlesInner = dynamic(
  () => import("./WpmParticlesInner"),
  {
    ssr: false,              // Nunca renderiza no servidor
    loading: () => <WebGLFallback />  // Fallback durante carregamento
  }
);

export function WpmParticles() {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return <WebGLFallback />;
  return <WpmParticlesInner />;
}
```

### 8.2 Áudio — Lazy Loading

```typescript
// hooks/useSound.ts (MVP 3)
export function useSound() {
  const [sounds, setSounds] = useState<Map<SoundName, HTMLAudioElement>>(new Map());
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Só carrega áudio após interação do usuário (política de autoplay)
    const handleInteraction = async () => {
      const audioFiles = {
        hover: "/audio/hover.mp3",
        transition: "/audio/transition.mp3",
        boot: "/audio/boot.mp3",
      };
      // Carrega sob demanda
      setLoaded(true);
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction, { once: true });
    return () => window.removeEventListener("click", handleInteraction);
  }, []);
  
  return { loaded, /* ... */ };
}
```

### 8.3 Imagens — Next/Image

```typescript
// Quando adicionar imagens de projeto (MVP 4)
import Image from "next/image";

<Image
  src={project.thumbnail}
  alt={project.title}
  width={800}
  height={450}
  priority={index === 0}    // Prioriza primeira imagem
  loading={index === 0 ? undefined : "lazy"}  // Lazy para as demais
  placeholder="blur"         // Blur-up enquanto carrega
  blurDataURL="data:image/..." // Placeholder inline
/>
```

---

## 9. Ordem Ideal de Implementação

```
FASE 0 — Setup ✅ CONCLUÍDO
├── 0.1  next.config, tsconfig, eslint
├── 0.2  globals.css (tema, tokens, animações)
├── 0.3  Tipos e interfaces (types/, data/)
└── 0.4  lib/utils.ts (cn)

FASE 1 — Fundação Visual ✅ CONCLUÍDO
├── 1.1  RootLayout com fontes e metadados
├── 1.2  BootIntro (loading + reveal)
├── 1.3  PressStart (CRT turn-on + ENTER)
├── 1.4  ConsoleShell (top bar, bottom bar, overlays)
├── 1.5  ConsoleMenu (menu grid + seção projetos)
├── 1.6  ProjectCard (card com hover)
├── 1.7  Home page (fluxo Boot → Start → Console)
├── 1.8  Página de detalhe (projects/[slug])
└── 1.9  Páginas estáticas (about, skills, resume, lab, hobbies, contact)

FASE 2 — Componentes UI + Acessibilidade Base 💭
├── 2.1  Extrair TopBar e BottomBar do ConsoleShell
├── 2.2  Button, Badge, Divider, Icon
├── 2.3  StaggerContainer, FadeInView
├── 2.4  PageTransition wrapper
├── 2.5  ReverseCrtTransition
├── 2.6  Layout animations (layoutId entre cards e detail)
├── 2.7  Navegação por teclado (useKeyboardNav)
├── 2.8  Foco visível + skip-to-content link
├── 2.9  useIntroSkip (localStorage)
├── 2.10 Separar ProjectHero, ProjectMeta, ProjectCaseStudy
└── 2.11 Versão mobile refinada (menu drawer)

FASE 3 — Imersão (WebGL + Som) 💭
├── 3.1  SettingsProvider + useReducedMotion
├── 3.2  Toggle na top bar (som, performance)
├── 3.3  Settings page (/settings)
├── 3.4  WpmParticles (R3F)
├── 3.5  ShaderBackground (GLSL)
├── 3.6  WebGLFallback (CSS)
├── 3.7  SoundProvider + useSound
├── 3.8  Efeitos sonoros (hover, transition, boot)
├── 3.9  PerformanceProvider + usePerformanceMode
└── 3.10 Cursor customizado (useSpring + useMotionValue)

FASE 4 — Conteúdo Real 💭
├── 4.1  Projetos reais (substituir dados mock)
├── 4.2  Screenshots e thumbnails (next/image)
├── 4.3  Vídeos embedados (player customizado)
├── 4.4  Métricas de resultado
├── 4.5  Currículo completo
├── 4.6  Timeline interativa
├── 4.7  ProjectGallery (imagens/vídeos)
└── 4.8  Depoimentos (se disponível)

FASE 5 — Polimento 💭
├── 5.1  Bundle analysis + code splitting
├── 5.2  Skeleton screens
├── 5.3  SEO (metadados por página, sitemap, robots.txt)
├── 5.4  Analytics (plausible/simple)
├── 5.5  Error boundary por rota
├── 5.6  404 page customizada
├── 5.7  Loading states (suspense boundaries)
├── 5.8  ARIA completo + teste com screen reader
├── 5.9  Deploy (Vercel)
├── 5.10 /secret com proteção por senha
└── 5.11 Easter eggs (konami code, hidden interactions)
```

---

## 10. Padrões de Código

### 10.1 Nomenclatura

```
Arquivos de componente:    PascalCase.tsx     → BootIntro.tsx
Arquivos de hook:          camelCase.ts       → useReducedMotion.ts
Arquivos de utilitário:    camelCase.ts       → utils.ts
Arquivos de tipo:          camelCase.ts       → project.ts
Arquivos de dados:         camelCase.ts       → projects.ts
Diretórios de componente:  kebab-case ou flat → boot/, console/
Props de componente:       camelCase          → onComplete, showNav
Interfaces:                PascalCase         → BootIntroProps, Project
```

### 10.2 Estrutura de Componente

```typescript
"use client";                          // Se necessário

// 1. Imports — organizados por origem
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Profile } from "@/types/profile";

// 2. Tipos locais
interface ComponentProps {
  // ...
}

// 3. Constantes (se houver)

// 4. Componente
export default function Component({ prop1, prop2 }: ComponentProps) {
  // 4a. Hooks (useState, useEffect, custom hooks)
  // 4b. Derived state (useMemo, useCallback)
  // 4c. Event handlers
  // 4d. Early returns (if loading, if error, if empty)
  // 4e. Render
  
  return (
    // JSX
  );
}
```

### 10.3 Importação Motion

```typescript
// Sempre importar de "motion/react" para componentes
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Não importar de "motion" diretamente para componentes React
```

---

## 11. Configuração Next.js

### next.config.ts (futuro — quando adicionar imagens externas)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",  // Restringir em produção
      },
    ],
  },
  // Headers de segurança
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## 12. Dependências por Fase

```
FASE 1+ (core):
├── next, react, react-dom
├── typescript, @types/react, @types/react-dom
├── tailwindcss, @tailwindcss/postcss
├── motion
├── clsx, tailwind-merge
└── eslint, eslint-config-next

FASE 2+ (ui e animações):
├── (nada adicional — tudo com Motion)

FASE 3+ (webgl e áudio):
├── three, @react-three/fiber, @react-three/drei
├── gsap
└── (howler.js ou Web Audio API nativa)

FASE 5+ (qualidade):
├── (plausible-tracker ou similar)
└── (next-sitemap)
```

---

> **Princípio arquitetural:** Cada componente tem uma única responsabilidade. A complexidade está na composição, não nos componentes individuais. O código deve poder ser lido por um desenvolvedor que nunca viu o projeto — em 5 minutos.
