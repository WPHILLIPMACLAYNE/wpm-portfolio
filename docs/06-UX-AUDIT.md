# UX Audit — WPM.OS

> Revisão crítica de experiência do usuário
> Data: Maio 2026
> Status: Pré-MVP 2

---

## Sumário Executivo

WPM.OS tem uma base sólida: identidade forte, navegação funcional e acessibilidade presente desde o MVP 1. O risco principal não está no que existe, mas no que **ainda não existe** — comportamentos que usuários esperam e que, se ausentes, transformam a experiência de "imersiva" para "confusa".

**Nota geral:** 7.2/10 (bom para MVP 1, com riscos mapeados e mitigações claras abaixo)

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
| P1 | Usuário que acessa `/about` diretamente (sem passar pelo fluxo) **não sabe que existe um Console** com 9 módulos. Só vê a top bar com ícones enigmáticos. | **Alta** | Adicionar um breadcrumb ou indicador visual de "Você está em: Console > About". A top bar com ícones monocromáticos não comunica hierarquia. |
| P2 | A navegação da top bar usa **ícones ASCII** (`[]`, `?`, `{}`) sem labels visíveis no mobile. Um visitante novo não tem como saber o que cada ícone significa. | **Alta** | Mobile: substituir ícones por menu hamburguer ou drawer com labels. Desktop: tooltip no hover já funciona, mas considerar labels sempre visíveis em resoluções menores. |
| P3 | "Projects" no menu redireciona para `/console` — ou seja, clicar em Projects leva ao mesmo lugar onde o usuário já está. Isso cria um loop confuso. | **Média** | Ou Projects não deveria estar na top bar quando já se está no Console, ou deveria levar para uma página de listagem de projetos diferente do Console. |

### Recomendações
1. **Breadcrumb sutil** no topo das páginas internas: `WPM.OS > About`
2. **Highlight do item ativo** na top bar (ex: se estou em `/about`, o ícone `?` fica ciano)
3. **Mobile nav drawer** com labels completas (MVP 2)

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
1. **`localStorage` "wpm-os-visited"** — se true, pula direto para Console (MVP 2)
2. Adicionar um **cookie/state** que permite re-assistir a intro se o usuário quiser (link "Replay Intro" no footer ou Settings)

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
| P9 | **Ícones ASCII não têm alternativa textual** para leitores de tela. O `aria-label` cobre o link, mas o ícone em si (`<span aria-hidden="true">[]</span>`) some completamente. Isso é correto (decorativo), mas o label do link precisa ser suficiente. | **Baixa** | Já está correto com `aria-label`. Verificar se todos os 9 links de navegação têm `aria-label` descritivo. |
| P10 | **Projetos com `locked: true` não têm indicação sonora/semântica** do motivo. O `aria-disabled` está presente, mas não há explicação do porquê está bloqueado. | **Baixa** | Adicionar `aria-describedby` apontando para uma descrição como "This project is under NDA and not publicly accessible". |
| P11 | **Falta `aria-live` para mudanças dinâmicas**. Quando o usuário pressiona ENTER no PressStart e a tela muda para Console, um leitor de tela não anuncia a transição. | **Baixa** | Adicionar `aria-live="polite"` no container do Console com uma mensagem como "Console loaded. 9 modules available." |

### Recomendações
1. **Auditar heading hierarchy** — cada página um `<h1>`, seções com `<h2>`
2. **Skip-to-content no RootLayout** (MVP 2)
3. **`aria-live` para transições de stage** (MVP 2)
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
| P15 | **Falta `next/image` para otimização de imagens**. Os `coverImage` estão vazios por enquanto, mas quando preenchidos, usar `<Image>` com `placeholder="blur"` e `loading="lazy"`. | **Média** | Implementar quando adicionar imagens reais (MVP 4). |

