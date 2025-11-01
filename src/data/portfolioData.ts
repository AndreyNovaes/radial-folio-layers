// Dados customizáveis do portfolio
export interface TimelineItem {
  title: string;
  period: string;
  company: string;
  description: string;
  skills: string[];
}

export interface Certification {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'planned';
  date?: string;
  category: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin: string;
  github?: string;
  skills: string[];
  imageUrl?: string;
}

export const profileData: ProfileData = {
  name: "Andrey Novaes",
  title: "QA Automation Engineer",
  bio: "Construtor silencioso. Focado em criar soluções sólidas e eficazes através de automação de testes. Especialista em transformar complexidade em simplicidade.",
  email: "contato@example.com",
  linkedin: "linkedin.com/in/andrey-novaes",
  github: "github.com/andreynovaes",
  skills: [
    "Playwright",
    "Selenium",
    "Cypress",
    "Python",
    "TypeScript",
    "API Testing",
    "Performance Testing",
    "CI/CD"
  ]
};

export const timeline: TimelineItem[] = [
  {
    title: "QA Engineer",
    period: "Maio 2024 - Presente",
    company: "Telcomanager",
    description: "Gerenciamento do ambiente Selenium Hub e infraestrutura completa de testes automatizados. Desenvolvimento e manutenção de testes automatizados usando Selenium IDE. Execução e análise de testes de desempenho e carga utilizando Locust.",
    skills: ["Selenium", "Locust", "Testes Automatizados", "Testes de Desempenho", "Python"]
  },
  {
    title: "Desenvolvedor Full-stack/RPA",
    period: "Julho 2023 - Maio 2024",
    company: "Conselho Regional dos Técnicos Industriais do Rio de Janeiro",
    description: "Desenvolvimento de aplicações web utilizando TypeScript, Next.js e Nest.js. Criação e implementação de soluções de automação (RPA) com Python e Selenium. Projeto e desenvolvimento de APIs RESTful aplicando princípios SOLID.",
    skills: ["TypeScript", "Next.js", "Nest.js", "Python", "Selenium", "RPA", "Node.js", "REST API"]
  },
  {
    title: "Estudante de Desenvolvimento",
    period: "2021 - 2022",
    company: "Trybe",
    description: "Formação intensiva de mais de 1.500 horas em Desenvolvimento Web. Abrangendo tecnologias Front-End (React, HTML/CSS), Back-End (Node.js, MySQL, MongoDB), fundamentos de Computação e práticas ágeis.",
    skills: ["React", "HTML", "CSS", "Node.js", "MySQL", "MongoDB", "JavaScript"]
  },
  {
    title: "Jogador Profissional de e-Sports",
    period: "2015 - 2017",
    company: "Circuito Desafiante de League of Legends",
    description: "Competindo no Circuito Desafiante de League of Legends, um dos maiores campeonatos de eSports do Brasil. Esta experiência me ensinou sobre trabalho em equipe, comunicação eficaz e gerenciamento de pressão em ambientes competitivos.",
    skills: ["Trabalho em Equipe", "Comunicação", "Foco", "Gerenciamento de Estresse", "Análise Estratégica"]
  }
];

export const certifications: Certification[] = [
  {
    id: "ctfl",
    name: "ISTQB Certified Tester Foundation Level (CTFL) v4.0",
    status: "completed",
    date: "Outubro 2025",
    category: "CORE"
  },
  {
    id: "static-testing",
    name: "Fundamentals of Static Testing",
    status: "completed",
    date: "Setembro 2025",
    category: "SPECIALIST"
  },
  {
    id: "ct-genai",
    name: "CT-GenAI (Testing with Generative AI)",
    status: "in-progress",
    category: "SPECIALIST"
  },
  {
    id: "az-900",
    name: "AZ-900 (Azure Fundamentals)",
    status: "in-progress",
    category: "CORE"
  }
];

// Evolução de skills ao longo do tempo
export interface SkillEvolution {
  label: string;
  "2024": number;
  "2025": number;
  meta: number;
  color: string;
  isSoftSkill?: boolean;
}

