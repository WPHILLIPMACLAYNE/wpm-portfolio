export interface ProjectLink {
  live?: string;
  github?: string;
  caseStudy?: string;
  figma?: string;
  video?: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  year: number;
  role: string;
  category: string;
  status: "Completed" | "In Progress" | "Active" | "Prototype" | "Archived";
  description?: string;
  stack: string[];
  problem: string;
  solution: string;
  process: string;
  results: string;
  links: ProjectLink;
  coverImage: string;
  thumbnailImage?: string;
  ogImage?: string;
  accentColor: string;
  locked?: boolean;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "wpm-gestao-interna",
    title: "WPM Gestão Interna",
    subtitle: "Sistema operacional para recepção de academias",
    description:
      "Sistema web operacional que centraliza todas as funções da recepção de academias em uma interface única. Dashboard em tempo real, registro de atendimentos, controle de pendências, medição de NPS, passagem de turno estruturada, escala da equipe, agenda de eventos e backup automático.",
    year: 2025,
    role: "Product + Design + Development",
    category: "Web App",
    status: "Active",
    stack: [
      "HTML/CSS/JS",
      "PWA",
      "Service Worker",
      "Supabase",
      "Vitest",
      "Playwright",
      "Vercel",
    ],
    accentColor: "#10B981",
    coverImage: "/project-wpm-gestao-cover.svg",
    featured: true,
    links: {
      live: "https://wpm-gestao-interna.vercel.app/",
      github: "https://github.com/WPHILLIPMACLAYNE/WPM-GESTAO-INTERNA",
    },
    problem:
      "A recepção de academias lida com dezenas de operações simultâneas — check-in, pagamentos, pendências, NPS, passagem de turno, escala, eventos, backup. Sem um sistema centralizado, cada processo depende de planilhas, anotações manuais e memória da equipe. O resultado é retrabalho, perda de informação entre turnos e falta de visibilidade operacional.",
    solution:
      "Desenhei o WPM Gestão Interna como um sistema web operacional que centraliza todas as funções da recepção em uma interface única. Dashboard em tempo real, registro de atendimentos, controle de pendências, medição de NPS, passagem de turno estruturada, escala da equipe, agenda de eventos e backup automático. O sistema funciona como PWA offline com sincronização via Supabase.",
    process:
      "Identifiquei as dores observando a operação real da recepção e conversando com a equipe. Mapeei os fluxos críticos: abertura/fechamento, passagem de turno, tratamento de pendências, follow-up de NPS. Prototipei a interface com foco em minimizar cliques por tarefa. Desenvolvi com HTML/CSS/JS vanilla, PWA com Service Worker, IndexedDB/localStorage para modo offline e Supabase Auth/PostgreSQL/RLS como backend. Testes automatizados com Vitest e Playwright garantiram a estabilidade dos fluxos críticos.",
    results:
      "Sistema funcional homologado, rodando em produção como PWA instalável. Centralizou as operações da recepção em uma interface única, substituindo planilhas e anotações manuais. A aplicação continua evoluindo com novos módulos e melhorias baseadas no uso diário real.",
  },
  {
    slug: "livro-llm-agentes",
    title: "LLMs e Agentes de Código",
    subtitle: "Do zero ao fluxo profissional com inteligência artificial",
    description:
      "Livro de 290 páginas com 7 partes, 26 capítulos e 3 apêndices que leva o leitor do zero — entendendo o que são LLMs — até fluxos profissionais com agentes de código e orquestração de tarefas complexas. Publicado em formato PDF/A4 profissional.",
    year: 2026,
    role: "Autor + Curador Editorial",
    category: "Publicação",
    status: "Completed",
    stack: [
      "Escrita Técnica",
      "Curadoria",
      "IA/AI-Assisted",
      "Documentação",
      "WeasyPrint",
      "Markdown",
      "Git",
    ],
    accentColor: "#F59E0B",
    coverImage: "/project-livro-cover-960.webp",
    thumbnailImage: "/project-livro-cover-640.webp",
    ogImage: "/project-livro-cover-og.jpg",
    featured: true,
    links: {
      live: "https://wphillipmaclayne.github.io/meu-livro-llm-agentes/site-apresentacao/",
    },
    problem:
      "Profissionais de tecnologia e operações enfrentam uma barreira de entrada no uso de IA: documentação dispersa, tutoriais rasos, falta de um caminho estruturado do básico ao avançado. A maioria dos recursos ou é técnica demais para iniciantes ou superficial demais para uso profissional.",
    solution:
      "Escrevi um livro de 290 páginas com 7 partes, 26 capítulos e 3 apêndices que leva o leitor do zero — entendendo o que são LLMs — até fluxos profissionais com agentes de código e orquestração de tarefas complexas. A estrutura progressiva permite que tanto iniciantes quanto profissionais avançados encontrem valor no conteúdo.",
    process:
      "Organizei o conteúdo em camadas: fundamentos (Partes 1-2), ferramentas e fluxos (Partes 3-4), agentes e automação (Partes 5-6), e prática avançada (Parte 7). Cada capítulo combina explicação conceitual com exemplos práticos. A produção editorial usou Markdown com templates, revisão automatizada e geração de PDF/A4 profissional via WeasyPrint 68.1.",
    results:
      "Versão profissional v1.1 publicada com 290 páginas em formato A4. O livro estabelece um percurso completo: do primeiro prompt à orquestração de agentes. Serve como prova de domínio técnico, capacidade de curadoria e escrita técnica profissional.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
