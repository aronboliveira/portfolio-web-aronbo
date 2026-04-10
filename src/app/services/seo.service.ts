import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BASE_URL } from '../data/constants';

export interface SeoData {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  lang: 'en' | 'pt-BR';
  jsonLd?: object;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = BASE_URL;

  constructor(@Inject(DOCUMENT) private doc: Document) {}

  update(data: SeoData): void {
    this.doc.documentElement.lang = data.lang;

    this.setTitle(data.title);
    this.setMeta('description', data.description);
    this.setMeta('og:title', data.ogTitle ?? data.title, true);
    this.setMeta(
      'og:description',
      data.ogDescription ?? data.description,
      true,
    );
    this.setMeta('og:url', `${this.baseUrl}${data.canonicalPath}`, true);

    this.setCanonical(`${this.baseUrl}${data.canonicalPath}`);
    this.setHreflang(data.canonicalPath);

    if (data.jsonLd) {
      this.setJsonLd(data.jsonLd);
    }
  }

  private setTitle(title: string): void {
    const el = this.doc.querySelector('title');
    if (el) el.textContent = title;
  }

  private setMeta(name: string, content: string, isProperty = false): void {
    const attr = isProperty ? 'property' : 'name';
    let el = this.doc.querySelector(
      `meta[${attr}="${name}"]`,
    ) as HTMLMetaElement | null;
    if (!el) {
      el = this.doc.createElement('meta');
      el.setAttribute(attr, name);
      this.doc.head.appendChild(el);
    }
    el.setAttribute('content', content);
  }

  private setCanonical(url: string): void {
    let el = this.doc.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null;
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(el);
    }
    el.setAttribute('href', url);
  }

  private setHreflang(currentPath: string): void {
    this.removeHreflang();
    const altLang = currentPath.startsWith('/pt') ? 'en' : 'pt-BR';
    const altPath = currentPath.startsWith('/pt')
      ? currentPath.replace(/^\/pt/, '/en')
      : currentPath.replace(/^\/en/, '/pt');

    this.addHreflangLink(
      'en',
      currentPath.startsWith('/pt') ? altPath : currentPath,
    );
    this.addHreflangLink(
      'pt-BR',
      currentPath.startsWith('/pt') ? currentPath : altPath,
    );
    this.addHreflangLink('x-default', '/en');
  }

  private addHreflangLink(hreflang: string, path: string): void {
    const link = this.doc.createElement('link');
    link.setAttribute('rel', 'alternate');
    link.setAttribute('hreflang', hreflang);
    link.setAttribute('href', `${this.baseUrl}${path}`);
    this.doc.head.appendChild(link);
  }

  private removeHreflang(): void {
    this.doc
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach(el => el.remove());
  }

  private setJsonLd(data: object): void {
    let el = this.doc.getElementById(
      'jsonld-person',
    ) as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = 'jsonld-person';
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    try {
      el.textContent = JSON.stringify(data);
    } catch {
      console.error('Failed to serialize JSON-LD data');
    }
  }
}
