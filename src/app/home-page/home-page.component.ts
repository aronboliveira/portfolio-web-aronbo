import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';
import { PERSON_JSONLD } from '../data/constants';
import { FEATURED_PROJECTS } from '../data/featured-projects';
import { SKILLS } from '../data/skills';
import { EXPERIENCE } from '../data/experience';
import { COURSES } from '../data/courses';

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
}
