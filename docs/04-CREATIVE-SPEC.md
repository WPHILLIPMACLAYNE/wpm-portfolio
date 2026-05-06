# Especificação Criativa — WPM.OS

> Direção de Arte · UX Design · Creative Development
> Autor: Wallace Phillip Maclayne (WPM)
> Versão: 1.0 — Maio 2026

---

## 1. Conceito Visual

### WPM.OS — Um Sistema Operacional Autoral

WPM.OS não é um site. É uma **máquina digital assinada** que o visitante liga, explora e habita temporariamente. O portfólio se disfarça de sistema operacional fictício — nem retro, nem futurista — mas atemporal, como se tivesse sido recuperado de um disco rígido entre 1999 e 2030.

**Palavras-chave visuais:**
- Ligar uma máquina
- Console bootando
- Sinal chegando
- Dados se organizando
- Interface respirando

**Referências emocionais (não literais):**
- O ruído azul da tela de boot do PS2
- A contenção elegante dos menus da Apple dos anos 2000
- O silêncio carregado antes de um filme começar
- A tipografia dos manuais técnicos japoneses de alta qualidade
- A luz de um monitor CRT numa sala escura às 3 da manhã

### Princípios Visuais

| Princípio | Significado |
|-----------|-------------|
| **Menos é mais tensão** | Cada elemento na tela respira. Vazio não é ausência — é espaço para o olho descansar e antecipar. |
| **Sinal, não decoração** | Scanlines, ruído, partículas não são "efeitos". São o sinal da máquina viva. |
| **Tipografia como interface** | Mono para sistema, sans para leitura. A fonte conta onde você está. |
| **Cor como orientação** | Roxo = sistema. Ciano = ação. Cinza = informação. Branco = identificação. |
| **Movimento com propósito** | Toda animação responde a uma pergunta: "o que está acontecendo agora?" |

---

## 2. Tom de Voz

### Personalidade da Interface

WPM.OS fala como uma máquina que respeita o usuário.

| Atributo | Descrição |
|----------|-----------|
| **Tom** | Técnico-poético. Preciso, mas com alma. |
| **Personalidade** | Um sistema operacional que foi criado por um artista. Sabe ser direto ("Loading modules..."), mas também contemplativo ("System ready."). |
| **Tratamento** | Você/visitante. Não "usuário", não "jogador" — a não ser dentro da metáfora do console. |
| **Humor** | Zero ironia, zero cinismo. A beleza está na seriedade do sistema. |

### Microcopy por Contexto

| Contexto | Texto |
|----------|-------|
| Boot — barra de progresso | "Initializing WPM.OS kernel..." |
| Boot — carregamento | "Loading creative modules..." |
| Boot — quase pronto | "Calibrating visual systems..." |
| Boot — conexão | "Establishing connection..." |
| Boot — identificação | "User: Wallace Phillip Maclayne" |
| Boot — acesso | "Access granted." |
| Boot — completo | "System boot complete. Loading interface..." |
| Start Screen — label superior | "WPM.OS v1.0" |
| Start Screen — título | "Interactive Portfolio System" |
| Start Screen — call to action | "PRESS START" |
| Start Screen — hint | "[ENTER] or click" |
| Console — header seção | "Select Destination" |
| Console — seção projetos | "Featured Projects" |
| Projeto — status Completed | "Completed" |
| Projeto — status In Progress | "In Progress" |
| Projeto — status Prototype | "Prototype" |
| About — header | "Character Profile" |
| Skills — header | "Power-ups" |
| Resume — header | "Save File" |
| Lab — header | "Experimental Zone" |
| Hobbies — header | "Side Quests" |
| Contact — header | "New Message" |
| Botão voltar | "BACK TO CONSOLE" |
| Skip intro | "[ SKIP INTRO ]" |
| Erro 404 | "Address not found in memory." |
| Loading página | "Reading sector..." |

### O Que o Sistema Nunca Diz
- Nada casual demais ("Hey!", "What's up?")
- Nada corporativo ("Leveraging synergies...")
- Nada fofo ou infantil
- Nada irônico ou auto-depreciativo

---

