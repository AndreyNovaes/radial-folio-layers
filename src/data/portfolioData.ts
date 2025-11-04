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
  year: 2025 | 2026;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  technologies: string[];
  github?: string;
  link?: string;
  status: 'completed' | 'in-progress' | 'planned';
  highlights?: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  tags: string[];
  image?: string;
  link?: string;
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
  title: "QA Engineer",
  bio: "Focado em criar soluções sólidas e eficazes através de automação de testes. Especialista em transformar complexidade em simplicidade.",
  email: "andreynovaespro@gmail.com",
  linkedin: "linkedin.com/in/andrey-novaes",
  github: "github.com/andreynovaes",
  skills: [
    "Playwright",
    "Selenium",
    "Cypress",
    "TypeScript",
    "API Testing",
    "Performance Testing",
    "CI/CD",
    "On-Premise",
    "Cloud"
  ]
};

export const timeline: TimelineItem[] = [
  {
    title: "Estágio em QA",
    period: "Maio 2024 - Presente",
    company: "Telcomanager",
    description: "Gerenciamento do ambiente Selenium Hub e infraestrutura completa de testes automatizados. Desenvolvimento e manutenção de testes automatizados usando Selenium IDE e Cypress. Execução e análise de testes de desempenho e carga.",
    skills: ["Selenium", "Playwright", "Cypress", "Testes Automatizados", "Performance Testing"]
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
    id: "ct-genai",
    name: "ISTQB CT-GenAI (Testing with Generative AI)",
    status: "in-progress",
    category: "QA - SPECIALIST",
    year: 2026
  },
  {
    id: "az-900",
    name: "Microsoft AZ-900 (Azure Fundamentals)",
    status: "in-progress",
    category: "CLOUD",
    year: 2026
  },
  {
    id: "ctfl",
    name: "ISTQB Certified Tester Foundation Level (CTFL) v4.0",
    status: "completed",
    date: "Outubro 2025",
    category: "QA - CORE",
    year: 2025
  },
  {
    id: "oracle-oci",
    name: "Oracle Cloud Infrastructure 2022 - Foundations Associate",
    status: "completed",
    date: "Novembro 2023",
    category: "CLOUD",
    year: 2025
  },
  {
    id: "trybe",
    name: "Trybe - Full-Stack Development",
    status: "completed",
    date: "Janeiro 2022",
    category: "DEVELOPMENT",
    year: 2025
  }
];

// Projetos principais
export const projects: Project[] = [
  {
    id: "desafio-tecnico-qa",
    title: "Sistema de Testes Automatizados para Autenticação",
    description: "Projeto de automação de testes completo com Page Objects, Selenium e Pytest, validando funcionalidades críticas de autenticação.",
    longDescription: `Projeto de automação de testes para um sistema de autenticação completo, implementando o padrão Page Objects com Selenium WebDriver. Os testes validam funcionalidades como login, registro, recuperação de senha e dashboard, garantindo a qualidade e segurança do sistema de autenticação.

Infraestrutura robusta com Docker Compose incluindo Selenoid, Allure Reports, Kiwi TCMS e Faker API. 16 planos de teste cobrindo funcionalidades críticas com gravação de vídeo, screenshots automáticos e relatórios detalhados.`,
    image: "/projeto1.png",
    technologies: ["Python", "Selenium", "PyTest", "Allure Reports", "Docker", "Kiwi TCMS"],
    github: "https://github.com/AndreyNovaes/desafio_tecnico_qa_andrey_de_novaes_ferreira",
    status: "completed",
    highlights: [
      "16 planos de teste com cobertura completa",
      "Page Object Model para manutenibilidade",
      "Execução paralela com Selenoid",
      "Gravação de vídeos e screenshots automáticos",
      "Relatórios Allure detalhados",
      "Infraestrutura completa com Docker Compose"
    ]
  }
];

