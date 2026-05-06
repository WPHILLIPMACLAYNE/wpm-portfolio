# CODEX_TASKING_GUIDE.md - Prompts e tarefas para usar com Codex

## Prompt inicial recomendado
Use este prompt no Codex antes de pedir implementação:

```text
Leia AGENTS.md e todos os arquivos em docs/ antes de alterar código. O objetivo é finalizar um portfólio premium com arquitetura front-end first. Não adicione backend, banco, auth, CMS ou serviços externos sem justificar em ARCHITECTURE_DECISIONS.md. Primeiro faça uma auditoria do estado atual do projeto, identifique stack, scripts, estrutura, problemas de build, responsividade, SEO, performance e acessibilidade. Depois proponha um plano de execução por etapas.
```

## Tarefa 1 - Auditoria do projeto

```text
Faça uma auditoria técnica completa do repositório. Leia package.json, estrutura de pastas e arquivos principais. Liste stack atual, comandos disponíveis, problemas, riscos, dependências desnecessárias, oportunidades de melhoria e o que falta para lançar. Não altere código ainda.
```

Critério de aceite:
- stack identificada;
- scripts identificados;
- riscos listados;
- plano proposto;
- nenhum serviço externo adicionado.

## Tarefa 2 - Definir arquitetura final de lançamento

```text
Com base em docs/AVAILABLE_SERVICES.md e docs/ARCHITECTURE_DECISIONS.md, proponha a arquitetura final de lançamento. Assuma que o site deve ser estático e sem backend, salvo se encontrar uma necessidade real. Explique onde o site será hospedado, como será feito o build, se precisa de analytics, se precisa de observabilidade e quais serviços não serão usados agora.
```

Critério de aceite:
- backend sim/não justificado;
- deploy escolhido;
- serviços opcionais separados;
- ADR atualizado se necessário.

## Tarefa 3 - Organização visual e componentização

```text
Refatore a interface para uma estrutura componentizada, mantendo o objetivo premium. Organize hero, about, projects, skills/services, contact e footer. Preserve performance, acessibilidade e responsividade. Não adicione biblioteca nova sem justificar.
```

Critério de aceite:
- componentes claros;
- layout responsivo;
- CSS organizado;
- nenhuma dependência desnecessária.

## Tarefa 4 - Motion e microinterações

```text
Implemente motion e microinterações com moderação. Animações devem ter bom ritmo, não bloquear leitura, respeitar prefers-reduced-motion e não degradar mobile. Se usar biblioteca de animação, explique por que ela é necessária.
```

Critério de aceite:
- animações fluidas;
- reduced motion implementado;
- mobile validado;
- sem queda grave de performance.

## Tarefa 5 - SEO e metadados

```text
Implemente SEO técnico: title, description, canonical, Open Graph, Twitter card, favicon, sitemap se aplicável, robots se aplicável, texto alternativo para imagens e estrutura semântica. Não use dados falsos; deixe placeholders claros quando faltar conteúdo.
```

Critério de aceite:
- metadata presente;
- OG image configurada ou pendente clara;
- alt text revisado;
- headings corretos.

## Tarefa 6 - Performance e assets

```text
Audite imagens, vídeos, fontes e scripts. Otimize assets, implemente lazy loading quando fizer sentido, reduza bundle e elimine código morto. Não remover qualidade visual sem explicar trade-off.
```

Critério de aceite:
- assets otimizados;
- carregamento melhorado;
- sem regressão visual;
- build funcionando.

## Tarefa 7 - Acessibilidade

```text
Faça revisão de acessibilidade: semântica, foco visível, navegação por teclado, contraste, labels, alt text, aria apenas quando necessário e prefers-reduced-motion. Corrija problemas encontrados.
```

Critério de aceite:
- teclado funciona;
- foco visível;
- contraste aceitável;
- reduced motion respeitado.

## Tarefa 8 - Deploy

```text
Prepare o projeto para deploy conforme docs/DEPLOYMENT_OPTIONS.md. Se for estático, priorize GitHub Pages, Azure Static Web Apps ou DigitalOcean. Não use Heroku se não houver backend. Documente comandos de build, pasta de saída, variáveis necessárias e checklist pós-deploy.
```

Critério de aceite:
- build documentado;
- host escolhido;
- variáveis listadas;
- passos de DNS/HTTPS indicados;
- LAUNCH_CHECKLIST atualizado.

## Tarefa 9 - Observabilidade e analytics

```text
Avalie se o projeto precisa de Sentry e SimpleAnalytics. Se sim, implemente usando variáveis de ambiente e atualize SECURITY_AND_SECRETS.md. Se não, explique por que será adiado.
```

Critério de aceite:
- decisão clara;
- sem secrets no código;
- `.env.example` atualizado se necessário.

## Tarefa 10 - Revisão final pré-lançamento

```text
Faça uma revisão final antes do lançamento usando docs/LAUNCH_CHECKLIST.md. Liste o que está pronto, o que está pendente, riscos de produção e próximos passos. Não faça mudanças grandes sem autorização.
```

Critério de aceite:
- checklist preenchido;
- riscos claros;
- próximos passos pequenos e acionáveis.
