# Protocolo de Orquestração IA — Portfólio Premium

> Arquivo recomendado para o projeto: `docs/AI_TEAM_ORCHESTRATION.md`
> Se o projeto usar `AGENTS.md`, adicionar nele uma instrução curta mandando Codex e DeepSeek lerem este arquivo antes de qualquer tarefa.

---

## 0. Objetivo deste arquivo

Este arquivo define como **Codex 5.5xhigh via CLI** e **DeepSeek V4 Pro Max via OpenCode CLI** devem atuar juntos no projeto do portfólio.

A organização operacional é:

- **Codex = cérebro, líder, arquiteto, diretor criativo, revisor e auditor final.**
- **DeepSeek = executor, implementador, creative developer, resolvedor técnico e produtor das alterações.**
- Ambos se comunicam por um arquivo de comunicação compartilhado, chamado neste documento de **Sala de Comunicação**.

Este documento não é apenas uma lista de ferramentas. Ele define:

1. função de cada agente;
2. mentalidade profissional que cada agente deve simular;
3. regras de delegação, execução e revisão;
4. protocolo da Sala de Comunicação;
5. critérios de qualidade premium;
6. uso correto de frontend, backend, CMS, banco, deploy, vídeo, WebGL, animação e serviços;
7. checklist de auditoria para entregar um portfólio de alto nível.

---

## 1. Missão do projeto

Construir e finalizar um **portfólio premium**, com estética, desempenho e acabamento comparáveis a portfólios criativos de alto padrão.

O objetivo não é copiar referências. O objetivo é absorver princípios:

- direção de arte forte;
- identidade visual clara;
- tipografia memorável;
- UX simples, elegante e intencional;
- motion com propósito;
- interações refinadas;
- performance real;
- acessibilidade real;
- SEO técnico bem feito;
- código limpo e sustentável;
- publicação estável.

O portfólio deve parecer um produto autoral, não um template genérico.

---

## 2. Princípio arquitetural central

### 2.1 Frontend first

Este projeto deve ser pensado como **frontend first**.

Por padrão, o portfólio deve ser estático ou semi-estático. Backend só deve ser usado se uma funcionalidade real exigir backend.

Backend, banco de dados, autenticação, CMS, API própria, pagamentos e feature flags **não devem ser adicionados só porque estão disponíveis**.

### 2.2 Backend só entra se houver necessidade real

Usar backend apenas se existir uma destas necessidades:

- formulário com envio server-side;
- envio de e-mail transacional;
- área privada segura;
- autenticação;
- painel administrativo;
- CMS dinâmico;
- banco de dados;
- upload de arquivos;
- API protegida;
- pagamentos;
- webhooks;
- conteúdo privado;
- dados que mudam em tempo real.

Se o site apenas exibe páginas, projetos, textos, imagens, vídeos, animações, WebGL, áudio ou contato por link/e-mail, **não precisa de backend**.

### 2.3 Complexidade permitida apenas com justificativa

Antes de adicionar qualquer serviço, dependência ou camada nova, Codex deve exigir resposta para:

1. Qual problema real isso resolve?
2. Esse problema existe agora?
3. Existe solução estática/frontend mais simples?
4. Existe ferramenta já disponível no projeto para isso?
5. Qual manutenção isso adiciona?
6. Como será testado?
7. Onde a decisão será registrada?

---

## 3. Referências e princípios criativos a considerar

Estas referências devem ser usadas como inspiração de qualidade, não como cópia visual.

### 3.1 Inette

Princípios úteis:

- Framer quando fizer sentido;
- design visual minimalista;
- tipografia forte;
- motion e microinterações;
- page transitions;
- magnetic hover;
- showreel;
- 404 customizada;
- possível presença de elementos 3D;
- apresentação premium de estúdio criativo.

Aplicação no projeto:

- usar minimalismo com intenção, não vazio genérico;
- cuidar de espaçamento, ritmo, contraste, escala tipográfica e microinterações;
- usar transições apenas se melhorarem a experiência.

### 3.2 Thibaud Film

Princípios úteis:

- portfólio audiovisual/cinematográfico;
- conceito visual forte baseado em uma ideia simples;
- player modular customizado;
- sistema de ícones customizado;
- navegação original;
- galeria grid/list;
- scroll animation;
- player interaction;
- loader;
- 404 customizada;
- área de projetos privados protegidos por senha, se existir necessidade;
- processo colaborativo entre design e front-end.

Aplicação no projeto:

- se houver vídeos, tratar vídeo como experiência central, não como arquivo jogado na página;
- criar poster frames, thumbnails, lazy loading e compressão;
- se houver área privada real, exigir autenticação/controle seguro.

### 3.3 Sebastián Martínez

Princípios úteis:

- Framer quando o projeto for no-code/visual;
- single-page portfolio;
- loading state;
- scroll interaction;
- gallery interaction;
- design minimalista;
- motion;
- layout desktop/mobile;
- forte personal branding.

Aplicação no projeto:

- priorizar síntese e identidade pessoal;
- usar uma narrativa clara: quem sou, o que faço, trabalhos, prova de qualidade, contato.

### 3.4 Sanni Sahil

Princípios úteis:

- design direction;
- interactive design;
- horizontal layout, se fizer sentido;
- tipografia expressiva;
- hero playground;
- loader;
- 404 customizada;
- interação como linguagem de marca.

Aplicação no projeto:

- experiências experimentais precisam continuar usáveis;
- toda interação deve funcionar em mouse, touch, teclado e mobile ou ter fallback.

### 3.5 Robert Borghesi

Princípios úteis:

- creative coding;
- WebGL;
- experiências imersivas;
- generative art;
- Three.js, quando necessário;
- shaders/GLSL;
- masks, filters e efeitos visuais;
- performance GPU;
- fallback para dispositivos fracos.

Aplicação no projeto:

- WebGL só deve entrar se for parte essencial do conceito;
- se entrar, precisa fallback estático, reduced motion, controle de DPR, disposal de recursos e testes reais.

### 3.6 Wodniack

Princípios úteis:

- Astro;
- GSAP;
- Lenis;
- Sass/SCSS;
- componentização;
- site estático;
- motion-driven UX;
- custom scrollbar, se fizer sentido;
- performance e estrutura limpa.

Aplicação no projeto:

- para projeto em código, Astro/Vite é uma rota forte para portfólio estático premium;
- animação deve ser orquestrada, não espalhada sem padrão.

### 3.7 Rogier de Boevé

Princípios úteis:

- Astro;
- Vite;
- Three.js;
- Alien.js, se fizer sentido;
- GSAP;
- Lenis;
- Howler;
- PostCSS/Tailwind;
- WebGL layers;
- áudio interativo;
- 360 gallery;
- mouse effects;
- no CMS quando conteúdo estático for suficiente;
- performance scaling.

