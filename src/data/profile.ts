export const profile = {
  name: "Wallace Phillip Maclayne",
  initials: "WPM",
  tagline: "Gestao Comercial, Marketing e tecnologia aplicada a operacao",
  class: "Commercial Manager / Marketing Technologist",
  location: "Brazil",
  bio: [
    "Minha trajetoria profissional comecou no comercio e na operacao de grandes marcas como Coca-Cola, Bauducco, GPA e Laticinios Verde Campo — onde desenvolvi habilidades de negociacao, visual merchandising e lideranca de equipe. Hoje, na Smart Fit, aplico essa base comercial na gestao de experiencia do cliente, combinando hospitalidade com disciplina operacional.",
    "Em paralelo, a tecnologia sempre foi meu motor de aprendizado. Tenho formacao superior em Gestao Comercial — UNINTER e Tecnico em Marketing — UniCesumar, alem de especializacao pratica em desenvolvimento de sistemas web, integracao de IA e automacao de processos. Meu portfolio reflete essa dupla identidade: de um lado, sistemas operacionais reais para resolver problemas do dia a dia; do outro, producao tecnica que compartilha conhecimento. Acredito que o profissional do futuro transita com fluencia entre negocios, pessoas e tecnologia.",
  ],
  skillGroups: [
    {
      name: "Operacao & Gestao",
      skills: [
        "Gestao de equipes",
        "Indicadores (KPIs)",
        "Planejamento operacional",
        "Passagem de turno / PDCA",
        "Visual Merchandising",
        "Governanca de processos",
      ],
    },
    {
      name: "Vendas & Trade Marketing",
      skills: [
        "Negociacao comercial",
        "Execucao de trade",
        "Relacionamento com clientes",
        "Promocao e degustacao",
        "Estrategia de ponto de venda",
        "Analise de performance",
      ],
    },
    {
      name: "Produto & UX",
      skills: [
        "Prototipacao de interfaces",
        "Design System (Figma + Codigo)",
        "Testes de usabilidade",
        "Acessibilidade (a11y)",
        "Documentacao de produto",
        "Integracao com stakeholders",
      ],
    },
    {
      name: "Tecnologia & IA",
      skills: [
        "Desenvolvimento Web Full-Stack",
        "PWA / Service Worker",
        "SQL / Supabase / PostgreSQL",
        "IA Generativa / LLMs",
        "Testes automatizados (Vitest, Playwright)",
        "CI/CD / Vercel / GitHub",
      ],
    },
  ],
  skills: [
    "Gestao de Equipes",
    "Negociacao Comercial",
    "Trade Marketing",
    "Visual Merchandising",
    "Lideranca Operacional",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "PWA",
    "Figma",
    "UX Design",
    "IA Generativa e LLMs",
    "Testes Automatizados",
  ],
  hobbies: [
    "Musica",
    "Games",
    "Cinema",
    "Arte Digital",
    "Fotografia",
    "Escrita Criativa",
  ],
  social: {
    github: "https://github.com/acewallthemac",
    linkedin: "https://www.linkedin.com/in/wpmaclayne/",
    email: "",
  },
};

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  description: string;
  type: string;
  status: "Active" | "Locked" | "Coming Soon";
}

export const menuItems: MenuItem[] = [
  {
    id: "projects",
    label: "Project Library",
    href: "/projects",
    description: "Case studies and live demos",
    type: "Library",
    status: "Active",
  },
  {
    id: "about",
    label: "Player Profile",
    href: "/about",
    description: "Bio, story and character data",
    type: "Profile",
    status: "Active",
  },
  {
    id: "skills",
    label: "Skill Tree",
    href: "/skills",
    description: "Technologies, tools and abilities",
    type: "Tree",
    status: "Active",
  },
  {
    id: "resume",
    label: "Career Save",
    href: "/resume",
    description: "Experience, education and timeline",
    type: "Save Slot",
    status: "Active",
  },
  {
    id: "lab",
    label: "Experimental Lab",
    href: "/lab",
    description: "Prototypes, shaders and creative tests",
    type: "Prototype",
    status: "Active",
  },
  {
    id: "hobbies",
    label: "Side Quests",
    href: "/hobbies",
    description: "Interests and personal projects",
    type: "Quest",
    status: "Active",
  },
  {
    id: "contact",
    label: "Send Signal",
    href: "/contact",
    description: "Get in touch, open channel",
    type: "Signal",
    status: "Active",
  },
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    description: "Display, motion and audio preferences",
    type: "Config",
    status: "Coming Soon",
  },
  {
    id: "secret",
    label: "Locked Files",
    href: "/secret",
    description: "Projects under NDA and private work",
    type: "Encrypted",
    status: "Locked",
  },
];
