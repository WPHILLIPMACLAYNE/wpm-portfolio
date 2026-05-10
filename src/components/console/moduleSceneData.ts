import type { MenuItem } from "@/data/profile";

export type ModuleTone = "primary" | "secondary" | "success" | "warning" | "experimental" | "muted";

export interface ModuleScene {
  id: MenuItem["id"];
  signal: string;
  value: string;
  summary: string;
  status: string;
  weight: "principal" | "core" | "support" | "lab";
  tone: ModuleTone;
  tags: string[];
  meta: { label: string; value: string }[];
  visual: string[];
  primaryCta: string;
  secondaryCta?: string;
}

export const toneClasses: Record<ModuleTone, { text: string; border: string; bg: string; glow: string }> = {
  primary: {
    text: "text-wpm-cyan",
    border: "border-wpm-cyan/40",
    bg: "bg-wpm-cyan/[0.075]",
    glow: "shadow-[0_0_44px_rgba(116,247,255,0.10)]",
  },
  secondary: {
    text: "text-wpm-lavender",
    border: "border-wpm-purple/35",
    bg: "bg-wpm-purple/[0.075]",
    glow: "shadow-[0_0_44px_rgba(108,77,255,0.12)]",
  },
  success: {
    text: "text-wpm-success",
    border: "border-wpm-success/35",
    bg: "bg-wpm-success/[0.075]",
    glow: "shadow-[0_0_44px_rgba(91,255,199,0.10)]",
  },
  warning: {
    text: "text-wpm-warning",
    border: "border-wpm-warning/35",
    bg: "bg-wpm-warning/[0.075]",
    glow: "shadow-[0_0_44px_rgba(255,207,107,0.10)]",
  },
  experimental: {
    text: "text-wpm-experimental",
    border: "border-wpm-experimental/35",
    bg: "bg-wpm-experimental/[0.075]",
    glow: "shadow-[0_0_44px_rgba(255,122,217,0.10)]",
  },
  muted: {
    text: "text-wpm-gray",
    border: "border-white/[0.10]",
    bg: "bg-white/[0.035]",
    glow: "shadow-none",
  },
};

export const moduleScenes: Record<string, ModuleScene> = {
  projects: {
    id: "projects",
    signal: "Arquivo principal",
    value: "Cases reais, evidencias e artefatos de entrega.",
    summary:
      "Biblioteca operacional para abrir os estudos de caso, comparar escopo, prova tecnica e maturidade de produto.",
    status: "ATIVO / PRIORIDADE ALTA",
    weight: "principal",
    tone: "primary",
    tags: ["cases", "deploy", "produto", "evidencia"],
    meta: [
      { label: "cases", value: "02 destacados" },
      { label: "modo", value: "dossie" },
      { label: "entrada", value: "direta" },
    ],
    visual: ["WPM Gestao Interna", "Livro LLM Agentes", "Artefatos publicados"],
    primaryCta: "Inspecionar biblioteca",
    secondaryCta: "Ver artefatos",
  },
  about: {
    id: "about",
    signal: "Dossie pessoal",
    value: "Perfil profissional com identidade operacional.",
    summary:
      "Sintese de trajetoria, especializacao e posicionamento entre gestao comercial, marketing e tecnologia aplicada.",
    status: "ATIVO / IDENTIDADE",
    weight: "core",
    tone: "secondary",
    tags: ["perfil", "gestao", "marketing", "tecnologia"],
    meta: [
      { label: "classe", value: "Commercial Manager" },
      { label: "foco", value: "operacao + IA" },
      { label: "perfil", value: "hibrido" },
    ],
    visual: ["Operacao", "Produto", "UX", "Automacao"],
    primaryCta: "Abrir perfil",
    secondaryCta: "Ler sintese",
  },
  skills: {
    id: "skills",
    signal: "Mapa de competencia",
    value: "Clusters de habilidades por dominio e forca.",
    summary:
      "Skill tree organizada por operacao, vendas, produto, UX, tecnologia e IA, com leitura rapida de areas de dominio.",
    status: "ATIVO / MAPA",
    weight: "core",
    tone: "success",
    tags: ["skills", "clusters", "ux", "ia"],
    meta: [
      { label: "dominios", value: "04" },
      { label: "habilidades", value: "24+" },
      { label: "leitura", value: "cluster" },
    ],
    visual: ["Operacao", "Trade", "Produto", "Tecnologia"],
    primaryCta: "Abrir arvore",
    secondaryCta: "Ver clusters",
  },
  resume: {
    id: "resume",
    signal: "Save slots",
    value: "Timeline profissional com eras e marcos.",
    summary:
      "Carreira apresentada como arquivo de progresso: experiencias, educacao, certificacoes e milestones relevantes.",
    status: "ATIVO / PROGRESSO",
    weight: "core",
    tone: "warning",
    tags: ["timeline", "experiencia", "educacao", "badges"],
    meta: [
      { label: "eras", value: "07" },
      { label: "status", value: "em progresso" },
      { label: "marco", value: "Rio 2016" },
    ],
    visual: ["2011", "2016", "2022", "2024"],
    primaryCta: "Carregar save",
    secondaryCta: "Ver milestones",
  },
  lab: {
    id: "lab",
    signal: "Area experimental",
    value: "Prototipos visuais com disciplina de performance.",
    summary:
      "Espaco para shaders, particulas, tipografia generativa e estudos, sem transformar a home em vitrine de efeito gratuito.",
    status: "ATIVO / EXPERIMENTAL",
    weight: "lab",
    tone: "experimental",
    tags: ["shader", "motion", "type", "prototipo"],
    meta: [
      { label: "modo", value: "sandbox" },
      { label: "risco", value: "controlado" },
      { label: "motion", value: "opt-in" },
    ],
    visual: ["Shader", "Particles", "Audio", "Type"],
    primaryCta: "Entrar no laboratorio",
    secondaryCta: "Ver estudos",
  },
  specs: {
    id: "specs",
    signal: "Dossie do Sistema",
    value: "Arquitetura, stack e engenharia do WPM.OS.",
    summary:
      "Apresentacao tecnica sobre a criacao deste portfolio: as escolhas de design, ferramentas e os desafios de performance.",
    status: "ATIVO / DOCUMENTACAO",
    weight: "support",
    tone: "experimental",
    tags: ["nextjs", "react", "threejs", "motion"],
    meta: [
      { label: "versao", value: "1.0.2" },
      { label: "stack", value: "modern" },
      { label: "modo", value: "metalinguagem" },
    ],
    visual: ["Arquitetura", "Design", "Engenharia", "Motion"],
    primaryCta: "Inspecionar sistema",
    secondaryCta: "Ler specs",
  },
  contact: {
    id: "contact",
    signal: "Canal aberto",
    value: "Contato direto por canais publicos reais.",
    summary:
      "Tela de comunicacao minimalista para GitHub e LinkedIn, com convite claro e sem prometer e-mail enquanto ele estiver vazio.",
    status: "ATIVO / SINAL",
    weight: "support",
    tone: "primary",
    tags: ["github", "linkedin", "publico", "contato"],
    meta: [
      { label: "canais", value: "02" },
      { label: "email", value: "oculto" },
      { label: "resposta", value: "assinc" },
    ],
    visual: ["GitHub", "LinkedIn", "Sinal publico"],
    primaryCta: "Enviar sinal",
    secondaryCta: "Ver canais",
  },
};

export function getModuleScene(id: string): ModuleScene {
  return moduleScenes[id] ?? moduleScenes.projects;
}
