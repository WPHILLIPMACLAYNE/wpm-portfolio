# 03 — Briefing Criativo

> Documento de direção criativa do WPM.OS — conceito, arte, referências e design system.

---

## Conceito Central

### WPM.OS — Interactive Portfolio System

**Premissa:**
O visitante acessa uma máquina digital abstrata criada por Wallace Phillip Maclayne. Essa máquina liga, carrega sua marca WPM, abre uma interface de seleção inspirada em consoles, sistemas operacionais antigos, menus de jogo e computadores experimentais. Cada área do portfólio é tratada como um módulo interativo.

### Frase de Abertura
> "WPM System Booting..."
> "Wallace Phillip Maclayne"
> "Creative Developer / Designer / Builder of Digital Experiences"
> "Press Start"

---

## Referências Analisadas

| Portfólio | URL | O que inspira |
|-----------|-----|---------------|
| **Inette** | inette.co | Estrutura about/work/contact, foco em identidade visual, UX como narrativa |
| **Thibaud Fellay** | thibaud.film | "Scroll to enter", grid de obras, botões play, área secreta com senha (NDA) |
| **Sebastian Martinez** | sebastian-martinez.com | Motion design ousado, transições fluidas, experiência cinematográfica |
| **Sanni Sahil** | sannisahil.com | "Digital voyage", saudação multilíngue, apresentação pessoal forte |
| **Robert Borghesi** | robertborghesi.is | Creative coder, WebGL, "pretending to load", menu com siglas (PRJ, WHO, MSG) |
| **Antoine Wodniack** | wodniack.dev | Estética técnica com binários, controle de contraste, lista extensa de trabalhos |
| **Rogier de Boevé** | rogierdeboeve.com | Loading screen, "Enter" / "Enter without sound", UX consciente |

### Padrões identificados
1. Entrada com animação/intro em quase todos
2. Navegação minimalista (3-5 itens)
3. Dark mode predominante
4. Motion como elemento narrativo, não decorativo
5. "Skip intro" e opções de acessibilidade
6. Áudio opcional (nunca auto-play)
7. Metáfora de sistema/console em vários

---

## Arco da Experiência (5 Atos)

### Ato 1 — Boot / Intro
**Objetivo:** Causar impacto e apresentar WPM

- Fundo escuro com partículas/vídeo abstrato (placeholder: bg-noise)
- Texto "WPM" surgindo com blur → sharp
- Nome completo: "Wallace Phillip Maclayne"
- Status fake: "Loading creative modules..."
- Opção "Skip intro"
- Microinterações: partículas (futuro), scanline, letras se formando
- Progresso 0→100% rápido (4s), sem irritar

### Ato 2 — Start Screen
**Objetivo:** Transformar o visitante em jogador

- Efeito CRT ligando (linha branca que expande)
- "WPM.OS" / "Interactive Portfolio System"
- Botão "PRESS START" pulsando
- Aceita ENTER ou clique
- Footer com [ENTER] or click + nome

### Ato 3 — Console / Menu Principal
**Objetivo:** Ser o hub do portfólio — metáfora de seleção de jogos

- Top bar com "WPM.OS v1.0"
- Grid de ícones (siglas) como opções de menu
- Cards de projeto como "cartuchos"/"discos"
- Bottom bar com nome e ano

### Ato 4 — Página de Projeto
**Objetivo:** Apresentar cada projeto sem quebrar o universo visual

- Hero com thumbnail, título, gênero, ano, status
- Role e Stack em cards
- Case study: Problema → Solução → Resultados
- Links externos: Live Demo, GitHub, Figma
- Botão "BACK TO CONSOLE"

### Ato 5 — Character Profile
**Objetivo:** Humanizar

- "Character Profile" como tela de RPG
- Nome, classe, skills, hobbies
- Bio em parágrafos
- Links para redes sociais

---

## Direção de Arte

### Paleta de Cores

```
┌─────────────────────────────────────────┐
│ #050509  wpm-black         Fundo        │
│ #071B3A  wpm-deep-blue     Fundo alt    │
│ #0D1020  wpm-card          Cards        │
│ #6C4DFF  wpm-purple        Acento 1     │
│ #74F7FF  wpm-cyan          Acento 2     │
│ #EAF2FF  wpm-white         Texto        │
│ #7E8797  wpm-gray          Texto sec    │
└─────────────────────────────────────────┘
```

