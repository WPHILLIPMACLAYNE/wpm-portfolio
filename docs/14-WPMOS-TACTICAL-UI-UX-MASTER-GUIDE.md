# WPM.OS — Master Context & Tactical UI/UX Guide (v1.1)

Este documento é o guia definitivo de arquitetura, direção de arte e engenharia visual do projeto **WPM.OS**. Ele serve de contexto absoluto para qualquer desenvolvedor humano ou agente de IA que for manipular ou evoluir este sistema.

---

## 1. O Manifesto do Criador (Protocolo de Autoria)

O WPM.OS é um projeto **100% autoral**. Todo o conceito, direção criativa, arquitetura visual e lógica de interface foram idealizados por **Wallace Phillip Maclayne**. 
Este sistema é uma prova de conceito de que a visão estratégica humana, quando orquestra corretamente um agente de código, pode materializar sistemas complexos, originais e de altíssimo nível sem depender de inspirações ou recursos pré-existentes.

---

## 2. Inovações e Engenharia Visual

### 2.1. Motor de Hologramas 3D (HologramStage)
*   **Tecnologia:** Three.js + React Three Fiber puro (sem helpers externos como @react-three/drei).
*   **Conceito:** Cada módulo do sistema possui um artefato 3D exclusivo renderizado em wireframe tático.
*   **Otimização:** Uso de `useFrame` para animações manuais e `powerPreference: "high-performance"`, garantindo fluidez cinematográfica sem sobrecarga de hardware.

### 2.2. Sistema de Transição Lateral (Spatial Navigation)
*   **Lógica:** O sistema calcula a posição relativa dos módulos no menu. Se o usuário avança na hierarquia, a página desliza para a esquerda; se recua, o slide inverte.
*   **UX:** Inspirado no `Win+Tab`, utiliza `AnimatePresence` com `custom directions` para criar uma sensação de multitarefa física.

### 2.3. Células de Comando (Header & Mobile)
*   **Design:** Os botões são tratados como slots de hardware com LEDs dinâmicos.
*   **Feedback:** Uso de `layoutId` para que os indicadores de estado (luzes e anéis de foco) deslizem fisicamente entre as opções.

---

## 3. Design System & Tokens Visuais

*   **Tipografia:** Família **Geist**. Mono para dados técnicos (caixa alta, 10px, tracking 0.25em) e Sans para leitura fluida e títulos brutalistas.
*   **Paleta:** Black (#050509), Cyan (#74F7FF), Purple (#6C4DFF), Success Green (#5BFFC7), e Experimental Pink (#FF7AD9).
*   **Efeito CRT:** Camada persistente de scanlines e vinheta via CSS no `globals.css`.

---

## 4. Instruções Críticas para Agentes de Código

Se você é uma IA manipulando este código, **REGRAS ESTRITAS:**
1.  **Pureza React 19:** Proibido o uso de `Math.random()` ou `Date.now()` no render. Use estados ou constantes estáticas.
2.  **Manutenção Brutalista:** Não arredonde cantos. Use bordas de 1px e cantoneiras de hardware (`divs` decorativas).
3.  **Hologramas:** Novas formas 3D devem ser adicionadas via `switch/case` no `HologramStage.tsx` usando primitivas geométricas.

---
*WPM.OS — Engineered for Innovation. Original Genesis by Wallace Phillip Maclayne.*