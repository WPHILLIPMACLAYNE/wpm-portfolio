# DEPLOYMENT_OPTIONS.md - Opções de deploy e publicação

## Objetivo
Escolher a forma mais simples, estável e adequada para publicar o portfólio sem adicionar backend desnecessário.

## Requisitos para qualquer deploy

- domínio próprio;
- DNS configurado;
- HTTPS/SSL;
- build reproduzível;
- ambiente de preview/staging quando possível;
- assets otimizados;
- redirects se necessário;
- página 404;
- SEO técnico;
- analytics/observabilidade se definidos.

## Opção A - GitHub Pages

### Usar quando
- o site for estático;
- não houver backend;
- não houver serverless;
- o orçamento precisa ser mínimo;
- o projeto já estiver no GitHub.

### Vantagens
- simples;
- integrado ao GitHub;
- bom para portfólio estático;
- baixo custo.

### Limitações
- não é ideal para backend;
- não tem functions nativas;
- formulários e auth exigem serviços externos;
- configurações avançadas podem exigir mais trabalho.

### Recomendação
Boa escolha para primeira publicação se o site for estático.

## Opção B - Azure Static Web Apps

### Usar quando
- o site é estático, mas pode precisar de functions depois;
- você quer ambiente mais robusto;
- existe possibilidade futura de formulários/serverless;
- você quer integração com GitHub.

### Vantagens
- bom para front-end moderno;
- pode crescer para serverless;
- SSL e deploy integrados.

### Limitações
- exige configuração de conta/projeto Azure;
- pode ser mais complexo que GitHub Pages.

### Recomendação
Boa escolha para produção se houver chance de funções serverless no futuro.

## Opção C - DigitalOcean

### Usar quando
- precisar de deploy mais profissional/flexível;
- houver backend ou API depois;
- houver necessidade de controle maior de infraestrutura;
- o projeto crescer além do estático simples.

### Vantagens
- flexível;
- bom para apps e APIs;
- escala melhor para arquitetura customizada.

### Limitações
- pode exigir mais configuração;
- pode ter custo dependendo do uso.

### Recomendação
Boa escolha se o portfólio virar experiência mais pesada, com backend, storage ou app separado.

## Opção D - Heroku

### Usar quando
- houver backend Node/Express/Nest;
- houver API;
- houver webhook;
- houver processamento server-side.

### Vantagens
- bom para apps web e backend;
- deploy simples para aplicações server-side.

### Limitações
- excesso para site estático;
- pode ter custo;
- não deve ser a primeira escolha para portfólio puramente front-end.

### Recomendação
Não usar no lançamento se não houver backend.

## Escolha recomendada por cenário

| Cenário | Deploy recomendado | Backend? |
|---|---|---:|
| Portfólio estático simples | GitHub Pages | Não |
| Portfólio estático premium com possibilidade de functions | Azure Static Web Apps | Não no início |
| Portfólio com backend/API no futuro | DigitalOcean ou Azure | Talvez |
| Portfólio com app Node server-side | Heroku ou DigitalOcean | Sim |
| Área privada segura | Azure/DigitalOcean/Heroku + Clerk/Appwrite | Sim |

## Pipeline recomendado

1. Criar repositório no GitHub.
2. Criar branch `main` protegida.
3. Usar branch `develop` ou PRs para mudanças grandes.
4. Configurar build.
5. Gerar preview/staging quando possível.
6. Testar com Polypane, BrowserStack/LambdaTest e Lighthouse.
7. Configurar domínio.
8. Configurar HTTPS.
9. Configurar analytics/observabilidade se decidido.
10. Fazer deploy final.

## Variáveis de ambiente
Se o site for estático, provavelmente não haverá secrets.

Se houver integrações:

- usar `.env.example` no repositório;
- usar Doppler, GitHub Secrets ou painel do provedor para valores reais;
- nunca commitar `.env` real.

## Domínio e DNS
O domínio não aparece como ferramenta do Developer Pack. Ele deve ser comprado/gerenciado em registrador separado.

Após escolher host:

- configurar `A`, `AAAA` ou `CNAME` conforme instruções do provedor;
- decidir entre `www` e domínio raiz;
- redirecionar uma versão para a outra;
- validar HTTPS;
- adicionar Search Console após lançamento.
