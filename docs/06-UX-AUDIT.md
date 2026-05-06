# UX Audit — WPM.OS

> Revisão crítica de experiência do usuário
> Data: Maio 2026
> Status: Fechamento técnico local em 2026-05-06. Itens externos continuam bloqueados por decisão/aprovação.

---

## Sumário Executivo

WPM.OS tem uma base sólida: identidade forte, navegação funcional e acessibilidade presente desde o MVP 1. O risco principal não está no que existe, mas no que **ainda não existe** — comportamentos que usuários esperam e que, se ausentes, transformam a experiência de "imersiva" para "confusa".

**Nota geral:** 8.4/10 após hardening local. O que falta para publicação real não é correção de código bloqueante, e sim decisão de produto/infra: email público, formulário/provedor, deploy/SSL, CI e testes manuais assistivos/cross-browser.

---

## 1. Clareza da Navegação

### Estado atual
```
Home → Press Start → Console (9 módulos)
                     ├── Projects → [slug]
                     ├── About, Skills, Resume...
                     └── Contact

Boot completo: disponivel via replay, sem bloquear o primeiro paint.
```

### O que funciona
- [x] Top bar persistente em todas as páginas internas
- [x] "BACK TO CONSOLE" visível em todas as subpáginas
- [x] ESC volta ao Console
- [x] Setas do teclado navegam no grid de módulos

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P1 | **Resolvido em 2026-05-06.** Páginas internas agora exibem contexto de rota na top bar (`WPM.OS / seção`) e destacam o item ativo. | **Alta** | Fechado em `ConsoleShell` e `StaticConsoleShell`. |
| P2 | **Resolvido em 2026-05-06.** Mobile usa drawer com labels completos, foco contido e targets de toque >= 44px. | **Alta** | Fechado em `MobileNavDrawer` e `ConsoleShell`. |
| P3 | **Resolvido.** `Project Library` aponta para `/projects`, não para `/console`. | **Média** | Página de listagem preservada como rota real. |

### Recomendações
1. Breadcrumb/contexto sutil concluído.
2. Highlight do item ativo concluído.
3. Mobile nav drawer concluído.

---

## 2. Risco da Intro Irritar Usuários

### Estado atual
- Primeira visita abre direto em Press Start para preservar LCP.
- Boot/reveal fica disponivel via replay no Console.
- Visitantes recorrentes ainda podem ir direto ao Console via `localStorage`.

### O que funciona
- [x] Botão SKIP INTRO visível desde o início
- [x] `prefers-reduced-motion` pula tudo
- [x] Tempo total abaixo de 6s (aceitável para primeira visita)

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P4 | **Resolvido em 2026-05-06.** A intro nao bloqueia mais a primeira tela e visitantes recorrentes podem pular para o Console via `localStorage`. | **Crítica** | Manter replay manual para quem quiser assistir a intro completa. |
| P5 | A intro não tem **indicador de progresso restante**. O usuário vê a barra, mas não sabe se faltam 2s ou 10s. | **Baixa** | Mostrar porcentagem ou "3... 2... 1..." ao final. Ou, mais elegante: a barra de progresso por si já comunica — e está funcionando. Manter. |
| P6 | Se o usuário entra pela primeira vez e clica SKIP imediatamente, ele **perde o impacto da marca**. Mas se for forçado a assistir, se irrita. O equilíbrio atual (skip sempre visível) está bom. | **Baixa** | Manter como está. O skip resolve o problema de visitantes impacientes. |

### Recomendações
1. `localStorage` `wpm-os-visited` concluído.
2. Replay manual concluído no footer do Console.

---

## 3. Acessibilidade