## 3. Sistema de Design Visual

### 3.1 Paleta Cromática

```
CORES PRIMÁRIAS
┌──────────────────────────────────────────────────────┐
│                                                      │
│  #050509  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Black     │
│           Fundo absoluto. A tela desligada.          │
│                                                      │
│  #EAF2FF  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  White     │
│           Texto principal. Legibilidade máxima.      │
│                                                      │
└──────────────────────────────────────────────────────┘

CORES DE SISTEMA (ACENTOS)
┌──────────────────────────────────────────────────────┐
│                                                      │
│  #6C4DFF  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Purple    │
│           Acento primário. O sistema falando.        │
│           Labels, ícones, links, divisores, glow.    │
│                                                      │
│  #74F7FF  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Cyan      │
│           Acento de ação. O que pode ser clicado.    │
│           CTAs, links ativos, destaque, glow.        │
│                                                      │
└──────────────────────────────────────────────────────┘

CORES DE SUPORTE
┌──────────────────────────────────────────────────────┐
│                                                      │
│  #071B3A  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Deep Blue │
│           Superfície alternativa. Backgrounds sutis. │
│                                                      │
│  #0D1020  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Card      │
│           Fundo de cards. Elevação mínima.           │
│                                                      │
│  #7E8797  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Gray      │
│           Texto secundário. Informação, não ação.    │
│           Labels, datas, status secundários.         │
│                                                      │
│  #0A0D14  ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  Surface   │
│           Superfície mais escura que o fundo.        │
│           Para camadas de profundidade reversa.      │
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Regra de cor:**
- Quanto mais próximo do roxo, mais "sistema"
- Quanto mais próximo do ciano, mais "ação"
- Quanto mais próximo do cinza, mais "informação"
- Preto e branco não são cores — são a tela e o texto

### 3.2 Tipografia

```
GEIST SANS — A Voz Humana
─────────────────────────
Uso: Títulos, corpo de texto, UI, labels
Pesos: Light (300), Regular (400), Medium (500), Semibold (600)

ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789

"A tipografia sans serif conecta o sistema
ao mundo humano. É a voz de Wallace,
não a voz da máquina."
─────────────────────────

GEIST MONO — A Voz do Sistema
─────────────────────────
Uso: Terminal, código, labels técnicas, status, coordenadas
Peso: Regular (400)

ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789

"A tipografia monoespaçada é o som
do sistema operacional. Cada caractere
ocupa o mesmo espaço — como dados
em memória."
─────────────────────────
```

**Escala tipográfica** (referência, não restrição):

| Nome | Tamanho | Uso |
|------|---------|-----|
| `text-[10px]` | 10px | Labels, status, versão, microcopy |
| `text-xs` | 12px | Texto secundário, botões pequenos |
| `text-sm` | 14px | Corpo de texto, descrições |
| `text-lg` | 18px | Títulos de cards |
| `text-2xl` | 24px | Títulos de seção |
| `text-3xl` | 30px | Headings principais |
| `text-5xl` | 48px | Display (Console, About) |
| `text-7xl` | 72px | Display (WPM no mobile) |
| `text-9xl` | 128px | Display (WPM no desktop) |

### 3.3 Espaçamento e Layout

```
Grid base: 80px (fundo)
Grid cards: flexível, responsivo
Padding seções: py-10 a py-12
Padding cards: p-4 a p-6
Gap menu: gap-3 (mobile) a gap-4 (desktop)
Gap projetos: gap-4

Espaço negativo é tão importante quanto conteúdo.
Quando em dúvida, adicione espaço.
```

### 3.4 Texturas e Camadas

```
CAMADA 5 — CONTEÚDO
  Texto, cards, botões, links
  z-index: conteúdo normal

CAMADA 4 — GRID DE FUNDO
  Linhas roxas a cada 80px, opacidade 2.5%
  z-index: 0, pointer-events: none

CAMADA 3 — NOISE / GRAIN
  SVG feTurbulence, opacidade 3%
  z-index: entre fundo e conteúdo

CAMADA 2 — VIGNETTE
  Radial-gradient escurecendo bordas
  z-index: 49, pointer-events: none

