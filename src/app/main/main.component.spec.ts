import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { MainComponent, iniHeights, iniDisplays } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up any DOM modifications
    document.body.innerHTML = '';
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize isChecked as false', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should detect browser platform', () => {
      expect(component.isBrowser).toBe(true);
    });
  });

  describe('projectStacks', () => {
    it('should have anhanga project with stacks', () => {
      expect(component.projectStacks['anhanga']).toBeDefined();
      expect(component.projectStacks['anhanga']).toContain('Next.js');
      expect(component.projectStacks['anhanga']).toContain('Typescript');
    });

    it('should have anjinhos project with stacks', () => {
      expect(component.projectStacks['anjinhos']).toBeDefined();
      expect(component.projectStacks['anjinhos']).toContain('Vue.js');
    });

    it('should have math project with stacks', () => {
      expect(component.projectStacks['math']).toBeDefined();
      expect(component.projectStacks['math']).toContain('Nuxt.js');
      expect(component.projectStacks['math']).toContain('React Native');
    });

    it('should have purify project with Angular', () => {
      expect(component.projectStacks['purify']).toBeDefined();
      expect(component.projectStacks['purify']).toContain('Angular');
    });

    it('should have personacraft project with stacks', () => {
      expect(component.projectStacks['personacraft']).toBeDefined();
      expect(component.projectStacks['personacraft']).toContain('SASS');
    });
  });

  describe('changeLanguage', () => {
    it('should handle changeLanguage call', () => {
      const mockEvent = new Event('click');
      expect(() => component.changeLanguage(mockEvent)).not.toThrow();
    });

    it('should change language based on isChecked state', () => {
      // Create DOM elements that changeLanguage expects
      const techContent = document.createElement('div');
      techContent.id = 'tech-content';
      document.body.appendChild(techContent);

      const mockEvent = new Event('click');

      component.isChecked = true;
      expect(() => component.changeLanguage(mockEvent)).not.toThrow();

      component.isChecked = false;
      expect(() => component.changeLanguage(mockEvent)).not.toThrow();
    });
  });

  describe('typeTitle', () => {
    beforeEach(() => {
      // Create title elements that typeTitle expects
      const title = document.createElement('span');
      title.id = 'title-content';
      document.body.appendChild(title);
    });

    it('should be defined', () => {
      expect(component.typeTitle).toBeDefined();
    });

    it('should be callable with running=true', () => {
      // Just verify it's callable - DOM interactions will log errors but not throw
      component.isChecked = false;
      expect(() => component.typeTitle(true)).not.toThrow();
    });

    it('should not throw when running is false', () => {
      expect(() => component.typeTitle(false)).not.toThrow();
    });
  });

  describe('adjustStacksHeight', () => {
    it('should be defined', () => {
      expect(component.adjustStacksHeight).toBeDefined();
    });

    it('should handle null list gracefully', () => {
      expect(() => component.adjustStacksHeight(null, null)).not.toThrow();
    });

    it('should handle valid elements', () => {
      const list = document.createElement('div');
      list.id = 'projects-list';
      const arrow = document.createElement('div');
      arrow.id = 'projects-arrow';
      document.body.appendChild(list);
      document.body.appendChild(arrow);

      expect(() => component.adjustStacksHeight(list, arrow)).not.toThrow();
    });
  });

  describe('toggleArrow', () => {
    it('should be defined', () => {
      expect(component.toggleArrow).toBeDefined();
    });

    it('should handle mouseEvent', () => {
      const timeline = document.createElement('div');
      timeline.id = 'timeline-courses';
      document.body.appendChild(timeline);

      const arrow = document.createElement('button');
      arrow.id = 'courses-arrow';
      document.body.appendChild(arrow);

      const event = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'currentTarget', { value: arrow });

      expect(() =>
        component.toggleArrow(event, 'timeline-courses'),
      ).not.toThrow();
    });
  });

  describe('ViewChild references', () => {
    // ViewChild references may be undefined in tests if templates aren't rendered
    it('should have ptBrTemplate property defined on component class', () => {
      expect(
        component.hasOwnProperty('ptBrTemplate') || 'ptBrTemplate' in component,
      ).toBe(true);
    });

    it('should have enUsTemplate property defined on component class', () => {
      expect(
        component.hasOwnProperty('enUsTemplate') || 'enUsTemplate' in component,
      ).toBe(true);
    });
  });

  describe('exported constants', () => {
    it('should export iniHeights object', () => {
      expect(iniHeights).toBeDefined();
      expect(typeof iniHeights).toBe('object');
    });

    it('should export iniDisplays object', () => {
      expect(iniDisplays).toBeDefined();
      expect(typeof iniDisplays).toBe('object');
    });
  });

  describe('ngAfterViewInit', () => {
    it('should call ngAfterViewInit without throwing', () => {
      expect(() => component.ngAfterViewInit()).not.toThrow();
    });
  });
});

describe('MainComponent (server)', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should detect server platform', () => {
    expect(component.isBrowser).toBe(false);
  });

  it('should not execute browser-specific code on server', () => {
    expect(() => component.ngAfterViewInit()).not.toThrow();
  });
});
