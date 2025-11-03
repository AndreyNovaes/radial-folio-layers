export interface SkillDescription {
  label: string;
  description: string;
  usage: string;
}

export const skillDescriptions: Record<string, SkillDescription> = {
  "Playwright": {
    label: "Playwright",
    description: "Framework completo de automação multi-browser desenvolvido do zero. Arquitetura sólida com fixtures customizadas e BDD/Gherkin.",
    usage: "Principal foco 2025: Criou framework completo com multi-environment (5 ambientes), CI/CD integration, arquitetura escalável. Meta: Visual regression testing e component testing."
  },
  "On-Premise": {
    label: "On-Premise",
    description: "Gerenciamento completo de infraestrutura Proxmox em produção. Templates otimizados, backup strategies e network troubleshooting.",
    usage: "Telcomanager (Maio 2024-Presente): Migração VMware→Proxmox, otimização 90% em provisionamento, 4+ consultores. Disaster recovery strategies."
  },
  "Selenium": {
    label: "Selenium",
    description: "Automação de testes de interface web com WebDriver. Gerenciamento e infraestrutura do Selenium Hub em produção.",
    usage: "Telcomanager: Gerenciamento Selenium Hub (Java), desenvolvimento com Selenium IDE, Page Object Model avançado. 2 anos de experiência profissional."
  },
  "Cypress": {
    label: "Cypress",
    description: "Framework moderno de testes end-to-end com debugging interativo. Suporte a múltiplos browsers e relatórios automatizados.",
    usage: "Telcomanager: Testes de interface com Cypress, automação de fluxos críticos, debugging interativo. Alternativa moderna ao Selenium."
  },
  "API Testing": {
    label: "API Testing",
    description: "Testes de APIs RESTful com validação de schemas, assertions complexas e automação end-to-end com Supertest.",
    usage: "Telcomanager: Testes de APIs de integração diariamente. Validação de contrato, schema validation, automação de testes críticos."
  },
  "TypeScript": {
    label: "TypeScript",
    description: "Linguagem tipada para desenvolvimento de frameworks e automação com type safety. Playwright e automação moderna.",
    usage: "Playwright: Framework completo em TypeScript com tipos seguros. Testes de UI robustos com arquitetura escalável."
  },
  "Performance": {
    label: "Performance",
    description: "Testes de desempenho, carga e stress testing. Identificação de gargalos e otimização de sistemas.",
    usage: "Telcomanager: Locust em produção, testes de carga complexos, análise de resultados e gargalos. JMeter conhecimento. Meta: K6 avançado."
  },
  "CI/CD": {
    label: "CI/CD",
    description: "Integração e deployment contínuo com GitHub Actions, Git workflows avançados e pipelines automatizados.",
    usage: "Telcomanager: GitHub Actions configurado, pipelines de testes automatizados em produção. Meta: Jenkins e GitLab CI/CD, Docker em pipelines."
  },
  "Cloud": {
    label: "Cloud",
    description: "Conhecimento em arquiteturas cloud: Azure, AWS, GCP, IaaS, PaaS, SaaS. Oracle Cloud certificado.",
    usage: "Oracle Cloud Infrastructure 2022 Certified. Estudando Azure DevOps. Meta: AZ-900 certified, hands-on Azure deployment."
  }
};