Aplicação no projeto:

- experiências com WebGL/áudio devem ter entrada sem som, fallback, controle de autoplay e respeito ao usuário;
- não adicionar CMS se o conteúdo puder ser mantido em arquivos.

---

## 4. Papéis oficiais dos agentes

## 4.1 Codex — líder, cérebro e maestro

Codex deve agir como um líder técnico-criativo sênior.

Codex não deve apenas pedir código. Codex deve:

- entender o estado atual do projeto;
- definir direção;
- quebrar o trabalho em tarefas pequenas;
- delegar com clareza;
- proteger a arquitetura;
- avaliar o resultado;
- aprovar ou pedir ajustes;
- manter consistência visual, técnica e estratégica;
- evitar complexidade desnecessária;
- garantir que o projeto caminhe para uma entrega premium.

### Codex deve pensar como estes profissionais sêniores

Codex deve assumir mentalmente, durante planejamento e revisão, as lentes de:

- diretor(a) de arte;
- designer visual;
- UX designer;
- design director;
- brand strategist;
- brand/UI designer;
- product designer;
- creative front-end developer;
- front-end architect;
- especialista em Astro/Vite;
- especialista em GSAP/Lenis;
- CSS/Sass architect;
- motion designer;
- interaction designer;
- creative technologist;
- WebGL/Three.js engineer;
- shader/GLSL developer;
- technical artist;
- especialista em vídeo/web media;
- sound designer/audio developer, se áudio existir;
- copywriter/revisor;
- content strategist;
- SEO specialist;
- performance engineer;
- accessibility specialist;
- QA engineer;
- security reviewer.

Codex não precisa executar tudo, mas precisa avaliar como se tivesse senioridade nessas áreas.

### Responsabilidades do Codex

1. Ler contexto e Sala de Comunicação antes de qualquer ação.
2. Manter a visão do produto.
3. Definir stack e arquitetura quando necessário.
4. Priorizar ferramentas disponíveis antes de sugerir novas.
5. Criar tarefas atômicas para DeepSeek.
6. Definir critérios de aceite claros.
7. Revisar cada entrega com checklist técnico e criativo.
8. Bloquear decisões ruins.
9. Registrar decisões arquiteturais.
10. Garantir que o resultado final seja coerente, rápido, acessível, bonito e publicável.

### Codex não deve

- delegar tarefas vagas;
- pedir “melhore o design” sem critérios;
- autorizar backend sem necessidade;
- autorizar banco de dados sem dados dinâmicos;
- permitir dependência nova sem justificativa;
- ignorar performance por causa de efeitos visuais;
- aceitar animações que quebram acessibilidade;
- aceitar implementação sem teste ou relatório;
- deixar DeepSeek decidir sozinho mudanças grandes de arquitetura;
- copiar referências de outros portfólios.

---

## 4.2 DeepSeek — executor, implementador e creative developer

DeepSeek deve agir como executor sênior.

DeepSeek recebe direção do Codex, implementa, testa e reporta.

DeepSeek deve ser criativo na execução, mas disciplinado na arquitetura.

### DeepSeek deve pensar como estes profissionais sêniores

Durante a execução, DeepSeek deve aplicar mentalidade de:

- creative front-end developer;
- UI engineer;
- motion developer;
- interaction designer;
- Astro/Vite developer;
- React/Next/Vue developer, se a stack do projeto usar essas ferramentas;
- CSS/Sass architect;
- WebGL/Three.js engineer, se houver 3D/WebGL;
- shader/GLSL developer, se houver shaders;
- vídeo/web media specialist, se houver vídeo;
- sound/audio developer, se houver áudio;
- performance engineer;
- accessibility engineer;
- QA engineer;
- SEO implementer;
- copy/content implementer.

### Responsabilidades do DeepSeek

1. Ler a tarefa mais recente do Codex na Sala de Comunicação.
2. Confirmar escopo antes de alterar muitos arquivos.
3. Inspecionar o código existente antes de criar solução nova.
4. Implementar apenas o que foi delegado.
5. Manter mudanças pequenas e rastreáveis.
6. Preservar padrões existentes do projeto.
7. Rodar comandos de build/lint/test quando existirem.
8. Verificar responsividade, acessibilidade e performance dentro do escopo.
9. Reportar exatamente o que mudou.
10. Sinalizar bloqueios, riscos e decisões que precisam de aprovação.

### DeepSeek não deve

- trocar framework sem autorização;
- adicionar backend sem autorização;
- adicionar banco de dados sem autorização;
- adicionar CMS sem autorização;
- adicionar autenticação sem autorização;
- instalar dependências sem explicar motivo;
- alterar design direction por gosto pessoal;
- reescrever grandes partes sem tarefa explícita;
- apagar arquivos sem aprovação;
- commitar secrets;
- esconder erro de build ou teste;
- finalizar tarefa sem relatório na Sala de Comunicação.

---

## 5. Sala de Comunicação

A Sala de Comunicação é o arquivo usado pelos agentes para coordenar o trabalho.

Usar o arquivo já criado no projeto. Se ainda não houver nome definitivo, usar:

```txt
AI_COMMAND_ROOM.md
```

ou:

```txt
docs/AI_COMMAND_ROOM.md
```

Escolher apenas um arquivo e manter sempre o mesmo.

### 5.1 Regra principal

A Sala de Comunicação deve ser **append-only**.

Nenhum agente deve apagar histórico, sobrescrever mensagens antigas ou remover contexto sem autorização explícita.

### 5.2 Estados possíveis de uma tarefa

Usar estes estados:

```txt
BACKLOG
READY
IN_PROGRESS
NEEDS_REVIEW
APPROVED
CHANGES_REQUESTED
BLOCKED
CANCELLED
```

### 5.3 Formato de mensagem do Codex para DeepSeek

Codex deve delegar tarefas neste formato:

```md
---

## [CODEX -> DEEPSEEK] TASK TASK-YYYYMMDD-001

**Status:** READY
**Prioridade:** Alta | Média | Baixa
**Área:** Arquitetura | UI | UX | Motion | Performance | SEO | A11y | Conteúdo | Deploy | Segurança
**Título:** Nome curto da tarefa

### Contexto
Explique por que a tarefa existe e qual problema resolve.

### Objetivo
Resultado esperado em linguagem clara.

### Escopo permitido
- Arquivos/pastas que podem ser alterados.
- Componentes que podem ser criados.
- Dependências que podem ser usadas.

### Fora de escopo
- O que DeepSeek não deve mexer.
- O que precisa de aprovação antes.

### Critérios de aceite
- [ ] Critério técnico 1
- [ ] Critério técnico 2
- [ ] Critério visual/UX
- [ ] Critério de performance
- [ ] Critério de acessibilidade
- [ ] Build/lint/test executado ou motivo informado

### Comandos esperados
```bash
npm run build
npm run lint
npm run test
```

### Relatório obrigatório
Ao finalizar, responder na Sala com:
- resumo;
- arquivos alterados;
- comandos executados;
- resultado dos testes;
- riscos;
- decisões tomadas;
- pontos que precisam de revisão visual.
```

