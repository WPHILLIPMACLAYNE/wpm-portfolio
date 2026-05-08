# VISUAL AUDIT REPORT — WPM.OS Portfolio

> Auditoria visual completa realizada em 2026-05-08.
> Escopo: design system, UI/UX, acessibilidade, 3D/WebGL, animacao/motion, responsividade, performance.

---

## Contexto do Projeto

| Aspecto | Detalhe |
|---------|---------|
| Framework | Next.js 16.2.4 (App Router) + React 19 + TypeScript 5 |
| Estilo | Tailwind CSS v4 (`@theme inline`) + `cn()` (clsx + tailwind-merge) |
| 3D | Three.js + @react-three/fiber (particle field no hero) |
| Animacao | Motion (Framer Motion v12) pervasivo |
| Identidade | Estetica CRT/console retro-dark, paleta purple+cyan, tipografia mono |

---

## 1. DESIGN SYSTEM

### 1.1 Cores

| # | Severidade | Problema | Detalhe |
|---|-----------|---------|---------|
| C1 | **Alta** | 4+ tons de quase-preto sem tokens | `#050509`, `#02040a`, `#060b14`, `#07111d`, `#050912` usados como bg em componentes diferentes |
| C2 | **Alta** | Cores hardcoded em 15+ componentes | Hex values como `#74F7FF`, `#6C4DFF`, `#7E8797` aparecem como strings puras em JS |
| C3 | **Alta** | Cores de projeto fora da paleta | `accentColor: "#10B981"` (emerald) e `"#F59E0B"` (amber) nao existem no design system |
| C4 | **Media** | Variaveis `:root` duplicadas | `--background` e `--foreground` repetem valores de `wpm-black` e `wpm-white` |
| C5 | **Media** | `@keyframes flicker` inexistente | `--animate-flicker` declarado mas keyframe nunca definido — token morto |

### 1.2 Tipografia

| # | Severidade | Problema | Detalhe |
|---|-----------|---------|---------|
| T1 | **Alta** | `text-[11px]` usado 80+ vezes | Tamanho dominante para labels mono, nunca definido como token |
| T2 | **Media** | 12+ valores de letter-spacing sem escala | `0.16em`, `0.12em`, `0.2em` — nenhum documentado como token |
| T3 | **Media** | `font-sans` subutilizado | Geist Sans so usado em module previews, panel headings e card titles |

### 1.3 Espacamento, Sombras, Z-Index

| # | Severidade | Problema | Detalhe |
|---|-----------|---------|---------|
| S1 | **Media** | Nenhum token de espacamento | Dependencia inteira da grid 4px padrao do Tailwind |
| S2 | **Media** | Todas as sombras sao inline | ~12 valores arbitrarios. Dois padroes claros (glow cyan, glow purple) deveriam ser tokens |
| S3 | **Media** | Z-index sem escala documentada | Valores ad-hoc: -10, 0, 10, 20, 30, 40, 49, 50, 60, 90, 100 |
| S4 | **Baixa** | Nenhum token de border-radius | Usa padroes do Tailwind (acceptable) |

---

## 2. UI/UX

### 2.1 Acessibilidade

| # | Severidade | Problema | Localizacao |
|---|-----------|---------|-------------|
| A1 | **Alta** | `lang="en"` com UI em portugues | `layout.tsx` — screen readers tentarao pronunciar PT com fonetica EN |
| A2 | **Alta** | `role="gridcell"` sem `role="grid"` pai | `MenuModule.tsx` — papel ARIA orfao |
| A3 | **Media** | Contraste marginal em labels pequenos | `text-wpm-gray/90` em `text-[11px]` sobre `#050509` — ~4.1:1 |
| A4 | **Media** | Atalhos numericos falsos | `ConsoleModuleRibbon.tsx` mostra "01", "02" sugerindo atalhos que nao existem |
| A5 | **Baixa** | `role="article"` redundante | `ProjectCartridge.tsx` — `<article>` ja tem implicit role |

### 2.2 Componentes

| # | Severidade | Problema | Localizacao |
|---|-----------|---------|-------------|
| U1 | **Media** | `PageTransition.tsx` e no-op | Retorna apenas `<div>{children}</div>` |
| U2 | **Media** | `ModulePreview.tsx` e codigo morto | Nao importado por nenhum componente |
| U3 | **Media** | `useRovingTabIndex` nunca usado | Hook definido mas nenhum componente o importa |
| U4 | **Media** | ConsoleShell vs StaticConsoleShell duplicados | ~80% das classes CSS identicas |
| U5 | **Baixa** | `featuredProofs` hardcoded por slug | `projects/page.tsx` — quebra silenciosamente se slugs mudarem |

