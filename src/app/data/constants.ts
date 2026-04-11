export const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aron Barbosa de Oliveira',
  jobTitle: 'Full-Stack Software Developer',
  url: 'https://aronboliveira-dev.netlify.app',
  sameAs: [
    'https://github.com/aronboliveira',
    'https://www.linkedin.com/in/aron-b-oliveira/',
  ],
  knowsAbout: [
    'TypeScript',
    'Python',
    'Bash',
    'PHP',
    'Java',
    'C#',
    'Angular',
    'React',
    'Vue.js',
    'Nest.js',
    'Express.js',
    'Django',
    'Laravel',
    'REST API',
    'Automation',
    'LLM',
    'Web Development',
  ],
  email: 'mailto:aron.b.96@gmail.com',
} as const;

export const SOCIAL_LINKS = {
  email: 'mailto:aron.b.96@gmail.com',
  linkedin: 'https://www.linkedin.com/in/aron-b-oliveira/',
  github: 'https://github.com/aronboliveira?tab=repositories',
  githubProfile: 'https://github.com/aronboliveira',
} as const;

export const BASE_URL = 'https://aronboliveira-dev.netlify.app';
