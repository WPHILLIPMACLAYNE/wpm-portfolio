# WPM.OS — Interactive Portfolio System

Portfólio interativo em Next.js/React com direção visual de sistema operacional autoral, projetos reais como artefatos e navegação imersiva.

## Estado Atual

Projeto em fase de hardening técnico. O Console já abre módulos em painéis laterais interativos com foco contido, `Escape` para fechar e rotas reais preservadas como fallback. A auditoria de 2026-05-06 corrigiu HTML interativo inválido, headers de segurança, SEO técnico, contraste, mobile inicial e limpeza de artefatos internos.

Antes de continuar o trabalho, leia:

- [AGENTS.md](./AGENTS.md)
- [docs/00-OVERVIEW.md](./docs/00-OVERVIEW.md)
- [docs/09-AUDIT-HARDENING-2026-05-06.md](./docs/09-AUDIT-HARDENING-2026-05-06.md)

## GitHub

Repositório privado:

```text
https://github.com/WPHILLIPMACLAYNE/wpm-portfolio
```

Branch principal: `main`.

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

O codigo principal vive em `src/app`, `src/components`, `src/data` e `src/lib`.

## Hardening 2026-05-06

A rodada atual adicionou headers de seguranca, SEO tecnico, `robots.txt`, `sitemap.xml`, JSON-LD, limpeza de artefatos internos, correcao de HTML interativo invalido, melhorias de contraste/mobile e reducao de carga inicial na home.

Detalhes: [docs/09-AUDIT-HARDENING-2026-05-06.md](./docs/09-AUDIT-HARDENING-2026-05-06.md).

## Validation

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate --omit=dev
```

Deploy and infrastructure decisions must follow [docs/AVAILABLE_SERVICES.md](./docs/AVAILABLE_SERVICES.md).