### Estado atual (MVP 1)
- [x] `prefers-reduced-motion` respeitado
- [x] Navegação por teclado: ENTER, ESC, setas
- [x] Skip intro visível
- [x] `focus-visible:ring` em elementos interativos
- [x] Contraste texto/fundo ≥ 4.5:1
- [x] `aria-label` em links e elementos interativos

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P7 | **Resolvido em 2026-05-05.** Skip-to-content global no `RootLayout`, com alvo `#main-content` focável no Shell e nos estágios iniciais da Home antes do Shell montar. | **Alta** | Fechado por correção cirúrgica em `src/app/layout.tsx`, `src/app/page.tsx` e `src/components/console/ConsoleShell.tsx`. |
| P8 | **Heading hierarchy inconsistente**. A página `/console` tinha `<h1>Console</h1>`, `/about` tinha `<h1>Wallace Phillip Maclayne</h1>`, e a Home não garantia H1 em todos os estágios antes do console. | **Média** | **Resolvido em 2026-05-05 (P8/P8B).** Home coberta em `boot/loading`, `boot/reveal`, `press-start` e console; `/console` ganhou H1 `sr-only`; `/about` virou `About Wallace Phillip Maclayne`; `/contact` virou `Contact`; demais rotas verificadas com exatamente um `<h1>` descritivo da view. |
| P9 | **Verificado.** Ícones decorativos continuam com links/botões nomeados por `aria-label` ou texto visível. | **Baixa** | Coberto por revisão de código e E2E de contato/navegação. |
| P10 | **Resolvido em 2026-05-06.** Estados locked/coming-soon receberam descrição semântica quando renderizados como controles indisponíveis. | **Baixa** | Fechado em `MenuModule` e `MobileNavDrawer`. |
| P11 | **Resolvido em 2026-05-06.** Transições da Home anunciam estado via `aria-live="polite"`. | **Baixa** | Fechado em `src/app/page.tsx`. |

### Recomendações
1. **Auditar heading hierarchy** — cada página um `<h1>`, seções com `<h2>`
2. **Skip-to-content no RootLayout** (MVP 2)
3. `aria-live` para transições de stage concluído.
4. **Testar com NVDA ou VoiceOver** antes do deploy (MVP 5)

---

## 4. Performance

### Estado atual
- [x] Build com 11 rotas, todas compilando limpo
- [x] Sem imagens pesadas (ainda)
- [x] Animações GPU-accelerated (transform + opacity)
- [x] WebGL com dynamic import (ssr: false)
- [x] Mobile detection para reduzir partículas

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P12 | **Scanlines e vignette são renderizadas em TODAS as páginas, o tempo todo**, mesmo quando invisíveis (ex: atrás do overlay preto da intro). São CSS puro (barato), mas 2 elementos fixos com `z-index` e `pointer-events: none` consomem camadas de composição. | **Baixa** | Já é CSS barato. Só otimizar se o Lighthouse mostrar composite layer excess. |
| P13 | **Sem lazy loading de rotas**. Todas as 10 rotas são estáticas e pré-renderizadas. Para um portfólio pequeno isso é ótimo. Se crescer para 30+ projetos, considerar `dynamic` para páginas de detalhe. | **Baixa** | OK para MVP 1-4. Revisitar no MVP 5. |
| P14 | **Motion `layoutId` no ConsoleMenu** (focus-ring animado) pode causar layout thrashing se houver muitos elementos animados simultaneamente. | **Baixa** | Está isolado a 1 elemento por vez. Monitorar. |
| P15 | **Resolvido para as imagens reais atuais.** Cards e detalhes usam `next/image`; capa do livro ganhou variantes WebP/JPG otimizadas. | **Média** | Futuras mídias devem seguir o mesmo padrão. |

### Recomendações
1. Rodar **Lighthouse** após cada MVP e manter score ≥ 90
2. `next/image` implementado nas imagens reais atuais.
3. Adicionar `loading.tsx` com skeleton screen por rota (MVP 5)

---

## 5. Mobile

### Estado atual
- [x] Grid responsivo (1→2→3 colunas)
- [x] Textos com escala responsiva
- [x] WebGL reduz partículas no mobile
- [x] Sem hover effects dependentes de cursor (tudo funciona com tap)

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P16 | **Resolvido.** Top bar mobile colapsa para botão `MODULES` com drawer e alvos >= 44px. | **Crítica** | Fechado em `ConsoleShell` e `MobileNavDrawer`. |
| P17 | **Resolvido.** O grid antigo foi substituído por vitrine de projetos + ribbon de módulos em 2 colunas no mobile. | **Alta** | Fechado em `ConsoleMenu` e `ConsoleModuleRibbon`. |
| P18 | **Resolvido em 2026-05-06.** Páginas internas têm botão fixo `Back` no mobile além do link superior. | **Média** | Fechado em shells de página. |
| P19 | **Resolvido em 2026-05-06.** Scanlines são desligadas em telas <= 640px; vignette fica mais leve. | **Baixa** | Fechado em `globals.css`. |
| P20 | **Resolvido.** PressStart usa escala responsiva e rótulos mínimos de 11px. | **Baixa** | Validado por E2E mobile. |

