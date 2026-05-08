# 12 - Execution Plan

Plano operacional mestre do WPM.OS Portfolio.

Este arquivo consolida as etapas, processos, ordem de trabalho e divisao de responsabilidades que antes estavam espalhados entre overview, auditorias, arquitetura, deploy, README e `AI_COMMAND_ROOM.md`.

## Estado Atual

Data de referencia: 2026-05-08.

- Projeto em `main...origin/main`, com working tree local modificado.
- `TASK-20260507-001` foi aprovada com notas para QA manual do Wallace.
- Hotfix de hidratacao contra tradutor/extensao foi validado localmente.
- GitHub Pages esta aprovado como target publico estatico.
- Nenhum commit, push, PR, merge, deploy novo ou servico externo deve ser feito sem ordem explicita do Wallace.

## Regra De Papeis

| Papel | Responsabilidade |
|---|---|
| Wallace | Dono do produto, aprova direcao visual, conteudo pessoal, publicacao, servicos externos e decisoes de exposicao publica. |
| Codex | Lider, arquiteto, diretor criativo, auditor, revisor final, responsavel por plano, criterios de aceite e validacao. |
| DeepSeek V4 Pro | Executor senior, implementador, creative developer e resolvedor tecnico a partir de tarefas delegadas por Codex. |
| `docs/AI_COMMAND_ROOM.md` | Sala append-only para delegacao, execucao, relatorio, revisao, aprovacao e pendencias. |

Codex revisa tudo antes de uma tarefa ser considerada aprovada. DeepSeek nao decide arquitetura, deploy, servicos externos, secrets ou publicacao.
Quando Codex delegar uma tarefa ao DeepSeek, DeepSeek deve executar o escopo designado e devolver um report comentado para Codex aceitar, rejeitar ou pedir correcao. Se DeepSeek nao responder ou responder incompleto, Codex deve persistir na cobranca da execucao antes de assumir a tarefa.

## Modus Operandi Codex + DeepSeek

Este projeto deve ser conduzido sempre em trabalho conjunto Codex + DeepSeek.

### Como Codex Deve Operar

1. Codex identifica a fase atual lendo `docs/12-EXECUTION-PLAN.md` e o final de `docs/AI_COMMAND_ROOM.md`.
2. Codex define o proximo passo, escopo permitido, fora de escopo, criterios de aceite e comandos de validacao.
3. Codex registra a tarefa em `docs/AI_COMMAND_ROOM.md` como bloco `CODEX -> DEEPSEEK`.
4. Codex aciona DeepSeek via Forge no terminal do repo.
5. DeepSeek executa exatamente a tarefa delegada.
6. DeepSeek devolve um `EXECUTION REPORT` comentado no `AI_COMMAND_ROOM.md`.
7. Codex revisa o report contra os arquivos reais, comandos executados, testes e riscos.
8. Codex emite aceite, rejeicao ou `CHANGES_REQUESTED`.
9. Wallace aprova decisoes de produto, publicacao, conteudo sensivel, servicos externos e exposicao publica.

### Como Abrir DeepSeek Quando Nao Estiver Conectado

Se DeepSeek nao estiver interconectado, Codex deve abrir o Forge no terminal a partir do repo:

```bash
cd /home/acewallthemac/Documentos/portifoliomain/wpm-portfolio
forge list agents
forge -C /home/acewallthemac/Documentos/portifoliomain/wpm-portfolio --agent forge -p "<tarefa registrada em docs/AI_COMMAND_ROOM.md>"
```

O agente esperado e o Forge configurado com DeepSeek V4 Pro. Antes de iniciar outra sessao, Codex deve verificar se ja ha Forge rodando:

```bash
pgrep -af "forge -C /home/acewallthemac/Documentos/portifoliomain/wpm-portfolio"
```

### Persistencia Quando DeepSeek Nao Responder

- Se DeepSeek demorar, Codex deve aguardar e acompanhar o processo.
- Se DeepSeek responder apenas com planejamento, Codex deve cobrar a execucao da mesma tarefa.
- Se DeepSeek executar comandos mas nao escrever report, Codex deve cobrar somente o report, sem refazer trabalho desnecessario.
- Se a sessao cair, Codex deve reabrir Forge e reenviar a task ainda pendente.
- Codex so pode assumir uma entrega sem report DeepSeek depois de registrar claramente a falha de conexao/resposta e manter o fluxo auditavel no `AI_COMMAND_ROOM.md`.

