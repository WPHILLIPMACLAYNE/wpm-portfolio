# AVAILABLE_SERVICES.md - Serviços e ferramentas disponíveis

Este projeto deve priorizar ferramentas já disponíveis pelo GitHub Student Developer Pack antes de sugerir alternativas externas.

## Diretriz para agentes de IA
Sempre que for necessário escolher infraestrutura, banco de dados, deploy, autenticação, observabilidade, testes, segurança, frontend ou design, verificar primeiro este arquivo.

Não sugerir ferramenta paga, desconhecida ou genérica sem antes comparar com os serviços já disponíveis.

## Classificação rápida

### Ferramentas para usar quase sempre
- GitHub
- GitHub Copilot
- GitHub Codespaces
- GitLens
- GitKraken Desktop / GitHub Desktop
- Polypane
- BrowserStack ou LambdaTest para QA cross-browser

### Ferramentas para usar se houver necessidade clara
- Appwrite
- Clerk
- MongoDB Atlas
- Heroku
- DigitalOcean
- Azure
- Sentry
- SimpleAnalytics
- Doppler
- 1Password
- DevCycle
- ConfigCat
- Stripe

### Ferramentas que não devem ser usadas sem motivo
- Banco de dados sem conteúdo dinâmico real.
- Autenticação sem área privada real.
- Backend apenas para servir páginas estáticas.
- Observabilidade pesada para um site sem JS crítico.
- Feature flags para um portfólio simples.
- Pagamentos se o portfólio não vender produto/serviço diretamente.

## Código e IA

### GitHub
Uso recomendado:
- repositório principal;
- issues;
- pull requests;
- versionamento;
- GitHub Pages quando o projeto for estático;
- GitHub Secrets quando houver CI/CD.

### GitHub Copilot
Uso recomendado:
- aceleração de código;
- refatoração;
- geração de testes;
- documentação de componentes.

### GitHub Codespaces
Uso recomendado:
- ambiente de desenvolvimento em nuvem;
- padronização de Node/npm;
- trabalhar sem depender da máquina local.

### GitLens
Uso recomendado:
- histórico de alterações;
- autoria de linhas;
- revisão de commits.

### GitKraken Desktop / GitHub Desktop
Uso recomendado:
- Git visual;
- gerenciamento de branches;
- resolução de conflitos.

## Backend

### Appwrite
Usar quando precisar de:
- backend pronto;
- autenticação;
- banco/documentos;
- storage;
- functions;
- APIs simples.

Evitar quando:
- o portfólio for 100% estático;
- houver apenas link de contato por e-mail.

### Heroku
Usar quando precisar de:
- API Node/Express/Nest;
- app server-side;
- webhook;
- backend pequeno separado.

Evitar quando:
- o site puder ser publicado como estático.

### DigitalOcean
Usar quando precisar de:
- deploy em App Platform;
- Droplet;
- infraestrutura controlada;
- serviços de produção mais flexíveis.

Evitar quando:
- GitHub Pages/Azure Static Web Apps resolverem o caso.

### Microsoft Azure
Usar quando precisar de:
- Static Web Apps;
- Functions;
- integração com serviços Microsoft;
- deploy com ambiente mais corporativo.

### Clerk
Usar quando precisar de:
- login;
- autenticação;
- área privada;
- controle de sessão;
- integração rápida de auth.

Evitar quando:
- não houver área privada real.

### MongoDB Atlas
Usar quando precisar de:
- banco NoSQL;
- projetos dinâmicos;
- leads;
- painel administrativo;
- conteúdo editável.

Evitar quando:
- os projetos/cases estiverem em arquivos estáticos, markdown, JSON ou código.

## Banco de dados e análise

### MongoDB Atlas
Banco padrão para NoSQL, se banco for realmente necessário.

### SQLGate / PopSQL
Usar apenas se houver banco SQL relacional.

### Deepnote
Usar para análise, protótipos, exploração de dados ou documentação técnica interativa. Não é necessário para um portfólio estático comum.

## Deploy e infraestrutura

### GitHub Pages
Melhor para:
- site estático;
- portfólio sem backend;
- baixo custo;
- publicação simples.

Limitações:
- sem serverless nativo;
- rotas dinâmicas e formulários exigem serviços externos.

### DigitalOcean
Melhor para:
- deploy mais flexível;
- aplicações com backend;
- infraestrutura escalável;
- ambiente de produção com mais controle.

### Azure
Melhor para:
- Static Web Apps;
- funções serverless;
- projeto com possibilidade de crescer.

### Heroku
Melhor para:
- backend Node pequeno;
- API;
- webhook;
- protótipo full-stack.

### LocalStack
Usar somente se o projeto simular serviços AWS localmente. Não é necessário para portfólio estático.

## Segurança e secrets

### Doppler
Preferência para variáveis de ambiente e secrets de projeto.

### 1Password
Preferência para guardar senhas pessoais, tokens, chaves de provedor e credenciais de domínio.

### Dashlane
Alternativa para gestão de senhas.

### AstraSecurity
Usar para auditoria de segurança se houver backend, login, formulários ou área privada.

## Observabilidade

### Sentry
Primeira escolha para erros JavaScript/client-side e monitoramento de exceções.

### Datadog / New Relic
Usar se houver backend, APIs ou necessidade de observabilidade mais pesada.

### Honeybadger
Alternativa para monitoramento de erros.

### Blackfire
Usar principalmente se houver backend com preocupação de profiling/performance server-side.

## Testes e qualidade

### BrowserStack / LambdaTest
Usar para testar:
- Safari;
- Chrome;
- Firefox;
- iPhone;
- Android;
- resoluções diferentes;
- interações touch;
- animações e scroll.

### Codecov
Usar se houver testes unitários/componentes e CI.

### CodeScene
Usar para qualidade, complexidade e saúde do código.

### DeepScan
Usar para análise estática de JavaScript/TypeScript.

### Travis CI
Usar se for escolhido como CI. Se GitHub Actions já estiver configurado, não duplicar CI sem necessidade.

## Frontend e design

### Polypane
Usar obrigatoriamente no QA visual/responsivo se disponível:
- múltiplos viewports;
- acessibilidade;
- SEO visual;
- comparação responsiva.

### Bootstrap Studio
Usar apenas se o projeto seguir Bootstrap ou se for prototipagem rápida. Não forçar Bootstrap em um portfólio custom premium se isso limitar a identidade visual.

### Icons8 / IconScout / Octicons
Usar para:
- ícones;
- ilustrações;
- assets visuais;
- interface.

Sempre verificar licença/uso permitido.

### Visme
Usar para apresentações, gráficos, materiais visuais e assets auxiliares.

## Analytics

### SimpleAnalytics
Primeira escolha para analytics simples e menos invasivo.

### Appfigures
Usar se houver app/produto mobile ou necessidade específica de métricas de app store. Para portfólio web simples, provavelmente não precisa.

## Pagamentos

### Stripe
Usar somente se houver:
- venda de serviço/produto;
- pagamento de consultoria;
- checkout;
- assinatura;
- orçamento pago.

Não adicionar Stripe em portfólio comum.

## Feature flags

### DevCycle / ConfigCat
Usar se houver:
- teste A/B;
- habilitar/desabilitar WebGL;
- liberar nova seção gradualmente;
- alternar versão experimental.

Para portfólio simples, normalmente não precisa.
