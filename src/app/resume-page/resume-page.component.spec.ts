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

    it('should render Experience section', () => {
      createComponent('en');
      const html = fixture.nativeElement.innerHTML;
      expect(html).toContain('Experience');
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
  });
});