CAMADA 1 — SCANLINES
  Linhas horizontais a cada 4px, opacidade 4%
  z-index: 50, pointer-events: none
```

### 3.5 Efeitos de Luz

| Efeito | CSS | Uso |
|--------|-----|-----|
| Glow ciano | `text-shadow: 0 0 10px rgba(116,247,255,0.5), 0 0 30px rgba(116,247,255,0.3)` | Links ativos, CTAs, hover |
| Glow roxo | `text-shadow: 0 0 10px rgba(108,77,255,0.5), 0 0 30px rgba(108,77,255,0.3)` | Ícones, labels, hover cards |
| Glow radial | `radial-gradient(400px circle at center, rgba(108,77,255,0.06), transparent 70%)` | Hover em cards |
| Flash CRT | `brightness(10) blur(6px)` → `brightness(1) blur(0px)` | Transição de entrada |

---

## 4. Arquitetura da Experiência

### 4.1 Mapa de Telas

```
[BOOT INTRO] ──skip──→ [PRESS START] ──enter──→ [CONSOLE]
     │                       │                      │
     │                       │           ┌──────────┼──────────┐
     │                       │           │          │          │
     ▼                       ▼           ▼          ▼          ▼
  (4s auto)              (click)    Projects   About Me    Skills
                                         │
                                    [PROJECT]
                                    detalhes
```

### 4.2 Estrutura de Páginas

```
/                       Fluxo completo Boot → Start → Console
/console                Menu principal (acesso direto)
/projects/[slug]        Detalhe do projeto
/about                  Character profile
/skills                 Power-ups
/resume                 Save file
/lab                    Experimental zone
/hobbies                Side quests
/contact                New message
/settings               (MVP 3 — contraste, som, motion, performance)
/secret                 (MVP 5 — projetos NDA, easter eggs)
```

### 4.3 Jornada do Visitante (Fluxo Principal)

```
TEMPO 0s     Tela preta.
             Surge barra de progresso.
             Mensagens de boot aparecem em sequência.

TEMPO 1.5s   Botão [SKIP INTRO] aparece.

TEMPO 4s     Progresso chega a 100%.
             "Access granted."
             Tela escurece.

TEMPO 4.3s   Surge "WPM" com blur → sharp.
             Surge "Wallace Phillip Maclayne".
             "System boot complete."

TEMPO 6.5s   Transição para Start Screen.
             Efeito CRT: linha branca expande verticalmente.
             Tela revela: "WPM.OS v1.0"
             "Interactive Portfolio System"
             "PRESS START" pulsando.

AÇÃO        Visitante pressiona ENTER ou clica.

TEMPO 8s+   Console abre.
             Top bar: WPM.OS v1.0
             Grid de 7 opções de menu.
             Grid de projetos abaixo.
             Visitante explora livremente.
