# 01 — Diário de Desenvolvimento Passo a Passo

> Registro cronológico de cada etapa da construção do WPM.OS.
> Atualizado a cada tarefa concluída.

---

## Índice

1. [Sessão 1 — Setup do Projeto e MVP 1](#sessão-1--setup-do-projeto-e-mvp-1)
   - [1.1. Criação do Projeto Next.js](#11-criação-do-projeto-nextjs)
   - [1.2. Instalação de Dependências](#12-instalação-de-dependências)
   - [1.3. Estrutura de Pastas](#13-estrutura-de-pastas)
   - [1.4. Tema Global e Estilos CRT](#14-tema-global-e-estilos-crt)
   - [1.5. Dados: Projetos e Perfil](#15-dados-projetos-e-perfil)
   - [1.6. Componente BootIntro](#16-componente-bootintro)
   - [1.7. Componente PressStart](#17-componente-pressstart)
   - [1.8. Componente ConsoleShell](#18-componente-consoleshell)
   - [1.9. Componente ConsoleMenu](#19-componente-consolemenu)
   - [1.10. Componente ProjectCard](#110-componente-projectcard)
   - [1.11. Página Principal — Fluxo Boot → Start → Console](#111-página-principal--fluxo-boot--start--console)
   - [1.12. Rotas Secundárias](#112-rotas-secundárias)
   - [1.13. Layout e Metadados](#113-layout-e-metadados)
   - [1.14. Build e Correções](#114-build-e-correções)
   - [1.15. Documentação do Projeto](#115-documentação-do-projeto)

---

## Sessão 1 — Setup do Projeto e MVP 1

**Data:** 04 de Maio de 2026
**Objetivo:** Criar a base do projeto com todas as telas do MVP 1 navegáveis, identidade visual inicial e build funcional.

### Conceitos e Decisões Iniciais

Antes de começar a codar, o projeto foi extensivamente planejado com base em:

- **Referências analisadas:** 7 portfólios de creative developers (Inette, Thibaud Fellay, Sebastian Martinez, Sanni Sahil, Robert Borghesi, Antoine Wodniack, Rogier de Boevé)
- **Conceito central:** WPM.OS — uma máquina digital abstrata que o visitante "liga" e navega como se fosse uma interface de console/videogame
- **Arco de experiência:** 5 momentos (Boot → Start Screen → Console Menu → Project Detail → Character Profile)
- **Tom visual:** Dark cinematic + console memory + digital dreamscape + minimal typography

### 1.1. Criação do Projeto Next.js

**Comando executado:**
```bash
npx create-next-app@latest "wpm-portfolio" --ts --app --src-dir --eslint --tailwind --no-import-alias --use-npm
```

**Flags utilizadas:**
- `--ts` — TypeScript como linguagem
- `--app` — App Router (nova arquitetura do Next.js)
- `--src-dir` — Código dentro de `src/`
- `--eslint` — ESLint configurado
- `--tailwind` — Tailwind CSS incluído
- `--no-import-alias` — Sem alias extra (usamos o `@/` padrão)
- `--use-npm` — npm como gerenciador de pacotes

**Resultado:** Projeto Next.js 16.2.4 criado com React 19.2.4 e TypeScript.

---

### 1.2. Instalação de Dependências

**Comando executado:**
```bash
npm install motion three @react-three/fiber @react-three/drei gsap clsx tailwind-merge
```

**Pacotes instalados e suas funções:**

| Pacote | Versão | Função |
|--------|--------|--------|
| `motion` | 12.38.0 | Biblioteca de animação React (antigo Framer Motion). Usado via subpath `motion/react` para componentes como `<motion.div>`, `AnimatePresence`, etc. |
| `three` | latest | Biblioteca 3D/WebGL. Será usada no MVP 3 para fundos com partículas e shaders. |
| `@react-three/fiber` | latest | Renderer React para Three.js. Permite escrever cenas 3D com componentes React declarativos. |
| `@react-three/drei` | latest | Coleção de helpers para React Three Fiber (orbit controls, shaders, etc.). |
| `gsap` | latest | Biblioteca de animação de alta performance. Será usada no MVP 3 para animações de scroll e timelines complexas. |
| `clsx` | latest | Utilitário para construir strings de classes CSS condicionais. |
| `tailwind-merge` | latest | Utilitário para merge inteligente de classes Tailwind, resolvendo conflitos. |

---

### 1.3. Estrutura de Pastas

**Comando executado:**
```bash
mkdir -p src/{components/{boot,console,projects,motion,webgl,ui},data,lib,styles}
```

**Estrutura criada:**
```
src/
├── components/
│   ├── boot/       ← Componentes da intro (Boot, Start Screen)
│   ├── console/    ← Componentes do hub principal
│   ├── projects/   ← Componentes das páginas de projeto
│   ├── motion/     ← Componentes de transição (futuro)
│   ├── webgl/      ← Componentes 3D/WebGL (futuro)
│   └── ui/         ← Componentes de interface genéricos (futuro)
├── data/           ← Dados mock e tipagens
├── lib/            ← Funções utilitárias
└── styles/         ← Estilos globais adicionais (futuro)
```

Após o build, as pastas `motion/`, `webgl/`, `ui/`, `projects/` e `styles/` permanecem como placeholders para MVPs futuros.

---

### 1.4. Tema Global e Estilos CRT

**Arquivo:** `src/app/globals.css`

**Modificações em relação ao boilerplate:**
- Removido o tema claro e mantido apenas o tema escuro
- Adicionados tokens de cor customizados via `@theme inline`:
  - `--color-wpm-black: #050509` (fundo principal)
  - `--color-wpm-deep-blue: #071B3A`
  - `--color-wpm-purple: #6C4DFF` (roxo elétrico)
  - `--color-wpm-cyan: #74F7FF` (ciano suave)
  - `--color-wpm-white: #EAF2FF` (branco frio)
  - `--color-wpm-gray: #7E8797` (cinza interface)
  - `--color-wpm-dark-surface: #0A0D14`
  - `--color-wpm-card: #0D1020`

- Adicionados keyframes CSS:
  - `scanline` — linha horizontal que percorre a tela (8s loop)
  - `flicker` — flicker rápido (0.15s)
  - `glow-pulse` — pulsação de glow (3s ease-in-out)
  - `crt-on` — efeito de TV CRT ligando (1s ease-out)
  - `boot-text` — texto piscando estilo terminal (0.06s steps)

- Classes utilitárias:
  - `.crt-overlay` — overlay fixo com scanlines
  - `.crt-vignette` — vignette radial escura nas bordas
  - `.text-glow-cyan` — glow de texto ciano
  - `.text-glow-purple` — glow de texto roxo
  - `.bg-noise` — ruído/grain via SVG filter

- Acessibilidade:
  - `@media (prefers-reduced-motion: reduce)` — desabilita animações para quem prefere movimento reduzido
  - Scrollbar customizada fina e discreta
  - `::selection` com cor roxa

---

### 1.5. Dados: Projetos e Perfil

#### `src/data/projects.ts`

**Interface `Project`:**
```typescript
{
  slug: string;         // identificador único para URL
  title: string;        // nome do projeto
  genre: string;        // categoria (Web App, Creative Coding, UX/Interface)
  year: number;         // ano
  status: "Completed" | "In Progress" | "Prototype";
  role: string;         // seu papel no projeto
  stack: string[];      // tecnologias usadas
  thumbnail: string;    // URL da imagem (placeholder por enquanto)
  description: string;  // descrição curta
  problem: string;      // problema que o projeto resolve
  solution: string;     // abordagem da solução
  results: string;      // resultados obtidos
  links: {
    live?: string;
    github?: string;
    figma?: string;
    caseStudy?: string;
  }
}
```

**Dados incluídos:** 3 projetos exemplo com dados realistas para teste.

#### `src/data/profile.ts`

**Dados incluídos:**
- `profile` — nome completo, sigla, tagline, classe, localização, bio, skills, hobbies, redes sociais
- `menuItems` — 7 itens de menu com id, label, ícone (sigla) e href

---

### 1.6. Componente BootIntro

**Arquivo:** `src/components/boot/BootIntro.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
1. Ao montar, inicia um intervalo que incrementa o progresso de 0 a 99% ao longo de 4 segundos
2. Mensagens de boot aparecem progressivamente (6 mensagens no total):
   - "Initializing WPM.OS kernel..."
   - "Loading creative modules..."
   - "Calibrating visual systems..."
   - "Establishing connection..."
   - "User: Wallace Phillip Maclayne"
   - "Access granted."
3. Após 4 segundos, muda para a fase "reveal":
   - A sigla "WPM" aparece com blur → sharp (efeito de foco)
   - O nome completo aparece abaixo
   - Mensagem "System boot complete. Loading interface..."
4. Após 2.2s no reveal, chama `onComplete` para avançar para a próxima tela
5. Botão "SKIP INTRO" aparece após 1.5s (pula direto para o fim)

**Animações Motion utilizadas:**
- `motion.div` — container animado
- `motion.button` — botão de skip
- `motion.p` — mensagens de boot
- `motion.h1` — sigla WPM (blur → sharp)
- `AnimatePresence mode="wait"` — transição entre fases

**Overlays visuais:**
- `.crt-overlay` — scanlines
- `.crt-vignette` — vignette escura
- `.bg-noise` — ruído de fundo

**Props:**
- `onComplete: () => void` — callback chamado quando a intro termina

---

### 1.7. Componente PressStart

**Arquivo:** `src/components/boot/PressStart.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
1. Efeito CRT turn-on: overlay branco que começa como uma linha horizontal fina e expande até preencher a tela, depois desaparece (duração: 1.2s)
2. Após o efeito, revela o conteúdo:
   - Label "WPM.OS v1.0"
   - Título "Interactive Portfolio System"
   - Divisor horizontal
   - Botão "PRESS START" com dot pulsando abaixo
   - Footer com "[ENTER] or click" e o nome
3. Aceita tecla ENTER ou ESPAÇO para avançar
4. Clique no botão também avança

**Animações Motion:**
- `AnimatePresence` — transição de entrada/saída da tela
- `motion.button` — hover scale 1.03, tap scale 0.97
- Dot pulsante no botão (opacity loop 1.5s)
- Fade-in sequencial dos elementos (delays: 0.2s, 0.4s, 0.6s, 0.8s)

**Efeito CRT turn-on:**
Implementado como um `motion.div` com:
- `clipPath: "inset(49.5% 0 49.5% 0)"` → `"inset(0 0 0 0)"` (expansão vertical)
- `filter: "brightness(10) blur(6px)"` → `"brightness(1) blur(0px)"` (flash + foco)

**Props:**
- `onStart: () => void` — callback chamado quando o usuário pressiona start

---

### 1.8. Componente ConsoleShell

**Arquivo:** `src/components/console/ConsoleShell.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
- Layout persistente que envolve todas as páginas do console
- **Top bar** (fixa, altura 48px):
  - Logo "WPM.OS" com link para home
  - Versão "v1.0"
  - Navegação com 7 ícones (siglas) que revelam o label no hover (desktop)
- **Bottom bar** (fixa, altura 32px):
  - Nome do autor à esquerda
  - Ano atual à direita
- **Grid background**: padrão de linhas roxas sutis (80px de espaçamento)
- **Overlays**: CRT scanlines e vignette
- **Conteúdo**: `{children}` renderizado com padding-top para não ficar atrás da top bar

**Ícones de navegação:**
```
projects → []
about    → ?
skills   → {}
resume   → ■
lab      → <>
hobbies  → ♦
contact  → @
```

**Props:**
- `children: React.ReactNode`
- `showNav?: boolean` (default: true) — controla se mostra a navegação na top bar

---

### 1.9. Componente ConsoleMenu

**Arquivo:** `src/components/console/ConsoleMenu.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
1. Header com label "Select Destination" e título "Console"
2. Grid de 7 itens de menu (2 colunas mobile, até 7 no desktop):
   - Cada item é um card com ícone (sigla), label e hover roxo
   - Links para cada rota do sistema
3. Seção "Featured Projects" com divisor e grid de ProjectCards (1-3 colunas responsivas)

**Animações:**
- Fade-in + slide-up no header
- Stagger animation nos itens de menu (delay 50ms entre cada)
- Hover scale 1.1 nos ícones
- Glow roxo no hover

---

### 1.10. Componente ProjectCard

**Arquivo:** `src/components/console/ProjectCard.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
- Card link para `/projects/[slug]`
- Estrutura:
  - Badge de gênero + ano
  - Título com efeito glow ciano no hover
  - Descrição (máx 2 linhas, line-clamp)
  - Tags de stack (máx 3 visíveis + "+N")
  - Indicador de status (bolinha colorida + label)
- Hover: card sobe 4px, borda muda para roxo, glow radial interno

**Animações:**
- Staggered fade-in + slide-up (delay baseado no index)
- `whileHover` scale no card
- Glow condicional no hover (opacity transition)

---

### 1.11. Página Principal — Fluxo Boot → Start → Console

**Arquivo:** `src/app/page.tsx`

**Tipo:** Client Component (`"use client"`)

**Funcionamento:**
- Gerencia um state `stage` com três valores: `"boot"`, `"start"`, `"console"`
- Fluxo controlado por callbacks:
  1. `handleBootComplete` — BootIntro termina → muda para stage "start"
  2. `handleStart` — usuário clica PRESS START → muda para stage "console"
- Usa `AnimatePresence mode="wait"` para animações de entrada/saída entre stages
- Cada stage renderiza seu componente específico

**Fluxo completo:**
```
boot (BootIntro) → onComplete → start (PressStart) → onStart → console (ConsoleShell + ConsoleMenu)
```

---

### 1.12. Rotas Secundárias

Todas as rotas usam `ConsoleShell` como wrapper para manter consistência visual.

#### `/console` (`src/app/console/page.tsx`)
- Simples wrapper: `ConsoleShell > ConsoleMenu`
- Serve como landing page do console quando acessado diretamente

#### `/projects/[slug]` (`src/app/projects/[slug]/page.tsx`)
- Server Component com `async` para acessar `params` (Promise no Next.js 16)
- Busca o projeto por slug, retorna 404 se não encontrado
- Exibe: hero (gênero + ano + status + título + descrição), role + stack, case study (problema, solução, resultados), links externos
- Botão "BACK TO CONSOLE" no topo

#### `/about` (`src/app/about/page.tsx`)
- Client Component com animações Motion
- "Character Profile" com nome, tagline, bio
- Grid com cards de Skills e Hobbies
- Links para GitHub, LinkedIn, Email

#### `/skills` (`src/app/skills/page.tsx`)
- "Power-ups" com lista de skills em cards com ícone `>_`
- Animação stagger da esquerda

#### `/resume` (`src/app/resume/page.tsx`)
- "Save File" com experiência profissional e skills
- Dados placeholder para preenchimento futuro

#### `/lab` (`src/app/lab/page.tsx`)
- "Experimental Zone" com grid de experimentos (shader playground, particle system, etc.)
- Indicador de status em cada card

#### `/hobbies` (`src/app/hobbies/page.tsx`)
- "Side Quests" com grid de hobbies em cards com ícone de diamante

#### `/contact` (`src/app/contact/page.tsx`)
- "New Message" com 3 cards: GitHub, LinkedIn, Email
- Links diretos para cada canal

---

### 1.13. Layout e Metadados

**Arquivo:** `src/app/layout.tsx`

**Modificações:**
- Metadados atualizados:
  - `title`: "WPM.OS — Wallace Phillip Maclayne | Interactive Portfolio"
  - `description`: descrição criativa
  - `keywords`: termos relevantes
  - `openGraph`: dados para compartilhamento social
- Fontes: Geist Sans (UI) + Geist Mono (código/terminal)
- Background e cor de texto definidos com tokens WPM
- Removidas classes desnecessárias do boilerplate

---

### 1.14. Build e Correções

**Erro encontrado:** 26 erros de build — `motion` e `AnimatePresence` não encontrados como exports do pacote `motion`.

**Causa:** O pacote `motion` v12+ reorganizou sua API. Os componentes React (`motion`, `AnimatePresence`, etc.) agora estão no subpath `motion/react`, enquanto o export principal contém apenas utilitários de baixo nível.

**Solução:** Substituir todas as importações de `from "motion"` para `from "motion/react"` em 12 arquivos:
```bash
grep -rl 'from "motion"' src/ | while read f; do
  sed -i 's/from "motion"/from "motion\/react"/g' "$f"
done
```

**Build final:** ✅ Compilado com sucesso. 11 rotas geradas (10 estáticas + 1 dinâmica).

---

### 1.15. Documentação do Projeto

**Criação da pasta `docs/`** com os seguintes arquivos:

| Arquivo | Conteúdo |
|---------|----------|
| `00-OVERVIEW.md` | Visão geral, índices, stack, estrutura, roadmap |
| `01-STEP-BY-STEP.md` | Este arquivo — diário detalhado do desenvolvimento |
| `02-TECHNICAL-REFERENCE.md` | Referência técnica completa |
| `03-CREATIVE-BRIEF.md` | Briefing criativo detalhado |

---

### 1.16. Especificação Criativa Formal (Creative Spec)

**Arquivo:** `docs/04-CREATIVE-SPEC.md`

**Objetivo:** Documento de direção criativa de alto nível, atuando como "diretor de arte, UX designer e creative developer sênior". Contém 11 seções detalhadas:

1. **Conceito Visual** — WPM.OS como máquina digital assinada, palavras-chave, referências emocionais, 5 princípios visuais
2. **Tom de Voz** — Personalidade da interface (técnico-poética), microcopy por contexto (28 textos), o que o sistema NUNCA diz
3. **Sistema de Design Visual** — Paleta completa com hex values e descrições conceituais, tipografia (Geist Sans + Geist Mono), escala, espaçamento, texturas (5 camadas), efeitos de luz
4. **Arquitetura da Experiência** — Mapa de telas, estrutura de páginas (10 rotas), jornada do visitante com timeline
5. **Componentes e Estados** — 6 componentes detalhados com todos os estados (loading, hover, focus, active, exit)
6. **Microinterações** — Por elemento (10 interações), transições entre telas (4 tipos), efeito CRT turn-on detalhado
7. **Plano de MVP** — 5 fases com checkboxes: Fundação ✅, Identidade, Imersão, Conteúdo Real, Polimento
8. **Riscos de UX e Mitigações** — 7 riscos mapeados (intro irritante, desorientação, performance, inacessibilidade, mobile, falta de conteúdo, carga cognitiva) com soluções
9. **Especificações Técnicas de Design** — Bordas, cantos, sombras (ou ausência delas), regras de motion (10 regras)
10. **Guia de Implementação Visual** — 4 perguntas de validação antes de codar, checklist de acessibilidade
11. **Referências Completas** — 7 portfólios + 4 inspirações estéticas

**Propósito do documento:**
- Bússola criativa para todas as decisões visuais e de UX
- Referência única para consistência do design system
- Guia de tom de voz para microcopy consistente
- Antecipação de riscos de UX antes que virem problemas
- Plano de MVP faseado para construção incremental

### 1.17. Arquitetura Técnica Formal

**Arquivo:** `docs/05-ARCHITECTURE.md`

**Objetivo:** Documento de arquitetura front-end especializado em Next.js, React, TypeScript, Motion e React Three Fiber. 12 seções detalhadas:

1. **Estrutura de Pastas (Full Architecture)** — Árvore completa com legendas (implementado vs planejado), incluindo hooks, providers, types e docs
2. **Arquitetura de Rotas** — Tabela de 11 rotas com tipo de renderização, Server vs Client decision tree, hierarquia de layouts
3. **Catálogo de Componentes (30+)** — Organizado por domínio: Boot, Console, Projects, Motion, WebGL, UI, Layout. Cada componente com arquivo, responsabilidade, props, estado e MVP alvo
4. **Fluxo de Estado** — Máquina de estados da Home (Boot→Start→Console), providers globais (Settings, Sound, Performance), fluxo de dados
5. **Estratégia de Animação (5 camadas)** — CSS puro → Motion → Motion Values → GSAP → React Three Fiber, com regras de performance e detecção de prefers-reduced-motion
6. **Estratégia de Acessibilidade (4 níveis)** — HTML semântico → Navegação por teclado → Leitores de tela → Redução de movimento, incluindo ordem de tab e estrutura de headings
7. **Performance Mobile** — Breakpoints, comportamentos por dispositivo, detecção de GPU tier
8. **Estratégia de Carregamento** — Dynamic import para WebGL (client-only), lazy loading de áudio, Next/Image com blur-up
9. **Ordem Ideal de Implementação** — 5 fases com 50+ tarefas ordenadas (Fase 0 concluída)
10. **Padrões de Código** — Nomenclatura, estrutura de componente, importação Motion correta
11. **Configuração Next.js** — Headers de segurança, remotePatterns para imagens
12. **Dependências por Fase** — O que instalar em cada etapa

### Atualização do Índice (00-OVERVIEW.md)

Adicionada entrada para `05-ARCHITECTURE.md` na tabela de documentação.

---

## Sessão 2 — Componentes Atômicos, PageTransition e Refatoração

**Data:** 04 de Maio de 2026
**Objetivo:** Criar componentes UI reutilizáveis, wrapper de transição de página, refatorar páginas para usar componentes atômicos.

### 2.1. Componente Button

**Arquivo:** `src/components/ui/Button.tsx`

**Variantes:**
- `primary` — borda e fundo roxo com texto ciano (ação principal)
- `ghost` — transparente com hover ciano
- `icon` — transparente com hover roxo

**Tamanhos:** `sm`, `md`, `lg`

**Features:**
- Motion `whileHover` e `whileTap` para feedback tátil
- `focus-visible:ring` para navegação por teclado
- Estado `disabled` com opacidade reduzida e pointer-events desabilitado
- `aria-label` suportado via props spread

### 2.2. Componente Badge

**Arquivo:** `src/components/ui/Badge.tsx`

**Variantes:**
- `system` — roxo (labels de sistema)
- `action` — ciano (ações, status completed)
- `info` — cinza (informação, tags)
- `status` — transparente (status secundário)

**Features:**
- `dot` opcional com cor configurável
- Animação de entrada (scale + opacity)
- Tamanhos `sm` e `md`

### 2.3. Componente Divider

**Arquivo:** `src/components/ui/Divider.tsx`

Linha horizontal com label central opcional. Variantes `subtle` e `accent`.

### 2.4. Componente Icon

**Arquivo:** `src/components/ui/Icon.tsx`

Mapeamento de 15 ícones ASCII (placeholders para SVG futuro):
`projects`, `about`, `skills`, `resume`, `lab`, `hobbies`, `contact`, `settings`, `secret`, `back`, `github`, `linkedin`, `email`, `live`, `figma`

3 tamanhos: `sm`, `md`, `lg`. Exporta tipo `IconName`.

### 2.5. Componente ProjectCartridge

**Arquivo:** `src/components/console/ProjectCartridge.tsx`

Substitui o `ProjectCard` original com:
- Nome alinhado com a metáfora do console ("cartucho")
- ARIA labels descritivas
- `focus-visible` ring para teclado
- Label "SELECT »" que aparece no hover indicando clicabilidade
- Status colors via mapa tipado

### 2.6. Componente PageTransition

**Arquivo:** `src/components/motion/PageTransition.tsx`

Wrapper com `AnimatePresence mode="wait"` que aplica fade + slide-up (entrada) e fade + slide-down (saída) em todas as páginas filhas.

Usa `usePathname()` como key padrão para animar nas trocas de rota.

### 2.7. Refatoração do ConsoleShell

**Arquivo:** `src/components/console/ConsoleShell.tsx`

**Adições:**
- `PageTransition` envolvendo `{children}`
- Link "Skip to content" (visível no focus) — acessibilidade
- `useEffect` com listener de tecla `Escape` para voltar ao console
- Bottom bar agora mostra "ESC to return" como dica
- `Icon` component nos ícones de navegação da top bar
- `focus-visible:ring` em todos links da top bar
- `aria-label` em links de navegação

### 2.8. Refatoração do ConsoleMenu

**Arquivo:** `src/components/console/ConsoleMenu.tsx`

**Alterações:**
- Usa `ProjectCartridge` em vez de `ProjectCard`
- Usa `Icon` para ícones de menu
- Usa `Divider` para separação visual
- `<nav>` com `aria-label="Main navigation"`
- `<section>` com `aria-label="Featured projects"`
- `focus-visible` em todos links

### 2.9. Refatoração da About Page

**Arquivo:** `src/app/about/page.tsx`

- Skills agora usam `<Badge variant="system">`
- Hobbies agora usam `<Badge variant="info">`
- Links sociais usam `<Button>` (primary para GitHub, ghost para demais)
- Adicionado `<Divider variant="accent">` entre bio e stats
- Melhorado `focus-visible` dos links

### 2.10. Refatoração da Contact Page

**Arquivo:** `src/app/contact/page.tsx`

- Usa `<Icon>` para ícones dos 3 canais
- Adicionado `aria-label` descritivo
- `focus-visible:ring` nos cards de contato

### 2.11. Refatoração da Project Detail Page

**Arquivo:** `src/app/projects/[slug]/page.tsx`

- Badges: `<Badge variant="system">` para gênero, `<Badge variant="action" dot>` para status
- Stack tags: `<Badge variant="info">`
- Links: `<Button>` primary para Live Demo, ghost para GitHub/Figma
- Adicionado `<Divider>` entre meta e case study

---

### 2.12. Refatoração do BootIntro — Intro Cinematográfica

**Arquivo:** `src/components/boot/BootIntro.tsx`
**Motivação:** Prompt 4 — especificações de intro cinematográfica

**Alterações realizadas:**

1. **Duração reduzida para 2.5s** (era 4s)
   - `LOADING_DURATION = 2500ms`
   - Progresso mais rápido, 5 mensagens (eram 6)
   - Reveal dura 1500ms (era 2200ms)
   - Total da experiência: ~4.5s (era ~6.9s)

2. **Fundo azul profundo**
   - `radial-gradient(ellipse at center, #071B3A 0%, #050912 60%, #050509 100%)`
   - Linha sutil roxa no topo simulando scanline pulse

3. **Ruído digital reduzido**
   - `bg-noise` com opacidade 0.04% (era 30%)

4. **Skip button sempre visível**
   - Removeu `showSkip` state e timeout de 1.5s
   - Botão visível desde o início (fade-in em 300ms)
   - Condição: `phase !== "done"` (desaparece ao terminar)

5. **prefers-reduced-motion**
   - Importa `useReducedMotion` do Motion
   - Se true: pula animações, mostra estado final, auto-avança em 1.5s
   - CRT overlays desabilitados
   - Exit transition reduzida para 100ms

6. **Refinamentos visuais**
   - Progress bar com gradiente roxo→ciano (mais cinematográfico)
   - Texto WPM com `textShadow` triplo em vez de classe `text-glow-cyan`
   - Tracking mais aberto: `tracking-[0.15em]` (WPM), `tracking-[0.35em]` (nome)
   - Nova mensagem final: "System ready. Welcome." (mais limpo)
   - Easing customizado: `cubic-bezier(0.25, 0.1, 0.25, 1)` no reveal

7. **Segurança de cleanup**
   - `hasCompleted` ref previne múltiplos `onComplete`
   - `timerRef` ref para cleanup do intervalo
   - Função `finish` memoizada com useCallback

**Comparativo antes/depois:**

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Duração loading | 4000ms | 2500ms |
| Duração reveal | 2200ms | 1500ms |
| Total | ~6.9s | ~4.5s |
| Mensagens | 6 | 5 |
| Skip visível | Após 1.5s | Imediato (0.3s fade) |
| Fundo | `bg-wpm-black` sólido | Radial gradient azul profundo |
| prefers-reduced-motion | Não implementado | Implementado |
| Blur inicial WPM | 12px | 16px (mais dramático) |
| Easing | Padrão easeOut | Cubic bezier customizado |

---

### 2.13. ConsoleMenu — Tela de Seleção de Módulos

**Arquivos modificados:**
- `src/components/console/ConsoleMenu.tsx` (reescrito)
- `src/data/profile.ts` (menuItems expandido)
- `src/components/console/ConsoleShell.tsx` (navIconNames atualizado)

**Novo design — Game Selection Screen:**

O ConsoleMenu foi radicalmente refeito como uma tela de seleção de módulos/cartuchos inspirada em menus de videogame.

**9 Módulos (3×3 grid no desktop):**

| # | Módulo | Tipo | Status |
|---|--------|------|--------|
| 1 | Projects | Core Module | Active |
| 2 | About Me | Profile Data | Active |
| 3 | Skills | System Info | Active |
| 4 | Resume | Save Data | Active |
| 5 | Lab | Sandbox | Active |
| 6 | Hobbies | Personal Log | Active |
| 7 | Contact | Comm Link | Active |
| 8 | Settings | System | Coming Soon |
| 9 | Secret Files | Encrypted | Locked |

**Features implementadas:**

1. **3D Tilt no hover**
   - `perspective(600px)` + `rotateX`/`rotateY` via CSS custom properties
   - Calculado dinamicamente a partir da posição do mouse relativa ao card
   - Transição suave de 150ms ease-out
   - Reset ao sair do card

2. **Navegação por setas do teclado**
   - `ArrowRight` / `ArrowLeft` — move horizontalmente
   - `ArrowDown` / `ArrowUp` — move verticalmente (calcula row/col)
   - `Enter` / `Space` — seleciona (router.push se Active)
   - `Home` / `End` — primeiro/último item
   - `Escape` — volta ao console (ConsoleShell)

3. **Foco visível**
   - `layoutId="focus-ring"` — anel animado com spring physics que segue o item focado
   - Cor do anel adaptada ao tipo do módulo
   - `tabIndex={0}` no item focado, `-1` nos demais (roving tabindex)

4. **Animações de seleção**
   - Background com gradiente + borda colorida + boxShadow glow
   - Transições suaves entre estados (focused/hovered/default)
   - Indicador pulsante `»` apenas no item focado

5. **Cada cartucho contém:**
   - **Type** — label superior esquerda (ex: "Core Module") com cor por categoria
   - **Status** — indicador com bolinha colorida + label (ex: "ACTIVE", "LOCKED", "SOON")
   - **Título** — nome do módulo
   - **Descrição** — uma linha explicativa
   - **Hint** — "PRESS ENTER" ou "LOCKED" na borda inferior

6. **Estados visuais por status:**
   - `Active` — ciano, bolinha com glow, clicável, ENTER funciona
   - `Locked` — roxo, sem glow, `aria-disabled`, clique bloqueado
   - `Coming Soon` — cinza, sem glow, `aria-disabled`, clique bloqueado

7. **Acessibilidade:**
   - `role="grid"` + `role="gridcell"` para leitores de tela
   - `aria-label` descritivo em cada item
   - `aria-disabled` em itens não ativos
   - `onFocus` sincroniza estado com navegação por Tab

**Estrutura de dados atualizada (profile.ts):**
```typescript
interface MenuItem {
  id: string;
  label: string;        // "Projects", "About Me"...
  href: string;         // "/console", "/about"...
  description: string;  // "Featured work and case studies"
  type: string;         // "Core Module", "System Info"...
  status: "Active" | "Locked" | "Coming Soon";
}
```

---

## Sessão 2 — Resumo Final

**Componentes criados (6):** Button, Badge, Divider, Icon, PageTransition, ProjectCartridge
**Componentes refatorados (3):** BootIntro, ConsoleMenu, ConsoleShell
**Páginas refatoradas (3):** About, Contact, Project Detail
**Dados atualizados (1):** profile.ts (menuItems com 9 itens + interface tipada)
**Build:** ✅ 11 rotas, sem erros

---

### 2.14. ReverseCrtTransition — Efeito CRT Reverso

**Arquivo:** `src/components/motion/ReverseCrtTransition.tsx`

**API:**
```tsx
<ReverseCrtTransition active={boolean} onComplete={() => void} />
```

**Comportamento (modo normal):**

O componente gerencia 4 fases internas via state:

| Fase | Timing | O que acontece |
|------|--------|----------------|
| `"line"` | 0–100ms | Overlay preto cobre a tela. Uma linha horizontal brilhante aparece no centro com glow roxo+branco. |
| `"expand"` | 100ms–850ms | Um `clipPath: inset(49.5% ...)` anima para `inset(0% ...)` — a "abertura" cresce do centro para as bordas, revelando a página. Duração: 750ms com easing `cubic-bezier(0.33, 0, 0.1, 1)`. |
| `"fade-overlay"` | 850ms–1100ms | O overlay restante faz fade-out com animação de opacidade. Scanlines e blur também somem. |
| `"done"` | 1100ms+ | `onComplete()` disparado. Componente se remove do DOM via `AnimatePresence`. |

**Camadas visuais durante a transição:**

```
z-index: 100 — Overlay fixo
├── Fundo preto sólido (#050509)
├── Linha horizontal brilhante (2px, glow triplo: branco + roxo)
├── Abertura clip-path (expande verticalmente)
├── Bloom/blur layer (backdrop-filter durante expansão)
├── Scanlines (CSS repeating-linear-gradient)
└── Fade-out layer (opacidade animada após expansão)
```

**Easing da expansão:**
`cubic-bezier(0.33, 0.0, 0.1, 1.0)` — início rápido, longa desaceleração, criando a sensação de "abrir" com impacto e depois suavizar.

**Modo reduzido (`prefers-reduced-motion: true`):**
- Sem linha, sem clip-path, sem blur, sem scanlines
- Apenas um fade simples: overlay preto → opacidade 0 em 300ms
- `onComplete` dispara após 350ms

**Uso típico (exemplo de integração futura):**
```tsx
const [transitioning, setTransitioning] = useState(false);

function handleSelectModule(href: string) {
  setTransitioning(true);
  // ReverseCrtTransition.onComplete → router.push(href)
}
```

---

### 2.15. Modelo de Dados de Projetos — Refatoração Completa

**Arquivos modificados:**
- `src/data/projects.ts` (reescrito)
- `src/components/console/ProjectCartridge.tsx` (atualizado para nova interface)
- `src/app/projects/[slug]/page.tsx` (atualizado para nova interface)
- `src/components/console/ProjectCard.tsx` (removido — substituído por ProjectCartridge)

**Nova interface `Project`:**

```typescript
interface Project {
  slug: string;
  title: string;
  subtitle: string;          // novo — linha descritiva abaixo do título
  year: number;
  role: string;
  category: string;          // renomeado de "genre"
  status: "Completed" | "In Progress" | "Prototype" | "Archived";  // +Archived
  stack: string[];
  problem: string;
  solution: string;
  process: string;           // novo — metodologia e etapas
  results: string;
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
    figma?: string;
    video?: string;           // novo
  };
  coverImage: string;        // renomeado de "thumbnail"
  accentColor: string;       // novo — cor de destaque do projeto
  locked: boolean;           // novo — projeto sob NDA ou bloqueado
  featured: boolean;         // novo — destaque no grid principal
}
```

**4 Projetos de exemplo (tom profissional e criativo):**

| # | Slug | Título | Categoria | Status | Featured |
|---|------|--------|-----------|--------|----------|
| 1 | `wpm-os` | WPM.OS | Creative Coding | In Progress | ✅ |
| 2 | `aurora-design-system` | Aurora | UX / Interface | Completed | ✅ |
| 3 | `nebulae-visualizer` | Nebulae | Creative Coding | Prototype | ✅ |
| 4 | `codemesh-ai` | CodeMesh | Web App | Completed | — |

**Cada projeto contém narrativa completa:** problema → solução → processo → resultados, escrita em tom profissional.

**Novas funções utilitárias:**
- `getProjectBySlug(slug)` — busca por slug (existente, mantida)
- `getFeaturedProjects()` — filtra projetos com `featured: true` e `locked: false`

**ProjectCartridge — atualizações:**
- Suporte a `project.locked`: se true, renderiza card com opacidade reduzida, sem link, com label "LOCKED"
- Suporte a `project.accentColor`: glow radial usa a cor de destaque do projeto
- Suporte a `project.featured`: badge "FEATURED" no topo do card
- Campo `category` substitui `genre`
- Campo `subtitle` substitui `description`
- Status "Archived" adicionado ao mapa de cores

**Project Detail Page — atualizações:**
- Seção "Process" adicionada ao case study (entre Solution e Results)
- Badge "FEATURED" no hero
- Link "VIDEO" nos botões de ação
- Campo `subtitle` como linha descritiva abaixo do título
- Campo `category` nos badges

---

### 2.16. ShaderBackground — Fundo WebGL com Partículas

**Arquivos criados:**
- `src/components/webgl/ShaderBackground.tsx` — Cena R3F com partículas
- `src/components/webgl/ShaderBackgroundWrapper.tsx` — Wrapper inteligente

**Arquitetura:**

```
ShaderBackgroundWrapper  ← Você importa este
├── detectWebGL()        ← Testa suporte WebGL/WebGL2
├── detectMobile()       ← Detecta dispositivo móvel
├── useReducedMotion()   ← Respeita prefers-reduced-motion
│
├── WebGL OK → dynamic import → ShaderBackground
│   └── Canvas (@react-three/fiber)
│       └── Scene
│           ├── <color> → background #050509
│           ├── <fog> → névoa escura (near 6, far 18)
│           ├── ParticleField (600 ou 200 partículas)
│           │   ├── Pontos com posição aleatória (24×12×10)
│           │   ├── Cores azul→roxo baseadas em altura Y
│           │   ├── Drift lento com wrap-around
│           │   ├── Rotação suave seguindo mouse (lerp 0.02)
│           │   └── AdditiveBlending + sem depthWrite
│           └── MistPlane (plano semi-transparente rotativo)
│
└── Fallback → ShaderBackgroundFallback
    ├── radial-gradient azul profundo
    └── CSS dots simulando partículas estáticas
```

**Detalhes técnicos:**

| Aspecto | Valor |
|---------|-------|
| Partículas (desktop) | 600 pontos |
| Partículas (mobile/lowPerf) | 200 pontos |
| DPR (desktop) | [1, 1.5] |
| DPR (mobile) | 1 |
| Antialias | false (economia de GPU) |
| Blending | AdditiveBlending (partículas brilham sobrepostas) |
| Tamanho partícula | 0.06 unidades, sizeAttenuation |
| Mouse parallax | rotação Y ±1.5°, rotação X ±0.8°, lerp 0.02 |
| FPS alvo | 60 (useFrame sem throttle — nativo) |
| Fog | #050509, near 6, far 18 (profundidade escura) |

**Onde usar no Next.js:**

```tsx
// Em src/app/layout.tsx — fundo global:
import ShaderBackgroundWrapper from "@/components/webgl/ShaderBackgroundWrapper";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ShaderBackgroundWrapper />
        {children}
      </body>
    </html>
  );
}

// Ou em uma página específica:
export default function Home() {
  return (
    <>
      <ShaderBackgroundWrapper />
      <SeuConteudo />
    </>
  );
}
```

**Garantias de performance:**
- `dynamic(() => import(...), { ssr: false })` — WebGL nunca carrega no servidor
- `loading: () => <ShaderBackgroundFallback />` — fallback CSS visível enquanto carrega
- `prefersReduced → fallback imediato` — sem WebGL, sem Canvas
- `!webglOk → fallback` — dispositivos sem suporte
- `isMobile → lowPerf={true}` — 200 partículas, DPR 1
- `antialias: false` — economia de fillrate
- `depthWrite: false` — sem z-buffer writes nas partículas
- `powerPreference: "low-power"` — prefere GPU integrada
- `<Suspense>` no Canvas — fallback durante mount do R3F

---

## Sessão 3 — Fechamento de MDs e Hardening Final Local

### 3.1. Contexto de Navegação e Mobile Back

- `ConsoleShell` passou a mostrar contexto de rota (`WPM.OS / seção`) e destacar o item ativo na navegação.
- `StaticConsoleShell` recebeu o mesmo contrato para páginas estáticas, começando por `/projects`.
- Páginas internas ganharam botão fixo `Back` no mobile, evitando depender apenas de `ESC`.

### 3.2. Acessibilidade e Legibilidade

- A Home ganhou `aria-live="polite"` para anunciar transições de stage.
- Estados locked/coming-soon agora têm descrição semântica quando renderizados como controles indisponíveis.
- Labels pequenos subiram para mínimo de 11px.
- Tracking excessivo em rótulos pequenos foi reduzido.
- Scanlines foram desligados em telas pequenas e a vignette mobile foi suavizada.

### 3.3. Fechamento dos Markdown

- `docs/06-UX-AUDIT.md` foi reconciliado por item: fechado, bloqueado por decisão/aprovação ou backlog intencional.
- `docs/03-CREATIVE-BRIEF.md`, `docs/04-CREATIVE-SPEC.md`, `docs/02-TECHNICAL-REFERENCE.md`, `docs/00-OVERVIEW.md`, `README.md` e `ENGINEERING_GUIDE.md` foram alinhados ao estado real.
- Novo fechamento criado em `docs/11-MD-CLOSURE-2026-05-06.md`.

---

## Próxima Sessão

Próximas prioridades dependem de decisão do autor: email público, formulário/provedor, deploy/SSL/GitHub Pages/CI e QA manual em leitores de tela/navegadores/dispositivos reais.

Backlog criativo segue separado de bloqueio técnico: identidade avançada, efeitos opcionais, analytics aprovado e easter eggs.

---

> **Regra do projeto:** Sempre que uma tarefa for concluída, esta documentação deve ser atualizada com o que foi feito, como foi feito e por quê.
