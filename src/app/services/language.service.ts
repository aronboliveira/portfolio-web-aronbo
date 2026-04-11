import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'en' | 'pt';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _lang = signal<Lang>('pt');

  readonly lang = this._lang.asReadonly();
  readonly isEn = computed(() => this._lang() === 'en');
  readonly isPt = computed(() => this._lang() === 'pt');

  setLang(lang: Lang): void {
    this._lang.set(lang);
  }
}