```

---

## 5. Componentes e Estados

### 5.1 BootIntro

| Estado | Descrição |
|--------|-----------|
| `loading` | Barra de progresso animada, mensagens de boot sequenciais, cursor piscando |
| `reveal` | Sigla WPM com blur→sharp, nome, mensagem final |
| `idle` | Aguardando callback, overlays CRT ativos |
| `skip` | Transição imediata para done |

### 5.2 PressStart

| Estado | Descrição |
|--------|-----------|
| `crt-on` | Overlay branco expandindo (0→1.2s) |
| `visible` | Conteúdo revelado com fade-in sequencial |
| `idle` | Aguardando input (ENTER ou clique) |
| `exit` | Fade-out + scale-up ao avançar |

### 5.3 ConsoleShell

| Elemento | Comportamento |
|----------|---------------|
| Top bar | Fixa, blur background, logo clicável |
| Navegação | Ícones (siglas) com label no hover (desktop) |
| Bottom bar | Fixa, nome + ano |
| Grid bg | Estático, pointer-events: none |
| CRT overlays | Sempre presentes |

### 5.4 ConsoleMenu

| Sub-componente | Comportamento |
|----------------|---------------|
| Header | Fade-in + slide-up |
| Menu items (7) | Grid responsivo, stagger animation, hover scale no ícone, glow roxo |
| Projects grid | Stagger fade-in, 1-3 colunas |
| ProjectCard | Hover levanta 4px, glow radial, borda roxa |

### 5.5 ProjectCard

| Estado | Comportamento |
|--------|---------------|
| Default | Borda sutil, fundo card |
| Hover | Elevação -4px Y, borda roxa, glow radial interno |
| Focus | Anel de foco visível (keyboard nav) |
| Tap/Active | Leve scale-down |

### 5.6 ProjectDetail

| Seção | Conteúdo |
|-------|----------|
| Hero | Gênero + ano + status, título, descrição |
| Meta | Card com Role + Stack |
| Case Study | Problema, Solução, Resultados (3 seções) |
| Links | Live Demo, GitHub, Figma, Case Study (condicionais) |
| Back | Link "BACK TO CONSOLE" |

---

## 6. Microinterações

### 6.1 Por Elemento

| Elemento | Interação | Implementação |
|----------|-----------|---------------|
| Barra de progresso | Preenchimento suave | `motion.div` width animado |
| Cursor terminal | Piscar contínuo | `animate={{ opacity: [1,0] }}` loop |
| PRESS START | Pulsação do dot | Opacity loop 1.5s |
| PRESS START | Hover scale | `whileHover={{ scale: 1.03 }}` |
| Menu ícones | Hover scale + glow | `whileHover` scale 1.1 + text-shadow |
| Menu ícones | Revela label | Opacity transition 300ms |
| ProjectCard | Hover levantar | `whileHover={{ y: -4 }}` |
| ProjectCard | Glow interno | Radial gradient opacity transition |
| Links | Hover color change | Transition 200ms ciano |
| BACK button | Hover color | Transition 200ms |

### 6.2 Transições entre Telas

| Transição | Origem → Destino | Efeito |
|-----------|-----------------|--------|
| Boot → Start | BootIntro sai, PressStart entra | Fade out / Fade in com AnimatePresence mode="wait" |
| Start → Console | PressStart sai, ConsoleShell entra | Scale up + fade out → fade in |
| Console → Projeto | Navegação Next.js | (MVP 2: reverse CRT transition) |
| Console → About | Navegação Next.js | Standard page transition |
| Qualquer → Console | Link "BACK TO CONSOLE" | Navegação padrão |

### 6.3 Efeito CRT Turn-On (detalhe técnico)

```
Fase 1 (0ms):     clip-path: inset(49.5% 0 49.5% 0)
                   filter: brightness(10) blur(6px)
                   ─── linha branca horizontal ───

Fase 2 (480ms):   clip-path: inset(0 0 0 0)
                   filter: brightness(1.3) blur(1px)
                   ─── tela cheia, ainda com bloom ───

Fase 3 (800ms):   clip-path: inset(0 0 0 0)
                   filter: brightness(1) blur(0px)
                   ─── tela normal ───