## Processo Padrao

Cada tarefa relevante deve seguir este ciclo:

1. **Intake**: Wallace pede uma tarefa ou Codex identifica o proximo passo acordado.
2. **Diagnostico**: Codex registra problema, causa provavel, arquivos afetados, risco e validacao esperada.
3. **Delegacao**: Codex escreve a tarefa em `AI_COMMAND_ROOM.md` para DeepSeek, com escopo permitido e fora de escopo.
4. **Execucao**: DeepSeek implementa somente o escopo aprovado e responde com execution report comentado.
5. **Revisao Codex**: Codex compara report, codigo real, docs, UX, testes e riscos.
6. **Correcao**: se houver divergencia, Codex emite `CHANGES_REQUESTED`.
7. **Documentacao**: docs vivos sao atualizados junto da entrega.
8. **Validacao**: comandos e QA visual/manual sao executados conforme o risco.
9. **Decisao**: Codex marca aprovado, aprovado com notas ou bloqueado.
10. **Publicacao**: commit, push, PR, merge ou deploy somente com autorizacao explicita de Wallace.

## Gates De Qualidade

### Antes De Editar

Codex deve declarar:

- problema;
- causa provavel;
- arquivos afetados;
- plano de correcao;
- risco;
- comandos de validacao.

### Depois De Editar

O fechamento deve informar:

- arquivos alterados;
- o que mudou;
- por que mudou;
- comandos executados;
- resultados;
- validacao visual/manual;
- riscos restantes.

### Comandos Base

Para alteracao de codigo:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=low
```

Para alteracao renderizada ou UI:

```bash
npm run build:github-pages
CI=1 npm run test:e2e
```

Para alteracao somente em Markdown:

```bash
git diff --check
```

## Sequencia Operacional

### Fase 0 - Consolidacao Do Processo

Status: concluida em 2026-05-08.

Objetivo: transformar os documentos existentes em um plano unico sem mudar o modelo Codex + DeepSeek.

Entregas:

- [x] Criar este plano mestre.
- [x] Registrar a divisao Codex/DeepSeek.
- [x] Definir gates de qualidade e ordem de trabalho.
- [x] Manter README e overview apontando para este plano.

Aceite:

- Plano existe em `docs/12-EXECUTION-PLAN.md`.
- README/overview indicam que este arquivo e a referencia operacional.
- Nenhuma regra anterior e removida.

### Fase 1 - QA Manual Do Estado Atual

Status: aprovada por Wallace em 2026-05-08, com notas tecnicas registradas em `TASK-20260508-001`.

Objetivo: Wallace revisar visualmente o estado atual antes de commit/publicacao.

Tarefas:

- [x] Abrir `http://localhost:3000` em desktop via QA automatizado.
- [x] Conferir Home, Press Start, Console, drawer mobile, painel lateral e paginas internas via QA automatizado.
- [x] Validar se o refinamento visual da `TASK-20260507-001` esta aprovado.
- [x] Listar ajustes pequenos ou confirmar que pode seguir para commit/publicacao.

Checklist Wallace:

- Home inicial: impacto visual, legibilidade e ausencia de overlay.
- Press Start: transicao ate o console.
- Console: leitura, hierarquia visual, modulos e responsividade.
- Painel lateral: conteudo, fechamento e acesso para pagina completa.
- Mobile: botao `MODULOS`, drawer e navegacao.
- Rotas: `/projects`, `/about`, `/contact`.

Aceite:

- Wallace aprova visual atual ou aponta correcoes objetivas.
- Se houver correcoes, elas viram uma task pequena na Sala de Comunicacao.

### Fase 2 - Fechamento Git E Publicacao

Status: preflight validado por DeepSeek em `TASK-20260508-002`; aguardando revisao Codex do diff e ordem explicita para commit/push/publicacao.

Objetivo: transformar o working tree aprovado em estado Git/publico consistente.

Tarefas:

- Revisar `git status` e diff final.
- Rodar validacao completa.
- Atualizar docs finais se necessario.
- Criar commit com escopo claro.
- Push para GitHub.
- Confirmar workflow GitHub Pages.
- Validar URL publica.

Aceite:

- Local e GitHub refletem o mesmo estado aprovado.
- Site publico abre sem erro.
- README, docs e `AI_COMMAND_ROOM.md` descrevem o que foi publicado.

Bloqueio:

