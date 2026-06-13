import type { I18n, SkillSet } from './portfolio.interfaces';

export const SKILLS: I18n<SkillSet> = {
  en: {
    languages: 'TypeScript, Python, Bash, PHP, Java, C#',
    frontend: 'React (Vite, Next.js), Angular, Vue.js (Vite, Nuxt)',
    backend:
      'TypeScript (Nest.js/Express.js), Python (Quart/Django/FastAPI), PHP (Laravel/WordPress), Java (Spring)',
    testing:
      'Unit and Features (Jest, Vitest, Pytest, PHPUnit, JUnit), UI (Cypress, Playwright), Behavior (Cucumber, Pytest-BDD)',
    tooling:
      'Git, Unix-based Shell, LLM Agents, Docker, Container Orchestration (Docker Compose, Kubernetes), Cloud Deployments (Netlify, AWS EKS, Azure Virtual Machines), CI/CD (GitHub Actions)',
  },
  pt: {
    languages: 'TypeScript, Python, Bash, PHP, Java, C#',
    frontend: 'React (Vite, Next.js), Angular, Vue.js (Vite, Nuxt)',
    backend:
      'TypeScript (Nest.js/Express.js), Python (Quart/Django/FastAPI), PHP (Laravel/WordPress), Java (Spring)',
    testing:
      'Unidade e Funcionalidades (Jest, Vitest, Pytest, PHPUnit, JUnit), UI (Cypress, Playwright), Comportamento (Cucumber, Pytest-BDD)',
    tooling:
      'Git, Shell baseado em Unix, Agentes LLM, Docker, Orquestração de Contêineres (Docker Compose, Kubernetes), Deploys Cloud (Netlify, AWS EKS, Máquinas Virtuais Azure), CI/CD (GitHub Actions)',
  },
  es: {
    languages: 'TypeScript, Python, Bash, PHP, Java, C#',
    frontend: 'React (Vite, Next.js), Angular, Vue.js (Vite, Nuxt)',
    backend:
      'TypeScript (Nest.js/Express.js), Python (Quart/Django/FastAPI), PHP (Laravel/WordPress), Java (Spring)',
    testing:
      'Unidad y Funcionalidades (Jest, Vitest, Pytest, PHPUnit, JUnit), UI (Cypress, Playwright), Comportamiento (Cucumber, Pytest-BDD)',
    tooling:
      'Git, Shell basado en Unix, Agentes LLM, Docker, Orquestación de Contenedores (Docker Compose, Kubernetes), Despliegues Cloud (Netlify, AWS EKS, Máquinas Virtuales Azure), CI/CD (GitHub Actions)',
  },
};
