export const profile = {
  name: "Wallace Phillip Maclayne",
  initials: "WPM",
  tagline: "Gestão Comercial, Marketing e tecnologia aplicada à operação",
  class: "Commercial Manager / Marketing Technologist",
  location: "Brazil",
  bio: [
    "Minha trajetória profissional começou no comércio e na operação de grandes marcas como Coca-Cola, Bauducco, GPA e Laticínios Verde Campo — onde desenvolvi habilidades de negociação, visual merchandising e liderança de equipe. Hoje, na Smart Fit, aplico essa base comercial na gestão de experiência do cliente, combinando hospitalidade com disciplina operacional.",
    "Em paralelo, a tecnologia sempre foi meu motor de aprendizado. Tenho formação superior em Gestão Comercial — UNINTER e Técnico em Marketing — UniCesumar, além de especialização prática em desenvolvimento de sistemas web, integração de IA e automação de processos. Meu portfólio reflete essa dupla identidade: de um lado, sistemas operacionais reais para resolver problemas do dia a dia; do outro, produção técnica que compartilha conhecimento. Acredito que o profissional do futuro transita com fluência entre negócios, pessoas e tecnologia.",
  ],
  skillGroups: [
    {
      name: "Operação & Gestão",
      skills: [
        "Gestão de equipes",
        "Indicadores (KPIs)",
        "Planejamento operacional",
        "Passagem de turno / PDCA",
        "Visual Merchandising",
        "Governança de processos",
      ],
    },
    {
      name: "Vendas & Trade Marketing",
      skills: [
        "Negociação comercial",
        "Execução de trade",
        "Relacionamento com clientes",
        "Promoção e degustação",
        "Estratégia de ponto de venda",
        "Análise de performance",
      ],
    },
    {
      name: "Produto & UX",
      skills: [
        "Prototipação de interfaces",
        "Design System (Figma + Código)",
        "Testes de usabilidade",
        "Acessibilidade (a11y)",
        "Documentação de produto",
        "Integração com stakeholders",
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
    "Gestão de Equipes",
    "Negociação Comercial",
    "Trade Marketing",
    "Visual Merchandising",
    "Liderança Operacional",
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
    "Música",
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
    label: "Biblioteca de Projetos",
    href: "/projects",
    description: "Estudos de caso e demos ao vivo",
    type: "Biblioteca",
    status: "Active",
  },
  {
    id: "about",
    label: "Perfil do Jogador",
    href: "/about",
    description: "Bio, trajetória e dados do perfil",
    type: "Perfil",
    status: "Active",
  },
  {
    id: "skills",
    label: "Arvore de Skills",
    href: "/skills",
    description: "Tecnologias, ferramentas e competencias",
    type: "Arvore",
    status: "Active",
  },
  {
    id: "resume",
    label: "Save de Carreira",
    href: "/resume",
    description: "Experiência, formação e linha do tempo",
    type: "Slot de Save",
    status: "Active",
  },
  {
    id: "lab",
    label: "Laboratorio Experimental",
    href: "/lab",
    description: "Prototipos, shaders e testes criativos",
    type: "Prototipo",
    status: "Active",
  },
  {
    id: "specs",
    label: "Especificações do Sistema",
    href: "/specs",
    description: "Documentação técnica e arquitetura do WPM.OS",
    type: "Dossiê Técnico",
    status: "Active",
  },
  {
    id: "contact",
    label: "Enviar Sinal",
    href: "/contact",
    description: "Entre em contato, canal aberto",
    type: "Sinal",
    status: "Active",
  },
  {
    id: "settings",
    label: "Configurações",
    href: "/settings",
    description: "Preferências de tema, motion e áudio",
    type: "Configuração",
    status: "Coming Soon",
  },
  {
    id: "secret",
    label: "Arquivos Bloqueados",
    href: "/secret",
    description: "Projetos sob NDA e trabalhos privados",
    type: "Criptografado",
    status: "Locked",
  },
];
