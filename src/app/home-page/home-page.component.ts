import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';
import { SeoService } from '../services/seo.service';
import { PERSON_JSONLD } from '../data/constants';
import { FEATURED_PROJECTS } from '../data/featured-projects';
import { SKILLS } from '../data/skills';
import { EXPERIENCE } from '../data/experience';
import { COURSES } from '../data/courses';
import type { ExperienceEntry } from '../data/portfolio.interfaces';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  lang: Lang = 'en';
  isBrowser: boolean;
  showAllCourses = false;
  openExperienceIndex = 0;
  private projectsSectionObserver?: IntersectionObserver;
  private projectsSectionWasVisible = false;

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
    const isEs = this.lang === 'es';
    this.seo.update({
      title: isEn
        ? 'Aron Barbosa de Oliveira — Full-Stack Developer (TypeScript, Python, Shell)'
        : isEs
          ? 'Aron Barbosa de Oliveira — Desarrollador Full-stack (TypeScript, Python, Shell)'
          : 'Aron Barbosa de Oliveira — Desenvolvedor Full-stack (TypeScript, Python, Shell)',
      description: isEn
        ? 'Full-stack software developer specializing in TypeScript, Python, automation, measured reporting workflows, internal tools, web applications, AI integration, and cloud deployments.'
        : isEs
          ? 'Desarrollador full-stack especializado en TypeScript, Python, automatización, reporting medible, herramientas internas, aplicaciones web, integración con IA y despliegues cloud.'
          : 'Desenvolvedor full-stack especializado em TypeScript, Python, automação, reporting mensurável, ferramentas internas, aplicações web, integração com IA e deploys cloud.',
      canonicalPath: `/${this.lang}`,
      lang: isEn ? 'en' : isEs ? 'es-CL' : 'pt-BR',
      jsonLd: PERSON_JSONLD,
    });
  }

  ngOnDestroy(): void {
    this.destroyProjectsSectionObserver();
  }

  get projects() {
    return FEATURED_PROJECTS[this.lang];
  }

  get currentSkills() {
    return SKILLS[this.lang];
  }

  get currentExperience() {
    return EXPERIENCE[this.lang];
  }

  get currentCourses() {
    const all = COURSES[this.lang];
    return this.showAllCourses ? all : all.slice(0, 5);
  }

  toggleCourses(): void {
    this.showAllCourses = !this.showAllCourses;
  }

  onProjectsCtaClick(event: MouseEvent): void {
    if (!this.isBrowser || this.shouldLetBrowserHandleClick(event)) return;

    const section = document.getElementById('featured-projects');
    if (!section) return;

    event.preventDefault();
    this.setProjectsFragment();
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.observeProjectsSectionUntilExit(section);
  }

  toggleExperience(index: number): void {
    this.openExperienceIndex =
      this.openExperienceIndex === index ? -1 : index;
  }

  isExperienceOpen(index: number): boolean {
    return this.openExperienceIndex === index;
  }

  descriptionParagraphs(description: string | string[]): string[] {
    return Array.isArray(description) ? description : [description];
  }

  experienceLinkLabel(experience: ExperienceEntry): string {
    const isSite = this.isSiteExperience(experience);

    if (this.lang === 'es') {
      return isSite ? 'Abrir sitio' : 'Abrir proyecto';
    }

    if (this.lang === 'pt') {
      return isSite ? 'Abrir site' : 'Abrir projeto';
    }

    return isSite ? 'Open Site' : 'Open project';
  }

  experienceToggleLabel(index: number, title: string): string {
    const action = this.isExperienceOpen(index)
      ? this.lang === 'es'
        ? 'Contraer experiencia'
        : this.lang === 'pt'
          ? 'Recolher experiência'
          : 'Collapse experience'
      : this.lang === 'es'
        ? 'Expandir experiencia'
        : this.lang === 'pt'
          ? 'Expandir experiência'
          : 'Expand experience';

    return `${action}: ${title}`;
  }

  private isSiteExperience(experience: ExperienceEntry): boolean {
    return (
      experience.href === 'https://prestech.com.br/site/' ||
      experience.href ===
        'https://blog.organolab.com.br/blog/calculadora-de-solo/'
    );
  }

  private shouldLetBrowserHandleClick(event: MouseEvent): boolean {
    return (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    );
  }

  private setProjectsFragment(): void {
    const nextUrl = `/${this.lang}${window.location.search}#featured-projects`;
    window.history.pushState(window.history.state, '', nextUrl);
  }

  private observeProjectsSectionUntilExit(section: HTMLElement): void {
    this.destroyProjectsSectionObserver();
    this.projectsSectionWasVisible = false;

    if (typeof window.IntersectionObserver !== 'function') return;

    this.projectsSectionObserver = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.target === section);
      if (!entry) return;

      if (!this.hasProjectsFragment()) {
        this.destroyProjectsSectionObserver();
        return;
      }

      if (entry.isIntersecting) {
        this.projectsSectionWasVisible = true;
        return;
      }

      if (this.projectsSectionWasVisible) {
        this.removeProjectsFragment();
        this.destroyProjectsSectionObserver();
      }
    });
    this.projectsSectionObserver.observe(section);
  }

  private hasProjectsFragment(): boolean {
    return window.location.hash === '#featured-projects';
  }

  private removeProjectsFragment(): void {
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}${window.location.search}`,
    );
  }

  private destroyProjectsSectionObserver(): void {
    this.projectsSectionObserver?.disconnect();
    this.projectsSectionObserver = undefined;
    this.projectsSectionWasVisible = false;
  }
}
