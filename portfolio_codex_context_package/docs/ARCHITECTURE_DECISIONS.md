# ARCHITECTURE_DECISIONS.md - Decisões de arquitetura

Este arquivo registra decisões para impedir que o projeto cresça de forma confusa ou use serviços desnecessários.

## ADR-001 - Arquitetura padrão sem backend

### Decisão
O portfólio deve ser construído como site estático/front-end first no lançamento.

### Motivo
Portfólio normalmente não precisa de backend para existir. A maior parte do valor está em UI, UX, motion, conteúdo, assets e performance.

### Consequência
Não adicionar Appwrite, Clerk, MongoDB, Heroku, Azure Functions ou APIs antes de haver necessidade real.

### Reavaliar se
- houver formulário com envio server-side;
- área privada;
- CMS;
- login;
- banco de dados;
- pagamentos;
- conteúdo dinâmico.

## ADR-002 - Conteúdo inicialmente estático

### Decisão
Projetos, textos e seções devem ser mantidos em componentes, arquivos markdown, JSON local ou estrutura estática equivalente.

### Motivo
Isso simplifica deploy, performance, manutenção e segurança.

### Reavaliar se
O dono do site precisar editar conteúdo frequentemente sem abrir código.

## ADR-003 - CMS adiado

### Decisão
Não usar CMS no lançamento, salvo necessidade explícita.

### Motivo
CMS adiciona configuração, autenticação, permissões, modelo de dados e manutenção.

### Opções se necessário
- Appwrite como backend/CMS simples;
- outro headless CMS somente se aprovado e documentado;
- markdown/MDX local como alternativa leve.

## ADR-004 - Autenticação somente para área privada real

### Decisão
Não adicionar Clerk/Appwrite Auth sem uma área privada funcional.

### Motivo
Login cria complexidade, segurança e manutenção.

### Usar se
- houver cases privados;
- área NDA;
- dashboard;
- arquivos protegidos;
- conteúdo somente para clientes.

### Preferência
- Clerk para auth dedicada e rápida;
- Appwrite Auth se o projeto já usar Appwrite para backend/storage.

## ADR-005 - Banco de dados somente com dados dinâmicos

### Decisão
Não usar MongoDB Atlas se os dados forem estáticos.

### Motivo
Banco de dados para portfólio fixo é excesso de arquitetura.

### Usar MongoDB Atlas se
- projetos forem cadastrados por painel;
- leads precisarem ser armazenados;
- houver histórico de acesso;
- houver CMS próprio;
- houver dados de usuários.

## ADR-006 - Formulário de contato em fases

### Fase 1
Usar link `mailto:`, links sociais ou botão para WhatsApp/LinkedIn/e-mail.

### Fase 2
Se formulário real for necessário, implementar serverless/backend mínimo.

### Ferramentas preferenciais
- Appwrite Functions;
- Azure Functions;
- Heroku API pequena;
- DigitalOcean App Platform;
- serviço de formulário externo somente se aprovado.

### Segurança
Nunca expor credenciais de e-mail no front-end.

## ADR-007 - Deploy estático primeiro

### Decisão
Priorizar deploy estático.

### Opções
- GitHub Pages para versão estática simples;
- Azure Static Web Apps para estático com possibilidade de functions;
- DigitalOcean App Platform para deploy com mais flexibilidade;
- Heroku apenas se houver backend.

## ADR-008 - Observabilidade proporcional

### Decisão
Usar Sentry se o site tiver JavaScript crítico, animações complexas, WebGL ou erros difíceis de reproduzir.

### Evitar
Datadog/New Relic sem backend ou necessidade de APM.

## ADR-009 - Analytics simples

### Decisão
Usar SimpleAnalytics se analytics for necessário.

### Motivo
É suficiente para portfólio e evita complexidade excessiva.

### Reavaliar se
Houver funil comercial, campanhas, anúncios ou produto digital.

## ADR-010 - WebGL/3D como camada opcional

### Decisão
WebGL/Three.js só deve entrar se melhorar a narrativa do portfólio.

### Regras
- não prejudicar mobile;
- fornecer fallback;
- respeitar reduced motion;
- otimizar texturas/modelos;
- testar em BrowserStack/LambdaTest e dispositivos reais.

## ADR-011 - Áudio como opcional controlado pelo usuário

### Decisão
Áudio deve ser opt-in ou ter opção clara de entrar sem som.

### Motivo
Browsers limitam autoplay e usuários podem estar em ambiente inadequado.

### Usar se
O áudio fizer parte da experiência, como soundscape ou feedback interativo.

## ADR-012 - Secrets centralizados

### Decisão
Usar Doppler e/ou 1Password para secrets. No CI, usar GitHub Secrets ou secrets do provedor.

### Regra
Nenhum segredo real deve entrar no repositório.

## ADR-013 - QA premium antes do lançamento

### Decisão
Antes do deploy final, testar com:

- Polypane;
- BrowserStack ou LambdaTest;
- Lighthouse;
- navegação por teclado;
- mobile real;
- Safari;
- Chrome;
- Firefox.

### Critério
Não lançar se mobile, performance ou acessibilidade estiverem quebrados.
