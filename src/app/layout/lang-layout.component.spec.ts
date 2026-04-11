import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LangLayoutComponent } from './lang-layout.component';
import { LanguageService } from '../services/language.service';

describe('LangLayoutComponent', () => {
  let component: LangLayoutComponent;
  let fixture: ComponentFixture<LangLayoutComponent>;
  let langService: LanguageService;

  function createComponent(lang: string) {
    TestBed.configureTestingModule({
      imports: [LangLayoutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { lang } } },
        },
      ],
    });
    fixture = TestBed.createComponent(LangLayoutComponent);
    component = fixture.componentInstance;
    langService = TestBed.inject(LanguageService);
  }

  it('should create', () => {
    createComponent('en');
    expect(component).toBeTruthy();
  });

  it('should set language to en from route data', () => {
    createComponent('en');
    fixture.detectChanges();
    expect(langService.lang()).toBe('en');
  });

  it('should set language to pt from route data', () => {
    createComponent('pt');
    fixture.detectChanges();
    expect(langService.lang()).toBe('pt');
  });

  it('should default to en when route data is missing', () => {
    TestBed.configureTestingModule({
      imports: [LangLayoutComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: {} } },
        },
      ],
    });
    fixture = TestBed.createComponent(LangLayoutComponent);
    langService = TestBed.inject(LanguageService);
    fixture.detectChanges();
    expect(langService.lang()).toBe('en');
  });

  it('should render a router-outlet', () => {
    createComponent('en');
    fixture.detectChanges();
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});