### Recomendações
1. Drawer mobile concluído.
2. Touch targets principais >= 44px concluídos.
3. Ribbon de módulos em 2 colunas no mobile concluída.
4. Botão fixo `Back` no mobile concluído.
5. Scanlines mobile desabilitadas.

---

## 6. Excesso de Animação

### Estado atual
- Boot: loading bar + mensagens + blur reveal + fade out
- Press Start: CRT turn-on + fade-in stagger
- Console: stagger grid + hover 3D tilt + focus ring animado
- Páginas internas: PageTransition fade+slide

### O que funciona
- [x] `prefers-reduced-motion` desabilita tudo
- [x] Animações são rápidas (≤ 400ms micro, ≤ 900ms macro)
- [x] Sem loop infinito (exceto cursor blink e dot pulsante — aceitável)

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P21 | **Resolvido em 2026-05-06.** Tilt de entrada/efeitos de perspectiva foi reduzido para 4° nos cards destacados. | **Média** | `prefers-reduced-motion` segue removendo animação. |
| P22 | **Resolvido em 2026-05-06.** Delays de stagger foram reduzidos nos módulos/preview para ~30-40ms. | **Média** | Mantém ritmo sem fila longa de animações. |
| P23 | A **transição entre Boot → Start → Console** já é sequencial por natureza (stage machine). Não há risco de "excesso" aqui, mas a soma dos tempos (4.5s boot + 1.2s CRT + reaction) cria uma espera total de ~6-7s até o conteúdo útil aparecer. | **Média** | Skip intro + localStorage resolve para revisitantes. Para primeira visita, o tempo é aceitável como "experiência". |

### Recomendações
1. Tilt 3D reduzido.
2. Stagger reduzido.
3. Oferecer toggle "Reduce Motion" explícito (MVP 3 — Settings)

---

## 7. Legibilidade

### Estado atual
- [x] Texto claro sobre fundo escuro (contraste OK)
- [x] Tamanhos de fonte responsivos
- [x] Line-height adequado (`leading-relaxed`)

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P24 | **Resolvido em 2026-05-06.** Não há mais `text-[8px]`, `text-[9px]` ou `text-[10px]` no app. | **Alta** | Mínimo prático elevado para 11px. |
| P25 | **Resolvido em 2026-05-06.** Tracking muito aberto em rótulos pequenos foi reduzido para valores mais legíveis. | **Média** | `rg` confirma ausência de `tracking-[0.3em+]` nos textos do app. |
| P26 | **Resolvido.** Descrições dos módulos já estão curtas e escaneáveis. | **Baixa** | Ex.: "Case studies and live demos". |
| P27 | **Projetos de exemplo** (WPM.OS, Aurora, Nebulae, CodeMesh) têm textos longos (150-300 palavras por seção). Na página de detalhe, isso é desejável. Mas no card (ProjectCartridge), o `subtitle` é a única descrição visível — precisa ser impactante e curto. | **Baixa** | OK. Subtitles atuais estão bons ("Interactive Portfolio System", "Design System & Component Library"). |

### Recomendações
1. **Tamanho mínimo de fonte: 11px** em qualquer lugar do site
2. **Reduzir tracking** em textos abaixo de 12px
3. **Encurtar descrições de módulo** para melhor escaneabilidade

---

## 8. Hierarquia dos Projetos

### Estado atual
- Projects é um dos 9 módulos no Console
- Abaixo do grid de módulos, há uma seção "Featured Projects" com ProjectCartridges
- `featured: true` → badge "FEATURED" + prioridade no grid
- Projetos com `locked: true` → opacidade reduzida, sem link

