# WPM.OS Premium Redesign — 2026-05-08

## 1. Auditoria objetiva do estado atual

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 tokens em `globals.css`, Motion, Playwright, export estatico para GitHub Pages.
- Rotas principais: `/`, `/console`, `/projects`, `/projects/[slug]`, `/about`, `/skills`, `/resume`, `/lab`, `/hobbies`, `/contact`.
- Pontos de entrada: intro/start em `/`, console em `/console`, top nav persistente, drawer mobile, links diretos por modulo.
- Componentes centrais: `ConsoleShell`, `StaticConsoleShell`, `ConsoleMenu`, `ModuleSlideSystem`, `ProjectArtifact`, paginas App Router.
- Dados reutilizaveis: `src/data/profile.ts` e `src/data/projects.ts`.
- Tokens antes desta rodada: paleta WPM.OS basica, mas faltavam surfaces/elevation/semantic tones para scene pages.
- Auditoria DeepSeek/Forge: confirmou baixo risco estrutural em consolidar componentes, expandir tokens e manter WebGL/mobile intocado.

## 2. Maiores problemas encontrados

- Home ainda parecia uma composicao concorrente entre hero, ribbon, cards e painel, sem uma hierarquia dominante.
- Modulos ativos tinham peso visual parecido e pouco contexto operacional.
- Previews laterais de modulos nao-projects eram rasos e funcionavam como ponte para pagina completa.
- Paginas internas eram estreitas e simples demais para o conceito de room/dossier.
- Mobile carregava artefatos visuais pesados demais no launcher e o footer fixo podia cobrir conteudo.
- A linguagem misturava labels em ingles e portugues sem criterio operacional claro.

## 3. Estrategia de redesign

- Evoluir o sistema existente, sem reescrever o app.
- Preservar WPM.OS, console, modulos, dossies e deploy estatico.
- Priorizar impacto visual alto e risco baixo: home, preview stage e template reutilizavel.
- Reencenar o conteudo atual com mais densidade acima da dobra.
- Usar motion contida ja existente, sem dependencia nova.
- Manter PT-BR como linguagem visual principal, preservando nomes acessiveis esperados pelos testes quando necessario.

## 4. Arquitetura visual revisada

- Home agora funciona como command deck:
  - module rail hierarquico;
  - preview stage para o modulo focado;
  - CTA principal real;
  - utilities separadas;
  - artefatos em foco apenas em telas maiores.
- Paginas internas agora usam scene/dossier layout:
  - header forte;
  - status/metadados acima da dobra;
  - conteudo util real;
  - painel lateral de contexto;
  - tags e sinais operacionais.
- Tokens adicionados:
  - `wpm-surface`, `wpm-elevated`, `wpm-text-secondary`, `wpm-muted`;
  - semantic tones: `wpm-success`, `wpm-warning`, `wpm-experimental`.

## 5. Plano por fases aplicado

- Fase 1: auditoria local + Forge/Sage read-only.
- Fase 2: redesign da home em command deck e preview stage.
- Fase 3: template premium de paginas internas e aplicacao em Projects, Perfil, Skills e Save.
- Fase 4: refinamento de Lab, Hobbies, Contact, motion/focus/mobile/performance.

## 6. Arquivos alterados

- `src/app/globals.css`
- `src/components/console/moduleSceneData.ts`
- `src/components/console/ModulePreviewPanel.tsx`
- `src/components/console/ModuleSceneLayout.tsx`
- `src/components/console/ConsoleMenu.tsx`
- `src/components/console/ConsoleShell.tsx`
- `src/components/console/StaticConsoleShell.tsx`
- `src/components/console/ModuleSlideSystem.tsx`
- `src/app/projects/page.tsx`
- `src/app/about/page.tsx`
- `src/app/skills/page.tsx`
- `src/app/resume/page.tsx`
- `src/app/lab/page.tsx`
- `src/app/hobbies/page.tsx`
- `src/app/contact/page.tsx`
- `docs/AI_COMMAND_ROOM.md`

## 7. Implementacao real em codigo

- Criado `moduleSceneData.ts` como contrato visual dos modulos.
- Criado `ModulePreviewPanel.tsx` para previews ricos reutilizaveis na home e no slide panel.
- Criado `ModuleSceneLayout.tsx` para paginas internas com densidade e metadados.
- Reescrito `ConsoleMenu.tsx` como command deck com rail, preview stage e CTA real.
- Redesenhadas as paginas internas como scene pages, sem remover conteudo existente.
- Corrigido `ModuleSlideSystem.tsx` para usar token `bg-wpm-elevated`.
- Footer fixo foi limitado a `md+` para nao cobrir conteudo mobile.
- Artefatos em foco foram escondidos no mobile para reduzir densidade e risco de overlap.

## 8. Resultado

O portfolio agora comunica melhor o conceito de console tatico premium: mais hierarquia, mais contexto por modulo, mais densidade util acima da dobra e menos sensacao de paginas vazias. O projeto continua estatico, sem novas dependencias, sem backend e com WebGL/mobile fallback preservado.

## 9. QA visual, UX, acessibilidade e performance

Comandos executados:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm run build:github-pages
```

Resultados:

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- `npm run test:e2e`: 13 passed, 1 skipped
- `npm run build:github-pages`: PASS
- Playwright screenshot QA em desktop/mobile para `/console`, `/projects`, `/about`, `/skills`, `/resume`, `/lab`, `/hobbies`, `/contact`: sem overflow horizontal.
- Inspecao visual manual das capturas: console e scene pages renderizam; mobile nao exibe footer sobre o conteudo; launcher mobile remove o bloco pesado de artefatos.
- Verificacao adicional em navegador limpo via Playwright para `/projects`, `/console` e `/about`: sem erros de console/pageerror.
- Erro de hidratacao observado manualmente no navegador do usuario foi classificado como interferencia externa de extensao/tradutor, pois o diff continha `translate-tooltip-mtz translator-hidden` injetado no wrapper de metadata antes da hidratacao React. Nao foi reproduzido em Chromium limpo.

Pendencias:

- QA visual humana de Wallace antes de publicar/fechar esta rodada.
- Opcional futuro: 404 com mais personalidade visual e revisao do warning de LCP em project cover acima da dobra.
