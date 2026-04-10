import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let langService: LanguageService;
  let seoSpy: jest.SpyInstance;

  function createComponent(lang: 'en' | 'pt') {
    TestBed.configureTestingModule({
      imports: [HomePageComponent, RouterModule.forRoot([])],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    });
    langService = TestBed.inject(LanguageService);
    langService.setLang(lang);
    const seoService = TestBed.inject(SeoService);
    seoSpy = jest.spyOn(seoService, 'update');
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  afterEach(() => TestBed.resetTestingModule());

  describe('creation', () => {
    it('should create with EN', () => {
      createComponent('en');
      expect(component).toBeTruthy();
    });

    it('should create with PT', () => {
      createComponent('pt');
      expect(component).toBeTruthy();
    });
  });

  describe('language binding', () => {
    it('should set lang to en', () => {
      createComponent('en');
      expect(component.lang).toBe('en');
    });

    it('should set lang to pt', () => {
      createComponent('pt');
      expect(component.lang).toBe('pt');
    });
  });

  describe('platform detection', () => {
    it('should detect browser platform', () => {
      createComponent('en');
      expect(component.isBrowser).toBe(true);
    });
  });

  describe('SEO', () => {
    it('should call seo.update on init for EN', () => {
      createComponent('en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          canonicalPath: '/en',
          lang: 'en',
        }),
      );
    });

    it('should call seo.update on init for PT', () => {
      createComponent('pt');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          canonicalPath: '/pt',
          lang: 'pt-BR',
        }),
      );
    });

    it('should include JSON-LD in SEO data', () => {
      createComponent('en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          jsonLd: expect.objectContaining({ '@type': 'Person' }),
        }),
      );
    });
  });

  describe('projects', () => {
    it('should return 3 featured projects for EN', () => {
      createComponent('en');
      expect(component.projects.length).toBe(3);
    });

    it('should return 3 featured projects for PT', () => {
      createComponent('pt');
      expect(component.projects.length).toBe(3);
    });

    it('should include llm-prompt-purify', () => {
      createComponent('en');
      expect(component.projects.some(p => p.slug === 'llm-prompt-purify')).toBe(
        true,
      );
    });

    it('should include prossaude-client-app', () => {
      createComponent('en');
      expect(
        component.projects.some(p => p.slug === 'prossaude-client-app'),
      ).toBe(true);
    });

    it('should include crm-test', () => {
      createComponent('en');
      expect(component.projects.some(p => p.slug === 'crm-test')).toBe(true);
    });
  });

  describe('skills', () => {
    it('should return skills for EN', () => {
      createComponent('en');
      const skills = component.currentSkills;
      expect(skills.languages).toContain('TypeScript');
      expect(skills.languages).toContain('Python');
      expect(skills.languages).toContain('Bash');
    });

    it('should return skills for PT', () => {
      createComponent('pt');
      const skills = component.currentSkills;
      expect(skills.languages).toContain('TypeScript');
    });

    it('should list testing tools', () => {
      createComponent('en');
      expect(component.currentSkills.testing).toContain('Jest');
      expect(component.currentSkills.testing).toContain('Cypress');
    });
  });

  describe('template rendering', () => {
    it('should render hero section', () => {
      createComponent('en');
      const hero = fixture.nativeElement.querySelector(
        '.hero, [class*="hero"]',
      );
      expect(
        hero || fixture.nativeElement.querySelector('header'),
      ).toBeTruthy();
    });

    it('should render project cards', () => {
      createComponent('en');
      const cards = fixture.nativeElement.querySelectorAll(
        'article, [class*="project"]',
      );
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });
  });
});