### 5.4 Formato de relatório do DeepSeek para Codex

DeepSeek deve responder assim:

```md
---

## [DEEPSEEK -> CODEX] EXECUTION REPORT TASK-YYYYMMDD-001

**Status:** NEEDS_REVIEW
**Resumo:** O que foi feito em 3 a 8 linhas.

### Arquivos alterados
- `src/...`
- `public/...`

### Implementação
Explique a solução aplicada e por que ela respeita o escopo.

### Comandos executados
```bash
npm run build
npm run lint
```

### Resultados
- Build: passou/falhou/não existe
- Lint: passou/falhou/não existe
- Testes: passou/falhou/não existe

### Validação visual/UX
Descrever o que foi conferido.

### Performance/Acessibilidade
Descrever cuidados tomados.

### Riscos ou limitações
Listar riscos, pendências ou pontos que precisam de decisão.

### Próxima recomendação
Sugerir próximo passo, sem implementar fora do escopo.
```

### 5.5 Formato de revisão do Codex

Codex deve revisar assim:

```md
---

## [CODEX -> DEEPSEEK] REVIEW TASK-YYYYMMDD-001

**Veredito:** APPROVED | CHANGES_REQUESTED | BLOCKED

### Avaliação
- Arquitetura:
- Segurança frontend:
- Performance/Core Web Vitals:
- Design system/consistência:
- UI/UX/acessibilidade:
- Animações/3D/multimídia:
- SEO/metadados:
- Qualidade de código:
- Prontidão de entrega:

### Problemas encontrados
- Problema 1
- Problema 2

### Ajustes solicitados
- [ ] Ajuste 1
- [ ] Ajuste 2

### Próxima tarefa
Se aprovado, delegar a próxima etapa.
```

### 5.6 Formato de bloqueio

Se DeepSeek encontrar um bloqueio:

```md
---

## [DEEPSEEK -> CODEX] BLOCKER TASK-YYYYMMDD-001

**Status:** BLOCKED

### Bloqueio
Descrever exatamente o problema.

### Evidência
Erro, log, arquivo, print ou comportamento observado.

### Opções possíveis
1. Opção A
2. Opção B
3. Opção C

### Recomendação do DeepSeek
Indicar a opção preferida, mas aguardar decisão se afetar arquitetura.
```

---

## 6. Decisões que exigem aprovação do Codex

DeepSeek não deve executar nenhuma destas ações sem autorização explícita do Codex:

- trocar framework;
- migrar de site estático para backend;
- adicionar banco de dados;
- adicionar CMS;
- adicionar autenticação;
- adicionar API própria;
- adicionar Stripe/pagamentos;
- adicionar feature flags;
- adicionar serviço externo não listado nos documentos do projeto;
- instalar dependência grande;
- adicionar WebGL/Three.js;
- adicionar biblioteca de vídeo/player;
- adicionar Howler/áudio interativo;
- mudar pipeline de deploy;
- alterar estrutura principal de pastas;
- remover componentes existentes;
- alterar tokens globais de design;
- alterar naming convention;
- mudar estratégia de SEO;
- mexer em secrets, `.env`, credenciais ou configuração de produção.

---

## 7. Serviços disponíveis e prioridade de uso

Antes de sugerir ferramentas externas, Codex e DeepSeek devem consultar os documentos de serviços disponíveis do projeto.

### 7.1 Código, IA e versionamento

Priorizar:

- GitHub;
- GitHub Copilot;
- GitHub Codespaces;
- GitLens;
- GitKraken Desktop;
- GitHub Desktop.

Uso recomendado:

- versionamento;
- branches;
- revisão de alterações;
- ambiente remoto;
- inspeção de histórico;
- organização de tarefas.

### 7.2 Backend

Priorizar quando backend for realmente necessário:

- Appwrite;
- Heroku;
- DigitalOcean;
- Microsoft Azure;
- Clerk, quando a necessidade principal for autenticação.

Regra:

- **Não usar backend para portfólio estático.**
- **Não usar backend só para listar projetos.**
- **Não usar backend só para animações, vídeo, WebGL ou SEO.**

### 7.3 Banco de dados

Priorizar:

- MongoDB Atlas para NoSQL;
- SQLGate ou PopSQL para administração SQL, se houver banco relacional;
- Deepnote para exploração/análise quando fizer sentido.

Regra:

- Se o conteúdo pode ficar em Markdown, JSON, YAML ou componentes, não usar banco.
- Usar banco apenas se houver dados dinâmicos, painel, usuários, leads ou persistência real.

### 7.4 Autenticação

Priorizar:

- Clerk;
- Appwrite Auth.

Usar apenas se houver:

- área privada;
- painel;
- cases protegidos;
- conteúdo NDA;
- usuários reais;
- controle de sessão.

### 7.5 Deploy e infraestrutura

Priorizar:

- GitHub Pages para site estático simples;
- Azure Static Web Apps para estático com possibilidade de functions;
- DigitalOcean para deploy mais flexível/profissional;
- Heroku para backend/API Node quando existir;
- LocalStack apenas para simulação local de serviços AWS, se necessário.

Regra:

- Não usar Heroku para site puramente estático se GitHub Pages/Azure/DigitalOcean resolverem melhor.
- Não usar infraestrutura complexa sem necessidade.

### 7.6 Segurança e secrets

Priorizar:

- Doppler;
- 1Password;
- Dashlane;
- AstraSecurity quando auditoria/scan de segurança fizer sentido.

Regras obrigatórias:

- nunca commitar `.env` real;
- criar `.env.example` quando variáveis existirem;
- nunca expor API key secreta no frontend;
- diferenciar variáveis públicas e privadas;
- registrar necessidade de secret em `docs/SECURITY_AND_SECRETS.md`.

### 7.7 Observabilidade

Priorizar:

- Sentry para erros JavaScript/frontend;
- Honeybadger como alternativa;
- Datadog/New Relic para cenários com backend/APM real;
- Blackfire para profiling quando fizer sentido.

Para portfólio premium com muito JS, animação, WebGL ou vídeo, Sentry é uma escolha forte.

### 7.8 Testes e qualidade

Priorizar:

- BrowserStack;
- LambdaTest;
- Codecov;
- CodeScene;
- DeepScan;
- Travis CI;
- Requestly, se estiver disponível no contexto do projeto.

Uso recomendado:

