import type { CaseStudy } from './portfolio.interfaces';
import type { Lang } from '../services/language.service';

export const CASE_STUDIES: Record<string, Record<Lang, CaseStudy>> = {
  'llm-prompt-purify': {
    en: {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      problem:
        'LLM prompts can unintentionally include sensitive user or company data when sent to third-party APIs, creating privacy and compliance risks.',
      constraints:
        'Filtering must be client-side to avoid sending data to any server before sanitization. Must be deterministic and testable. Must handle diverse data formats without breaking prompt structure.',
      solution:
        'A client-side sanitization pipeline that scans prompt text for patterns matching sensitive data (emails, phone numbers, IDs, credentials) and either masks or removes them before the prompt reaches any external API. Rules are configurable and extensible.',
      stack: 'Angular, TypeScript',
      outcome:
        'Reduced risk of accidental data leakage in LLM workflows. Deterministic filtering ensures predictable behavior. Can be integrated as a pre-processing step in any LLM-powered application.',
      liveUrl: 'https://llm-prompt-purify.netlify.app/',
      repoUrl:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    pt: {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      problem:
        'Prompts para LLMs podem incluir dados sensíveis de usuários ou empresas involuntariamente ao serem enviados para APIs de terceiros, criando riscos de privacidade e conformidade.',
      constraints:
        'A filtragem deve ser client-side para evitar envio de dados a qualquer servidor antes da sanitização. Deve ser determinística e testável. Deve lidar com formatos de dados diversos sem quebrar a estrutura do prompt.',
      solution:
        'Um pipeline de sanitização client-side que escaneia o texto do prompt em busca de padrões que correspondam a dados sensíveis (emails, telefones, IDs, credenciais) e os mascara ou remove antes do prompt chegar a qualquer API externa. As regras são configuráveis e extensíveis.',
      stack: 'Angular, TypeScript',
      outcome:
        'Risco reduzido de vazamento acidental de dados em fluxos de trabalho com LLM. Filtragem determinística garante comportamento previsível. Pode ser integrado como etapa de pré-processamento em qualquer aplicação com LLM.',
      liveUrl: 'https://llm-prompt-purify.netlify.app/',
      repoUrl:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
    es: {
      slug: 'llm-prompt-purify',
      title: 'LLM Prompt Purify',
      problem:
        'Los prompts para LLMs pueden incluir datos sensibles de usuarios o empresas involuntariamente al ser enviados a APIs de terceros, generando riesgos de privacidad y cumplimiento.',
      constraints:
        'El filtrado debe ser del lado del cliente para evitar enviar datos a cualquier servidor antes de la sanitización. Debe ser determinístico y verificable. Debe manejar formatos de datos diversos sin romper la estructura del prompt.',
      solution:
        'Un pipeline de sanitización del lado del cliente que escanea el texto del prompt en busca de patrones que coincidan con datos sensibles (correos, teléfonos, IDs, credenciales) y los enmascara o elimina antes de que el prompt llegue a cualquier API externa. Las reglas son configurables y extensibles.',
      stack: 'Angular, TypeScript',
      outcome:
        'Riesgo reducido de filtración accidental de datos en flujos de trabajo con LLM. El filtrado determinístico garantiza un comportamiento predecible. Se puede integrar como etapa de preprocesamiento en cualquier aplicación con LLM.',
      liveUrl: 'https://llm-prompt-purify.netlify.app/',
      repoUrl:
        'https://github.com/aronboliveira/llm-prompt-purify/tree/develop',
    },
  },
  'prossaude-client-app': {
    en: {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      problem:
        'A university extension project in health sciences needed a reliable web application for complex form filling, data management, and interactive scheduling used by non-engineering stakeholders.',
      constraints:
        'Built for real users with varying technical literacy. Required stability over novelty. Incremental improvements based on stakeholder feedback. Documentation and handoff readiness.',
      solution:
        'A client-side application supporting RESTful CRUD operations for complex health forms, interactive synchronized schedules, login subsystems, and tabulation with automated index calculation. Focused on usability and data flow reliability.',
      stack: 'React, TypeScript',
      outcome:
        'Deployed and actively used by the PROSSaúde university extension program at UFRJ. Stable, maintainable, and documented for handoff. Demonstrates working with non-engineering stakeholders on a real product.',
      liveUrl: 'https://prossaude-client.netlify.app',
      repoUrl: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    pt: {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      problem:
        'Um projeto de extensão universitária em ciências da saúde precisava de uma aplicação web confiável para preenchimento de formulários complexos, gestão de dados e agendamento interativo utilizado por stakeholders não-técnicos.',
      constraints:
        'Construído para usuários reais com diferentes níveis de letramento técnico. Estabilidade priorizada sobre novidade. Melhorias incrementais baseadas em feedback de stakeholders. Prontidão de documentação e handoff.',
      solution:
        'Uma aplicação client-side suportando operações CRUD RESTful para formulários complexos de saúde, agendas interativas sincronizadas, subsistemas de login e tabelamento com cálculo automatizado de índices. Foco em usabilidade e confiabilidade de fluxo de dados.',
      stack: 'React, TypeScript',
      outcome:
        'Implantado e ativamente usado pelo programa de extensão PROSSaúde da UFRJ. Estável, manutenível e documentado para handoff. Demonstra trabalho com stakeholders não-técnicos em um produto real.',
      liveUrl: 'https://prossaude-client.netlify.app',
      repoUrl: 'https://github.com/aronboliveira/prossaude-client-app',
    },
    es: {
      slug: 'prossaude-client-app',
      title: 'PROSSaúde Client App',
      problem:
        'Un proyecto de extensión universitaria en ciencias de la salud necesitaba una aplicación web confiable para el llenado de formularios complejos, gestión de datos y agendamiento interactivo utilizado por interesados no técnicos.',
      constraints:
        'Construido para usuarios reales con distintos niveles de alfabetización técnica. Se priorizó la estabilidad sobre la novedad. Mejoras incrementales basadas en retroalimentación de interesados. Preparación de documentación y traspaso.',
      solution:
        'Una aplicación del lado del cliente que soporta operaciones CRUD RESTful para formularios complejos de salud, agendas interactivas sincronizadas, subsistemas de login y tabulación con cálculo automatizado de índices. Enfoque en usabilidad y confiabilidad del flujo de datos.',
      stack: 'React, TypeScript',
      outcome:
        'Desplegado y activamente utilizado por el programa de extensión PROSSaúde de la UFRJ. Estable, mantenible y documentado para traspaso. Demuestra trabajo con interesados no técnicos en un producto real.',
      liveUrl: 'https://prossaude-client.netlify.app',
      repoUrl: 'https://github.com/aronboliveira/prossaude-client-app',
    },
  },
  'crm-test': {
    en: {
      slug: 'crm-test',
      title: 'CRM Test',
      problem:
        'Needed a portfolio project demonstrating full-stack breadth: authentication, CRUD, API integration, testing, and deployment-ready architecture in a single coherent application.',
      constraints:
        'Must be demonstrably functional end-to-end. Tests must cover critical paths. Architecture must be clean enough to serve as a code sample for hiring evaluation.',
      solution:
        'A CRM application implementing authentication flows, CRUD operations with database integration, RESTful API endpoints, and test coverage. Structured for clarity and deployment readiness.',
      stack: 'Full-stack, REST, Database, Auth, Testing, CI/CD',
      outcome:
        'Serves as a full-stack signal for recruiters. Demonstrates end-to-end capability from auth to deployment. Clean architecture suitable for technical evaluation.',
      liveUrl: 'https://github.com/aronboliveira/crm-test',
      repoUrl: 'https://github.com/aronboliveira/crm-test',
    },
    pt: {
      slug: 'crm-test',
      title: 'CRM Test',
      problem:
        'Necessidade de um projeto de portfólio demonstrando amplitude full-stack: autenticação, CRUD, integração de API, testes e arquitetura pronta para deploy em uma aplicação coerente.',
      constraints:
        'Deve ser demonstravelmente funcional de ponta a ponta. Testes devem cobrir caminhos críticos. Arquitetura deve ser limpa o suficiente para servir como amostra de código para avaliação de contratação.',
      solution:
        'Uma aplicação CRM implementando fluxos de autenticação, operações CRUD com integração de banco de dados, endpoints de API RESTful e cobertura de testes. Estruturado para clareza e prontidão de deploy.',
      stack: 'Full-stack, REST, Banco de Dados, Auth, Testes, CI/CD',
      outcome:
        'Serve como sinal de full-stack para recrutadores. Demonstra capacidade end-to-end de auth a deploy. Arquitetura limpa adequada para avaliação técnica.',
      liveUrl: 'https://github.com/aronboliveira/crm-test',
      repoUrl: 'https://github.com/aronboliveira/crm-test',
    },
    es: {
      slug: 'crm-test',
      title: 'CRM Test',
      problem:
        'Necesidad de un proyecto de portafolio demostrando amplitud full-stack: autenticación, CRUD, integración de API, pruebas y arquitectura lista para despliegue en una aplicación coherente.',
      constraints:
        'Debe ser demostrablemente funcional de punta a punta. Las pruebas deben cubrir caminos críticos. La arquitectura debe ser lo suficientemente limpia para servir como muestra de código para evaluación de contratación.',
      solution:
        'Una aplicación CRM implementando flujos de autenticación, operaciones CRUD con integración de base de datos, endpoints de API RESTful y cobertura de pruebas. Estructurado para claridad y preparación de despliegue.',
      stack: 'Full-stack, REST, Base de Datos, Auth, Pruebas, CI/CD',
      outcome:
        'Sirve como señal de full-stack para reclutadores. Demuestra capacidad de punta a punta desde autenticación hasta despliegue. Arquitectura limpia adecuada para evaluación técnica.',
      liveUrl: 'https://github.com/aronboliveira/crm-test',
      repoUrl: 'https://github.com/aronboliveira/crm-test',
    },
  },
  'prompt-shape-creator': {
    en: {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      problem:
        'Image-generation workflows often lack a structured way to collect detailed prompt briefings from clients. Requests arrive as scattered messages, missing critical details about scene, characters, style, and technical preferences.',
      constraints:
        'Must work as a standalone form without requiring user accounts. Email delivery must be reliable, with a clipboard fallback when the API is unavailable. Form state must be protected against accidental page closure. Must support bilingual content (EN/PT) without server-side rendering for language detection.',
      solution:
        'A Next.js 16 App Router application with a structured briefing form split into logical sections (scene, characters, style, technical prefs, references). Uses React 19 useActionState + useTransition for non-blocking submission, nodemailer for SMTP delivery, and a custom autosave hook that persists form state to sessionStorage with beforeunload protection. Client-side language detection auto-switches between English and Portuguese.',
      stack: 'Next.js 16, TypeScript, React 19, Tailwind CSS v4, nodemailer',
      outcome:
        'Streamlined prompt collection with zero lost briefings. Clipboard fallback ensures delivery even when email fails. Autosave prevents data loss from accidental navigation. Accessible, print-friendly, and responsive across devices.',
      liveUrl: 'https://prompt-shape-creator.netlify.app/',
      repoUrl: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
    pt: {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      problem:
        'Fluxos de geração de imagens frequentemente carecem de uma forma estruturada para coletar briefings detalhados de prompts dos clientes. Solicitações chegam como mensagens espalhadas, sem detalhes críticos sobre cenário, personagens, estilo e preferências técnicas.',
      constraints:
        'Deve funcionar como formulário standalone sem exigir contas de usuário. O envio por e-mail deve ser confiável, com fallback para clipboard quando a API estiver indisponível. O estado do formulário deve ser protegido contra fechamento acidental da página. Deve suportar conteúdo bilíngue (EN/PT) sem renderização server-side para detecção de idioma.',
      solution:
        'Uma aplicação Next.js 16 (App Router) com formulário de briefing estruturado em seções lógicas (cenário, personagens, estilo, preferências técnicas, referências). Usa useActionState + useTransition do React 19 para envio não-bloqueante, nodemailer para SMTP, e um hook de autosave customizado que persiste o estado em sessionStorage com proteção beforeunload. Detecção de idioma client-side alterna automaticamente entre inglês e português.',
      stack: 'Next.js 16, TypeScript, React 19, Tailwind CSS v4, nodemailer',
      outcome:
        'Coleta de prompts simplificada sem briefings perdidos. Fallback para clipboard garante entrega mesmo quando o e-mail falha. Autosave previne perda de dados por navegação acidental. Acessível, amigável para impressão e responsivo em todos os dispositivos.',
      liveUrl: 'https://prompt-shape-creator.netlify.app/',
      repoUrl: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
    es: {
      slug: 'prompt-shape-creator',
      title: 'Prompt Shape Creator',
      problem:
        'Los flujos de generación de imágenes frecuentemente carecen de una forma estructurada para recopilar briefings detallados de prompts de los clientes. Las solicitudes llegan como mensajes dispersos, sin detalles críticos sobre escena, personajes, estilo y preferencias técnicas.',
      constraints:
        'Debe funcionar como formulario independiente sin requerir cuentas de usuario. El envío por correo electrónico debe ser confiable, con fallback para portapapeles cuando la API no esté disponible. El estado del formulario debe estar protegido contra cierre accidental de la página. Debe soportar contenido bilingüe (EN/PT) sin renderización del lado del servidor para detección de idioma.',
      solution:
        'Una aplicación Next.js 16 (App Router) con formulario de briefing estructurado en secciones lógicas (escena, personajes, estilo, preferencias técnicas, referencias). Usa useActionState + useTransition de React 19 para envío no bloqueante, nodemailer para SMTP, y un hook de autoguardado personalizado que persiste el estado en sessionStorage con protección beforeunload. Detección de idioma del lado del cliente alterna automáticamente entre inglés y portugués.',
      stack: 'Next.js 16, TypeScript, React 19, Tailwind CSS v4, nodemailer',
      outcome:
        'Recopilación de prompts simplificada sin briefings perdidos. Fallback para portapapeles garantiza entrega incluso cuando el correo falla. El autoguardado previene pérdida de datos por navegación accidental. Accesible, amigable para impresión y responsivo en todos los dispositivos.',
      liveUrl: 'https://prompt-shape-creator.netlify.app/',
      repoUrl: 'https://github.com/aronboliveira/prompt-eng-form-basic-pub',
    },
  },
};