### O que funciona
- [x] Separação visual entre módulos (em cima) e projetos (embaixo)
- [x] Badge FEATURED diferencia projetos prioritários
- [x] Locked projects visualmente distintos

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P28 | **Resolvido em 2026-05-05.** Projetos estavam escondidos atrás do módulo `Project Library`; agora o Console abre com uma vitrine fixa de trabalhos reais antes do preview de módulos. | **Alta** | Fechado em `ConsoleMenu`: zona principal virou `FeaturedWorkShowcase` com 2 cases reais, link para biblioteca completa e preview de módulo rebaixado para apoio. |
| P29 | **Quatro projetos no grid**, mas só 3 são featured. O quarto (CodeMesh) é `featured: false` mas `locked: false`. Ele aparece no grid normalmente. A diferença visual entre featured e não-featured é apenas um badge sutil — visitante pode não notar. | **Baixa** | Se um projeto não é featured, movê-lo para uma seção "More Projects" ou "Archive" abaixo. Ou: aumentar o contraste visual de featured (card ligeiramente maior, borda mais visível). |
| P30 | **Resolvido.** Cards sem imagem usam fallback visual com `accentColor`; o projeto do livro usa assets WebP/JPG otimizados. | **Média** | Padrão preservado em `ProjectCartridge` e dados de projeto. |

### Recomendações
1. **Projetos PRIMEIRO, módulos depois** no layout do Console (MVP 2)
2. Placeholder visual com `accentColor` concluído.
3. **Seção "More Projects"** para projetos não-featured (MVP 4)

---

## 9. Chamadas para Contato

### Estado atual
- Contact é o 7º módulo no grid do Console
- Página `/contact` tem 3 cards: GitHub, LinkedIn, Email
- Links sociais também na página About
- Sem formulário de contato

### O que funciona
- [x] Links de contato centralizados e visuais
- [x] GitHub como opção primária (coerente com público-alvo dev)

### Problemas

| # | Problema | Severidade | Solução |
|---|----------|-----------|---------|
| P31 | **Resolvido em 2026-05-05.** O Console agora tem CTA persistente de contato logo abaixo da vitrine de trabalhos reais. | **Alta** | Fechado em `ConsoleMenu` com `ConsoleContactCta`: mensagem curta de colaboração + link direto para `/contact`. |
| P32 | **Bloqueado por decisão externa.** Formulário exige provedor de email/API, privacidade e possivelmente segredo; não será ativado sem aprovação. | **Média** | Manter GitHub/LinkedIn públicos até decisão de serviço. |
| P33 | **Resolvido.** LinkedIn real preenchido em `profile.social.linkedin`. | **Crítica** | `https://www.linkedin.com/in/wpmaclayne/`. |
| P34 | **Parcial / decisão do autor.** Não existe mais `wallace@example.com`, mas nenhum email público foi escolhido. O link de email é omitido enquanto vazio. | **Crítica** | Antes do deploy público, Wallace deve aprovar um email público ou decidir manter só GitHub/LinkedIn. |

### Recomendações
1. **CTA no Console**: "Open to work · [Contact →]" (MVP 2)
2. GitHub e LinkedIn reais concluídos; email público depende de decisão do autor.
3. Formulário depende de serviço externo aprovado via `docs/AVAILABLE_SERVICES.md`.

---

## 10. Memorabilidade vs Usabilidade

### O paradoxo
O WPM.OS quer ser memorável (intro cinematográfica, estética de console, partículas, CRT) E usável (navegação clara, contato acessível, leitura confortável). Esses dois objetivos frequentemente colidem.

### O que o projeto acerta
- A metáfora do "console" é **consistente** — não é só decoração, ela estrutura toda a navegação
- A intro é **curta o suficiente** (4.5s) para não perder visitantes
- O skip é **sempre visível** — respeita quem tem pressa
- A identidade visual é **autoral sem ser hermética** — um recrutador entende que é um portfólio, mesmo sem entender a referência PS2

### O que pode melhorar

