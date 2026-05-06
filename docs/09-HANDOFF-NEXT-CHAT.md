# Handoff Para Novo Chat — WPM.OS

> Data: 2026-05-05
> Projeto: `/home/acewallthemac/Documentos/portifoliomain/wpm-portfolio`
> Objetivo: permitir retomada em outro chat/conta sem perder contexto operacional.

## Atualizacao De Fechamento — 2026-05-05

Estado final do dia:

- ART-DIRECTION V2 aprovada e fechada em `CODEX3MSG-0016`.
- ART-DIRECTION V3 / Module Slide System base aprovada e fechada em `CODEX3MSG-0019`.
- `Project Library` abre painel lateral/sheet dentro do Console.
- `aria-controls="module-panel"` aponta para o painel real.
- Focus trap validado em desktop 1440x1000 e mobile 390x844 com Tab e Shift+Tab dentro do painel.
- `Escape` fecha painel e devolve foco ao launcher.
- `npm run lint`, `npm run typecheck` e `npm run build` passaram.
- Repositorio GitHub privado criado: `https://github.com/WPHILLIPMACLAYNE/wpm-portfolio`.
- Proximo passo depois do push: transformar os 6 paineis restantes, hoje stubs, em paineis premium.

---

## 1. Regra De Ouro Da Retomada

O proximo chat deve tratar o workspace como fonte da verdade.

Antes de qualquer decisao:

```bash
cd /home/acewallthemac/Documentos/portifoliomain/wpm-portfolio
pwd
git status --short --branch
tail -360 AGENT_ROOM_3.md
rg -n "CODEX3MSG-0016|CODEX3MSG-0019|DEEPSEEK3MSG-0009|Module Slide System" AGENT_ROOM_3.md
```

O repositorio remoto esperado e:

```text
origin -> https://github.com/WPHILLIPMACLAYNE/wpm-portfolio.git
```

---

## 2. Regras Locais Que Nao Podem Ser Ignoradas

Ler e respeitar:

- `AGENTS.md`
- `docs/AVAILABLE_SERVICES.md`
- `node_modules/next/dist/docs/` antes de mexer em convencoes/APIs Next.

Resumo:

- Next.js aqui e `16.2.4`; nao assumir Next antigo.
- React e `19.2.4`.
- Nao sugerir ou ativar servicos externos sem consultar `docs/AVAILABLE_SERVICES.md`.
- Nao ativar backend, auth, banco, analytics, pagamento, deploy ou tooling externo nesta fase.
- Nao inventar metricas, resultados, porcentagens ou claims.
- Nao degradar acessibilidade ja aprovada.

---

## 3. Papel Dos Agentes

Wallace corrigiu explicitamente a dinamica:

- **Codex = cerebro / diretor tecnico-visual / reviewer.**
- **DeepSeek v4 pro max = executor principal / maos.**

O proximo chat pode assumir os dois papeis se o DeepSeek nao estiver disponivel, mas deve preservar a logica: primeiro direcao e review, depois execucao.

Se DeepSeek continuar rodando, orientar via `AGENT_ROOM_3.md`.

---

## 4. Estado Aprovado Antes Da Frente Visual

Fases/decisoes ja aprovadas no `AGENT_ROOM_3.md`:

- P6 aprovada e fechada: conteudo real, 2 projetos reais, mobile overflow corrigido, build/lint/typecheck ok.
- P7 aprovada: skip-to-content global.
- P8/P8B aprovadas: heading hierarchy por rota e por estado da Home.
- P28/P31 aprovadas: Console ganhou vitrine de trabalhos e CTA contato.

Arquivos importantes desse historico:

