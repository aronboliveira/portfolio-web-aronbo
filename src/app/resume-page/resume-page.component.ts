import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
})
export class ResumePageComponent implements OnInit {
  lang: Lang = 'en';

  constructor(
    public langService: LanguageService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    document.body.style.backgroundColor = '#1A1A34';
    this.lang = this.langService.lang();
    const isEn = this.lang === 'en';
    const isEs = this.lang === 'es';
    this.seo.update({
      title: isEn
        ? 'Resume — Aron Barbosa de Oliveira — Full-Stack Developer'
        : isEs
          ? 'Currículum — Aron Barbosa de Oliveira — Desarrollador Full-Stack'
          : 'Currículo — Aron Barbosa de Oliveira — Desenvolvedor Full-stack',
      description: isEn
        ? 'Resume of Aron Barbosa de Oliveira, Full-stack Software Developer. TypeScript, Python, Shell Automation.'
        : isEs
          ? 'Currículum de Aron Barbosa de Oliveira, Desarrollador Full-Stack. TypeScript, Python, Automatización Shell.'
          : 'Currículo de Aron Barbosa de Oliveira, Desenvolvedor Full-stack. TypeScript, Python, Automação Shell.',
      canonicalPath: `/${this.lang}/resume`,
      lang: isEn ? 'en' : isEs ? 'es-CL' : 'pt-BR',
    });
  }
}