export const skillsEvolution: SkillEvolution[] = [
  // Hard Skills
  { label: "Automação", "2024": 75, "2025": 95, meta: 98, color: "hsl(var(--primary))" },
  { label: "API Testing", "2024": 70, "2025": 90, meta: 95, color: "hsl(var(--core))" },
  { label: "Performance", "2024": 65, "2025": 85, meta: 95, color: "hsl(var(--advanced))" },
  { label: "CI/CD", "2024": 70, "2025": 88, meta: 95, color: "hsl(var(--specialist))" },
  { label: "Selenium", "2024": 80, "2025": 90, meta: 92, color: "hsl(var(--supporting))" },
  { label: "Playwright", "2024": 75, "2025": 93, meta: 98, color: "hsl(var(--primary))" },
  { label: "Cypress", "2024": 70, "2025": 87, meta: 90, color: "hsl(var(--core))" },
  { label: "Python", "2024": 75, "2025": 88, meta: 92, color: "hsl(var(--advanced))" },
  
  // Soft Skills baseadas no perfil psicológico
  { label: "Capacidade Analítica", "2024": 90, "2025": 94, meta: 98, color: "hsl(var(--expert))", isSoftSkill: true },
  { label: "Facilitação", "2024": 88, "2025": 94, meta: 96, color: "hsl(var(--supporting))", isSoftSkill: true },
  { label: "Pensamento Criativo", "2024": 80, "2025": 85, meta: 90, color: "hsl(var(--primary))", isSoftSkill: true },
  { label: "Ambição", "2024": 75, "2025": 80, meta: 85, color: "hsl(var(--core))", isSoftSkill: true },
  { label: "Comunicação", "2024": 72, "2025": 78, meta: 85, color: "hsl(var(--advanced))", isSoftSkill: true },
  { label: "Flexibilidade", "2024": 70, "2025": 76, meta: 82, color: "hsl(var(--specialist))", isSoftSkill: true }
];

// História pessoal
export const myStory = {
  title: "O Construtor Silencioso",
  subtitle: "Da arena competitiva aos bastidores da qualidade",
  content: `Minha jornada começou longe dos teclados de código. Em 2015-2017, competia no Circuito Desafiante de League of Legends, um dos maiores campeonatos de eSports do Brasil. Ali aprendi que vencer não é sobre gritar mais alto, mas sobre construir estratégias sólidas, silenciosamente.

A transição para tecnologia não foi acidental. Foi uma evolução natural de alguém que sempre buscou excelência através de análise profunda e execução precisa. Como QA, encontrei meu elemento: o espaço onde posso construir qualidade nos bastidores, onde cada teste é uma peça estratégica no tabuleiro.

Sou um construtor silencioso. Não faço barulho, faço resultados. Minha capacidade analítica (93.7%) e facilitação (93.7%) me permitem mergulhar em problemas complexos e emergir com soluções elegantes. Prefiro processos bem estabelecidos onde posso aplicar criatividade dentro de estruturas sólidas.

De jogador profissional a engenheiro de qualidade, a essência permanece: análise estratégica, execução precisa, resultados consistentes. Construo qualidade, um teste de cada vez.`
};

// Seções do menu radial - customizável
export const radialSections = {
  ta: {
    title: "Test Analyst (TA)",
    category: "CORE",
    overview: "The Test Analyst certification focuses on the technical aspects of testing, including test design techniques and test analysis.",
    details: [
      "Advanced test design techniques",
      "Risk-based testing approaches",
      "Defect taxonomies and analysis",
      "Test data preparation"
    ]
  },
  tm: {
    title: "Test Manager (TM)",
    category: "CORE",
    overview: "The Test Manager certification covers test management, test process improvement, and people skills required for effective test management.",
    details: [
      "Test planning and estimation",
      "Risk management strategies",
      "Team leadership and communication",
      "Test metrics and reporting"
    ]
  },
  tta: {
    title: "Technical Test Analyst (TTA)",
    category: "ADVANCED",
    overview: "The Technical Test Analyst certification provides advanced knowledge in technical testing aspects.",
    details: [
      "White-box testing techniques",
      "Static and dynamic analysis",
      "Security and performance testing",
      "Technical test automation"
    ]
  },
  game: {
    title: "Game Testing",
    category: "SPECIALIST",
    overview: "Specialized certification for testing video games and interactive entertainment software.",
    details: [
      "Game mechanics testing",
      "Platform-specific testing",
      "User experience validation",
      "Performance in gaming environments"
    ]
  },
  aut: {
    title: "Automotive Software Testing",
    category: "SPECIALIST",
    overview: "Specialized knowledge for testing automotive software systems and embedded systems.",
    details: [
      "Safety-critical systems",
      "AUTOSAR compliance",
      "Embedded systems testing",
      "ISO 26262 standards"
    ]
  }
};
