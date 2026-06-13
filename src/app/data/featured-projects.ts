import type { I18n, FeaturedProject } from './portfolio.interfaces';

export const FEATURED_PROJECTS: I18n<FeaturedProject[]> = {
  en: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Client-side sanitization used in company workflows to secure interactions with LLM agents and web-based LLM tools by reducing sensitive-data leakage to third-party APIs.',
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
        'Image-generation prompt briefing form used in company workflows to structure creative requests, improve visual output quality, and produce usable image drafts roughly 200% faster.',
      stacks: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      href: 'https://prompt-shape-creator.netlify.app/',
      repoHref: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  ],
  pt: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Sanitização client-side usada em fluxos corporativos para proteger interações com agentes LLM e ferramentas LLM web, reduzindo vazamento de dados sensíveis para APIs de terceiros.',
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
        'Formulário de briefing para prompts de geração de imagens usado em fluxos corporativos para estruturar pedidos criativos, melhorar a qualidade visual e produzir rascunhos úteis cerca de 200% mais rápido.',
      stacks: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      href: 'https://prompt-shape-creator.netlify.app/',
      repoHref: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  ],
  es: [
    {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      outcome:
        'Sanitización del lado del cliente usada en flujos corporativos para proteger interacciones con agentes LLM y herramientas LLM web, reduciendo la filtración de datos sensibles hacia APIs de terceros.',
      stacks: ['Angular', 'TypeScript', 'C#'],
      href: 'https://llm-prompt-purify.netlify.app/',
      repoHref:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      outcome:
        'Aplicación del lado del cliente de apoyo a un proyecto de extensión universitaria real con formularios complejos, flujo de datos RESTful y cálculo automatizado de índices.',
      stacks: ['React', 'TypeScript'],
      href: 'https://prossaude-client.netlify.app',
      repoHref: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    {
      slug: 'crm-test',
      title: 'CRM Test',
      outcome:
        'CRM full-stack con backend Nest.js demostrando autenticación, CRUD, integración de API, pruebas y arquitectura lista para despliegue.',
      stacks: ['Nest.js', 'TypeScript', 'REST', 'Auth', 'Testing'],
      href: 'https://github.com/aronboliveira/crm-test',
      repoHref: 'https://github.com/aronboliveira/crm-test',
    },
    {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      outcome:
        'Formulario de briefing para prompts de generación de imágenes usado en flujos corporativos para estructurar pedidos creativos, mejorar la calidad visual y producir borradores útiles cerca de un 200% más rápido.',
      stacks: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
      href: 'https://prompt-shape-creator.netlify.app/',
      repoHref: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  ],
};