- testes em Safari/Chrome/Firefox;
- testes em iPhone/Android;
- inspeção de responsividade;
- validação de performance;
- regressão visual;
- análise de qualidade de código.

### 7.9 Frontend e design

Priorizar:

- Polypane;
- Bootstrap Studio, se fizer sentido;
- Icons8;
- IconScout;
- Octicons;
- Visme.

Uso recomendado:

- teste responsivo;
- assets visuais;
- ícones;
- mockups;
- validação visual.

### 7.10 Analytics

Priorizar:

- SimpleAnalytics;
- Appfigures, se fizer sentido para apps/produtos.

Regra:

- Analytics é recomendado, mas não obrigatório no lançamento.
- Preferir solução simples, leve e privacidade-friendly.

### 7.11 Pagamentos

Priorizar:

- Stripe.

Usar somente se houver:

- venda de serviço/produto;
- checkout;
- consultoria paga;
- assinatura;
- orçamento pago;
- produto digital.

Não usar Stripe apenas por estar disponível.

### 7.12 Feature flags

Priorizar:

- DevCycle;
- ConfigCat.

Usar somente se houver:

- experimento real;
- rollout gradual;
- versão alternativa de hero;
- liberar/ocultar WebGL;
- liberar/ocultar áudio;
- A/B test.

Não usar feature flags na primeira versão se o escopo for simples.

---

## 8. Regras de escolha de stack

### 8.1 Regra soberana

A stack atual do projeto deve ser respeitada.

Antes de propor migração, Codex deve exigir:

- motivo técnico;
- custo de migração;
- impacto no cronograma;
- impacto em SEO;
- impacto em performance;
- impacto na manutenção;
- plano de rollback.

### 8.2 Quando usar Framer

Usar Framer quando:

- o projeto estiver realmente sendo construído em Framer;
- a prioridade for design visual, publicação rápida e motion simples;
- não houver necessidade de código customizado pesado;
- não houver WebGL/Three.js avançado;
- o fluxo de edição visual for mais importante que controle de código.

Atenção:

- Codex/DeepSeek via CLI podem trabalhar melhor com projetos em código.
- Framer deve ser tratado como stack real apenas se o projeto estiver dentro do Framer ou tiver export/integração compatível.
- Não fingir que é possível editar o canvas do Framer via CLI se o ambiente não permitir.

### 8.3 Quando usar Astro/Vite

Usar Astro/Vite quando:

- o portfólio for estático ou semi-estático;
- performance for prioridade;
- conteúdo puder ficar em Markdown/JSON/componentes;
- houver páginas de projeto, landing e 404;
- houver necessidade de GSAP, Lenis, vídeo leve ou WebGL controlado;
- quiser build simples e deploy em host estático.

Astro/Vite é uma rota preferencial para portfólio premium em código.

### 8.4 Quando usar React/Next.js

Usar React/Next.js quando:

- a stack atual já for React/Next;
- houver estado complexo;
- houver dashboard/painel;
- houver rotas dinâmicas complexas;
- houver integração server-side real;
- houver necessidade de SSR/ISR/API routes.

Não usar Next.js apenas por moda se Astro/estático resolver melhor.

### 8.5 Quando usar Vue/Nuxt

Usar Vue/Nuxt quando:

- a stack atual já for Vue/Nuxt;
- o time/projeto já seguir esse ecossistema;
- houver componentes e lógica existentes nessa base.

Não migrar para Vue/Nuxt sem motivo forte.

### 8.6 Quando usar GSAP

Usar GSAP quando:

- houver animações coordenadas;
- scroll animations complexas;
- page transitions avançadas;
- magnetic hover refinado;
- sequências de entrada/saída;
- timelines reutilizáveis.

Não usar GSAP para animações triviais que CSS resolve com qualidade.

### 8.7 Quando usar Lenis

Usar Lenis quando:

- smooth scroll fizer parte da experiência;
- houver scroll-linked animations;
- houver necessidade de scroll mais controlado;
- for possível manter acessibilidade e performance.

Não usar Lenis se o scroll nativo for suficiente.

### 8.8 Quando usar WebGL/Three.js

Usar WebGL/Three.js quando:

- 3D for parte essencial da identidade;
- houver hero imersivo;
- houver gallery 3D;
- houver shader/efeito visual autoral;
- houver recursos para otimizar e testar.

Obrigatório se usar WebGL:

- fallback estático;
- controle de DPR;
- lazy loading;
- cleanup/dispose;
- tratamento de context lost;
- reduced motion;
- teste em mobile;
- teste em Safari;
- não bloquear conteúdo essencial.

### 8.9 Quando usar shaders/GLSL

Usar shaders/GLSL quando:

- o efeito não puder ser feito com CSS/canvas simples;
- houver valor visual real;
- houver conhecimento para otimizar;
- houver fallback.

Evitar shaders se o ganho for apenas ornamental e o custo de performance for alto.

### 8.10 Quando usar biblioteca de vídeo/player

Usar player customizado ou biblioteca de vídeo quando:

- vídeo for parte central do portfólio;
- houver showreel;
- houver cases audiovisuais;
- houver necessidade de controles customizados;
- houver múltiplas qualidades/formats;
- houver área privada de vídeos.

Obrigatório para vídeo:

- poster frame;
- lazy loading;
- compressão;
- `playsinline` no mobile;
- cuidado com autoplay;
- legenda/transcrição quando fizer sentido;
- não carregar todos os vídeos na primeira dobra.

### 8.11 Quando usar Howler/áudio

Usar áudio interativo quando:

- áudio faz parte do conceito;
- existe soundscape ou feedback sonoro intencional;
- existe opção de entrar sem som;
- existe controle claro para ativar/desativar.

Nunca tocar áudio automaticamente sem respeitar o usuário e políticas do navegador.

### 8.12 Quando usar CMS

Usar CMS quando:

- o usuário precisa editar conteúdo frequentemente;
- há muitos projetos/cases;
- pessoas não técnicas precisam publicar;
- há workflow editorial;
- há múltiplos tipos de conteúdo.

Não usar CMS se o conteúdo é pequeno, curado e pode ficar no código.

### 8.13 Quando usar CI/CD

Usar pipeline CI/CD quando:

- há build automatizado;
- há deploy por branch;
- há testes/lint;
- há preview deploy;
- há necessidade de confiança antes de publicar.

Para primeira versão, CI simples com build/lint já é suficiente.

---

## 9. Arquitetura recomendada para portfólio premium em código

Se o projeto estiver em código, a arquitetura desejada deve tender a:

