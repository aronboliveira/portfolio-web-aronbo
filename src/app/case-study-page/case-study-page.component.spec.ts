import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CaseStudyPageComponent } from './case-study-page.component';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';

describe('CaseStudyPageComponent', () => {
  let component: CaseStudyPageComponent;
  let fixture: ComponentFixture<CaseStudyPageComponent>;
  let seoSpy: jest.SpyInstance;

  function createComponent(slug: string, lang: 'en' | 'pt' = 'en') {
    TestBed.configureTestingModule({
      imports: [CaseStudyPageComponent, RouterModule.forRoot([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'slug' ? slug : null),
              },
            },
          },
        },
      ],
    });
    const langService = TestBed.inject(LanguageService);
    langService.setLang(lang);
    const seoService = TestBed.inject(SeoService);
    seoSpy = jest.spyOn(seoService, 'update');
    fixture = TestBed.createComponent(CaseStudyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  afterEach(() => TestBed.resetTestingModule());

  describe('creation', () => {
    it('should create', () => {
      createComponent('llm-prompt-purify');
      expect(component).toBeTruthy();
    });
  });

  describe('valid slugs', () => {
    const slugs = [
      'llm-prompt-purify',
      'prossaude-client-app',
      'crm-test',
      'prompt-shape-creator',
    ];

    slugs.forEach(slug => {
      it(`should load study for ${slug} in EN`, () => {
        createComponent(slug, 'en');
        expect(component.study).not.toBeNull();
        expect(component.study!.slug).toBe(slug);
      });

      it(`should load study for ${slug} in PT`, () => {
        createComponent(slug, 'pt');
        expect(component.study).not.toBeNull();
        expect(component.study!.slug).toBe(slug);
      });
    });
  });

  describe('invalid slug', () => {
    it('should set study to null for unknown slug', () => {
      createComponent('non-existent-slug');
      expect(component.study).toBeNull();
    });

    it('should show not-found message for unknown slug', () => {
      createComponent('non-existent-slug');
      const html = fixture.nativeElement.innerHTML;
      expect(html.toLowerCase()).toContain('not found');
    });
  });

  describe('SEO', () => {
    it('should call seo.update for valid slug', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          canonicalPath: '/en/projects/llm-prompt-purify',
          lang: 'en',
        }),
      );
    });

    it('should include project title in SEO title', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('LLM Prompt Purify'),
        }),
      );
    });

    it('should not call seo.update for invalid slug', () => {
      createComponent('invalid');
      expect(seoSpy).not.toHaveBeenCalled();
    });
  });

  describe('case study content', () => {
    it('should have problem section', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.problem).toBeTruthy();
      expect(component.study!.problem.length).toBeGreaterThan(10);
    });

    it('should have constraints section', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.constraints).toBeTruthy();
    });

    it('should have solution section', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.solution).toBeTruthy();
    });

    it('should have outcome section', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.outcome).toBeTruthy();
    });

    it('should have stack info', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.stack).toContain('TypeScript');
    });

    it('should have live and repo URLs', () => {
      createComponent('llm-prompt-purify', 'en');
      expect(component.study!.liveUrl).toContain('https://');
      expect(component.study!.repoUrl).toContain('github.com');
    });
  });

  describe('template rendering', () => {
    it('should render project title for valid slug', () => {
      createComponent('prossaude-client-app', 'en');
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1?.textContent).toContain('PROSSaúde');
    });

    it('should render PT content when lang is pt', () => {
      createComponent('crm-test', 'pt');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('CRM Test');
    });
  });
});