| # | Problema | Solução |
|---|----------|---------|
| P35 | A experiência é **linear demais** (Boot → Start → Console → Subpágina). Falta a sensação de "exploração" que um console de verdade proporciona. | Adicionar **easter eggs** e interações escondidas: hover prolongado revela detalhes, combinação de teclas abre áreas secretas, clique duplo no logo reseta a intro. Isso transforma a experiência de "assistir" para "descobrir". (MVP 5) |
| P36 | O Console é **estático** — uma grade de 9 cards. Não há sensação de "sistema vivo". | Adicionar **microinterações de idle**: após 30s sem interação, partículas mudam de cor, um texto sutil aparece ("Awaiting input..."), ou o cursor pisca em algum lugar. (MVP 3) |
| P37 | **Nenhuma surpresa após a intro**. O momento "wow" acontece nos primeiros 6 segundos. Depois disso, é navegação padrão. | Adicionar **momentos de encantamento distribuídos**: transição ReverseCrtTransition ao entrar em projetos, hover que revela detalhes escondidos nos cards, loader customizado com a estética do sistema. (MVP 2-3) |

---

## Checklist Pré-Deploy

### Fechado no working tree

```
[closed] P1, P3, P4, P7, P8, P10, P11, P16, P17, P18, P19, P20, P21, P22, P24, P25, P26, P28, P30, P31, P33
[closed] next/image nas imagens reais atuais
[closed] metadados OG, sitemap.xml e robots.txt
[closed] lint, typecheck, build, export GitHub Pages, npm audit e E2E local
```

### Bloqueado por decisão/aprovação

```
[blocked-owner] P34 — escolher email público ou manter contato só por GitHub/LinkedIn
[blocked-service] P32 — formulário de contato exige provedor, privacidade e secrets
[blocked-deploy] SSL/HTTPS/deploy real dependem de aprovação para ativar GitHub Pages/host/CI
[blocked-manual] NVDA/VoiceOver, Safari/Firefox real, iPhone/iPad físicos e slow 3G manual ainda precisam ser executados fora do E2E local
```

### Backlog intencional / não bloqueante

```
[deferred] P14 — monitorar performance se o layoutId/focus animation voltar a crescer
[deferred] P35 — easter eggs e interações escondidas
[deferred] P36 — microinterações de idle
[deferred] P37 — momentos extras de encantamento
[deferred] Lighthouse mobile /console abaixo de 90 é tradeoff conhecido da experiência console; home mobile ficou acima de 90 na auditoria profissional
```

### Hardening 2026-05-06

Resolvido nesta rodada:

- CTAs externos sem `<button>` aninhado dentro de `<a>`.
- Home mobile com titulo do PressStart contido no viewport.
- WebGL da Home adiado para o Console, reduzindo carga inicial do boot/start.
- Contraste reforcado em textos pequenos, chips e metadados visuais.
- Headers de seguranca e SEO tecnico adicionados via App Router/Next config.
- Artefatos internos e screenshots de QA removidos do pacote publico.

---

## Resumo Gráfico

```
                    CRITICIDADE DOS PROBLEMAS
                    
Crítica   ████████░░  P4 (revisitantes)  P16 (mobile touch)  
          ████████░░  P33 (LinkedIn)     P34 (email)         
                                                            
Alta      ██████░░░░  P1  (breadcrumb)   P28 (hierarquia)   
          ██████░░░░  P17 (grid mobile)  P24 (fonte 9px)    
          ██████░░░░  P31 (CTA contato)  P7  (skip link)    
          ██████░░░░  P8  (headings)                        
                                                            
Média     ████░░░░░░  P21 (tilt 3D)      P22 (stagger)      
          ████░░░░░░  P25 (tracking)     P30 (placeholder)  
          ████░░░░░░  P18 (back mobile)  P3  (loop projects)
          ████░░░░░░  P32 (formulário)                      
                                                            
Baixa     ██░░░░░░░░  P10 (aria)         P11 (aria-live)    
          ██░░░░░░░░  P19 (scanlines)    P26 (descrições)   
          ██░░░░░░░░  P35 (easter eggs)  P36 (idle anim)    
```

---

> **Regra de ouro:** Experiência imersiva não pode ser experiência invasiva. O visitante deve poder chegar ao conteúdo em ≤ 3s na segunda visita, ≤ 6s na primeira. Toda animação deve ter um propósito. Todo elemento interativo deve ser óbvio. Todo texto deve ser legível.