### Recomendações
1. Rodar **Lighthouse** após cada MVP e manter score ≥ 90
2. Implementar `next/image` com blur-up para todas imagens (MVP 4)
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
| P16 | **Top bar com 9 ícones minúsculos** lado a lado no mobile. Em tela de 375px, cada ícone tem ~30px de largura — muito pequeno para toque confiável. O guideline do WCAG recomenda 44×44px para targets de toque. | **Crítica** | Mobile: top bar colapsa para logo + menu hamburguer. Drawer com lista vertical de módulos (label + ícone). |
| P17 | **Grid 3×3 do ConsoleMenu** colapsa para 1 coluna no mobile → 9 cards empilhados verticalmente. Ocupa muito espaço de scroll. Um usuário mobile precisa rolar 4-5 telas para ver todos os módulos e projetos. | **Alta** | Mobile: grid 2×5 (2 colunas). Cards mais compactos (padding reduzido, fonte menor). Ou: tabs horizontais para categorias. |
| P18 | **ESC para voltar** não existe no mobile. Não há gesto equivalente. O usuário mobile depende do link "BACK TO CONSOLE". | **Média** | Adicionar botão "BACK" fixo no canto inferior (floating action button) no mobile. Ou: usar gesto de swipe (complexo, MVP 5). |
| P19 | **Scanlines fixas** em tela pequena criam um padrão repetitivo que pode ser visualmente incômodo em movimento (scroll). | **Baixa** | Desabilitar scanlines no mobile (já está no CSS `prefers-reduced-motion`, mas nem todo mobile tem isso ativo). Adicionar media query `max-width: 640px`. |
| P20 | **PressStart "PRESS START"** em mobile: o texto "PRESS START" pode ser pequeno demais em telas ≤ 375px. | **Baixa** | Ajustar `text-3xl` → `text-2xl` no mobile. |

### Recomendações
1. **Menu hamburguer mobile** com drawer animado (MVP 2 prioritário)
2. **Touch targets ≥ 44px** em todos elementos interativos (MVP 2)
3. **Grid 2 colunas no mobile** para o ConsoleMenu
4. **Floating "BACK" button** no mobile (MVP 2)
5. **Desabilitar scanlines no mobile** via media query

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
| P21 | O **3D tilt no hover** do ConsoleMenu é bonito mas pode causar **cinetose** (motion sickness) em pessoas sensíveis a movimento de perspectiva. O efeito é sutil (8° max), mas o risco existe. | **Média** | Reduzir tilt máximo para 4°. Ou: desabilitar tilt e manter só o glow no hover quando `prefers-reduced-motion` não estiver ativo mas o usuário estiver em mobile (onde o tilt é irrelevante porque não há hover). |
| P22 | **Stagger animations cumulativas**: Boot tem stagger nas mensagens (5 itens), PressStart tem stagger (4 itens), ConsoleMenu tem stagger (9 módulos + N projetos). O efeito acumulado de "coisas aparecendo em sequência" pode cansar. | **Média** | Reduzir delay do stagger. Atual: 50-80ms por item. Sugestão: 30-40ms. Ou: agrupar itens em "blocos" que aparecem juntos. |
| P23 | A **transição entre Boot → Start → Console** já é sequencial por natureza (stage machine). Não há risco de "excesso" aqui, mas a soma dos tempos (4.5s boot + 1.2s CRT + reaction) cria uma espera total de ~6-7s até o conteúdo útil aparecer. | **Média** | Skip intro + localStorage resolve para revisitantes. Para primeira visita, o tempo é aceitável como "experiência". |

### Recomendações
1. Reduzir tilt 3D de 8° para 4° (MVP 2)
2. Stagger: 30ms entre itens em vez de 50-80ms (MVP 2)
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
| P24 | **Textos em `text-[10px]` e `text-[9px]`** são frequentes (labels, status, tipo de módulo, versão). Em telas de alta densidade (Retina) são legíveis. Em telas 1080p de 13-14" podem ficar **muito pequenos**. | **Alta** | Aumentar tamanho mínimo para `text-[11px]` (≈ 11px). Nunca usar `text-[9px]`. Testar em monitor 1080p 14". |
| P25 | **Tracking muito aberto** em textos pequenos (`tracking-[0.3em]`, `tracking-[0.4em]`, `tracking-widest`) reduz a legibilidade. Quanto menor o texto, menos tracking ele deveria ter. | **Média** | Reduzir tracking em textos < 12px para `tracking-wider` (0.05em) ou `tracking-normal`. |
| P26 | **Descrições de módulo no ConsoleMenu** ("Featured work and case studies", "Character profile, bio and story") são informativas mas poderiam ser **mais curtas e escaneáveis**. | **Baixa** | Limitar descrições a 6-8 palavras. Ex: "Case studies and live demos" em vez de "Featured work and case studies". |
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
| P30 | **Projetos não têm thumbnail**. O campo `coverImage` existe mas está vazio. Cards sem imagem são genéricos — especialmente num portfólio visual. | **Média** | Adicionar placeholder visual (gradiente com a `accentColor` do projeto) até ter imagens reais. Um card com cor é mais memorável que um card cinza. |