### Tipografia

| Fonte | Família | Peso | Uso |
|-------|---------|------|-----|
| **Geist Sans** | Sans-serif | 300 (light), 400 (regular), 500 (medium), 600 (semibold) | Headings, corpo, UI |
| **Geist Mono** | Monospace | 400 (regular) | Código, terminal, labels, status, coordenadas |

### Texturas e Efeitos

- **Noise/Grain:** SVG `feTurbulence` overlay com opacidade 3%
- **Scanlines:** `repeating-linear-gradient` a cada 4px, opacidade 4%
- **Vignette:** `radial-gradient` escurecendo bordas
- **Glow:** `text-shadow` com blur 10-30px nas cores ciano e roxo
- **Grid:** Linhas roxas a cada 80px, opacidade 2.5%
- **CRT glass:** (planejado, overlay sutil com bordas curvas e reflexo)

### Movimento

| Tipo | Implementação |
|------|---------------|
| Fade + blur | `initial={{ filter: "blur(12px)" }}` → `animate={{ filter: "blur(0px)" }}` |
| Slide up | `initial={{ y: 20 }}` → `animate={{ y: 0 }}` |
| Stagger | Delay progressivo por index (50-100ms) |
| Hover 3D leve | `whileHover={{ y: -4 }}` nos cards |
| CRT turn-on | `clipPath` + `filter: brightness()` animados |
| Pulsação | `animate={{ opacity: [0.3, 1, 0.3] }}` em loop infinito |
| Scale | `whileHover={{ scale: 1.03 }}`, `whileTap={{ scale: 0.97 }}` |

---

## Linguagem Visual

### Sistema de Ícones (Siglas)

```
[]    → Projects
?     → About Me
{}    → Skills
■     → Resume / Save File
<>    → Lab / Experiments
♦     → Hobbies / Side Quests
@     → Contact / Message
>_    → Command prompt (usado nas skills)
```

### Labels e Terminologia

| Conceito | Termo WPM.OS |
|----------|-------------|
| Projetos | "Featured Projects" (cartuchos) |
| Sobre | "Character Profile" |
| Skills | "Power-ups" |
| Currículo | "Save File" |
| Laboratório | "Experimental Zone" |
| Hobbies | "Side Quests" |
| Contato | "New Message" |
| Voltar | "BACK TO CONSOLE" |

---

## Acessibilidade e Performance (desde o MVP 1)

### Implementado
- [x] Botão "Skip Intro"
- [x] Navegação por teclado (ENTER no PressStart)
- [x] `prefers-reduced-motion` desabilita animações
- [x] Contraste texto/fundo adequado
- [x] Scrollbar fina e discreta
- [x] `::selection` estilizada

### Planejado (MVP 5)
- [ ] Botão "Reduce Motion" explícito
- [ ] Modo "Low Performance" sem WebGL
- [ ] Fallback sem JavaScript para conteúdo essencial
- [ ] Navegação por teclado completa (Tab, setas)
- [ ] Foco visível em todos elementos interativos
- [ ] Textos reais, não imagens
- [ ] Áudio desligado por padrão
- [ ] Versão mobile simplificada

---

## Notas Importantes

> **Nostalgia PS2 como inspiração emocional, não como cópia.**
> Nada de copiar logo, som, símbolos ou assets reconhecíveis da Sony/PlayStation. Criar linguagem própria.

> **Construção bottom-up.**
> Começar com MVP navegável e bonito. Adicionar WebGL, shaders, transições, áudio e easter eggs depois.

> **Todo estado de tela deve ter skip/reduce motion.**
> Experiência imersiva não pode ser experiência invasiva.

---

## Inspirações Adicionais

### Estética
- PS2 boot sequence (memória afetiva)
- Interfaces de OS fictícios (filmes sci-fi)
- Menus de seleção de jogos (SNES, PS1, PS2)
- CRT/TV antiga ligando e desligando
- Terminal / linha de comando
- HUDs de videogame

### Movimento
- Transições do Apple tvOS (parallax, blur)
- Menus de jogo com hover magnético
- "Reverse CRT turn-off" como transição entre telas

---

> **Regra do projeto:** Qualquer decisão criativa deve ser registrada aqui. Este documento é a bússola visual do WPM.OS.
