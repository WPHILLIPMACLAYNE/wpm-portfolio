# WPM.OS — Interactive Portfolio System

Portfólio interativo em Next.js/React com direção visual de sistema operacional autoral, projetos reais como artefatos e navegação imersiva.

## Estado Atual

Projeto em fase de fechamento local pós-hardening. O Console já abre módulos em painéis laterais interativos com foco contido, `Escape` para fechar, botão `Back` no mobile e rotas reais preservadas como fallback. A auditoria de 2026-05-06 corrigiu HTML interativo inválido, headers de segurança, SEO técnico, contraste, mobile inicial, páginas de erro customizadas, mídia otimizada, QA E2E, Dependabot local, reconciliação dos MDs e limpeza de artefatos internos.

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
