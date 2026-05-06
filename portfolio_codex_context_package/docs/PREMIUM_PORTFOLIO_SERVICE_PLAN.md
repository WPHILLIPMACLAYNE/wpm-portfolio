# PREMIUM_PORTFOLIO_SERVICE_PLAN.md - Plano de serviços para um portfólio premium

## Visão geral
Um portfólio premium não precisa automaticamente de backend. Ele precisa de uma arquitetura enxuta, uma experiência visual forte e uma cadeia de publicação confiável.

A regra é: **usar backend somente quando uma funcionalidade exigir backend**.

## Camadas necessárias

| Camada | Necessária? | Ferramentas/serviços disponíveis | Observação |
|---|---:|---|---|
| Domínio | Sim | Registrador externo | Não está listado no Developer Pack; precisa comprar/gerenciar separado. |
| DNS | Sim | Registrador/Cloud DNS do provedor | Aponta domínio para o host. |
| Hospedagem | Sim | GitHub Pages, Azure, DigitalOcean, Heroku | Preferir estático no lançamento. |
| Front-end | Sim | GitHub, Codespaces, Copilot, Polypane | Principal camada do projeto. |
| Design/UI | Sim | Polypane, Icons8, IconScout, Octicons, Bootstrap Studio, Visme | Bootstrap Studio só se fizer sentido visualmente. |
| Assets | Sim | Icons8, IconScout, Octicons, Visme + ferramentas locais | Imagens, ícones, fontes, vídeo, áudio. |
| SEO | Sim | Implementação no código + Search Console externo | Metadata, sitemap, OG image, favicon. |
| Backend | Não por padrão | Appwrite, Heroku, DigitalOcean, Azure, Clerk | Usar somente se necessário. |
| Banco de dados | Não por padrão | MongoDB Atlas, SQLGate, PopSQL | Usar somente com dados dinâmicos. |
| Autenticação | Não por padrão | Clerk, Appwrite Auth | Usar somente com área privada. |
| Secrets | Se houver integração | Doppler, 1Password, GitHub Secrets | Obrigatório quando houver chave/API. |
| Observabilidade | Recomendado se JS crítico | Sentry, Datadog, New Relic, Honeybadger | Sentry primeiro. |
| Testes | Sim | BrowserStack, LambdaTest, Codecov, Travis CI, CodeScene, DeepScan | Browser/device testing é essencial. |
| Analytics | Opcional | SimpleAnalytics | Usar se quiser medir tráfego. |
| Feature flags | Opcional | DevCycle, ConfigCat | Útil para WebGL/experimentos. |
| Pagamentos | Não por padrão | Stripe | Só se vender algo. |

## Arquitetura recomendada para lançamento

### Front-end
- Site estático ou semi-estático.
- Componentes reutilizáveis.
- CSS bem organizado.
- Motion controlado.
- Imagens otimizadas.
- Sem dependências desnecessárias.

### Deploy
Escolher uma destas rotas:

1. **GitHub Pages** para site estático simples.
2. **Azure Static Web Apps** se quiser possibilidade futura de functions.
3. **DigitalOcean** se quiser deploy mais profissional/flexível.
4. **Heroku** somente se houver backend.

### Backend
Não usar no lançamento, salvo se uma funcionalidade pedir.

### Banco de dados
Não usar no lançamento se projetos/cases forem estáticos.

### CMS
Não usar no lançamento se você aceita editar conteúdo no código/markdown.

### Autenticação
Não usar no lançamento se não houver área privada.

### Analytics
Usar SimpleAnalytics se quiser métricas.

### Observabilidade
Usar Sentry se houver:

- animações complexas;
- muito JavaScript;
- WebGL;
- scroll customizado;
- problemas difíceis de reproduzir.

### QA
Usar obrigatoriamente:

- Polypane para responsividade;
- BrowserStack ou LambdaTest para navegadores/dispositivos;
- Lighthouse para performance/SEO/acessibilidade;
- teste manual em mobile real.

## Plano por fases

### Fase 1 - Fundação
Objetivo: site rodando localmente e estrutura definida.

Serviços/ferramentas:
- GitHub;
- Codespaces ou ambiente local;
- Copilot;
- GitLens/GitKraken;
- framework/front-end escolhido;
- Polypane.

Entregas:
- estrutura de pastas;
- componentes principais;
- página inicial;
- metadata base;
- 404;
- build funcionando.

Backend: não.
Banco: não.

### Fase 2 - Design premium
Objetivo: transformar estrutura em experiência visual forte.

Ferramentas:
- Polypane;
- Icons8/IconScout/Octicons;
- Visme se precisar de material visual;
- ferramentas de imagem/vídeo locais.

Entregas:
- hero;
- tipografia;
- grid;
- responsividade;
- assets finais;
- identidade visual consistente.

Backend: não.
Banco: não.

### Fase 3 - Motion e interação
Objetivo: adicionar animações de forma controlada.

Entregas:
- transições;
- hover states;
- scroll effects;
- loader se necessário;
- reduced motion;
- performance mínima aceitável.

Feature flags:
- DevCycle/ConfigCat somente se houver recursos experimentais pesados.

Backend: não.

### Fase 4 - Conteúdo e cases
Objetivo: deixar o portfólio comunicável e convincente.

Entregas:
- projetos/cases;
- serviços/habilidades;
- textos de apresentação;
- links sociais;
- contato;
- SEO por página/seção.

CMS:
- não usar inicialmente;
- considerar Appwrite/markdown/MDX se edição frequente for necessária.

### Fase 5 - Qualidade, segurança e QA
Objetivo: preparar para lançamento.

Ferramentas:
- Polypane;
- BrowserStack;
- LambdaTest;
- Lighthouse;
- DeepScan/CodeScene se aplicável;
- Sentry se definido.

Entregas:
- bugs corrigidos;
- mobile validado;
- Safari validado;
- performance revisada;
- acessibilidade básica;
- secrets verificados.

### Fase 6 - Deploy e domínio
Objetivo: publicar em produção.

Serviços:
- GitHub Pages/Azure/DigitalOcean/Heroku conforme decisão;
- domínio e DNS;
- HTTPS;
- SimpleAnalytics se definido;
- Sentry se definido.

Entregas:
- site no ar;
- domínio configurado;
- Search Console;
- analytics;
- documentação atualizada.

## Quando adicionar serviços específicos

### Appwrite
Adicionar se precisar de:
- backend simples;
- banco/documentos;
- storage;
- auth;
- functions;
- formulário com persistência.

### Clerk
Adicionar se precisar de:
- login bonito e rápido;
- área privada;
- controle de sessão.

### MongoDB Atlas
Adicionar se precisar guardar dados reais.

### Stripe
Adicionar somente se houver cobrança.

### Sentry
Adicionar se houver JS crítico ou experiência interativa complexa.

### SimpleAnalytics
Adicionar se quiser saber visitas e origem do tráfego.

### DevCycle/ConfigCat
Adicionar se quiser ligar/desligar recursos experimentais, como WebGL, novo layout ou áudio.

## Regra de ouro
Se Codex tentar adicionar um serviço, ele deve responder antes:

1. Qual problema esse serviço resolve?
2. Esse problema existe agora?
3. Existe solução estática/front-end?
4. O serviço está na lista disponível?
5. Qual custo/risco de manutenção ele adiciona?
6. Qual arquivo de decisão será atualizado?
