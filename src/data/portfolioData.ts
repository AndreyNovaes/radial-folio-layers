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
  bio: "QA Engineer especializado em automação de testes com Playwright, Selenium e Cypress. Experiência em testes manuais, API e performance testing.",
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
    date: "Outubro 2024",
    category: "CORE"
  },
  {
    id: "static-testing",
    name: "Fundamentals of Static Testing",
    status: "completed",
    date: "Setembro 2024",
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
    status: "planned",
    category: "CORE"
  },
  {
    id: "ta",
    name: "Test Analyst (TA)",
    status: "planned",
    category: "CORE"
  },
  {
    id: "tta",
    name: "Technical Test Analyst (TTA)",
    status: "planned",
    category: "ADVANCED"
  }
];

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
