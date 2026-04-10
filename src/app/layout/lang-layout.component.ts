import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';
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
  selector: 'app-lang-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class LangLayoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private langService: LanguageService,
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    const lang = (this.route.snapshot.data['lang'] ?? 'en') as Lang;
    this.langService.setLang(lang);
  }
}
