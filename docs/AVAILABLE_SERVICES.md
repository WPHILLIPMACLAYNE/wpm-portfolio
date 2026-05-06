# Available Services And Tooling

> Contexto operacional para decisoes de infraestrutura, deploy, seguranca, testes, analytics e ferramentas de apoio.

## Regra Geral

Este projeto deve priorizar ferramentas ja disponiveis no GitHub Student Developer Pack antes de sugerir alternativas pagas, desconhecidas ou genericas.

Sempre que for necessario escolher infraestrutura, banco de dados, deploy, autenticacao, observabilidade, testes, seguranca, frontend/design, analytics, pagamentos ou feature flags, consulte este catalogo primeiro.

Isto nao autoriza uso automatico de servicos externos. Antes de integrar qualquer ferramenta:
- confirmar que ela ainda esta disponivel na conta do Wallace;
- verificar limites, prazo promocional, custo apos periodo gratuito e termos atuais;
- evitar inserir secrets no repositorio;
- pedir confirmacao antes de ativar deploy, banco, autenticacao, pagamentos ou monitoramento real;
- comparar com a necessidade concreta do WPM.OS.

## Preferencias Por Categoria

### Codigo E IA

Priorizar:
- GitHub Copilot
- GitHub Codespaces
- GitHub
- GitLens
- GitKraken Desktop / GitHub Desktop

### Backend

Priorizar conforme arquitetura:
- Appwrite
- Heroku
- DigitalOcean
- Microsoft Azure
- Clerk
- MongoDB Atlas

### Banco De Dados

Priorizar:
- MongoDB Atlas para NoSQL
- SQLGate ou PopSQL para administracao SQL quando houver banco relacional
- Deepnote para analise/notebooks quando fizer sentido

### Deploy E Infraestrutura

Priorizar:
- DigitalOcean
- Heroku
- Microsoft Azure
- GitHub Pages
- LocalStack para simulacao local de cloud quando aplicavel

### Autenticacao

Priorizar:
- Clerk
- Appwrite Auth

### Secrets E Seguranca

Priorizar:
- Doppler
- 1Password
- Dashlane
- AstraSecurity

Regra: secrets nunca devem ser commitados. Use variaveis de ambiente e documentacao de setup.

### Observabilidade

Priorizar:
- Sentry
- Datadog
- New Relic
- Honeybadger
- Blackfire

### Testes E Qualidade

Priorizar:
- BrowserStack
- LambdaTest
- Codecov
- CodeScene
- DeepScan
- Travis CI
- Requestly

### Frontend E Design

Priorizar:
- Polypane
- Bootstrap Studio
- Icons8
- IconScout
- Octicons
- Visme

### Analytics

Priorizar:
- SimpleAnalytics
- Appfigures

### Pagamentos

Priorizar:
- Stripe

### Feature Flags

Priorizar:
- DevCycle
- ConfigCat

## Como Agentes Devem Usar Este Documento

1. Antes de propor ferramenta externa, verificar se uma opcao deste catalogo atende ao caso.
2. Se houver mais de uma opcao, comparar por simplicidade, custo futuro, lock-in, privacidade e aderencia ao Next.js atual.
3. Para este portfolio, preferir solucoes estaticas e simples enquanto nao houver necessidade real de backend.
4. Para deploy publico, nao ativar nada sem decisao explicita de Wallace/Codex.
5. Para dados pessoais, contato, autenticacao, analytics e pagamentos, tratar como decisao de produto/privacidade, nao apenas tecnica.

## Fontes Locais

Este resumo foi consolidado a partir dos arquivos locais:
- `/home/acewallthemac/Documentos/ROADMAPLLMCREATOR/GITHUB_DEVELOPER_PACK/Recomnedacao pratica.md`
- `/home/acewallthemac/Documentos/ROADMAPLLMCREATOR/GITHUB_DEVELOPER_PACK/Ferramentas disponíveis regras.md`
- `/home/acewallthemac/Documentos/ROADMAPLLMCREATOR/GITHUB_DEVELOPER_PACK/Ferramentas disponíveis.md`