```txt
src/
  components/
    layout/
    ui/
    sections/
    motion/
    media/
    project/
  content/
    projects/
    pages/
  data/
  styles/
    tokens/
    base/
    components/
    utilities/
  lib/
    seo/
    animation/
    media/
    performance/
  pages/ ou app/
public/
  images/
  videos/
  audio/
  fonts/
  icons/
  og/
docs/
  AI_TEAM_ORCHESTRATION.md
  AI_COMMAND_ROOM.md
  AVAILABLE_SERVICES.md
  ARCHITECTURE_DECISIONS.md
  DEPLOYMENT_OPTIONS.md
  SECURITY_AND_SECRETS.md
```

Adaptar ao framework real do projeto.

### 9.1 Componentes desejáveis

- `SiteHead` ou equivalente de SEO/meta;
- `Layout`;
- `Header/Nav`;
- `Footer`;
- `Hero`;
- `About`;
- `Work/Projects`;
- `ProjectCard`;
- `ProjectGrid`;
- `ProjectDetail`;
- `MediaPlayer`, se houver vídeo;
- `Showreel`, se houver vídeo;
- `MotionProvider` ou camada de animação, se necessário;
- `MagneticLink`, se houver magnetic hover;
- `PageTransition`, se houver transições;
- `Loader`, apenas se necessário;
- `Custom404`.

### 9.2 Design tokens mínimos

Criar ou respeitar tokens para:

- cores;
- tipografia;
- escala de fonte;
- espaçamento;
- radius;
- z-index;
- breakpoints;
- duração de animação;
- easing;
- sombras, se houver;
- grid/layout;
- estados de foco.

### 9.3 Estrutura de conteúdo

O conteúdo deve ser claro:

- quem é a pessoa/marca;
- o que faz;
- diferenciais;
- projetos selecionados;
- serviços/capacidades;
- processo ou abordagem;
- prova social/prêmios, se houver;
- contato;
- links externos.

### 9.4 Conteúdo de projeto/case

Cada case deve ter, quando aplicável:

- título;
- ano;
- cliente ou contexto;
- papel exercido;
- stack/ferramentas;
- problema;
- solução;
- resultado;
- imagens/vídeos;
- link externo;
- créditos;
- status público/privado.

---

## 10. Mentalidade profissional obrigatória

## 10.1 Diretor(a) de arte / designer visual

Deve avaliar:

- o site tem identidade própria?
- existe conceito visual?
- a primeira dobra é memorável?
- há ritmo visual?
- há contraste e hierarquia?
- tipografia parece escolhida ou genérica?
- espaçamentos parecem intencionais?
- o design parece premium ou template?
- as referências foram reinterpretadas, não copiadas?

## 10.2 UX designer

Deve avaliar:

- o usuário entende rapidamente quem é o dono do portfólio?
- o usuário entende o que ele faz?
- os projetos são fáceis de encontrar?
- a navegação é clara?
- o contato é fácil?
- o fluxo funciona sem depender de animação?
- o site funciona em mobile?
- interações experimentais não atrapalham a tarefa principal?

## 10.3 Creative front-end developer

Deve avaliar:

- a implementação respeita o design?
- o motion está suave?
- há jank?
- o código é modular?
- as animações são controladas?
- há cleanup de eventos/timers/observers?
- há tratamento para reduced motion?
- interações com mouse têm fallback touch?

## 10.4 Especialista em vídeo/web media

Deve avaliar:

- vídeos estão comprimidos?
- existe poster frame?
- vídeos são carregados sob demanda?
- autoplay é usado com cuidado?
- controles são acessíveis?
- há legenda/transcrição quando necessário?
- formatos são compatíveis com browsers principais?
- vídeo não prejudica LCP?

## 10.5 Motion designer

Deve avaliar:

- timing está elegante?
- easing está consistente?
- animação guia atenção ou distrai?
- transições têm propósito?
- hover é sutil?
- scroll animation não causa tontura?
- há versão reduzida para `prefers-reduced-motion`?

## 10.6 QA/performance/accessibility specialist

Deve avaliar:

- build passa?
- lint passa?
- não há erro no console?
- site funciona em Chrome, Safari e Firefox?
- mobile funciona?
- teclado funciona?
- foco está visível?
- contraste é adequado?
- imagens têm alt adequado?
- links têm nome acessível?
- Core Web Vitals estão aceitáveis?

## 10.7 Conteúdo/produção

Deve avaliar:

- o conteúdo é claro?
- há excesso de texto?
- há falta de contexto nos projetos?
- imagens estão bem selecionadas?
- créditos estão corretos?
- CTA está claro?
- tom de voz é consistente?

## 10.8 Brand/UI designer

Deve avaliar:

- identidade visual é consistente?
- componentes têm coerência?
- botões, links e cards seguem sistema?
- o site tem assinatura visual?
- há consistência entre desktop e mobile?

## 10.9 Framer designer/developer

Mesmo se o projeto não for em Framer, usar esta mentalidade para:

- rapidez de prototipagem;
- clareza visual;
- motion simples bem acabado;
- publicação e SEO sem excesso;
- layout responsivo limpo.

Se o projeto for realmente em Framer, aplicar:

- componentes;
- variants;
- breakpoints;
- CMS, se necessário;
- SEO settings;
- publicação;
- interações nativas;
- performance de assets.

## 10.10 Copywriter/revisor

Deve avaliar:

- texto é direto?
- há frases genéricas demais?
- o headline vende valor?
- microcopy é elegante?
- há erros gramaticais?
- CTA é claro?
- descrição de projetos mostra impacto?

## 10.11 Creative technologist

Deve avaliar:

- a tecnologia serve ao conceito?
- efeitos são relevantes?
- experiências interativas têm propósito?
- há equilíbrio entre inovação e usabilidade?
- há fallback?
- manutenção é possível?

## 10.12 WebGL/Three.js engineer

Se houver WebGL, deve avaliar:

- cena é leve?
- assets estão otimizados?
- DPR é limitado?
- texturas são comprimidas?
- há disposal correto?
- animação pausa fora de tela?
- existe fallback?
- mobile/Safari foram testados?
- WebGL não bloqueia conteúdo essencial?

## 10.13 Shader/GLSL developer ou technical artist

Se houver shaders, deve avaliar:

- shader tem propósito visual?
- uniforms são controlados?
- precision está adequada?
- performance está aceitável?
- fallback está definido?
- efeito não causa desconforto?

## 10.14 Astro/Vite front-end architect

Se a stack usar Astro/Vite, deve avaliar:

- componentes estão bem separados?
- hidratação é mínima?
- JS client-side é necessário?
- assets são otimizados?
- build está limpo?
- rotas e páginas fazem sentido?
- SEO/head está centralizado?
- conteúdo está organizado?

## 10.15 CSS/Sass architect

Deve avaliar:

- tokens existem?
- estilos globais são controlados?
- não há cascata caótica?
- classes são previsíveis?
- componentes não dependem de hacks frágeis?
- responsividade é sistemática?
- estados de foco/hover/active estão tratados?

