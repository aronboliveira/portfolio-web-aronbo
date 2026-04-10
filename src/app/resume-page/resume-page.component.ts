import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-resume-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './resume-page.component.html',
  styleUrls: ['./resume-page.component.scss'],
})
export class ResumePageComponent implements OnInit {
  lang: 'en' | 'pt' = 'en';

  constructor(
    public langService: LanguageService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    this.lang = this.langService.lang();
    const isEn = this.lang === 'en';
    this.seo.update({
      title: isEn
        ? 'Resume — Aron Barbosa de Oliveira — Full-Stack Developer'
        : 'Currículo — Aron Barbosa de Oliveira — Desenvolvedor Full-stack',
      description: isEn
        ? 'Resume of Aron Barbosa de Oliveira, Full-stack Software Developer. TypeScript, Python, Shell Automation.'
        : 'Currículo de Aron Barbosa de Oliveira, Desenvolvedor Full-stack. TypeScript, Python, Automação Shell.',
      canonicalPath: isEn ? '/en/resume' : '/pt/resume',
      lang: isEn ? 'en' : 'pt-BR',
    });
  }
}