### 2.3 Navegacao e Fluxo

| # | Severidade | Problema | Detalhe |
|---|-----------|---------|---------|
| N1 | **Media** | Sem transicao entre sub-paginas | `PageTransition` e no-op — navegacao e page load completo |
| N2 | **Media** | Scroll-triggered animations inexistentes | Nenhum reveal-on-scroll |
| N3 | **Baixa** | Mobile drawer vs Link inconsistencia | ConsoleShell abre drawer; StaticConsoleShell navega para `/console` |

---

## 3. 3D/WebGL

| # | Severidade | Problema | Localizacao |
|---|-----------|---------|-------------|
| W1 | **Media** | `@react-three/drei` nunca importado | `package.json` — ~40-60KB gzip morto |
| W2 | **Media** | `lowPerf` prop nunca ativada | `ShaderBackgroundWrapper` nunca passa `true` |
| W3 | **Media** | Canvas roda continuamente a 60fps | Nao usa `frameloop="demand"` |
| W4 | **Baixa** | Mobile detection via UA string fragil | iPadOS 13+ reporta como desktop |

**Pontos Fortes:**
- Arquitetura de gating excellente (reduced motion → mobile → WebGL detection)
- DPR capado em 1.5
- `powerPreference: "low-power"`, `antialias: false`
- CSS fallback leve e consistente
- Three.js code-split via `next/dynamic` com `ssr: false`

---

## 4. ANIMACAO/MOTION

| # | Severidade | Problema | Localizacao |
|---|-----------|---------|-------------|
| M1 | **Media** | `gsap` nunca importado | `package.json` — ~25-30KB gzip morto |
| M2 | **Baixa** | `PressStart.tsx` nao checa `useReducedMotion()` | Apenas CSS global captura |
| M3 | **Baixa** | Animacoes infinitas nunca pausam | 6 componentes com `repeat: Infinity` |

**Pontos Fortes:**
- `useReducedMotion()` checado em 12 componentes
- CSS `@media (prefers-reduced-motion: reduce)` como safety net
- CRT overlay desabilitado em mobile
- Custom cursor desabilitado em touch/reduced motion

---

## 5. PERFORMANCE

| # | Severidade | Problema | Detalhe |
|---|-----------|---------|---------|
| P1 | **Alta** | ~65-90KB gzip de dependencias mortas | `gsap` + `@react-three/drei` instalados mas nunca importados |
| P2 | **Media** | Sem loading state para transicoes de pagina | Navegacao entre sub-paginas sem indicador |
| P3 | **Media** | Canvas WebGL nao pausa quando oculto | Continua renderizando quando scrolled away |

---

## 6. PONTUACAO GERAL

| Dimensao | Nota | Observacao |
|----------|------|-----------|
| Design System | 6/10 | Tokens existem mas muitas cores hardcoded, shadows inline, sem escala |
| Componentes UI | 8/10 | Bem organizados. Dead code em 2-3 componentes |
| Acessibilidade | 7/10 | Excellente fundacao mas lang mismatch e role orfao |
| 3D/WebGL | 8/10 | Arquitetura de gating exemplar |
| Animacao/Motion | 7/10 | Consistente mas sem page transitions e scroll reveals |
| Responsividade | 8/10 | Mobile-first, fluid typography, touch targets adequados |
| Performance | 6/10 | ~65-90KB de dependencias mortas |
| Identidade Visual | 8/10 | Forte e coerente — CRT aesthetic bem mantido |

---

## 7. OPORTUNIDADES DE EVOLUCAO

### Curto Prazo (Quick Wins)
1. Remover dependencias mortas (gsap, @react-three/drei)
2. Extrair near-blacks em tokens
3. Criar token `--text-label` para `text-[11px]`
4. Definir escala de tracking
5. Criar shadow tokens
6. Corrigir ou remover `--animate-flicker`
7. Corrigir `lang="en"` para `"pt-BR"`
8. Corrigir `role="gridcell"`
9. Implementar `useRovingTabIndex` no ConsoleModuleRibbon
10. Definir z-index layers como tokens

### Medio Prazo
11. Implementar page transitions entre sub-paginas
12. Adicionar scroll-triggered reveals
13. Pausar animacoes infinitas quando invisivel
14. Ativar `frameloop="demand"` no Canvas R3F
15. Consolidar ConsoleShell + StaticConsoleShell
16. Melhorar contraste de labels pequenos

### Largo Prazo
17. Horizontal scroll gallery para projetos
18. Magnetic hover refinado
19. Custom cursor com efeitos contextuais
20. Loader com audio feedback opcional
21. Showreel/video player customizado
22. Shader GLSL autoral no hero
