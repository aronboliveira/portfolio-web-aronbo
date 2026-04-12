import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';
import { SeoService } from '../services/seo.service';
import { CASE_STUDIES } from '../data/case-studies';
import type { CaseStudy } from '../data/portfolio.interfaces';

@Component({
  selector: 'app-case-study-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './case-study-page.component.html',
  styleUrls: ['./case-study-page.component.scss'],
})
export class CaseStudyPageComponent implements OnInit {
  lang: Lang = 'en';
  study: CaseStudy | null = null;
  constructor(
    private route: ActivatedRoute,
    public langService: LanguageService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.lang = this.langService.lang();
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const data = CASE_STUDIES[slug];
    if (data) {
      this.study = data[this.lang];
      const isEn = this.lang === 'en';
      const isEs = this.lang === 'es';
      this.seo.update({
        title: `${this.study.title} — Aron Barbosa de Oliveira`,
        description: this.study.outcome,
        canonicalPath: `/${this.lang}/projects/${slug}`,
        lang: isEn ? 'en' : isEs ? 'es-CL' : 'pt-BR',
      });
    }
  }
}
