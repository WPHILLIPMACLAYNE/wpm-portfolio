# WPM.OS — Interactive Portfolio System

Portfólio interativo em Next.js/React com direção visual de sistema operacional autoral, projetos reais como artefatos e navegação imersiva.

## Estado Atual

Projeto publicado no GitHub Pages apos o fechamento da auditoria visual de 2026-05-08. O commit `07a38bf` (`audit: apply visual portfolio hardening`) foi enviado para `origin/main`, o workflow `Deploy GitHub Pages` passou com sucesso (`25581405242`) e a URL publica foi validada em desktop e mobile.

O Console abre módulos em painéis laterais interativos com foco contido, `Escape` para fechar, botão `Back` no mobile e rotas reais preservadas como fallback. A auditoria de 2026-05-06 corrigiu HTML interativo inválido, headers de segurança, SEO técnico, contraste, mobile inicial, páginas de erro customizadas, mídia otimizada, QA E2E, Dependabot local, reconciliação dos MDs e limpeza de artefatos internos. A auditoria visual de 2026-05-08 removeu dependências mortas, consolidou a localização PT-BR, reforçou tokens visuais e removeu código morto do console.

Antes de continuar o trabalho, leia:

- [AGENTS.md](./AGENTS.md)
- [ENGINEERING_GUIDE.md](./ENGINEERING_GUIDE.md)
- [docs/00-OVERVIEW.md](./docs/00-OVERVIEW.md)
- [docs/08-DEPLOYMENT.md](./docs/08-DEPLOYMENT.md)
- [docs/09-AUDIT-HARDENING-2026-05-06.md](./docs/09-AUDIT-HARDENING-2026-05-06.md)
- [docs/10-PROFESSIONAL-AUDIT-2026-05-06.md](./docs/10-PROFESSIONAL-AUDIT-2026-05-06.md)
- [docs/11-MD-CLOSURE-2026-05-06.md](./docs/11-MD-CLOSURE-2026-05-06.md)
- [docs/12-EXECUTION-PLAN.md](./docs/12-EXECUTION-PLAN.md)

## GitHub

Repositório público:

```text
https://github.com/WPHILLIPMACLAYNE/wpm-portfolio
```

Branch principal: `main`.
Site publicado:

```text
https://wphillipmaclayne.github.io/wpm-portfolio/
```

## Desenvolvimento Local

Servidor de desenvolvimento:

```bash
npm run dev
```

Build de producao local:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3010
```

Build estatico para GitHub Pages:

```bash
npm run build:github-pages
```

O codigo principal vive em `src/app`, `src/components`, `src/data` e `src/lib`.

## Hardening 2026-05-06

A rodada atual adicionou headers de seguranca, SEO tecnico, `robots.txt`, `sitemap.xml`, JSON-LD, limpeza de artefatos internos, correcao de HTML interativo invalido, melhorias de contraste/mobile e reducao de carga inicial na home. A auditoria profissional de 2026-05-06 tambem corrigiu URLs absolutas com subpath, metadata das paginas de projeto, prerender de projetos estaticos, vulnerabilidade `postcss` via override controlado, export estatico para GitHub Pages, paginas de erro customizadas, assets WebP/JPG otimizados, cobertura Playwright local, configuracao local do Dependabot para npm e fechamento dos MDs executáveis.

A etapa de deploy agora separa claramente o build Next.js com servidor do export estatico para GitHub Pages. O Pages publica o artefato `out/` gerado pelo workflow `.github/workflows/pages.yml`.

Detalhes:
- [docs/08-DEPLOYMENT.md](./docs/08-DEPLOYMENT.md)
- [docs/09-AUDIT-HARDENING-2026-05-06.md](./docs/09-AUDIT-HARDENING-2026-05-06.md)
- [docs/10-PROFESSIONAL-AUDIT-2026-05-06.md](./docs/10-PROFESSIONAL-AUDIT-2026-05-06.md)
- [docs/11-MD-CLOSURE-2026-05-06.md](./docs/11-MD-CLOSURE-2026-05-06.md)

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm run build:github-pages
npm run test:e2e
npm audit --audit-level=low
```

Deploy and infrastructure decisions must follow [docs/AVAILABLE_SERVICES.md](./docs/AVAILABLE_SERVICES.md).

## Release 2026-05-08

Publicacao validada:

- Commit: `07a38bf audit: apply visual portfolio hardening`
- Commit documental final: `81996a8 docs: record live technical visual qa`
- GitHub Actions: `Deploy GitHub Pages` run `25581405242`, sucesso
- GitHub Actions mais recente: run `25581839825`, sucesso, head `81996a88c595e9b7c63f0adb59f5aeedfae61476`
- URL live: `https://wphillipmaclayne.github.io/wpm-portfolio/`
- Validacao local: `lint`, `typecheck`, `npm ci --dry-run`, `build`, `build:github-pages`, `test:e2e`
- E2E local: 13 passed, 1 skipped
- Validacao live: rotas principais 200 em desktop/mobile, imagens carregadas, drawer mobile visivel com `aria-expanded=true`
- Observacao: workflow emitiu aviso de deprecacao futura do Node.js 20 em actions; nao bloqueia a publicacao atual.

## Handoff Codex — 2026-05-08

Use este bloco para retomar em outro terminal/conta Codex.

Estado confirmado nesta sessao:

- Projeto: `/home/acewallthemac/Documentos/portifoliomain/wpm-portfolio`
- Branch: `main`
- Estado Git base usado para este handoff: local limpo e sincronizado com `origin/main`
- HEAD base usado para este handoff: `81996a8 docs: record live technical visual qa`
- Ao retomar, `git log` pode mostrar um commit posterior de documentacao/handoff acima desse HEAD base.
- Site live: `https://wphillipmaclayne.github.io/wpm-portfolio/`
- Live check: `HTTP/2 200`, `last-modified: Fri, 08 May 2026 22:06:31 GMT`
- Workflow Pages mais recente auditado: `25581839825`, `completed/success`
- Nenhum Forge ativo foi detectado na auditoria anterior.

O que ja foi feito:

- Gates locais passaram: `npm run lint`, `npm run typecheck`, `npm ci --dry-run`, `npm run build`, `npm run build:github-pages`, `npm run test:e2e`.
- E2E local registrou `13 passed, 1 skipped`.
- Publicacao GitHub Pages validada em rotas desktop/mobile.
- QA visual tecnico live adicional passou: console desktop/mobile abre, drawer mobile funciona, GitHub/LinkedIn corretos, nenhum email exposto.
- Documentacao tecnica e de fechamento foi atualizada para registrar publicacao, workflow, URL live, testes e pendencias.

Pendencia unica:

- Falta a aprovacao visual humana de Wallace no site publicado.
- Retorno esperado: `APROVADO VISUAL` ou `AJUSTAR: descreva o ajuste necessario`.
- Nao marcar o processo como concluido antes desse aceite humano.
