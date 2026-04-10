import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LanguageService, Lang } from '../services/language.service';

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
  ) {}

  ngOnInit(): void {
    const lang = (this.route.snapshot.data['lang'] ?? 'en') as Lang;
    this.langService.setLang(lang);
  }
}
