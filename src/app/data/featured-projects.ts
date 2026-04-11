import type { I18n, FeaturedProject } from './portfolio.interfaces';

export const FEATURED_PROJECTS: I18n<FeaturedProject[]> = {
  en: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Client-side sanitization to reduce leakage of sensitive data to third-party LLM APIs. Informed by hands-on LLM Agent orchestration at Prestech.',
      stacks: ['Angular', 'TypeScript', 'C#'],
      href: 'https://llm-prompt-purify.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      outcome:
        'Client-side application supporting a real university extension project with complex forms, RESTful data flow, and automated index calculations.',
      stacks: ['React', 'TypeScript'],
      href: 'https://prossaude-client.netlify.app',
      repoHref: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    {
      slug: 'crm-test',
      title: 'CRM Test',
      outcome:
        'Full-stack CRM with Nest.js backend demonstrating auth, CRUD, API integration, tests, and deployment-ready architecture.',
      stacks: ['Nest.js', 'TypeScript', 'REST', 'Auth', 'Testing'],
      href: 'https://github.com/aronboliveira/crm-test',
      repoHref: 'https://github.com/aronboliveira/crm-test',
    },
    {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      outcome:
        'Image-generation prompt briefing form with SMTP email delivery, clipboard fallback, autosave, and bilingual auto-detection. Built with modern React patterns (useActionState, useTransition).',
      stacks: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      href: 'https://prompt-shape-creator.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  ],
  pt: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Sanitização client-side para reduzir vazamento de dados sensíveis para APIs de LLM de terceiros. Desenvolvido com base em experiência prática com orquestração de Agentes LLM na Prestech.',
      stacks: ['Angular', 'TypeScript', 'C#'],
      href: 'https://llm-prompt-purify.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      outcome:
        'Aplicação client-side de suporte a projeto de extensão universitária real com formulários complexos, fluxo de dados RESTful e cálculo automatizado de índices.',
      stacks: ['React', 'TypeScript'],
      href: 'https://prossaude-client.netlify.app',
      repoHref: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    {
      slug: 'crm-test',
      title: 'CRM Test',
      outcome:
        'CRM full-stack com backend Nest.js demonstrando autenticação, CRUD, integração de API, testes e arquitetura pronta para deploy.',
      stacks: ['Nest.js', 'TypeScript', 'REST', 'Auth', 'Testing'],
      href: 'https://github.com/aronboliveira/crm-test',
      repoHref: 'https://github.com/aronboliveira/crm-test',
    },
    {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      outcome:
        'Formulário de briefing para prompts de geração de imagens com envio via SMTP, fallback para clipboard, autosave e detecção automática de idioma. Construído com padrões modernos de React (useActionState, useTransition).',
      stacks: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      href: 'https://prompt-shape-creator.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  ],
};
