import type { I18n, SkillSet } from './portfolio.interfaces';

export const SKILLS: I18n<SkillSet> = {
  en: {
    languages: 'TypeScript, JavaScript, Python, Bash, PowerShell',
    frontend: 'Angular, React, Next.js, Vite',
    backend: 'Python (Quart/Flask), PHP (Laravel)',
    testing: 'Cypress, Jest, unit tests',
    tooling: 'Git, Linux, Docker, CI/CD (GitHub Actions)',
  },
  pt: {
    languages: 'TypeScript, JavaScript, Python, Bash, PowerShell',
    frontend: 'Angular, React, Next.js, Vite',
    backend: 'Python (Quart/Flask), PHP (Laravel)',
    testing: 'Cypress, Jest, testes unitários',
    tooling: 'Git, Linux, Docker, CI/CD (GitHub Actions)',
  },
};