- Nao executar sem Wallace pedir explicitamente commit/push/publicacao.

### Fase 3 - Localizacao E Conteudo Interno

Status: backlog priorizado.

Objetivo: eliminar misturas desnecessarias de ingles/PT-BR no chrome e nos paineis, mantendo nomes proprios e SEO quando fizer sentido.

Tarefas:

- Localizar textos internos de paineis ainda em ingles.
- Revisar CTAs como `Real work`, `Inspect full case`, `Open full page`.
- Decidir se metadata SEO permanece em ingles ou ganha versao PT-BR.
- Atualizar testes E2E quando assertions dependerem de texto.

Aceite:

- Experiencia principal fala PT-BR de forma consistente.
- Slugs, rotas, nomes proprios e links nao quebram.
- Testes continuam passando.

### Fase 4 - Conteudo Forte Dos Projetos

Status: backlog.

Objetivo: melhorar substancia dos cases para que o portfolio mostre trabalho real com prova visual e narrativa profissional.

Tarefas:

- Revisar `src/data/projects.ts`.
- Adicionar screenshots, posters ou assets otimizados onde houver material real.
- Fortalecer problema, processo, resultado, stack e impacto dos cases.
- Separar projetos principais de arquivo/backlog.
- Revisar curriculo, habilidades, hobbies e perfil com tom autoral.

Aceite:

- Cada projeto principal explica contexto, acao e resultado.
- Assets sao otimizados e passam por `next/image` quando aplicavel.
- Conteudo nao inventa metricas, clientes ou resultados.

### Fase 5 - QA Final De Lancamento

Status: backlog.

Objetivo: preparar lancamento publico com criterio profissional.

Tarefas:

- Lighthouse desktop/mobile.
- Playwright E2E completo.
- Teste manual mobile real.
- Teste Firefox/Safari quando disponivel.
- Teste assistivo com NVDA/VoiceOver quando possivel.
- Verificacao de links externos.
- Auditoria de secrets e dependencia.
- Validacao GitHub Pages e cache/public asset paths.

Aceite:

- Sem overlay de framework.
- Sem erro relevante de console.
- Sem overflow horizontal mobile.
- Score Lighthouse alvo >= 90 quando viavel.
- `npm audit --audit-level=low` sem vulnerabilidade acionavel.

### Fase 6 - Premium Opcional

Status: futuro, somente com aprovacao.

Objetivo: evoluir imersao sem prejudicar clareza, performance ou acessibilidade.

Possibilidades:

- WebGL/Three.js refinado apenas em desktop, com fallback mobile.
- Motion mais sofisticado com reduced motion preservado.
- Audio opt-in.
- Easter eggs.
- Analytics simples, se aprovado.
- Formulario de contato com backend/serverless, se aprovado.

Bloqueios:

- Servicos externos, analytics, backend, auth, banco, email real, secrets e deploy alternativo exigem autorizacao explicita.

## Backlog Atual Priorizado

| Ordem | Item | Status | Dono inicial |
|---:|---|---|---|
| 1 | QA manual do Wallace sobre o visual atual | aguardando | Wallace |
| 2 | Correcoes pequenas do QA manual, se houver | condicional | Codex + DeepSeek |
| 3 | Commit/push/publicacao do estado aprovado | bloqueado por aprovacao | Codex |
| 4 | Localizacao PT-BR dos textos internos restantes | backlog | Codex + DeepSeek |
| 5 | Reforco dos cases/projetos reais | backlog | Wallace + Codex |
| 6 | QA final cross-browser/mobile/a11y | backlog | Codex |
| 7 | Recursos premium opcionais | futuro | Wallace decide |

## Template De Tarefa Para A Sala

```md
## [CODEX -> DEEPSEEK] TASK TASK-YYYYMMDD-NNN

Status: READY
Prioridade:
Area:
Titulo:

### Contexto

### Objetivo

### Escopo Permitido

### Fora De Escopo

### Criterios De Aceite

### Comandos Esperados

### Relatorio Obrigatorio
```

## Definicao De Pronto

Uma entrega so e considerada pronta quando:

- o codigo real bate com o relatorio;
- docs relevantes foram atualizados;
- validacao proporcional ao risco foi executada;
- riscos restantes foram declarados;
- Codex revisou e aprovou;
- Wallace aprovou qualquer decisao de publicacao, servico externo, segredo ou conteudo pessoal sensivel.