### Recomendações
1. **Projetos PRIMEIRO, módulos depois** no layout do Console (MVP 2)
2. **Placeholder visual com `accentColor`** em cards sem imagem (MVP 2)
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
| P32 | **Sem formulário de contato**. Email é `mailto:` — funciona, mas é menos conveniente que um formulário (especialmente no mobile, onde `mailto:` pode abrir um app que o usuário não usa). | **Média** | Adicionar formulário simples (nome, email, mensagem) via API route do Next.js + Email API (Resend, SendGrid) — MVP 4. |
| P33 | **LinkedIn link é `#`** (placeholder). Se um recrutador clicar e não funcionar, perde-se uma oportunidade. | **Crítica** | Preencher com link real ANTES de qualquer deploy público. |
| P34 | **Email é `wallace@example.com`** (placeholder). | **Crítica** | Substituir por email real. |

### Recomendações
1. **CTA no Console**: "Open to work · [Contact →]" (MVP 2)
2. **Preencher links reais** de GitHub, LinkedIn e email antes do deploy
3. **Formulário de contato** com API route (MVP 4)

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

### Bloqueantes (não deployar sem resolver)

```
[ ] P4  — localStorage para pular intro em visitas recorrentes
[ ] P16 — Menu mobile com targets de toque ≥ 44px
[ ] P33 — LinkedIn link real (não #)
[ ] P34 — Email real (não example.com)
[x] P7  — Skip-to-content link funcional em todas as páginas
[ ] P24 — Tamanho mínimo de fonte ≥ 11px
```

### Alta Prioridade (resolver no MVP 2)

```
[ ] P1  — Indicador de localização atual (breadcrumb ou highlight)
[x] P28 — Projetos mais proeminentes que módulos no layout
[x] P31 — CTA de contato no Console
[ ] P17 — Grid 2 colunas no mobile para ConsoleMenu
[x] P8  — Consistência de heading hierarchy
```

### Média Prioridade (MVP 2-3)

```
[ ] P3  — Corrigir loop "Projects → /console"
[ ] P18 — Botão BACK flutuante no mobile
[ ] P21 — Reduzir tilt 3D de 8° para 4°
[ ] P22 — Stagger delay reduzido para 30ms
[ ] P25 — Reduzir tracking em textos pequenos
[ ] P30 — Placeholder visual com accentColor nos cards
[ ] P32 — Formulário de contato
```

### Baixa Prioridade (MVP 4-5)

```
[ ] P10 — aria-describedby para projetos locked
[ ] P11 — aria-live para transições de stage
[ ] P14 — Monitorar layoutId performance
[ ] P19 — Desabilitar scanlines no mobile
[ ] P26 — Encurtar descrições de módulo
[ ] P35 — Easter eggs e interações escondidas
[ ] P36 — Microinterações de idle
```

### Verificações Técnicas

```
[ ] Lighthouse Performance ≥ 90
[x] Lighthouse Accessibility ≥ 95
[ ] Lighthouse Best Practices ≥ 90
[ ] Lighthouse SEO ≥ 90
[ ] Teste com teclado (Tab, Enter, Esc, setas)
[ ] Teste com NVDA ou VoiceOver
[ ] Teste em iPhone SE (375px) e iPad (768px)
[ ] Teste em Chrome, Firefox, Safari
[ ] Teste com slow 3G throttling
[ ] next/image em todas imagens
[x] Metadados OG para compartilhamento social
[x] Sitemap.xml e robots.txt
[ ] SSL/HTTPS no deploy
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