```

---

## 7. Plano de MVP

### MVP 1 — Fundação ✅ CONCLUÍDO

**Objetivo:** Navegável, belo, identidade presente.

```
✅ Boot intro com loading + reveal
✅ Start screen com CRT turn-on
✅ Console com 7 opções de menu
✅ Grid de projetos (3 mock)
✅ Página de detalhe de projeto
✅ Páginas About, Skills, Resume, Lab, Hobbies, Contact
✅ Shell persistente (top bar, bottom bar, CRT overlays)
✅ Tema escuro completo com tokens
✅ Build funcional, 11 rotas
✅ Documentação completa
```

### MVP 2 — Identidade 💭 Em planejamento

**Objetivo:** Marca forte, consistência visual.

```
□ Transição reverse CRT entre páginas
□ Cursor customizado (magnético, glow)
□ Ícones em SVG customizados (substituir siglas ASCII)
□ Partículas de fundo reativas ao mouse (canvas simples)
□ Refinamento de paleta (testar em múltiplos monitores)
□ Versão mobile do ConsoleMenu (stack vertical)
□ Loading states nas transições de página
□ Glitch controlado nos textos de sistema
□ Hover nos cards com parallax 3D sutil
```

### MVP 3 — Imersão 💭 Em planejamento

**Objetivo:** Experiência sensorial completa.

```
□ Fundo WebGL com partículas e ondas (React Three Fiber)
□ Shader de background reativo (mouse, scroll)
□ Efeito sonoro opcional (boot, hover, transição)
□ Toggle "Sound ON/OFF" e "Performance Mode"
□ Página /settings funcional
□ Animação de "leitura de disco" no loading
□ Transição estilo "entrar na tela" entre console e projetos
```

### MVP 4 — Conteúdo Real 💭 Em planejamento

```
□ Substituir dados mock por projetos reais
□ Screenshots e thumbnails de cada projeto
□ Vídeos embedados (YouTube/Vimeo) com player customizado
□ Métricas de resultado em cada case study
□ Currículo completo e atualizado
□ Depoimentos (se houver)
□ Timeline de carreira interativa
```

### MVP 5 — Polimento 💭 Em planejamento

```
□ Performance: bundle analysis, code splitting
□ Mobile: layout adaptativo completo
□ Acessibilidade: keyboard nav, screen reader, ARIA
□ SEO: metadados, sitemap, robots.txt
□ Analytics (plausible/simple analytics)
□ Deploy (Vercel)
□ Easter eggs (konami code, secret area)
□ Página /secret com projetos NDA protegidos por senha
□ Modo "Low Performance" (sem WebGL, sem partículas)
□ Feedback visual de carregamento (skeleton screens)
```

---

## 8. Riscos de UX e Mitigações

### Risco 1 — Intro irritante
**Problema:** Animação de boot de 4s pode frustrar visitantes recorrentes ou com pressa.
**Mitigação:**
- [x] Botão SKIP INTRO visível após 1.5s
- [x] Tempo total curto (6.5s até o console)
- [ ] Cookie/localStorage para pular intro em visitas subsequentes (MVP 2)

### Risco 2 — Desorientação
**Problema:** A metáfora de "sistema operacional" pode confundir visitantes que esperam um site normal.
**Mitigação:**
- [x] Labels sempre visíveis nos botões principais
- [x] "BACK TO CONSOLE" em todas as páginas internas
- [x] Top bar persistente com navegação
- [ ] Breadcrumb visual sutil (MVP 2)

### Risco 3 — Performance em dispositivos fracos
**Problema:** Scanlines contínuas, partículas e futuros shaders WebGL podem travar dispositivos antigos.
**Mitigação:**
- [x] `prefers-reduced-motion` desabilita animações
- [x] Scanlines são CSS puro (baixo custo)
- [ ] Botão "Low Performance Mode" (MVP 3)
- [ ] Detecção de GPU e fallback automático (MVP 5)

### Risco 4 — Inacessibilidade
**Problema:** Experiência visual intensa pode excluir pessoas com deficiências visuais ou vestibulares.
**Mitigação:**
- [x] Todo texto é HTML real, não imagem
- [x] Contraste adequado (texto claro sobre fundo escuro)
- [ ] Navegação completa por teclado (MVP 2)
- [ ] Atributos ARIA em todos elementos interativos (MVP 5)
- [ ] Testes com leitores de tela (MVP 5)

### Risco 5 — Mobile comprometido
**Problema:** Layout de console com grid horizontal e overlays fixos pode quebrar em telas pequenas.
**Mitigação:**
- [x] Grid responsivo (1-3 colunas)
- [x] Top bar e bottom bar com padding adaptativo
- [x] Textos com escala responsiva
- [ ] Menu mobile em drawer ou bottom sheet (MVP 2)
- [ ] Scanlines e vignette desabilitados no mobile (MVP 2)

### Risco 6 — Falta de conteúdo
**Problema:** Cards com "Projeto Exemplo 1, 2, 3" não convencem.
**Mitigação:**
- [ ] Substituir por projetos reais o quanto antes (MVP 4)
- [ ] Enquanto isso, textos mock são realistas e bem escritos
- [ ] Placeholder visualmente coerente (não "lorem ipsum" genérico)

### Risco 7 — Carga cognitiva
**Problema:** Muitas opções de menu (7 itens) podem sobrecarregar o visitante.
**Mitigação:**
- [x] Ícones (siglas) são minimalistas
- [x] Grid arejado com bastante espaço negativo
- [ ] Destaque visual para os itens mais importantes (Projects, About) (MVP 2)
- [ ] Tooltip descritivo no hover (MVP 2)

---

## 9. Especificações Técnicas de Design

### 9.1 Bordas e Cantos

```
Bordas:       border-white/[0.04] (default)
              border-wpm-purple/30 (hover)
              border-wpm-purple/50 (ativo/selecionado)

