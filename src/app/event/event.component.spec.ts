import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EventComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventComponent;
  let fixture: ComponentFixture<EventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const componentDef = (EventComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Default input values', () => {
    it('should have empty id by default', () => {
      expect(component.id).toBe('');
    });

    it('should have empty title by default', () => {
      expect(component.title).toBe('');
    });

    it('should have empty date by default', () => {
      expect(component.date).toBe('');
    });

    it('should have empty description by default', () => {
      expect(component.description).toBe('');
    });

    it('should have empty href by default', () => {
      expect(component.href).toBe('');
    });
  });

  describe('ngOnInit ID generation', () => {
    it('should generate id from title on init', () => {
      component.title = 'Nova Prestech';
      component.ngOnInit();
      expect(component.id).toBe('Nova-prestech');
    });

    it('should lowercase title except first character', () => {
      component.title = 'UPPERCASE TITLE';
      component.ngOnInit();
      expect(component.id).toBe('Uppercase-title');
    });

    it('should replace spaces with hyphens', () => {
      component.title = 'Project Name Here';
      component.ngOnInit();
      expect(component.id).toBe('Project-name-here');
    });

    it('should handle single word titles', () => {
      component.title = 'Project';
      component.ngOnInit();
      expect(component.id).toBe('Project');
    });
  });

  describe('Rendering', () => {
    beforeEach(() => {
      component.title = 'Test Event';
      component.date = '01/2025 — Present';
      component.description = '<strong>Test</strong> description';
      component.href = 'https://example.com';
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should render event title in h3', () => {
      const titleEl = fixture.debugElement.query(By.css('h3.event-title'));
      expect(titleEl.nativeElement.textContent.trim()).toBe('Test Event');
    });

    it('should render event date in h4', () => {
      const dateEl = fixture.debugElement.query(By.css('h4.event-date'));
      expect(dateEl.nativeElement.textContent.trim()).toBe('01/2025 — Present');
    });

    it('should render description with HTML', () => {
      const descEl = fixture.debugElement.query(By.css('.event-description'));
      expect(descEl.nativeElement.innerHTML).toContain('<strong>Test</strong>');
    });

    it('should render anchor with correct href', () => {
      const anchorEl = fixture.debugElement.query(By.css('.event-anchor'));
      expect(anchorEl.nativeElement.getAttribute('href')).toBe('https://example.com');
    });

    it('should render anchor with target="_blank"', () => {
      const anchorEl = fixture.debugElement.query(By.css('.event-anchor'));
      expect(anchorEl.nativeElement.getAttribute('target')).toBe('_blank');
    });
  });

  describe('Real experience data', () => {
    const experiences = [
      {
        title: 'Nova Prestech',
        date: '12/2024 — Presente',
        description: '<strong>Desenvolvimento Fullstack</strong> baseado em <em>Laravel, Flask e React.js</em>',
        href: 'https://prestech.com.br/site/',
      },
      {
        title: 'Projeto de Extensão PROSSaúde — UFRJ',
        date: '08/2023 — Presente',
        description: '<strong>Desenvolvimento fullstack</strong> e manutenção de <b>CRUDs</b>',
        href: 'https://prossaude-client.netlify.app',
      },
      {
        title: 'Tia da Praia da Bica — Cardápio Digital',
        date: '09/2025',
        description: 'Atuação no <em>Desenvolvimento Frontend</em>com <b>Next.js</b>',
        href: 'https://drinks-tia-pdb.netlify.app/',
      },
    ];

    experiences.forEach((exp) => {
      describe(`Experience: ${exp.title}`, () => {
        beforeEach(() => {
          component.title = exp.title;
          component.date = exp.date;
          component.description = exp.description;
          component.href = exp.href;
          component.ngOnInit();
          fixture.detectChanges();
        });

        it('should render title correctly', () => {
          const titleEl = fixture.debugElement.query(By.css('h3.event-title'));
          expect(titleEl.nativeElement.textContent.trim()).toBe(exp.title);
        });

        it('should render date correctly', () => {
          const dateEl = fixture.debugElement.query(By.css('h4.event-date'));
          expect(dateEl.nativeElement.textContent.trim()).toBe(exp.date);
        });

        it('should render href link', () => {
          const anchorEl = fixture.debugElement.query(By.css('.event-anchor'));
          expect(anchorEl.nativeElement.getAttribute('href')).toBe(exp.href);
        });
      });
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.title = 'Accessible Event';
      component.date = '2025';
      component.description = 'Description';
      component.href = 'https://example.com';
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should have proper heading hierarchy (h3 then h4)', () => {
      const h3 = fixture.debugElement.query(By.css('h3'));
      const h4 = fixture.debugElement.query(By.css('h4'));
      expect(h3).toBeTruthy();
      expect(h4).toBeTruthy();
    });

    it('should have event div with id', () => {
      const eventDiv = fixture.debugElement.query(By.css('.event'));
      expect(eventDiv.nativeElement.id).toBeTruthy();
    });

    it('should have linked IDs for title and date', () => {
      const titleEl = fixture.debugElement.query(By.css('.event-title'));
      const dateEl = fixture.debugElement.query(By.css('.event-date'));
      expect(titleEl.nativeElement.id).toContain('title-');
      expect(dateEl.nativeElement.id).toContain('date-');
    });
  });
});
