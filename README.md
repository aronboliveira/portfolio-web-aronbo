<div align="center">

# 🌐 Portfolio — Aron Barbosa de Oliveira

**Full-Stack Software Developer — TypeScript · Python · Shell Automation**

[![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?logo=netlify&logoColor=white)](https://aronboliveira-dev.netlify.app/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](./LICENSE)
[![Tests](https://img.shields.io/badge/Tests-572_passing-brightgreen)](#-testing)

[**🔗 Live Site**](https://aronboliveira-dev.netlify.app/) ·
[**📄 View Resume**](https://aronboliveira-dev.netlify.app/en/resume) ·
[**💻 Source Code**](https://github.com/aronboliveira/portfolio-web-aronbo)

</div>

---

## 📸 Overview

A bilingual (English / Portuguese) portfolio SPA showcasing professional experience, featured projects with case studies, skills, and certifications. Built with **Angular 21**, **server-side rendering**, and deployed on **Netlify**.

### Key Features

- 🌍 **Bilingual** — Route-based EN (`/en`) / PT (`/pt`) language switching with Angular Signals
- 📑 **Interactive Resume** — Dedicated resume page with downloadable PDF
- 🔍 **Case Studies** — Narrative project pages (Problem → Constraints → Solution → Outcome)
- 🎨 **Responsive** — Mobile-first design across all viewports
- ♿ **Accessible** — Semantic HTML, ARIA landmarks, keyboard navigation, reduced-motion support
- 🔎 **SEO** — Schema.org JSON-LD, canonical URLs, meta tags via `SeoService`
- 🐳 **Dockerized** — Multi-stage build with nginx serving + Cypress E2E in containers

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

| Path                                        | Component                | Description                  |
| :------------------------------------------ | :----------------------- | :--------------------------- |
| `/en` · `/pt`                               | `HomePageComponent`      | Main portfolio (lazy-loaded) |
| `/en/resume` · `/pt/resume`                 | `ResumePageComponent`    | Printable résumé             |
| `/en/projects/:slug` · `/pt/projects/:slug` | `CaseStudyPageComponent` | Project case study           |
| `/`                                         | —                        | Redirects to `/en`           |

---

## ⚙️ Tech Stack

| Layer                | Technologies                                    |
| :------------------- | :---------------------------------------------- |
| **Framework**        | Angular 21.2, RxJS 7.8, Zone.js 0.15            |
| **Language**         | TypeScript 5.9, SCSS                            |
| **SSR**              | `@angular/ssr`, `@netlify/angular-runtime`      |
| **Testing**          | Jest 30.3, Cypress 15.11, `jest-preset-angular` |
| **Deployment**       | Netlify (CDN + SPA fallback)                    |
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
npx ng build --configuration production
# Output: dist/portfolio-web-aronbo-ng/browser/
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
2. **Production** (nginx:stable-alpine) — serves static assets with SPA fallback

---

## 🧪 Testing

| Runner          |      Tests | Command                                 |
| :-------------- | ---------: | :-------------------------------------- |
| **TypeScript**  | type-check | `npx tsc --noEmit -p tsconfig.app.json` |
| **Jest**        |        376 | `npm test`                              |
| **Cypress E2E** |        196 | `npx cypress run`                       |
| **Total**       |    **572** | —                                       |

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

| Project                  | Stack                     | Description                                                  |
| :----------------------- | :------------------------ | :----------------------------------------------------------- |
| **LLM Prompt Purify**    | Angular, TypeScript, C#   | Browser tool for sanitizing LLM prompts                      |
| **PROSSaúde Client App** | React, TypeScript         | Multi-step health forms for UFRJ research (400+ inputs)      |
| **CRM Test**             | Nest.js, TypeScript, REST | CRM API with auth, role-based access, and full test coverage |

---

<details>
<summary><strong>🇧🇷 pt-BR — Sobre o Projeto</strong></summary>

### Portfólio Web — Aron Barbosa de Oliveira

Portfólio pessoal bilíngue (Inglês / Português) desenvolvido com **Angular 21** e implantado na **Netlify**. Apresenta experiência profissional, projetos em destaque com estudos de caso, habilidades técnicas e certificações.

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

Portafolio personal bilingüe (Inglés / Portugués) construido con **Angular 21** y desplegado en **Netlify**. Muestra experiencia profesional, proyectos destacados con estudios de caso, habilidades técnicas y certificaciones.

🔗 [**Visitar el sitio**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇫🇷 Français — À propos du projet</strong></summary>

### Portfolio Web — Aron Barbosa de Oliveira

Portfolio personnel bilingue (Anglais / Portugais) construit avec **Angular 21** et déployé sur **Netlify**. Présente l'expérience professionnelle, les projets phares avec études de cas, les compétences techniques et les certifications.

🔗 [**Visiter le site**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇷🇺 Русский — О проекте</strong></summary>

### Веб-портфолио — Арон Барбоза де Оливейра

Двуязычное (EN / PT) персональное портфолио на **Angular 21**, развёрнутое на **Netlify**. Демонстрирует профессиональный опыт, избранные проекты с кейсами, технические навыки и сертификации.

🔗 [**Перейти на сайт**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇨🇳 中文 — 关于项目</strong></summary>

### 个人作品集 — Aron Barbosa de Oliveira

基于 **Angular 21** 构建并部署在 **Netlify** 上的双语（英语/葡萄牙语）个人作品集。展示专业经验、精选项目案例分析、技术技能和认证。

🔗 [**访问网站**](https://aronboliveira-dev.netlify.app/en)

</details>

<details>
<summary><strong>🇯🇵 日本語 — プロジェクトについて</strong></summary>

### ウェブポートフォリオ — Aron Barbosa de Oliveira

**Angular 21** で構築し **Netlify** にデプロイした、バイリンガル（英語/ポルトガル語）の個人ポートフォリオです。職務経歴、注目プロジェクトのケーススタディ、技術スキル、資格を掲載しています。

🔗 [**サイトを見る**](https://aronboliveira-dev.netlify.app/en)

</details>

---

## 📄 License

Copyright © 2024–2026 [Aron Barbosa de Oliveira](https://github.com/aronboliveira)

Licensed under the [GNU General Public License v3.0](./LICENSE).
