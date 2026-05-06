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
| **GSAP** | latest | Biblioteca de animação JS | ScrollTrigger, timelines (MVP 3) |
| **CSS Animations** | - | Nativo | Keyframes para scanlines, CRT, glow (globals.css) |

### 3D / WebGL

| Tecnologia | Versão | Tipo | Descrição |
|-----------|--------|------|-----------|
| **Three.js** | latest | Biblioteca 3D | Motor WebGL (MVP 3) |
| **@react-three/fiber** | latest | Renderer React p/ Three | Cenas 3D declarativas em React (MVP 3) |
| **@react-three/drei** | latest | Helpers R3F | OrbitControls, shaders, etc. (MVP 3) |

### Utilidades

| Tecnologia | Versão | Função |
|-----------|--------|--------|
| **clsx** | latest | Constrói strings de classes CSS condicionais |
| **tailwind-merge** | latest | Merge inteligente de classes Tailwind, resolve conflitos |
| **Geist Font** | - | Fonte do sistema Next.js — Sans para UI, Mono para código |

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
- `text-[10px]` — labels pequenas, status, versão
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
| Navegação por teclado | ENTER/ESPAÇO no PressStart |
| Skip intro | Botão visível após 1.5s |
| Contraste | Texto claro sobre fundo escuro |
| Links semânticos | `<Link>` e `<a>` com props adequadas |

---

## Performance

### Atual (MVP 1)
- 13 rotas/metadata endpoints no build incluindo `robots.txt` e `sitemap.xml`
- Imagens servidas por `next/image` quando aparecem em cards/detalhes
- WebGL carregado apenas no estagio Console da home
- CSS via Tailwind e tokens WPM
- Animações via Motion usando `transform`/`opacity` onde possivel
- Headers de seguranca configurados em `next.config.ts`

### Planejado (MVP 5)
- lazy loading de componentes WebGL
- code splitting por rota
- otimização de assets (imagens, fontes)
- bundle analysis
- `next/image` para imagens de projeto

---

## Comandos

```bash
# Desenvolvimento
npm run dev         # Inicia servidor de dev (Turbopack)

# Build
npm run build       # Build de produção

# Produção
npm run start       # Inicia servidor de produção

# Lint
npm run lint        # ESLint

# Tipagem
npm run typecheck   # TypeScript sem emit

# Dependencias
npm audit --audit-level=moderate --omit=dev
```

---

## Dependências Completas

```json
{
  "dependencies": {
    "@react-three/drei": "^x.x.x",
    "@react-three/fiber": "^x.x.x",
    "clsx": "^x.x.x",
    "gsap": "^x.x.x",
    "motion": "^12.38.0",
    "next": "^16.2.4",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwind-merge": "^x.x.x",
    "three": "^x.x.x"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^x.x.x",
    "@types/node": "^x.x.x",
    "@types/react": "^x.x.x",
    "@types/react-dom": "^x.x.x",
    "eslint": "^x.x.x",
    "eslint-config-next": "^x.x.x",
    "tailwindcss": "^x.x.x",
    "typescript": "^x.x.x"
  }
}
```

---

> **Regra do projeto:** Esta referência técnica deve ser atualizada sempre que novas tecnologias, padrões ou decisões arquiteturais forem introduzidos.
