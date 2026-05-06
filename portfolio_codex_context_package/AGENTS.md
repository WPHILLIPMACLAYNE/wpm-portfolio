# AGENTS.md - Orientação obrigatória para Codex

## Objetivo do repositório
Construir e finalizar um portfólio premium, com qualidade visual, performance, responsividade, acessibilidade e acabamento comparáveis a portfólios criativos de alto nível.

O projeto deve ser tratado como **front-end first**. Não adicionar backend, banco de dados, autenticação, CMS ou serviço de nuvem complexo se a funcionalidade puder ser resolvida com front-end estático, assets otimizados e deploy estático.

## Arquivos de contexto que devem ser lidos antes de decisões importantes
Antes de escolher ferramenta, serviço, arquitetura ou solução externa, leia:

- `docs/AI_CONTEXT.md`
- `docs/AVAILABLE_SERVICES.md`
- `docs/ARCHITECTURE_DECISIONS.md`
- `docs/DEPLOYMENT_OPTIONS.md`
- `docs/SECURITY_AND_SECRETS.md`
- `docs/PREMIUM_PORTFOLIO_SERVICE_PLAN.md`
- `docs/LAUNCH_CHECKLIST.md`

## Regra principal de ferramentas e serviços
Priorizar as ferramentas e serviços já disponíveis pelo GitHub Student Developer Pack descritos em `docs/AVAILABLE_SERVICES.md`.

Não sugerir ferramenta paga, desconhecida ou genérica sem antes comparar com os serviços já disponíveis.

## Arquitetura padrão esperada
A arquitetura padrão para lançamento deve ser:

- Site estático ou semi-estático.
- Front-end componentizado.
- Sem backend no lançamento, salvo necessidade explícita.
- Sem banco de dados no lançamento, salvo conteúdo dinâmico real.
- Sem autenticação, salvo área privada real.
- Deploy em GitHub Pages, DigitalOcean, Azure ou Heroku conforme `docs/DEPLOYMENT_OPTIONS.md`.
- Secrets somente via Doppler, 1Password, GitHub Secrets ou painel seguro do provedor.

## Quando backend é permitido
Adicionar backend somente se houver pelo menos uma destas necessidades:

- formulário com processamento real;
- envio de e-mail server-side;
- área privada segura;
- autenticação;
- dashboard administrativo;
- CMS;
- banco de dados;
- pagamentos;
- APIs protegidas;
- arquivos privados;
- logs de acesso privados.

Se backend for necessário, priorizar Appwrite, Heroku, DigitalOcean, Azure ou Clerk, dependendo do caso.

## Qualidade premium obrigatória
Qualquer implementação deve respeitar estes critérios:

- layout responsivo desktop/tablet/mobile;
- navegação clara;
- animações fluidas sem prejudicar performance;
- reduced motion para usuários sensíveis a movimento;
- HTML semântico;
- foco visível em teclado;
- imagens, vídeos e fontes otimizados;
- SEO técnico básico;
- Open Graph/Twitter image;
- favicon e manifest quando aplicável;
- página 404 customizada;
- Lighthouse e testes reais antes do deploy.

## Serviços preferenciais por categoria

- Código: GitHub, GitHub Copilot, GitHub Codespaces, GitLens, GitKraken/GitHub Desktop.
- Deploy: GitHub Pages, DigitalOcean, Azure ou Heroku.
- Backend: Appwrite, Heroku, DigitalOcean, Azure ou Clerk.
- Banco de dados: MongoDB Atlas; SQLGate/PopSQL apenas se houver banco SQL.
- Autenticação: Clerk ou Appwrite Auth.
- Secrets: Doppler e 1Password.
- Observabilidade: Sentry primeiro; Datadog, New Relic ou Honeybadger se necessário.
- Testes: BrowserStack, LambdaTest, Codecov, CodeScene, DeepScan e Travis CI.
- Analytics: SimpleAnalytics; Appfigures apenas se houver app/produto que justifique.
- Feature flags: DevCycle ou ConfigCat.
- Design/UI: Polypane, Bootstrap Studio, Icons8, IconScout, Octicons e Visme.

## Regras para mudanças de arquitetura
Antes de adicionar novo serviço, biblioteca grande ou backend:

1. Explique a necessidade real.
2. Compare com as ferramentas disponíveis.
3. Verifique se existe solução estática/front-end.
4. Atualize `docs/ARCHITECTURE_DECISIONS.md`.
5. Atualize `docs/AVAILABLE_SERVICES.md` se uma nova ferramenta for aprovada.

## Segurança
Nunca commitar:

- API keys;
- tokens;
- senhas;
- arquivos `.env` reais;
- credenciais de deploy;
- dados pessoais sensíveis.

Sempre criar `.env.example` quando variáveis de ambiente forem necessárias.

## Comandos
Antes de executar comandos, inspecione `package.json` e use os scripts existentes. Se ainda não existirem, sugerir scripts padrão:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

Não inventar comando que não exista sem antes verificar o projeto.

## Entrega esperada em cada tarefa
Ao concluir qualquer tarefa, informar:

- arquivos alterados;
- o que foi implementado;
- como testar;
- riscos ou pendências;
- se algum serviço externo foi adicionado;
- se algum documento em `docs/` foi atualizado.
