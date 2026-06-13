<div align="center">

# 🌐 Portfolio — Aron Barbosa de Oliveira

**Full-Stack Software Developer — TypeScript · Python · Java APIs · Shell Automation**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://aronboliveira-dev.netlify.app/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](./LICENSE)
[![Tests](https://img.shields.io/badge/Tests-583_passing-brightgreen)](#-testing)

[**🔗 Live Site**](https://aronboliveira-dev.netlify.app/) ·
[**📄 View Resume**](https://aronboliveira-dev.netlify.app/en/resume) ·
[**💻 Source Code**](https://github.com/aronboliveira/portfolio-web-aronbo)

</div>

---

## 📸 Overview

A multilingual (English / Portuguese / Spanish) portfolio showcasing professional experience, featured projects with case studies, skills, and certifications. Built with **Angular 21** and deployed on **Netlify** as a primarily **SSG/prerendered static site** so crawlers, SEO tools, social preview bots, and ATS-style scanners receive complete HTML without executing client-side JavaScript.

### Key Features

- 🌍 **Multilingual** — Route-based EN (`/en`) / PT (`/pt`) / ES (`/es`) language switching with Angular Signals
- 📑 **Interactive Resume** — Dedicated resume page with downloadable PDF
- 🔍 **Case Studies** — Narrative project pages (Problem → Constraints → Solution → Outcome)
- 🧾 **SSG-first Rendering** — Known public routes are prerendered at build time and hydrated in the browser
- 🎨 **Responsive** — Mobile-first design across all viewports
- ♿ **Accessible** — Semantic HTML, ARIA landmarks, keyboard navigation, reduced-motion support
- 🔎 **SEO** — Schema.org JSON-LD, canonical URLs, meta tags via `SeoService`
- 🐳 **Dockerized** — Multi-stage build with nginx serving + Cypress E2E in containers

---

## 🧰 Portfolio Skills Snapshot

| Area         | Skills |
| :----------- | :----- |
| **Languages** | TypeScript, Python, Bash, PHP, Java, C# |
| **Frontend** | React (Vite, Next.js), Angular, Vue.js (Vite, Nuxt) |
| **Backend** | TypeScript (Nest.js/Express.js), Python (Quart/Django/FastAPI), PHP (Laravel/WordPress), Java (Spring) |
| **Testing** | Unit and Features (Jest, Vitest, Pytest, PHPUnit, JUnit), UI (Cypress, Playwright), Behavior (Cucumber, Pytest-BDD) |
| **Tooling** | Git, Unix-based Shell, LLM Agents, Docker, Container Orchestration (Docker Compose, Kubernetes), Cloud Platforms (AWS, Azure), CI/CD (GitHub Actions) |

---

## 🏗️ Architecture

```
src/
├── app/
│   ├── home-page/          # Hero, Skills, Projects, Experience, Courses
│   ├── resume-page/        # Full resume with download CTA
│   ├── case-study-page/    # Per-project narrative case studies
│   ├── layout/             # LangLayoutComponent (language shell)
│   ├── data/               # skills.ts, featured-projects.ts, experience.ts, ...
│   └── services/           # LanguageService (signals), SeoService
├── lib/                    # Shared handlers & declarations
└── styles.scss             # Global SCSS
```

### Routes

| Path                                                     | Component                | Description                  |
| :------------------------------------------------------- | :----------------------- | :--------------------------- |
| `/en` · `/pt` · `/es`                                    | `HomePageComponent`      | Main portfolio (lazy-loaded) |
| `/en/resume` · `/pt/resume` · `/es/resume`               | `ResumePageComponent`    | Printable résumé             |
| `/en/projects/:slug` · `/pt/projects/:slug` · `/es/projects/:slug` | `CaseStudyPageComponent` | Project case study           |
| `/`                                                      | —                        | Redirects to `/en`           |

### Rendering Strategy

This project is configured as **SSG-first**. Angular prerenders the known public routes at build time using `RenderMode.Prerender`, then ships the browser bundle for hydration and interactivity. This is intentional for a portfolio: the content is mostly static, so prerendered HTML gives robots, SEO crawlers, social link previewers, and ATS-style scanners the same readable document a browser user sees, without requiring a Node SSR server at request time.

---

## ⚙️ Tech Stack

| Layer                | Technologies                                    |
| :------------------- | :---------------------------------------------- |
| **Framework**        | Angular 21.2, RxJS 7.8, Zone.js 0.15            |
| **Language**         | TypeScript 5.9, SCSS                            |
| **Rendering**        | Angular SSG/prerender via `@angular/ssr`        |
| **Testing**          | Jest 30.3, Cypress 15.11, `jest-preset-angular` |
| **Deployment**       | Netlify CDN serving prerendered static HTML     |
| **Containerization** | Docker (node:22 + nginx:alpine), Docker Compose |
| **CI/Tooling**       | Node 22, npm, Git                               |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **npm** ≥ 10
- **Docker** (optional, for containerized builds)

### Install & Run

```bash
# Clone the repository
git clone https://github.com/aronboliveira/portfolio-web-aronbo.git
cd portfolio-web-aronbo

# Install dependencies
npm ci

# Start the dev server
npx ng serve
# → http://localhost:4200/en
```

### Production Build

```bash
npm run build:ssg
# Output: dist/portfolio-web-aronbo-ng/browser/
```

The production build emits prerendered HTML files for the known route set under `dist/portfolio-web-aronbo-ng/browser/`, including localized home, resume, and project case-study pages.

To preview the built SSG output locally with the same Angular shell fallback used in production:

```bash
npm run serve:ssg -- --port 4200
```

---

## 🐳 Docker

```bash
# Build image (runs tsc + Jest + ng build inside)
docker compose build app

# Start the container
docker compose up app -d
# → http://localhost:4201

# Run Cypress E2E against the container
docker compose up cypress

# Tear down
docker compose down
```

The **Dockerfile** uses a multi-stage approach:

1. **Builder** (node:22-bookworm) — `npm ci`, type-check, Jest, production build
2. **Production** (nginx:stable-alpine) — serves prerendered static HTML/assets with Angular shell fallback

---

## 🧪 Testing

| Runner          |      Tests | Command                                 |
| :-------------- | ---------: | :-------------------------------------- |
| **TypeScript**  | type-check | `npx tsc --noEmit -p tsconfig.app.json` |
| **Jest**        |        378 | `npm test`                              |
| **Cypress E2E** |        205 | `npx cypress run`                       |
| **Total**       |    **583** | —                                       |

```bash
# Type-check
npx tsc --noEmit -p tsconfig.app.json

# Unit tests
npm test

# E2E tests (requires dev server on :4200)
npx cypress run --browser electron

# E2E tests against Docker container
docker compose up cypress
```

### Coverage Thresholds (Jest)

| Metric     | Threshold |
| :--------- | --------: |
| Branches   |       40% |
| Functions  |       60% |
| Lines      |       50% |
| Statements |       50% |

---

## 🗂️ Featured Projects

| Project                  | Stack                             | Description                                                       |
| :----------------------- | :-------------------------------- | :---------------------------------------------------------------- |
| **LLM Prompt Purify**    | Angular, TypeScript, C#           | Browser tool for sanitizing LLM prompts                           |
| **PROSSaúde Client App** | React, TypeScript                 | Multi-step health forms for UFRJ research (400+ inputs)           |
| **CRM Test**             | Nest.js, TypeScript, REST         | CRM API with auth, role-based access, and full test coverage      |
| **Prompt Shape Creator** | Next.js, TypeScript, Tailwind CSS | Image prompt briefing form with SMTP, autosave, and i18n fallback |

---

<details>
<summary><strong>🇧🇷 pt-BR — Sobre o Projeto</strong></summary>

### Portfólio Web — Aron Barbosa de Oliveira

Portfólio pessoal multilíngue (Inglês / Português / Espanhol) desenvolvido com **Angular 21** e implantado na **Netlify**. Apresenta experiência profissional, projetos em destaque com estudos de caso, habilidades técnicas e certificações.

**Funcionalidades:**

- 🌍 Alternância de idioma via rotas (`/en` ↔ `/pt`) com Angular Signals
- 📑 Página de currículo dedicada com download em PDF
- 🔍 Estudos de caso por projeto (Problema → Restrições → Solução → Resultado)
- 🐳 Build Dockerizado com testes automatizados (Jest + Cypress)

🔗 [**Acessar o site**](https://aronboliveira-dev.netlify.app/pt)

</details>

<details>
<summary><strong>🇪🇸 Español — Acerca del Proyecto</strong></summary>

### Portafolio Web — Aron Barbosa de Oliveira

Portafolio personal multilingüe (Inglés / Portugués / Español) construido con **Angular 21** y desplegado en **Netlify**. Muestra experiencia profesional, proyectos destacados con estudios de caso, habilidades técnicas y certificaciones.

🔗 [**Visitar el sitio**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇫🇷 Français — À propos du projet</strong></summary>

### Portfolio Web — Aron Barbosa de Oliveira

Portfolio personnel multilingue (Anglais / Portugais / Espagnol) construit avec **Angular 21** et déployé sur **Netlify**. Présente l'expérience professionnelle, les projets phares avec études de cas, les compétences techniques et les certifications.

🔗 [**Visiter le site**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇷🇺 Русский — О проекте</strong></summary>

### Веб-портфолио — Арон Барбоза де Оливейра

Многоязычное (EN / PT / ES) персональное портфолио на **Angular 21**, развёрнутое на **Netlify**. Демонстрирует профессиональный опыт, избранные проекты с кейсами, технические навыки и сертификации.

🔗 [**Перейти на сайт**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇨🇳 中文 — 关于项目</strong></summary>

### 个人作品集 — Aron Barbosa de Oliveira

基于 **Angular 21** 构建并部署在 **Netlify** 上的多语言（英语/葡萄牙语/西班牙语）个人作品集。展示专业经验、精选项目案例分析、技术技能和认证。

🔗 [**访问网站**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇯🇵 日本語 — プロジェクトについて</strong></summary>

### ウェブポートフォリオ — Aron Barbosa de Oliveira

**Angular 21** で構築し **Netlify** にデプロイした、多言語（英語/ポルトガル語/スペイン語）の個人ポートフォリオです。職務経歴、注目プロジェクトのケーススタディ、技術スキル、資格を掲載しています。

🔗 [**サイトを見る**](https://aronboliveira-dev.netlify.app/en)

</details>

---

## 📄 License

Copyright © 2024–2026 [Aron Barbosa de Oliveira](https://github.com/aronboliveira)

Licensed under the [GNU General Public License v3.0](./LICENSE).
