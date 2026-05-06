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
    title: "WPM Gestao Interna",
    subtitle: "Sistema operacional para recepcao de academias",
    description:
      "Sistema web operacional que centraliza todas as funcoes da recepcao de academias em uma interface unica. Dashboard em tempo real, registro de atendimentos, controle de pendencias, medicao de NPS, passagem de turno estruturada, escala da equipe, agenda de eventos e backup automatico.",
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
    coverImage: "",
    featured: true,
    links: {
      live: "https://wpm-gestao-interna.vercel.app/",
      github: "https://github.com/WPHILLIPMACLAYNE/WPM-GESTAO-INTERNA",
    },
    problem:
      "A recepcao de academias lida com dezenas de operacoes simultaneas — check-in, pagamentos, pendencias, NPS, passagem de turno, escala, eventos, backup. Sem um sistema centralizado, cada processo depende de planilhas, anotacoes manuais e memoria da equipe. O resultado e retrabalho, perda de informacao entre turnos e falta de visibilidade operacional.",
    solution:
      "Desenhei o WPM Gestao Interna como um sistema web operacional que centraliza todas as funcoes da recepcao em uma interface unica. Dashboard em tempo real, registro de atendimentos, controle de pendencias, medicao de NPS, passagem de turno estruturada, escala da equipe, agenda de eventos e backup automatico. O sistema funciona como PWA offline com sincronizacao via Supabase.",
    process:
      "Identifiquei as dores observando a operacao real da recepcao e conversando com a equipe. Mapeei os fluxos criticos: abertura/fechamento, passagem de turno, tratamento de pendencias, follow-up de NPS. Prototipei a interface com foco em minimizar cliques por tarefa. Desenvolvi com HTML/CSS/JS vanilla, PWA com Service Worker, IndexedDB/localStorage para modo offline e Supabase Auth/PostgreSQL/RLS como backend. Testes automatizados com Vitest e Playwright garantiram a estabilidade dos fluxos criticos.",
    results:
      "Sistema funcional homologado, rodando em producao como PWA instalavel. Centralizou as operacoes da recepcao em uma interface unica, substituindo planilhas e anotacoes manuais. A aplicacao continua evoluindo com novos modulos e melhorias baseadas no uso diario real.",
  },
  {
    slug: "livro-llm-agentes",
    title: "LLMs e Agentes de Codigo",
    subtitle: "Do zero ao fluxo profissional com inteligencia artificial",
    description:
      "Livro de 290 paginas com 7 partes, 26 capitulos e 3 apendices que leva o leitor do zero — entendendo o que sao LLMs — ate fluxos profissionais com agentes de codigo e orquestracao de tarefas complexas. Publicado em formato PDF/A4 profissional.",
    year: 2026,
    role: "Autor + Curador Editorial",
    category: "Publicacao",
    status: "Completed",
    stack: [
      "Escrita Tecnica",
      "Curadoria",
      "IA/AI-Assisted",
      "Documentacao",
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
      "Profissionais de tecnologia e operacoes enfrentam uma barreira de entrada no uso de IA: documentacao dispersa, tutoriais rasos, falta de um caminho estruturado do basico ao avancado. A maioria dos recursos ou e tecnica demais para iniciantes ou superficial demais para uso profissional.",
    solution:
      "Escrevi um livro de 290 paginas com 7 partes, 26 capitulos e 3 apendices que leva o leitor do zero — entendendo o que sao LLMs — ate fluxos profissionais com agentes de codigo e orquestracao de tarefas complexas. A estrutura progressiva permite que tanto iniciantes quanto profissionais avancados encontrem valor no conteudo.",
    process:
      "Organizei o conteudo em camadas: fundamentos (Partes 1-2), ferramentas e fluxos (Partes 3-4), agentes e automacao (Partes 5-6), e pratica avancada (Parte 7). Cada capitulo combina explicacao conceitual com exemplos praticos. A producao editorial usou Markdown com templates, revisao automatizada e geracao de PDF/A4 profissional via WeasyPrint 68.1.",
    results:
      "Versao profissional v1.1 publicada com 290 paginas em formato A4. O livro estabelece um percurso completo: do primeiro prompt a orquestracao de agentes. Serve como prova de dominio tecnico, capacidade de curadoria e escrita tecnica profissional.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
