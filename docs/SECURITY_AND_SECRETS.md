# SECURITY_AND_SECRETS.md - Segurança, credenciais e dados sensíveis

## Regra principal
Nenhuma credencial real deve ser escrita no código, em markdown público, em screenshots ou em commits.

## Nunca commitar

- `.env` real;
- API keys;
- tokens de deploy;
- token do GitHub;
- senha de banco;
- credenciais SMTP;
- secret de webhook;
- chaves privadas;
- dados pessoais de clientes;
- materiais privados/NDA.

## Ferramentas preferenciais

### Doppler
Usar para gerenciar variáveis de ambiente por ambiente:

- development;
- staging;
- production.

### 1Password
Usar para guardar:

- senhas de provedores;
- credenciais de domínio;
- tokens pessoais;
- logins de painel;
- chaves que não precisam ficar no repositório.

### GitHub Secrets
Usar para CI/CD quando necessário.

### Secrets do provedor
Usar em Azure, DigitalOcean, Heroku ou outro host para variáveis de produção.

## `.env.example`
Sempre que existir variável de ambiente, criar ou atualizar `.env.example`:

```bash
PUBLIC_SITE_URL=
PUBLIC_ANALYTICS_ID=
SENTRY_DSN=
CONTACT_EMAIL=
```

Não colocar valores reais.

## Variáveis públicas vs privadas
Variáveis expostas ao browser não são segredo.

Exemplos de variáveis públicas:
- URL pública do site;
- ID público de analytics;
- DSN público do Sentry, quando aplicável.

Exemplos de variáveis privadas:
- API key secreta;
- token de banco;
- senha SMTP;
- secret de webhook;
- token de autenticação.

## Front-end não protege segredo
Nunca colocar segredo em JavaScript client-side. Tudo que vai para o navegador pode ser visto pelo usuário.

## Área privada
Se houver área privada, não proteger apenas escondendo conteúdo no front-end.

Para proteção real, usar:

- Clerk ou Appwrite Auth;
- rota protegida server-side/serverless;
- storage privado;
- links assinados se houver arquivos;
- logs mínimos de acesso se for NDA.

## Formulários
Para formulário de contato com envio real:

- não expor credenciais de e-mail;
- usar função serverless/backend;
- validar input;
- limitar spam;
- usar captcha ou honeypot se necessário;
- não salvar dados sem necessidade.

## Analytics e privacidade
Se usar analytics:

- preferir SimpleAnalytics;
- evitar coleta desnecessária;
- adicionar política de privacidade se houver cookies, rastreamento ou coleta de dados.

## Dependências
Antes de adicionar dependência:

- verificar necessidade;
- avaliar tamanho no bundle;
- verificar manutenção;
- evitar duplicar função já existente;
- documentar em `ARCHITECTURE_DECISIONS.md` se for grande.

## Checklist de segurança antes do deploy

- [ ] `.env` real não está no Git.
- [ ] `.gitignore` cobre `.env`, logs e arquivos temporários.
- [ ] Tokens foram guardados em Doppler/1Password/provedor.
- [ ] Não há credenciais em screenshots/documentação.
- [ ] Formulários não expõem secrets.
- [ ] Área privada, se existir, usa autenticação real.
- [ ] Dependências não têm alertas críticos conhecidos.
- [ ] O site usa HTTPS.
- [ ] Headers básicos foram configurados quando possível.