// Artigos sobre QA e Testing
export const articles: Article[] = [
  {
    id: "page-objects-selenium",
    title: "Page Object Model com Selenium: Estruturando Testes Automatizados",
    excerpt: "Descubra como o padrão Page Object Model revoluciona a manutenibilidade e escalabilidade de testes automatizados com Selenium.",
    link: "https://www.linkedin.com/in/andrey-de-novaes/",
    content: `O Page Object Model (POM) é um dos padrões mais importantes na automação de testes. Ele separa a lógica de interação com a UI da lógica dos testes, criando uma estrutura limpa e manutenível.

## Por que usar Page Objects?

Quando você não usa o padrão POM, seus testes ficam repletos de seletores espalhados por todo o código. Se um elemento muda na UI, você precisa atualizar dúzias de testes. Com POM, você atualiza em um único lugar.

### Estrutura básica de um Page Object

\`\`\`python
class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.username_input = (By.ID, "username")
        self.password_input = (By.ID, "password")
        self.login_button = (By.XPATH, "//button[@type='submit']")

    def enter_username(self, username):
        self.driver.find_element(*self.username_input).send_keys(username)

    def enter_password(self, password):
        self.driver.find_element(*self.password_input).send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.login_button).click()
\`\`\`

## Benefícios do Page Object Model

1. **Manutenibilidade**: Mudanças na UI são refletidas em um único lugar
2. **Reutilização**: Métodos podem ser usados em múltiplos testes
3. **Legibilidade**: Testes leem como um documento, não como código técnico
4. **Escalabilidade**: Fácil adicionar novos testes e páginas

## Boas práticas

- Um Page Object por página/tela da aplicação
- Métodos descrevem ações do usuário, não detalhes técnicos
- Use nomes significativos para seletores e métodos
- Mantenha os seletores privados (encapsulamento)

O Page Object Model não é apenas um padrão de código, é uma filosofia de como estruturar testes para que eles cresçam com sua aplicação.`,
    category: "QA / Automação",
    date: "02 de Novembro, 2025",
    readTime: 8,
    author: "Andrey Novaes",
    tags: ["Selenium", "Page Objects", "Automação", "Padrões de Design"],
    image: "/placeholder.svg"
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
  // Hard Skills - Baseado em experiência real (estágio QA desde Jan 2024)
  { label: "On-Premise", "2024": 20, "2025": 75, meta: 80, color: "hsl(var(--primary))" },
  { label: "Playwright", "2024": 0, "2025": 70, meta: 80, color: "hsl(var(--core))" },
  { label: "Selenium", "2024": 30, "2025": 70, meta: 80, color: "hsl(var(--advanced))" },
  { label: "Cypress", "2024": 15, "2025": 62, meta: 75, color: "hsl(var(--specialist))" },
  { label: "API Testing", "2024": 30, "2025": 60, meta: 70, color: "hsl(var(--supporting))" },
  { label: "TypeScript", "2024": 20, "2025": 60, meta: 75, color: "hsl(var(--primary))" },
  { label: "Performance", "2024": 15, "2025": 55, meta: 65, color: "hsl(var(--core))" },
  { label: "CI/CD", "2024": 25, "2025": 50, meta: 65, color: "hsl(var(--advanced))" },
  { label: "Cloud", "2024": 10, "2025": 35, meta: 55, color: "hsl(var(--specialist))" }
];

// História pessoal
export const myStory = {
  title: "O Estrategista de Qualidade",
  subtitle: "Da arena competitiva aos domínios da excelência",
  content: `Minha jornada começou longe dos teclados de código. Em 2015-2017, competia no Circuito Desafiante de League of Legends, um dos maiores campeonatos de eSports do Brasil. Ali aprendi que a vitória vem de análise estratégica, execução impecável e tomada de decisões precisas sob pressão.

A transição para tecnologia não foi acidental. Foi uma evolução natural de alguém que sempre buscou excelência através de análise profunda e execução precisa. Como QA, encontrei meu elemento: o espaço onde posso garantir qualidade em cada entrega, onde cada teste é uma jogada estratégica bem calculada.

Sou um estrategista de qualidade. Meu foco é em processos bem estabelecidos onde aplico criatividade e inovação dentro de estruturas sólidas. Não sou apenas executor - sou alguém que pensa estrategicamente sobre como garantir a melhor qualidade possível.

De jogador profissional a engenheiro de qualidade, a essência permanece: análise estratégica, execução impecável, resultados consistentes. Domino testes, um estratégia de cada vez.`
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