- `docs/06-UX-AUDIT.md`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/components/console/ConsoleShell.tsx`
- `src/hooks/useRovingTabIndex.ts`

---

## 5. Estado Atual Da Direcao Visual

Wallace rejeitou o visual anterior por parecer generico/amador e pediu:

- design system profissional;
- UI premium;
- direcao de arte;
- motion;
- 3D;
- interacao;
- React/WebGL quando fizer sentido;
- UX de alto nivel.

Conceito visual de referencia:

```text
_reversa_sdd/wpm-os-v2-concept.png
```

Primeira virada visual aplicada no Console:

```text
src/components/console/ConsoleMenu.tsx
```

O ConsoleMenu atual ja tem:

- hero `WPM.OS`;
- telemetria lateral;
- artefatos para os 2 projetos reais;
- `OperationalArtifact`;
- `BookArtifact`;
- `ModuleRibbon`;
- glass/glow/noise/parallax;
- CTA `Inspect work`;
- CTA `Open signal`.

---

## 6. ART-DIRECTION V2 — Status Exato

Ultimo review formal Codex:

```text
CODEX3MSG-0013
```

Veredito naquele momento:

```text
AJUSTAR
```

Bloqueadores apontados:

1. evidencias DeepSeek estavam fora do caminho combinado;
2. `/console` retornou `HTTP 500` no dev server stale em `3000`;
3. desktop tinha clipping do `WPM.OS`;
4. mobile tinha clipping do subtitulo/paragrafo.

Depois disso, `src/components/console/ConsoleMenu.tsx` foi alterado novamente em 2026-05-05 20:13. O arquivo atual parece incorporar parte dos ajustes:

- grid desktop mudou para `xl:grid-cols-[0.85fr_1.15fr]`;
- `overflow-hidden` saiu do bloco textual;
- tracking/tamanho do subtitulo mobile foi reduzido.

Mas ate este handoff **nao ha review final Codex aprovando V2** e nao ha pacote oficial `DEEPSEEK3MSG-0006` registrado como mensagem final de execucao.

Portanto, proximo passo seguro:

1. validar estado atual de `/console`;
2. capturar screenshots corretos;
3. revisar visualmente;
4. so entao aprovar V2 ou pedir novo ajuste.

---

## 7. ART-DIRECTION V3 — Nova Direcao Wallace

Wallace pediu a evolucao:

As 7 abas/modulos nao devem mais ser simples links que abrem paginas comuns. Cada aba deve abrir uma experiencia interativa lateral, com transicao deslizante, mantendo qualidade premium da inicial.

Mensagem de direcao registrada:

```text
CODEX3MSG-0014
```

Nome da frente:

```text
ART-DIRECTION V3 / Module Slide System
```

Decisao UX recomendada:

- manter rotas reais como fallback/deep-link:
  - `/projects`
  - `/about`
  - `/skills`
  - `/resume`
  - `/lab`
  - `/hobbies`
  - `/contact`
- no Console, clique nos 7 modulos abre painel lateral dentro do proprio WPM.OS;
- desktop: painel entra da direita, largura dominante, hub recua/escurece;
- mobile: painel vira sheet full-screen horizontal;
- `Escape` fecha;
- foco vai para painel ao abrir e volta ao launcher ao fechar;
- links secundarios podem abrir a pagina real.

Componentes sugeridos:

- `ModuleSlideSystem`
- `ModulePanelFrame`
- `ProjectLibraryPanel`
- `PlayerProfilePanel`
- `SkillTreePanel`
- `CareerSavePanel`
- `ExperimentalLabPanel`
- `SideQuestsPanel`
- `SendSignalPanel`

Nao importar diretamente os `page.tsx` atuais dentro do painel, porque eles carregam `ConsoleShell` e duplicariam shell/header/main.

---

## 8. Ordem Correta No Proximo Chat

### Passo 1 — Revalidar V2

```bash
npm run lint
npm run typecheck
npm run build
```

Subir servidor fresco:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Verificar:

```bash
node - <<'NODE'
(async () => {
  for (const url of ['http://127.0.0.1:3000/console', 'http://127.0.0.1:3000/']) {
    const res = await fetch(url);
    console.log(url, res.status, res.headers.get('content-type'));
  }
})();
NODE
```

Capturar evidencias corretas:

```bash
mkdir -p _reversa_sdd/art-direction-v2
google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=1440,1000 --screenshot=_reversa_sdd/art-direction-v2/console-desktop-deepseek.png http://127.0.0.1:3000/console
google-chrome --headless=new --no-sandbox --disable-gpu --hide-scrollbars --virtual-time-budget=8000 --window-size=390,844 --screenshot=_reversa_sdd/art-direction-v2/console-mobile-deepseek.png http://127.0.0.1:3000/console
```

Abrir visualmente:

- `_reversa_sdd/wpm-os-v2-concept.png`
- `_reversa_sdd/art-direction-v2/console-desktop-deepseek.png`
- `_reversa_sdd/art-direction-v2/console-mobile-deepseek.png`

Critérios:

- sem clipping do `WPM.OS`;
- subtitulo mobile completo;
- paragrafo mobile completo;
- artefatos visiveis;
- sem overflow horizontal;
- rotas continuam funcionais.

### Passo 2 — Se V2 Passar

Registrar no `AGENT_ROOM_3.md`:

```text
CODEX3MSG-0016 | Codex -> DeepSeek | fechada
ART-DIRECTION V2 APROVADA / FECHADA
```

Depois iniciar V3.

### Passo 3 — Se V2 Nao Passar

Nao iniciar V3 ainda.

Orientar DeepSeek a corrigir somente:

- clipping;
- evidencia;
- dev server;
- mobile.

### Passo 4 — Executar V3

Implementar `Module Slide System` em passos pequenos:

1. criar arquitetura/painel comum;
2. adaptar `ModuleRibbon` para abrir painel, nao navegar diretamente;
3. implementar 1 modulo primeiro (`Project Library`) com qualidade alta;
4. validar desktop/mobile;
5. replicar o padrao para os outros 6 com identidade propria;
6. rodar validacoes e capturas.

---

## 9. Evidencias Existentes

Referencia principal:

```text
_reversa_sdd/wpm-os-v2-concept.png
```

Evidencias Codex de review anterior:

```text
_reversa_sdd/art-direction-v2/codex-review-prod-console-desktop.png
_reversa_sdd/art-direction-v2/codex-review-prod-console-mobile.png
```

Evidencias antigas/invalidas que nao devem ser usadas como aprovacao:

```text
_reversa_sdd/p6-screenshots-v3/
_reversa_sdd/p6-screenshots-v2/
_reversa_sdd/p6-screenshots/
```

---

## 10. Prompt Para Colar No Novo Chat

```text
Estamos retomando o projeto WPM.OS em:
/home/acewallthemac/Documentos/portifoliomain/wpm-portfolio

