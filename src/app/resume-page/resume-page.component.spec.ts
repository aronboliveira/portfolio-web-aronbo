import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ResumePageComponent } from './resume-page.component';
import { LanguageService, Lang } from '../services/language.service';
import { SeoService } from '../services/seo.service';

describe('ResumePageComponent', () => {
  let component: ResumePageComponent;
  let fixture: ComponentFixture<ResumePageComponent>;
  let langService: LanguageService;
  let seoSpy: jest.SpyInstance;

  function createComponent(lang: Lang) {
    TestBed.configureTestingModule({
      imports: [ResumePageComponent, RouterModule.forRoot([])],
    });
    langService = TestBed.inject(LanguageService);
    langService.setLang(lang);
    const seoService = TestBed.inject(SeoService);
    seoSpy = jest.spyOn(seoService, 'update');
    fixture = TestBed.createComponent(ResumePageComponent);
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

  describe('language', () => {
    it('should set lang to en', () => {
      createComponent('en');
      expect(component.lang).toBe('en');
    });

    it('should set lang to pt', () => {
      createComponent('pt');
      expect(component.lang).toBe('pt');
    });
  });

  describe('SEO', () => {
    it('should call seo.update with EN resume path', () => {
      createComponent('en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          canonicalPath: '/en/resume',
          lang: 'en',
        }),
      );
    });

    it('should call seo.update with PT resume path', () => {
      createComponent('pt');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          canonicalPath: '/pt/resume',
          lang: 'pt-BR',
        }),
      );
    });

    it('should include Resume in EN title', () => {
      createComponent('en');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('Resume'),
        }),
      );
    });

    it('should include Currículo in PT title', () => {
      createComponent('pt');
      expect(seoSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          title: expect.stringContaining('Currículo'),
        }),
      );
    });
  });

  describe('template rendering', () => {
    it('should render resume content for EN', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Summary');
    });

    it('should render resume content for PT', () => {
      createComponent('pt');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Resumo');
    });

    it('should render Skills section', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Skills');
    });

    it('should include TypeScript in skills', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('TypeScript');
    });

    it('should include GitLab in contact links', () => {
      createComponent('en');
      const gitlab = fixture.nativeElement.querySelector(
        'a[href="https://gitlab.com/aronboliveira"]',
      ) as HTMLAnchorElement;

      expect(gitlab).toBeTruthy();
      expect(gitlab.textContent?.trim()).toBe('GitLab');
    });

    it('should render Experience section', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Experience');
    });

    it('should render measured impact with SEO and Lighthouse outcomes', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;

      expect(html).toContain('Measured Impact');
      expect(html).toContain('+232.9%');
      expect(html).toContain('first-to-second-place');
      expect(html).toContain('Lighthouse SEO scores reaching 90-100');
      expect(html).toContain('1,422 keyword-region rows');
      expect(html).toContain('PROSSaúde form workflows');
    });

    it('should render updated Prestech responsibilities and site/project links', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      const links: HTMLAnchorElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.entry-link a'),
      );

      expect(html).toContain(
        'Main responsible for maintaining and developing the Nova Prestech website as a whole',
      );
      expect(html).toContain('Detailed metrics are summarized in Measured Impact');
      expect(html).not.toContain(
        'These workflows helped produce measured social and SEO outcomes',
      );
      expect(html).toContain('LLM Prompt Purify');
      expect(html).toContain('Prompt Shape Creator');
      expect(links.map(link => link.textContent?.trim())).toEqual([
        'Open Site',
        'Open project',
        'Open project',
        'Open project',
        'Open Site',
      ]);
      expect(
        links.some(
          link =>
            link.href ===
            'https://blog.organolab.com.br/blog/calculadora-de-solo/',
        ),
      ).toBe(true);
    });

    it('should render company-used LLM project outcomes', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;

      expect(html).toContain('used in company workflows');
      expect(html).toContain('roughly 200% faster');
      expect(html).toContain('web-based LLM tools');
    });

    it('should render Education section', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Education');
    });

    it('should contain PDF download link', () => {
      createComponent('en');
      const pdfLink = fixture.nativeElement.querySelector('a[href*=".pdf"]');
      expect(pdfLink).toBeTruthy();
    });

    it('should expose accessible names and titles for resume navigation links', () => {
      createComponent('en');
      const backLink = fixture.nativeElement.querySelector(
        '.back-link',
      ) as HTMLAnchorElement;
      const pdfLink = fixture.nativeElement.querySelector(
        '#download-resume-pdf-page',
      ) as HTMLAnchorElement;

      expect(backLink.getAttribute('aria-label')).toBe(
        'Back to portfolio home',
      );
      expect(backLink.title).toBe('Back to portfolio home');
      expect(pdfLink.getAttribute('aria-label')).toBe('Download resume PDF');
      expect(pdfLink.title).toBe('Download resume PDF');
    });

    it('should localize measured impact content for PT and ES', () => {
      createComponent('pt');
      expect(fixture.nativeElement.innerHTML).toContain('Impacto Mensurável');
      expect(fixture.nativeElement.innerHTML).toContain(
        'pontuação SEO no Lighthouse',
      );

      TestBed.resetTestingModule();
      createComponent('es');
      expect(fixture.nativeElement.innerHTML).toContain('Impacto Medible');
      expect(fixture.nativeElement.innerHTML).toContain(
        'puntuaciones SEO de Lighthouse',
      );
    });
  });
});