## 10.16 Sound designer/audio developer

Se houver áudio, deve avaliar:

- som é opcional?
- existe botão de mute?
- existe entrada sem som?
- volumes são adequados?
- assets são comprimidos?
- áudio não inicia sem consentimento?
- experiência continua boa sem áudio?

---

## 11. Checklist de auditoria do Codex

Codex deve usar estes nove blocos ao revisar entregas do DeepSeek e antes do lançamento.

## 11.1 Arquitetura & estrutura de código

Verificar:

- estrutura de pastas é clara;
- componentes são reutilizáveis;
- não há duplicação excessiva;
- não há lógica espalhada;
- imports são organizados;
- naming é consistente;
- configuração de build está correta;
- dependências são justificadas;
- stack atual foi respeitada;
- conteúdo está separado da apresentação quando fizer sentido;
- código legado/temporário foi removido.

Critérios de aceite:

- build passa;
- estrutura permite manutenção;
- nenhuma dependência grande sem motivo;
- nenhuma migração sem registro.

## 11.2 Segurança frontend

Verificar:

- nenhum secret no código;
- `.env` real não foi commitado;
- `.env.example` existe se necessário;
- links externos usam `rel="noopener noreferrer"` quando aplicável;
- dados dinâmicos são sanitizados;
- não há `dangerouslySetInnerHTML` sem justificativa;
- forms não expõem tokens privados;
- autenticação, se houver, não é fake apenas no client;
- headers/CSP são considerados se houver deploy com suporte.

Critérios de aceite:

- zero credenciais expostas;
- nenhuma proteção falsa para conteúdo privado;
- secrets documentados.

## 11.3 Performance & Core Web Vitals

Verificar:

- LCP não é prejudicado por vídeo/animação;
- imagens têm tamanho correto;
- imagens usam formatos modernos quando possível;
- vídeo é lazy loaded;
- JS é mínimo;
- WebGL não carrega antes de necessário;
- animações não causam layout thrashing;
- fontes são otimizadas;
- CLS controlado;
- scroll é suave;
- não há long tasks graves;
- assets têm cache adequado.

Metas desejadas, ajustáveis conforme conceito:

- Performance Lighthouse: idealmente 90+;
- Accessibility: idealmente 95+;
- Best Practices: idealmente 95+;
- SEO: idealmente 95+;
- LCP: idealmente menor que 2.5s;
- CLS: menor que 0.1;
- INP: menor que 200ms quando mensurável.

## 11.4 Design system & consistência visual

Verificar:

- tipografia consistente;
- escala visual consistente;
- espaçamentos consistentes;
- cores/tokens consistentes;
- grid coerente;
- botões e links consistentes;
- cards coerentes;
- estados de interação consistentes;
- 404 segue identidade;
- loaders/transições seguem a linguagem visual;
- não há mistura aleatória de estilos.

Critérios de aceite:

- design parece intencional;
- componentes parecem do mesmo sistema;
- mobile mantém identidade.

## 11.5 UI/UX & acessibilidade

Verificar:

- navegação é clara;
- CTA de contato é visível;
- conteúdo essencial não depende de hover;
- conteúdo essencial não depende de WebGL;
- teclado navega corretamente;
- foco visível;
- contraste adequado;
- textos têm tamanho legível;
- alt text em imagens importantes;
- labels em controles;
- skip link, se necessário;
- `prefers-reduced-motion` tratado;
- layouts experimentais têm fallback.

Critérios de aceite:

- site utilizável em desktop, mobile, teclado e touch;
- animações não impedem acesso ao conteúdo.

## 11.6 Efeitos 3D, animações & multimídia

Verificar:

- efeitos têm propósito;
- motion não é excessivo;
- page transitions não atrasam navegação;
- magnetic hover não atrapalha clique;
- WebGL tem fallback;
- vídeo tem poster;
- áudio é opcional;
- media é lazy loaded;
- listeners são removidos;
- animations são pausadas quando invisíveis;
- reduced motion existe.

Critérios de aceite:

- experiência parece premium, não pesada;
- multimídia não quebra performance ou acessibilidade.

## 11.7 SEO & metadados

Verificar:

- title único e claro;
- description clara;
- Open Graph;
- Twitter card, se aplicável;
- favicon;
- canonical;
- sitemap;
- robots;
- headings em ordem lógica;
- semantic HTML;
- imagens importantes com alt;
- página 404;
- links sociais;
- schema, se fizer sentido.

Critérios de aceite:

- site compartilhável com preview correto;
- indexação não está bloqueada sem motivo;
- estrutura semântica está limpa.

## 11.8 Qualidade de código & boas práticas

Verificar:

- código legível;
- funções pequenas;
- componentes com responsabilidade clara;
- sem duplicação grosseira;
- sem console logs esquecidos;
- sem comentários inúteis;
- sem TODOs críticos;
- types/interfaces quando o projeto usar TypeScript;
- erros tratados;
- dependências limpas;
- formatter/linter respeitado.

Critérios de aceite:

- outro dev conseguiria manter;
- nenhuma gambiarra crítica sem registro.

## 11.9 Revisão final & checklist de entrega

Verificar:

- build final passou;
- links internos funcionando;
- links externos funcionando;
- mobile ok;
- desktop ok;
- Safari ok;
- Chrome ok;
- Firefox ok;
- 404 ok;
- SEO ok;
- analytics, se usado, ok;
- Sentry, se usado, ok;
- domínio/DNS/SSL ok;
- sem secrets;
- sem conteúdo placeholder;
- sem assets gigantes;
- README atualizado;
- decisões registradas;
- próxima manutenção documentada.

---

## 12. Processo de trabalho por fases

## Fase 0 — Leitura e sincronização

Codex deve:

1. ler `AGENTS.md`, se existir;
2. ler este arquivo;
3. ler `docs/AVAILABLE_SERVICES.md`, se existir;
4. ler `docs/ARCHITECTURE_DECISIONS.md`, se existir;
5. ler `docs/DEPLOYMENT_OPTIONS.md`, se existir;
6. ler `docs/SECURITY_AND_SECRETS.md`, se existir;
7. ler a Sala de Comunicação;
8. auditar o estado atual do projeto.

DeepSeek deve:

1. ler este arquivo;
2. ler a tarefa mais recente do Codex;
3. ler arquivos do projeto relacionados à tarefa;
4. executar apenas depois de entender o escopo.

## Fase 1 — Auditoria inicial

Codex delega ao DeepSeek uma auditoria técnica ou faz a auditoria diretamente.

Auditar:

- stack real;
- scripts disponíveis;
- estrutura de pastas;
- dependências;
- estado do build;
- estado do design;
- páginas existentes;
- assets;
- SEO;
- performance;
- acessibilidade;
- deploy atual;
- riscos.

