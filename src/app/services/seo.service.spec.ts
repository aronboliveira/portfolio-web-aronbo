import { TestBed } from '@angular/core/testing';
import { SeoService, SeoData } from './seo.service';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

describe('SeoService', () => {
  let service: SeoService;
  let doc: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: Router,
          useValue: { events: { pipe: () => ({ subscribe: () => {} }) } },
        },
      ],
    });
    service = TestBed.inject(SeoService);
    doc = TestBed.inject(DOCUMENT);
    // Ensure a <title> exists in jsdom (real browsers always have one)
    if (!doc.querySelector('title')) {
      const title = doc.createElement('title');
      doc.head.appendChild(title);
    }
  });

  afterEach(() => {
    doc
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach(el => el.remove());
    const jsonLd = doc.getElementById('jsonld-person');
    if (jsonLd) jsonLd.remove();
  });

  const enData: SeoData = {
    title: 'Test EN Title',
    description: 'Test EN description',
    canonicalPath: '/en',
    lang: 'en',
  };

  const ptData: SeoData = {
    title: 'Test PT Title',
    description: 'Test PT description',
    canonicalPath: '/pt',
    lang: 'pt-BR',
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('update', () => {
    it('should set document language', () => {
      service.update(enData);
      expect(doc.documentElement.lang).toBe('en');
    });

    it('should set title', () => {
      service.update(enData);
      expect(doc.title).toBe('Test EN Title');
    });

    it('should set meta description', () => {
      service.update(enData);
      const meta = doc.querySelector(
        'meta[name="description"]',
      ) as HTMLMetaElement;
      expect(meta?.content).toBe('Test EN description');
    });

    it('should set og:title', () => {
      service.update(enData);
      const meta = doc.querySelector(
        'meta[property="og:title"]',
      ) as HTMLMetaElement;
      expect(meta?.content).toBe('Test EN Title');
    });

    it('should set og:description', () => {
      service.update(enData);
      const meta = doc.querySelector(
        'meta[property="og:description"]',
      ) as HTMLMetaElement;
      expect(meta?.content).toBe('Test EN description');
    });

    it('should set og:url', () => {
      service.update(enData);
      const meta = doc.querySelector(
        'meta[property="og:url"]',
      ) as HTMLMetaElement;
      expect(meta?.content).toBe('https://aronboliveira-dev.netlify.app/en');
    });

    it('should set canonical link', () => {
      service.update(enData);
      const link = doc.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement;
      expect(link?.href).toContain('/en');
    });

    it('should set pt-BR language', () => {
      service.update(ptData);
      expect(doc.documentElement.lang).toBe('pt-BR');
    });
  });

  describe('hreflang', () => {
    it('should create 4 hreflang links for EN path', () => {
      service.update(enData);
      const links = doc.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(links.length).toBe(4);
    });

    it('should include en, pt-BR, x-default for EN path', () => {
      service.update(enData);
      const hreflangs = Array.from(
        doc.querySelectorAll('link[rel="alternate"][hreflang]'),
      ).map(el => el.getAttribute('hreflang'));
      expect(hreflangs).toContain('en');
      expect(hreflangs).toContain('pt-BR');
      expect(hreflangs).toContain('es-CL');
      expect(hreflangs).toContain('x-default');
    });

    it('should create correct alternate URLs for PT path', () => {
      service.update(ptData);
      const enLink = doc.querySelector(
        'link[hreflang="en"]',
      ) as HTMLLinkElement;
      expect(enLink?.href).toContain('/en');
      const ptLink = doc.querySelector(
        'link[hreflang="pt-BR"]',
      ) as HTMLLinkElement;
      expect(ptLink?.href).toContain('/pt');
    });

    it('should replace hreflang links on subsequent calls', () => {
      service.update(enData);
      service.update(ptData);
      const links = doc.querySelectorAll('link[rel="alternate"][hreflang]');
      expect(links.length).toBe(4);
    });
  });

  describe('JSON-LD', () => {
    it('should inject JSON-LD script', () => {
      service.update({
        ...enData,
        jsonLd: { '@type': 'Person', name: 'Test' },
      });
      const script = doc.getElementById('jsonld-person');
      expect(script).toBeTruthy();
      expect(script?.getAttribute('type')).toBe('application/ld+json');
    });

    it('should contain the correct JSON data', () => {
      const jsonLd = { '@type': 'Person', name: 'Test' };
      service.update({ ...enData, jsonLd });
      const script = doc.getElementById('jsonld-person');
      expect(JSON.parse(script!.textContent!)).toEqual(jsonLd);
    });

    it('should update existing JSON-LD on subsequent calls', () => {
      service.update({
        ...enData,
        jsonLd: { '@type': 'Person', name: 'First' },
      });
      service.update({
        ...enData,
        jsonLd: { '@type': 'Person', name: 'Second' },
      });
      const scripts = doc.querySelectorAll('#jsonld-person');
      expect(scripts.length).toBe(1);
      expect(JSON.parse(scripts[0].textContent!).name).toBe('Second');
    });

    it('should not inject JSON-LD when not provided', () => {
      const before = doc.getElementById('jsonld-person');
      service.update(enData);
      const after = doc.getElementById('jsonld-person');
      expect(after).toEqual(before);
    });
  });

  describe('idempotence', () => {
    it('should not duplicate meta tags on repeated calls', () => {
      service.update(enData);
      service.update(enData);
      const metas = doc.querySelectorAll('meta[name="description"]');
      expect(metas.length).toBe(1);
    });

    it('should not duplicate canonical links', () => {
      service.update(enData);
      service.update(ptData);
      const links = doc.querySelectorAll('link[rel="canonical"]');
      expect(links.length).toBe(1);
    });
  });
});
