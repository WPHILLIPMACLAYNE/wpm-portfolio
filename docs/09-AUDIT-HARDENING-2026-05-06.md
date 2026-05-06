# Audit Hardening — 2026-05-06

## Escopo

Correcoes aplicadas a partir da auditoria tecnica completa do portfolio WPM.OS. O objetivo foi reduzir riscos antes de qualquer publicacao: semantica HTML, seguranca frontend, SEO tecnico, contraste, comportamento mobile, timers de animacao e higiene do repositorio.

## Correcoes Aplicadas

- `Button` passou a suportar `as="a"` para CTAs externos, removendo o padrao invalido de `<a><button /></a>`.
- `next.config.ts` passou a enviar headers globais: CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS e `poweredByHeader: false`.
- Metadata global agora inclui `metadataBase`, canonical, robots, Open Graph, Twitter Card e JSON-LD `Person`.
- `robots.ts` e `sitemap.ts` foram adicionados usando as convencoes do App Router.
- WebGL da home foi adiado para o estagio Console, evitando carregar Three/R3F durante boot/start.
- Home passou a abrir no `PressStart` estatico; a intro completa fica disponivel via replay, sem bloquear LCP inicial.
- Componentes pesados da home (`BootIntro`, Console, WebGL e transicao CRT) passaram a carregar sob demanda com `next/dynamic`.
- Cursor customizado passou a carregar apenas depois do primeiro paint e somente em ponteiro fino.
- `/projects` usa `StaticConsoleShell`, sem drawer client-side no carregamento inicial.
- `ProjectCartridge` deixou de ser Client Component e nao sai mais do SSR com `opacity:0`.
- `BootIntro` passou a limpar timeouts pendentes em unmount/replay.
- `PressStart` ganhou limite responsivo para evitar clipping do titulo no mobile.
- Contraste de textos pequenos e chips foi reforcado nas rotas principais.
- Arquivos internos `AGENT_ROOM*`, `_reversa_sdd/`, `CLAUDE.md` e SVGs padrao nao usados do scaffold foram removidos do pacote publico.

## Validacao Executada

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate --omit=dev
```

Resultado local em producao (`next start`, Lighthouse mobile/headless):

| Rota | Performance | A11y | Best Practices | SEO | LCP | TBT | CLS |
|------|-------------|------|----------------|-----|-----|-----|-----|
| `/` | 87 | 100 | 100 | 100 | 2.0s | 490ms | 0 |
| `/projects` | 86 | 96 | 100 | 100 | 3.2s | 340ms | 0 |

Screenshots Playwright foram capturados para home mobile e projects mobile/desktop durante a validacao.

## Risco Residual

- `npm audit` ainda pode reportar PostCSS via `next@16.2.x`, pois `next@16.2.5` continua declarando `postcss@8.4.31`. Nao usar `npm audit fix --force` sem revisar o downgrade proposto.
- `/projects` ainda nao bateu LCP <= 2.5s de forma consistente no Lighthouse mobile local; a rota ficou estruturalmente mais estatica, mas precisa de nova rodada focada em TBT/LCP se essa meta for obrigatoria para release.
- CSP usa `unsafe-inline` para preservar os scripts inline do App Router/React payload. Endurecer isso exige nonce/hashes e deve ser tratado em uma frente propria.
- A imagem OG reutiliza o asset atual do livro; uma imagem dedicada 1200x630 ainda pode melhorar compartilhamento social.