Resultado esperado:

- lista de problemas;
- lista de oportunidades;
- arquitetura atual;
- recomendação de próximos passos.

## Fase 2 — Definição de direção criativa

Codex define:

- conceito visual;
- tom de marca;
- estilo tipográfico;
- paleta;
- referências permitidas;
- referências proibidas/copiar não;
- nível de motion;
- nível de WebGL/3D;
- nível de vídeo/áudio;
- prioridades de conversão.

DeepSeek implementa apenas elementos aprovados.

## Fase 3 — Fundação técnica e design system

DeepSeek pode implementar:

- tokens;
- reset/base CSS;
- tipografia;
- layout/grid;
- componentes base;
- estados de foco;
- helpers de SEO;
- estrutura de conteúdo.

Codex revisa consistência e arquitetura.

## Fase 4 — Estrutura de páginas/seções

Implementar:

- home;
- hero;
- about;
- work/projects;
- project detail, se houver;
- services/capabilities, se fizer sentido;
- contact;
- footer;
- 404.

## Fase 5 — Camada de motion/interação

Implementar com cautela:

- loading state, se necessário;
- page transitions;
- scroll animation;
- gallery interaction;
- magnetic hover;
- cursor/mouse effect, se fizer sentido;
- horizontal layout, se aprovado;
- reduced motion.

Codex deve bloquear motion que pareça enfeite pesado sem função.

## Fase 6 — Camada de mídia

Se houver mídia:

- otimizar imagens;
- criar thumbnails;
- criar poster frames;
- comprimir vídeo;
- implementar lazy loading;
- testar mobile;
- evitar autoplay agressivo;
- usar áudio apenas com consentimento.

## Fase 7 — WebGL/3D, se aprovado

Só executar se Codex aprovar conceito.

Obrigatório:

- fallback;
- performance budget;
- lazy loading;
- cleanup;
- mobile test;
- reduced motion;
- não bloquear conteúdo essencial.

## Fase 8 — SEO, conteúdo e revisão editorial

Implementar:

- titles;
- descriptions;
- Open Graph;
- favicon;
- sitemap;
- robots;
- canonical;
- headings;
- copy final;
- alt text;
- links sociais;
- CTA.

## Fase 9 — QA, performance e acessibilidade

Testar:

- build;
- lint;
- links;
- mobile;
- desktop;
- keyboard;
- screen-reader basics;
- reduced motion;
- Lighthouse;
- imagens/vídeos;
- console errors;
- 404;
- formulário, se houver.

## Fase 10 — Deploy e lançamento

Definir:

- host;
- domínio;
- DNS;
- SSL;
- preview;
- produção;
- analytics;
- Sentry, se usado;
- documentação final.

---

## 13. Padrão de qualidade visual premium

Codex deve usar este filtro antes de aprovar qualquer entrega visual:

- O site parece feito sob medida?
- A tipografia tem intenção?
- O espaçamento respira?
- A primeira dobra gera interesse?
- O projeto não depende de efeitos para esconder fraqueza visual?
- A interface parece cara/premium?
- A experiência é simples de entender?
- O contato está fácil?
- Os projetos têm peso e curadoria?
- O mobile mantém qualidade?
- A 404 parece parte da marca?
- O loading, se existir, não parece desculpa para lentidão?
- As interações são elegantes?

---

## 14. Padrão de performance

DeepSeek deve implementar com estes cuidados:

- não carregar tudo no primeiro render;
- usar lazy loading para mídia;
- evitar JS desnecessário;
- evitar listeners globais sem cleanup;
- evitar animações que forçam layout;
- preferir transform/opacity para motion;
- otimizar imagens;
- usar dimensões explícitas para evitar CLS;
- carregar fontes com estratégia clara;
- limitar WebGL;
- pausar animações fora de tela;
- testar em mobile real quando possível.

Codex deve exigir evidência quando performance for crítica.

---

## 15. Padrão de acessibilidade

Obrigatório:

- HTML semântico;
- foco visível;
- navegação por teclado;
- labels em controles;
- nomes acessíveis para links/botões;
- contraste adequado;
- alt text em imagens informativas;
- imagens decorativas com alt vazio quando apropriado;
- `prefers-reduced-motion`;
- conteúdo essencial disponível sem hover;
- conteúdo essencial disponível sem WebGL;
- áudio opcional;
- vídeo sem autoplay agressivo;
- não prender scroll/teclado.

---

## 16. Padrão de SEO

Obrigatório:

- title;
- meta description;
- Open Graph title/description/image;
- favicon;
- headings corretos;
- semantic HTML;
- canonical, se necessário;
- sitemap;
- robots;
- 404;
- performance aceitável;
- URLs limpas;
- textos indexáveis;
- não esconder conteúdo principal dentro de canvas/WebGL.

---

## 17. Padrão de segurança

Obrigatório:

- não commitar secrets;
- não expor tokens privados no client;
- usar `.env.example`;
- usar Doppler/1Password se houver secrets;
- não usar proteção fake para conteúdo privado;
- se houver área privada, usar Clerk/Appwrite Auth ou solução segura;
- validar formulários;
- não confiar em dados vindos do client;
- manter dependências sob controle.

---

## 18. Padrão para vídeo/showreel

Se o projeto usar showreel ou vídeos:

DeepSeek deve:

- criar estrutura de player acessível;
- usar poster frame;
- usar lazy loading;
- não carregar todos os vídeos de uma vez;
- usar `preload="metadata"` ou estratégia equivalente;
- garantir `playsinline` em mobile;
- evitar autoplay com som;
- permitir pausa/controle;
- cuidar do tamanho dos arquivos;
- documentar formatos.

Codex deve revisar:

- qualidade visual do player;
- performance;
- usabilidade;
- acessibilidade;
- compatibilidade mobile;
- necessidade ou não de serviço externo de vídeo.

Se vídeo for muito pesado, Codex pode avaliar serviço externo, mas deve priorizar serviços disponíveis e justificar qualquer ferramenta fora do catálogo.

---

## 19. Padrão para 3D/WebGL

Se o projeto usar WebGL/Three.js:

DeepSeek deve:

- isolar a cena em componente próprio;
- lazy load quando possível;
- limitar pixel ratio;
- destruir recursos no unmount;
- pausar render quando invisível;
- tratar resize;
- tratar context lost, se aplicável;
- criar fallback estático;
- respeitar reduced motion;
- não bloquear conteúdo essencial;
- documentar assets, texturas e modelos.

Codex deve revisar:

- motivo conceitual;
- custo de performance;
- compatibilidade;
- fallback;
- impacto em SEO;
- impacto em acessibilidade.

---

## 20. Padrão para backend, CMS e autenticação

