import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';

const PERSON_JSONLD = {
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
    'JavaScript',
    'Python',
    'Bash',
    'PowerShell',
    'Angular',
    'React',
    'Next.js',
    'REST API',
    'Automation',
    'LLM',
    'Web Development',
  ],
  email: 'mailto:aron.b.96@gmail.com',
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  lang: 'en' | 'pt' = 'en';
  isBrowser: boolean;

  featuredProjects = {
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

  skills = {
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

  experience = {
    en: [
      {
        title: 'Nova Prestech',
        date: 'December 2024 — Present',
        description:
          'Fullstack Development using Laravel, Flask, and React.js; maintenance of Operating Systems based on Debian and Windows; optimization of Data Processing; Technical Support for Web Systems, focusing on CMSs and ERPs.',
        href: 'https://prestech.com.br/site/',
      },
      {
        title: 'University Extension Program PROSSaúde — UFRJ',
        date: 'August 2023 — Present',
        description:
          'Fullstack development and maintenance of CRUDs based on RESTful architecture for complex forms, including interactive schedules, login subsystems, and tabulation with automated index calculation.',
        href: 'https://prossaude-client.netlify.app',
      },
      {
        title: 'Tia da Praia da Bica — Digital Menu',
        date: 'September 2025',
        description:
          'Frontend Development with Next.js and maintenance of the Digital Menu for a small local business in Rio de Janeiro.',
        href: 'https://drinks-tia-pdb.netlify.app/',
      },
      {
        title: 'Ana Doces — Creative Confectionery',
        date: 'June 2024',
        description:
          'Frontend Development with Create React App and maintenance of the Digital Menu.',
        href: 'https://anadocesapp.netlify.app',
      },
      {
        title: 'Organo Lab — Soil Calculator',
        date: 'August 2024 — September 2024',
        description:
          'Development of a Soil Calculator using WordPress and React for Organo Labs E-commerce.',
        href: 'https://blog.organolab.com.br/calculadora-de-solo/',
      },
    ],
    pt: [
      {
        title: 'Nova Prestech',
        date: 'Dezembro 2024 — Presente',
        description:
          'Desenvolvimento Fullstack baseado em Laravel, Flask e React.js; manutenção de Sistemas Operacionais baseados em Debian e Windows; otimização de Processamento de dados; Suporte Técnico para Sistemas Web, com foco em CMSs e ERPs.',
        href: 'https://prestech.com.br/site/',
      },
      {
        title: 'Projeto de Extensão PROSSaúde — UFRJ',
        date: 'Agosto 2023 — Presente',
        description:
          'Desenvolvimento fullstack e manutenção de CRUDs com base RESTful para preenchimento ágil de formulários complexos, incluindo agendas interativas e sincronizadas, subsistemas de login e tabelamento com cálculo automatizado de índices.',
        href: 'https://prossaude-client.netlify.app',
      },
      {
        title: 'Tia da Praia da Bica — Cardápio Digital',
        date: 'Setembro 2025',
        description:
          'Desenvolvimento Frontend com Next.js e manutenção do Cardápio Digital para pequeno negócio local no Rio de Janeiro.',
        href: 'https://drinks-tia-pdb.netlify.app/',
      },
      {
        title: 'Ana Doces — Confeitaria Criativa',
        date: 'Junho 2024',
        description:
          'Desenvolvimento Frontend com Create React App e manutenção do Cardápio Digital.',
        href: 'https://anadocesapp.netlify.app',
      },
      {
        title: 'Organo Lab — Calculadora de Solo',
        date: 'Agosto 2024 — Setembro 2024',
        description:
          'Desenvolvimento de Calculadora de insumos em WordPress e React para o E-commerce da Organo Labs.',
        href: 'https://blog.organolab.com.br/calculadora-de-solo/',
      },
    ],
  };

  courses = {
    en: [
      {
        title: 'Introduction to Cybersecurity — Cisco',
        date: '09/2023',
        instructor: 'Laura Quintana',
        href: 'https://drive.google.com/file/d/16nTFgxqwqttl5aZcwavJQKb0HVpnZU89/view?usp=sharing',
      },
      {
        title: 'Java Online Course — Rocketseat',
        date: '10/2023',
        instructor: 'Mayk Brito',
        href: 'https://app.rocketseat.com.br/certificates/26dd9160-febb-4465-8b35-fa3fb9ece848',
      },
      {
        title: 'Java Essentials — Linux Tips',
        date: '10/2023',
        instructor: 'Kamila Santos',
        href: 'https://www.linuxtips.io/certificate_v2/64c39e086ecad6568408a59e/user/651c733fce4e2410560f688a',
      },
      {
        title: 'Mastering TypeScript — 2023 Edition',
        date: '12/2023',
        instructor: 'Colt Steele',
        href: 'https://udemy.com/certificate/UC-45c23af3-87fb-406b-9724-172d33184118',
      },
      {
        title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
        date: '04/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-129ff335-210e-4ff9-a05c-8625756db5d0/',
      },
      {
        title: 'Build Responsive Real-World Websites with HTML and CSS',
        date: '05/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-118ebff4-6cdb-4ea0-8da4-468b98edfa09/',
      },
      {
        title: 'The Complete 2024 Web Development Bootcamp!',
        date: '05/2024',
        instructor: 'Angela Yu',
        href: 'https://www.udemy.com/certificate/UC-90804997-c6c8-4654-b301-68cf3ce6273d/',
      },
      {
        title: 'The Git & Github Bootcamp',
        date: '08/2024',
        instructor: 'Colt Steele',
        href: 'https://www.udemy.com/certificate/UC-c1f06a41-c9fa-4d0e-8bb7-2811a00b1e98/',
      },
      {
        title: 'C++ Fundamentals: Game Programming for Beginners',
        date: '09/2024',
        instructor: 'Stephen Ulibarri',
        href: 'https://www.udemy.com/certificate/UC-293c7fee-978b-4cc2-ba7e-158846cba77c/',
      },
      {
        title: 'The Ultimate React Course 2024: React, Next.js, Redux & More',
        date: '10/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-a6a9d297-27c0-4295-a081-6e2000acf3cf/',
      },
      {
        title: 'Advanced CSS and Sass',
        date: '11/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-682780af-b769-4987-840a-9db2e943662c/',
      },
    ],
    pt: [
      {
        title: 'Introduction to Cybersecurity — Cisco',
        date: '09/2023',
        instructor: 'Laura Quintana',
        href: 'https://drive.google.com/file/d/16nTFgxqwqttl5aZcwavJQKb0HVpnZU89/view?usp=sharing',
      },
      {
        title: 'Curso Online de Java — Rocketseat',
        date: '10/2023',
        instructor: 'Mayk Brito',
        href: 'https://app.rocketseat.com.br/certificates/26dd9160-febb-4465-8b35-fa3fb9ece848',
      },
      {
        title: 'Java Essentials — Linux Tips',
        date: '10/2023',
        instructor: 'Kamila Santos',
        href: 'https://www.linuxtips.io/certificate_v2/64c39e086ecad6568408a59e/user/651c733fce4e2410560f688a',
      },
      {
        title: 'Mastering TypeScript — 2023 Edition',
        date: '12/2023',
        instructor: 'Colt Steele',
        href: 'https://udemy.com/certificate/UC-45c23af3-87fb-406b-9724-172d33184118',
      },
      {
        title: 'The Complete JavaScript Course 2024: From Zero to Expert!',
        date: '04/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-129ff335-210e-4ff9-a05c-8625756db5d0/',
      },
      {
        title: 'Build Responsive Real-World Websites with HTML and CSS',
        date: '05/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-118ebff4-6cdb-4ea0-8da4-468b98edfa09/',
      },
      {
        title: 'The Complete 2024 Web Development Bootcamp!',
        date: '05/2024',
        instructor: 'Angela Yu',
        href: 'https://www.udemy.com/certificate/UC-90804997-c6c8-4654-b301-68cf3ce6273d/',
      },
      {
        title: 'The Git & Github Bootcamp',
        date: '08/2024',
        instructor: 'Colt Steele',
        href: 'https://www.udemy.com/certificate/UC-c1f06a41-c9fa-4d0e-8bb7-2811a00b1e98/',
      },
      {
        title: 'C++ Fundamentals: Game Programming for Beginners',
        date: '09/2024',
        instructor: 'Stephen Ulibarri',
        href: 'https://www.udemy.com/certificate/UC-293c7fee-978b-4cc2-ba7e-158846cba77c/',
      },
      {
        title: 'The Ultimate React Course 2024: React, Next.js, Redux & More',
        date: '10/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-a6a9d297-27c0-4295-a081-6e2000acf3cf/',
      },
      {
        title: 'Advanced CSS and Sass',
        date: '11/2024',
        instructor: 'Jonas Schmedtmann',
        href: 'https://www.udemy.com/certificate/UC-682780af-b769-4987-840a-9db2e943662c/',
      },
    ],
  };

  showAllCourses = false;

  constructor(
    public langService: LanguageService,
    private seo: SeoService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.lang = this.langService.lang();
    const isEn = this.lang === 'en';
    this.seo.update({
      title: isEn
        ? 'Aron Barbosa de Oliveira — Full-Stack Developer (TypeScript, Python, Shell)'
        : 'Aron Barbosa de Oliveira — Desenvolvedor Full-stack (TypeScript, Python, Shell)',
      description: isEn
        ? 'Full-stack software developer specializing in TypeScript, Python, and Shell automation. Building internal tools, web applications, and AI integration.'
        : 'Desenvolvedor full-stack especializado em TypeScript, Python e automação Shell. Construindo ferramentas internas, aplicações web e integração com IA.',
      canonicalPath: isEn ? '/en' : '/pt',
      lang: isEn ? 'en' : 'pt-BR',
      jsonLd: PERSON_JSONLD,
    });
  }

  get projects() {
    return this.featuredProjects[this.lang];
  }

  get currentSkills() {
    return this.skills[this.lang];
  }

  get currentExperience() {
    return this.experience[this.lang];
  }

  get currentCourses() {
    const all = this.courses[this.lang];
    return this.showAllCourses ? all : all.slice(0, 5);
  }

  toggleCourses(): void {
    this.showAllCourses = !this.showAllCourses;
  }
}
