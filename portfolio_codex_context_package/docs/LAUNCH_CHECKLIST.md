# LAUNCH_CHECKLIST.md - Checklist de lançamento do portfólio

## Fundação
- [ ] O projeto roda localmente.
- [ ] `npm install` funciona.
- [ ] Script de desenvolvimento funciona.
- [ ] Script de build funciona.
- [ ] Script de preview funciona, se existir.
- [ ] Estrutura de pastas está clara.
- [ ] Componentes principais estão organizados.

## Conteúdo
- [ ] Nome e título profissional estão corretos.
- [ ] Bio/apresentação está clara.
- [ ] Projetos/cases estão organizados.
- [ ] Serviços/habilidades estão listados.
- [ ] Contato está fácil de encontrar.
- [ ] Links sociais funcionam.
- [ ] Não há textos placeholder em produção.

## UI/UX
- [ ] Hero está forte e claro.
- [ ] Hierarquia tipográfica está consistente.
- [ ] Espaçamentos estão consistentes.
- [ ] Navegação está clara.
- [ ] CTAs estão visíveis.
- [ ] Estados de hover/focus estão definidos.
- [ ] 404 customizada existe.

## Responsividade
- [ ] Desktop testado.
- [ ] Tablet testado.
- [ ] Mobile testado.
- [ ] Safari mobile testado.
- [ ] Chrome Android testado.
- [ ] Layout não quebra em telas pequenas.
- [ ] Interações funcionam em touch.

## Motion
- [ ] Animações não atrapalham leitura.
- [ ] Animações têm duração/easing consistentes.
- [ ] `prefers-reduced-motion` é respeitado.
- [ ] Não há scroll-jank perceptível.
- [ ] Loader, se existir, não prende o usuário.

## Performance
- [ ] Imagens otimizadas.
- [ ] Vídeos comprimidos, se existirem.
- [ ] Fontes otimizadas.
- [ ] Lazy loading usado quando adequado.
- [ ] Bundle revisado.
- [ ] Lighthouse executado.
- [ ] Performance mobile aceitável.

## SEO
- [ ] Title configurado.
- [ ] Meta description configurada.
- [ ] Canonical configurado, se aplicável.
- [ ] Open Graph configurado.
- [ ] Twitter card configurado.
- [ ] Favicon configurado.
- [ ] Sitemap configurado, se aplicável.
- [ ] Robots configurado, se aplicável.
- [ ] Headings em ordem lógica.
- [ ] Alt text nas imagens importantes.

## Acessibilidade
- [ ] Navegação por teclado funciona.
- [ ] Foco visível.
- [ ] Contraste aceitável.
- [ ] Botões/links têm nomes acessíveis.
- [ ] Não há `aria` desnecessário ou errado.
- [ ] Conteúdo importante não depende apenas de animação, cor ou mouse.

## Segurança
- [ ] `.env` real não está no repositório.
- [ ] `.env.example` existe se houver variáveis.
- [ ] Secrets estão em Doppler, 1Password, GitHub Secrets ou provedor.
- [ ] Não há API keys no client-side.
- [ ] Dependências sem alertas críticos conhecidos.

## Testes e qualidade
- [ ] Testado no Polypane.
- [ ] Testado no BrowserStack ou LambdaTest.
- [ ] Testado em Chrome.
- [ ] Testado em Firefox.
- [ ] Testado em Safari.
- [ ] Erros de console revisados.
- [ ] Links quebrados revisados.
- [ ] 404 testada.

## Deploy
- [ ] Host escolhido.
- [ ] Comando de build documentado.
- [ ] Pasta de saída documentada.
- [ ] Variáveis de ambiente configuradas no provedor.
- [ ] Deploy de preview testado.
- [ ] Deploy de produção feito.
- [ ] HTTPS funcionando.
- [ ] Domínio raiz funcionando.
- [ ] `www` redirecionando corretamente, se aplicável.

## Pós-lançamento
- [ ] Google Search Console configurado.
- [ ] SimpleAnalytics configurado, se decidido.
- [ ] Sentry configurado, se decidido.
- [ ] Backup do repositório ok.
- [ ] README atualizado.
- [ ] Próximas melhorias registradas como issues.
