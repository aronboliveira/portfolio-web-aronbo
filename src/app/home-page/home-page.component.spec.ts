import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { LanguageService, Lang } from '../services/language.service';
import { SeoService } from '../services/seo.service';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let langService: LanguageService;
  let seoSpy: jest.SpyInstance;
  let originalIntersectionObserver: typeof window.IntersectionObserver;
  let originalScrollIntoView: typeof window.HTMLElement.prototype.scrollIntoView;

  class MockIntersectionObserver implements IntersectionObserver {
    static latest?: MockIntersectionObserver;

    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
    takeRecords = jest.fn((): IntersectionObserverEntry[] => []);

    constructor(readonly callback: IntersectionObserverCallback) {
      MockIntersectionObserver.latest = this;
    }
  }

  function createComponent(lang: Lang) {
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

  function intersectionEntry(
    target: Element,
    isIntersecting: boolean,
  ): IntersectionObserverEntry {
    const rect = target.getBoundingClientRect();

    return {
      boundingClientRect: rect,
      intersectionRatio: isIntersecting ? 1 : 0,
      intersectionRect: isIntersecting ? rect : new DOMRect(),
      isIntersecting,
      rootBounds: null,
      target,
      time: 0,
    };
  }

  beforeAll(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    originalScrollIntoView = window.HTMLElement.prototype.scrollIntoView;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
    Object.defineProperty(window, 'IntersectionObserver', {
      configurable: true,
      writable: true,
      value: originalIntersectionObserver,
    });
    Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: originalScrollIntoView,
    });
    window.history.replaceState(null, '', '/');
    MockIntersectionObserver.latest = undefined;
  });

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
    it('should return 4 featured projects for EN', () => {
      createComponent('en');
      expect(component.projects.length).toBe(4);
    });

    it('should return 4 featured projects for PT', () => {
      createComponent('pt');
      expect(component.projects.length).toBe(4);
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

    it('should describe company-used LLM project outcomes', () => {
      createComponent('en');
      const purify = component.projects.find(
        p => p.slug === 'llm-prompt-purify',
      );
      const shape = component.projects.find(
        p => p.slug === 'prompt-shape-creator',
      );

      expect(purify?.outcome).toContain('company workflows');
      expect(purify?.outcome).toContain('LLM agents');
      expect(shape?.outcome).toContain('200% faster');
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

  describe('experience timeline', () => {
    it('should render only the first experience item open by default', () => {
      createComponent('en');
      const contentBlocks: HTMLElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.timeline-content'),
      );
      const visibleBlocks = contentBlocks.filter(block => !block.hidden);

      expect(component.isExperienceOpen(0)).toBe(true);
      expect(contentBlocks.length).toBe(component.currentExperience.length);
      expect(visibleBlocks.length).toBe(1);
      expect(fixture.nativeElement.innerHTML).toContain(
        'Main responsible for maintaining and developing',
      );
      expect(contentBlocks[0].textContent).toContain(
        'Detailed metrics are summarized in Automation & Productivity.',
      );
      expect(contentBlocks[0].textContent).not.toContain(
        '1,422 SEO keyword-region',
      );
      expect(fixture.nativeElement.innerHTML).toContain(
        'https://blog.organolab.com.br/blog/calculadora-de-solo/',
      );
    });

    it('should toggle the selected experience item', () => {
      createComponent('en');
      const buttons: HTMLButtonElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.timeline-toggle'),
      );

      buttons[1].click();
      fixture.detectChanges();
      const updatedButtons: HTMLButtonElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.timeline-toggle'),
      );

      expect(component.isExperienceOpen(1)).toBe(true);
      expect(component.isExperienceOpen(0)).toBe(false);
      expect(updatedButtons[1].getAttribute('aria-expanded')).toBe('true');
      expect(updatedButtons[1].getAttribute('aria-label')).toBe(
        'Collapse experience: University Extension Program PROSSaúde — UFRJ',
      );
      expect(updatedButtons[0].getAttribute('aria-label')).toBe(
        'Expand experience: Nova Prestech',
      );
      expect(
        (
          fixture.nativeElement.querySelector(
            '#experience-content-1',
          ) as HTMLElement
        ).hidden,
      ).toBe(false);
      expect(
        (
          fixture.nativeElement.querySelector(
            '#experience-content-0',
          ) as HTMLElement
        ).hidden,
      ).toBe(true);
      expect(fixture.nativeElement.innerHTML).toContain(
        'https://prossaude-client.netlify.app',
      );
    });

    it('should render site and project labels for experience links', () => {
      createComponent('en');
      const links: HTMLAnchorElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.timeline-link'),
      );

      expect(links.map(link => link.textContent?.trim())).toEqual([
        'Open Site',
        'Open project',
        'Open project',
        'Open project',
        'Open Site',
      ]);
    });

    it('should localize experience link labels', () => {
      createComponent('pt');
      const links: HTMLAnchorElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.timeline-link'),
      );

      expect(links.map(link => link.textContent?.trim())).toEqual([
        'Abrir site',
        'Abrir projeto',
        'Abrir projeto',
        'Abrir projeto',
        'Abrir site',
      ]);
    });

    it('should support multi-paragraph experience descriptions', () => {
      createComponent('en');

      expect(
        component.descriptionParagraphs(
          component.currentExperience[0].description,
        ),
      ).toHaveLength(2);
    });

    it('should include PROSSaúde in the workflow speed impact card', () => {
      createComponent('en');

      expect(fixture.nativeElement.innerHTML).toContain(
        'including PROSSaúde',
      );
      expect(fixture.nativeElement.innerHTML).toContain('PROSSaúde forms');
    });

    it('should expose accessible names and titles for icon-only links', () => {
      createComponent('en');
      const github = fixture.nativeElement.querySelector(
        'a.nav-icon[aria-label="GitHub"]',
      ) as HTMLAnchorElement;
      const gitlab = fixture.nativeElement.querySelector(
        'a.nav-icon[aria-label="GitLab"]',
      ) as HTMLAnchorElement;

      expect(github.title).toBe('GitHub');
      expect(gitlab.title).toBe('GitLab');
    });

    it('should remove the projects fragment after the observed projects section leaves view', () => {
      const scrollIntoView = jest.fn();
      Object.defineProperty(window, 'IntersectionObserver', {
        configurable: true,
        writable: true,
        value: MockIntersectionObserver,
      });
      Object.defineProperty(window.HTMLElement.prototype, 'scrollIntoView', {
        configurable: true,
        writable: true,
        value: scrollIntoView,
      });
      window.history.replaceState(null, '', '/en?source=unit');
      createComponent('en');
      const projectsSection = fixture.nativeElement.querySelector(
        '#featured-projects',
      ) as HTMLElement;
      const ctaLinks = Array.from(
        fixture.nativeElement.querySelectorAll('.cta'),
      ) as HTMLAnchorElement[];
      const projectsCta = ctaLinks.find(
        link => link.textContent?.trim() === 'Projects',
      );

      projectsCta?.click();

      const observer = MockIntersectionObserver.latest;
      expect(projectsCta).toBeTruthy();
      expect(observer).toBeDefined();
      const activeObserver = observer as MockIntersectionObserver;
      expect(window.location.pathname).toBe('/en');
      expect(window.location.search).toBe('?source=unit');
      expect(window.location.hash).toBe('#featured-projects');
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      expect(activeObserver.observe).toHaveBeenCalledWith(projectsSection);

      activeObserver.callback(
        [intersectionEntry(projectsSection, true)],
        activeObserver,
      );
      expect(window.location.hash).toBe('#featured-projects');

      activeObserver.callback(
        [intersectionEntry(projectsSection, false)],
        activeObserver,
      );
      expect(window.location.pathname).toBe('/en');
      expect(window.location.search).toBe('?source=unit');
      expect(window.location.hash).toBe('');
      expect(activeObserver.disconnect).toHaveBeenCalled();
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
