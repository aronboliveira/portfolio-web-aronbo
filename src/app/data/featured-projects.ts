import type { I18n, FeaturedProject } from './portfolio.interfaces';

export const FEATURED_PROJECTS: I18n<FeaturedProject[]> = {
  en: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Client-side sanitization to reduce leakage of sensitive data to third-party LLM APIs.',
      stacks: ['Angular', 'TypeScript'],
      href: 'https://llm-prompt-purify.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      outcome:
        'Client-side application supporting a real university extension project with complex forms and data flow.',
      stacks: ['React', 'TypeScript'],
      href: 'https://prossaude-client.netlify.app',
      repoHref: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    {
      slug: 'crm-test',
      title: 'CRM Test',
      outcome:
        'Portfolio CRM demonstrating auth, CRUD, API integration, tests, and deployment-ready architecture.',
      stacks: ['Full-stack', 'REST', 'Auth', 'Testing'],
      href: 'https://github.com/aronboliveira/crm-test',
      repoHref: 'https://github.com/aronboliveira/crm-test',
    },
  ],
  pt: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Sanitização client-side para reduzir vazamento de dados sensíveis para APIs de LLM de terceiros.',
      stacks: ['Angular', 'TypeScript'],
      href: 'https://llm-prompt-purify.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      outcome:
        'Aplicação client-side de suporte a projeto de extensão universitária real com formulários complexos e fluxo de dados.',
      stacks: ['React', 'TypeScript'],
      href: 'https://prossaude-client.netlify.app',
      repoHref: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    {
      slug: 'crm-test',
      title: 'CRM Test',
      outcome:
        'CRM demonstrando autenticação, CRUD, integração de API, testes e arquitetura pronta para deploy.',
      stacks: ['Full-stack', 'REST', 'Auth', 'Testing'],
      href: 'https://github.com/aronboliveira/crm-test',
      repoHref: 'https://github.com/aronboliveira/crm-test',
    },
  ],
};