Antes de qualquer coisa, leia:
- AGENTS.md
- docs/09-HANDOFF-NEXT-CHAT.md
- tail -320 AGENT_ROOM_3.md

Contexto:
- Codex deve agir como cerebro/diretor/reviewer.
- DeepSeek v4 pro max e o executor principal quando disponivel.
- V2 visual do Console esta em ajuste/review: validar ConsoleMenu atual, screenshots e clipping antes de aprovar.
- Depois de V2 aprovada, iniciar V3 Module Slide System: 7 modulos viram paineis laterais interativos dentro do WPM.OS, mantendo rotas reais como fallback.

Nao invente metricas, nao adicione servicos externos, nao remova rotas e nao degrade acessibilidade.
Primeiro valide o estado atual com lint/typecheck/build e screenshots desktop/mobile.
```

---

## 11. Arquivos De Maior Risco

- `src/components/console/ConsoleMenu.tsx` — arquivo central da nova experiencia visual.
- `src/components/console/ConsoleShell.tsx` — shell global, header/footer/main, skip target.
- `src/app/page.tsx` — Home com fluxo Boot/Start/Console.
- `src/app/console/page.tsx` — rota console.
- `src/data/profile.ts` — menuItems e dados reais de perfil.
- `src/data/projects.ts` — projetos reais; nao inventar dados.

---

## 12. Observacao Final

Nao confiar em memoria verbal do chat anterior se ela conflitar com arquivos locais.

A fonte de verdade da continuidade e:

1. `docs/09-HANDOFF-NEXT-CHAT.md`;
2. `AGENT_ROOM_3.md`;
3. o estado real dos arquivos em `src/`;
4. screenshots novos gerados no momento da retomada.