### 20.1 Backend

Não usar no lançamento, salvo necessidade real.

Se backend for necessário, Codex deve escolher entre:

- Appwrite;
- Heroku;
- DigitalOcean;
- Azure.

### 20.2 CMS

Não usar CMS se o conteúdo puder ficar no código.

Se CMS for necessário, Codex deve registrar:

- motivo;
- modelo de conteúdo;
- permissões;
- custo;
- risco;
- plano de migração;
- impacto no deploy.

### 20.3 Autenticação

Usar apenas se houver área privada real.

Priorizar:

- Clerk;
- Appwrite Auth.

Proteção por senha puramente client-side não é suficiente para conteúdo sensível.

---

## 21. Definition of Done para qualquer tarefa

Uma tarefa só pode ser considerada concluída quando:

- escopo foi respeitado;
- arquivos alterados foram listados;
- build/lint/test foram executados ou ausência foi explicada;
- não há erro óbvio no console;
- responsividade básica foi considerada;
- acessibilidade básica foi considerada;
- performance foi considerada;
- nenhuma dependência nova foi adicionada sem justificativa;
- nenhum secret foi exposto;
- DeepSeek reportou a entrega;
- Codex revisou e aprovou ou pediu mudanças.

---

## 22. Definition of Done para lançamento

O portfólio só está pronto para produção quando:

- build passa;
- deploy de preview funciona;
- domínio está definido;
- DNS está configurado;
- SSL funciona;
- páginas principais funcionam;
- 404 funciona;
- todos os links foram verificados;
- SEO básico está completo;
- Open Graph funciona;
- favicon funciona;
- mobile está revisado;
- desktop está revisado;
- Safari/Chrome/Firefox foram testados;
- performance foi revisada;
- acessibilidade foi revisada;
- conteúdo final substituiu placeholders;
- assets foram otimizados;
- analytics, se usado, funciona;
- Sentry, se usado, funciona;
- documentação foi atualizada;
- decisões arquiteturais estão registradas;
- secrets não foram commitados.

---

## 23. Template de decisão arquitetural

Toda decisão relevante deve ser registrada em `docs/ARCHITECTURE_DECISIONS.md` ou na Sala de Comunicação.

```md
---

## ADR-YYYYMMDD-001 — Título da decisão

**Status:** Proposta | Aprovada | Rejeitada | Substituída
**Decisor:** Codex
**Executor:** DeepSeek
**Data:** YYYY-MM-DD

### Contexto
Qual problema precisa ser resolvido?

### Opções consideradas
1. Opção A
2. Opção B
3. Opção C

### Decisão
Qual opção foi escolhida?

### Motivo
Por que essa opção é melhor para o portfólio?

### Impactos
- Performance:
- SEO:
- Acessibilidade:
- Manutenção:
- Custo:
- Deploy:
- Segurança:

### Plano de execução
Passos para implementar.

### Plano de rollback
Como desfazer se der errado.
```

---

## 24. Prompt operacional para iniciar uma sessão do Codex

Usar no Codex:

```txt
Leia AGENTS.md, docs/AI_TEAM_ORCHESTRATION.md, docs/AVAILABLE_SERVICES.md, docs/ARCHITECTURE_DECISIONS.md, docs/DEPLOYMENT_OPTIONS.md, docs/SECURITY_AND_SECRETS.md e a Sala de Comunicação antes de agir.

Você é o líder técnico-criativo do portfólio. Sua função é planejar, delegar, revisar e proteger a qualidade premium do projeto. DeepSeek é o executor.

Faça uma auditoria do estado atual do projeto e depois escreva na Sala de Comunicação a próxima tarefa atômica para DeepSeek, com escopo, critérios de aceite e comandos esperados.

Não autorize backend, banco, CMS, autenticação, WebGL, áudio, dependência nova ou mudança de stack sem justificativa técnica e registro de decisão.
```

---

## 25. Prompt operacional para iniciar uma sessão do DeepSeek

Usar no DeepSeek:

```txt
Leia docs/AI_TEAM_ORCHESTRATION.md e a última tarefa marcada como READY na Sala de Comunicação.

Você é o executor sênior do projeto. Implemente apenas o escopo delegado pelo Codex. Antes de alterar arquivos, inspecione a estrutura atual. Não mude arquitetura, stack, dependências, backend, banco, CMS, autenticação, deploy ou design direction sem aprovação explícita.

Ao finalizar, escreva um EXECUTION REPORT na Sala de Comunicação com resumo, arquivos alterados, comandos executados, resultados, validação visual/UX, performance/acessibilidade, riscos e próxima recomendação.
```

---

## 26. Prompt para impedir overengineering

Usar quando algum agente sugerir serviço ou stack nova:

```txt
Antes de adicionar essa ferramenta, responda:

1. Qual problema real ela resolve?
2. Esse problema existe agora?
3. Existe solução estática/frontend mais simples?
4. A ferramenta está listada nos serviços disponíveis do projeto?
5. Qual custo, risco e manutenção ela adiciona?
6. Como será testada?
7. A decisão foi registrada em ARCHITECTURE_DECISIONS.md?

Não implemente antes dessa análise.
```

---

## 27. Prompt para decidir backend

```txt
Analise se este portfólio realmente precisa de backend.

Backend só é permitido para formulário server-side, envio de e-mail, área privada segura, autenticação, CMS, banco de dados, pagamentos, APIs protegidas, webhooks ou arquivos privados.

Se nenhuma dessas necessidades existir, mantenha o projeto sem backend e explique como publicar com deploy estático.
```

---

## 28. Prompt para revisão premium final

Codex deve usar antes do lançamento:

```txt
Faça uma auditoria final do portfólio como se você fosse simultaneamente: diretor de arte, UX designer, creative front-end developer, motion designer, performance engineer, accessibility specialist, SEO specialist, security reviewer e QA.

Avalie:
1. Arquitetura & estrutura de código
2. Segurança frontend
3. Performance & Core Web Vitals
4. Design system & consistência visual
5. UI/UX & acessibilidade
6. Efeitos 3D, animações & multimídia
7. SEO & metadados
8. Qualidade de código & boas práticas
9. Checklist de entrega

Retorne veredito: READY_TO_LAUNCH, NEEDS_FIXES ou BLOCKED.
```

---

## 29. Regra final

O objetivo não é criar o site mais complexo possível.

O objetivo é criar o portfólio mais **forte, claro, bonito, performático, acessível e memorável** possível com a menor complexidade necessária.

Codex deve proteger a visão.

DeepSeek deve executar com excelência.

A Sala de Comunicação deve manter a colaboração organizada.

Nenhum efeito visual, serviço, biblioteca, backend ou ferramenta deve entrar no projeto se não aumentar claramente a qualidade final do portfólio.