Cantos:       rounded-sm (2px) — sutil, quase imperceptível
              Nada arredondado demais. Máquina não tem cantos moles.

Divisores:    h-[1px] bg-white/[0.03] ou bg-wpm-purple/40
              Linha fina, quase ausente.
```

### 9.2 Sombras e Elevação

WPM.OS **não usa box-shadow tradicional**. Elevação é comunicada por:
- Borda mais clara
- Glow radial interno
- Movimento (Y translation no hover)
- Background ligeiramente mais claro

Isso mantém a estética "tela", não "papel flutuando".

### 9.3 Regras de Motion

| Regra | Descrição |
|-------|-----------|
| Duração máxima | 400ms para microinterações, 800ms para transições de tela |
| Easing padrão | `ease-out` (desaceleração natural) |
| Stagger delay | 50-100ms entre elementos irmãos |
| Loop máximo | 1.5-3s (pulsação de CTA) |
| Distância máxima | 20px em Y, 0 em X (movimento vertical apenas) |
| Scale máximo | 1.03-1.05 (quase imperceptível) |
| Nunca | Rotação, skew, bounce elástico, ou qualquer movimento que grite "animação!" |

---

## 10. Guia de Implementação Visual

### Antes de Codar, Responda:

1. **Este elemento é sistema ou conteúdo?**
   - Sistema → Mono, roxo, pequeno, discreto
   - Conteúdo → Sans, branco/cinza, legível, arejado

2. **Esta cor guia ou decora?**
   - Roxo e ciano só aparecem com propósito (link, destaque, status)
   - Nunca usar roxo "porque é bonito"

3. **Este movimento informa ou distrai?**
   - Se a resposta não for "informa o que está acontecendo", remova

4. **Isto funciona sem JavaScript? Sem WebGL? Sem animações?**
   - O conteúdo principal (nome, projetos, contato) deve ser acessível sempre
   - A experiência imersiva é progressiva — começa funcional, adiciona camadas

### Checklist de Implementação

```
[ ] Contraste de texto ≥ 4.5:1 (WCAG AA)
[ ] Todo texto é HTML, não imagem
[ ] Estados de foco visíveis (teclado)
[ ] prefers-reduced-motion respeitado
[ ] Skip intro funcional
[ ] Navegação principal acessível por teclado
[ ] Imagens têm alt text (quando adicionadas)
[ ] Links têm descrição clara do destino
[ ] Animações não bloqueiam interação
[ ] Nada pisca mais que 3x/segundo (risco epilético)
```

---

## 11. Referências Completas

```
PORTFÓLIOS ANALISADOS
─────────────────────
Inette               https://inette.co/
Thibaud Fellay       https://thibaud.film/
Sebastian Martinez   https://www.sebastian-martinez.com/
Sanni Sahil          https://sannisahil.com/
Robert Borghesi      https://robertborghesi.is/
Antoine Wodniack     https://wodniack.dev/
Rogier de Boevé      https://rogierdeboeve.com/

INSPIRAÇÕES ESTÉTICAS
─────────────────────
PS2 Boot Sequence    (memória afetiva, não cópia literal)
tvOS                 Parallax, blur, menus fluidos
CRT Monitors         Scanlines, glow, curvature, warm hum
Amon Tobin - ISAM    Visualização de som, partículas, escultura digital
Ryoji Ikeda          Data-verse, minimalismo matemático, preto e branco
```

---

> **Este documento é a bússola criativa do WPM.OS.**
> Qualquer decisão visual, de movimento ou de interface deve ser validada contra estes princípios.
> Atualizado a cada iteração significativa do design.
