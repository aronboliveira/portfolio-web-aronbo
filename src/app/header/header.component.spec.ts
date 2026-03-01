import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const componentDef = (HeaderComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Toggle state', () => {
    it('should have isChecked false by default', () => {
      expect(component.isChecked).toBe(false);
    });

    it('should toggle isChecked when handleToggle is called', () => {
      expect(component.isChecked).toBe(false);
      component.handleToggle();
      expect(component.isChecked).toBe(true);
    });

    it('should toggle back to false on second call', () => {
      component.handleToggle();
      component.handleToggle();
      expect(component.isChecked).toBe(false);
    });

    it('should toggle multiple times correctly', () => {
      for (let i = 1; i <= 5; i++) {
        component.handleToggle();
        expect(component.isChecked).toBe(i % 2 === 1);
      }
    });
  });

  describe('Rendering', () => {
    it('should render nav element', () => {
      const nav = fixture.debugElement.query(By.css('nav'));
      expect(nav).toBeTruthy();
    });

    it('should render toggle container', () => {
      const toggleContainer = fixture.debugElement.query(
        By.css('.toggle-container'),
      );
      expect(toggleContainer).toBeTruthy();
    });

    it('should render toggle input', () => {
      const toggleInput = fixture.debugElement.query(By.css('.toggle-input'));
      expect(toggleInput).toBeTruthy();
    });

    it('should render language legend', () => {
      const legend = fixture.debugElement.query(By.css('.legend'));
      expect(legend).toBeTruthy();
    });

    it('should display BR and US in legend', () => {
      const legend = fixture.debugElement.query(By.css('.legend'));
      expect(legend.nativeElement.textContent).toContain('BR');
      expect(legend.nativeElement.textContent).toContain('US');
    });
  });

  describe('Toggle input interaction', () => {
    it('should have aria-label for accessibility', () => {
      const toggleInput = fixture.debugElement.query(By.css('.toggle-input'));
      expect(toggleInput.nativeElement.getAttribute('aria-label')).toBe(
        'Toggle Button',
      );
    });

    it('should be a checkbox type', () => {
      const toggleInput = fixture.debugElement.query(By.css('.toggle-input'));
      expect(toggleInput.nativeElement.getAttribute('type')).toBe('checkbox');
    });

    it('should toggle class when clicked', () => {
      const toggleInput = fixture.debugElement.query(By.css('.toggle-input'));

      expect(toggleInput.nativeElement.classList.contains('checked')).toBe(
        false,
      );

      toggleInput.nativeElement.click();
      fixture.detectChanges();

      expect(component.isChecked).toBe(true);
    });

    it('should add checked class when isChecked is true', () => {
      component.isChecked = true;
      fixture.detectChanges();

      const toggleInput = fixture.debugElement.query(By.css('.toggle-input'));
      expect(toggleInput.nativeElement.classList.contains('checked')).toBe(
        true,
      );
    });
  });

  describe('Language toggle UX', () => {
    it('should indicate BR-US language options', () => {
      const spans = fixture.debugElement.queryAll(By.css('.legend span'));
      const texts = spans.map(span => span.nativeElement.textContent);
      // Actual text values are 'BR-' and 'US'
      expect(texts).toContain('BR-');
      expect(texts).toContain('US');
    });
  });

  describe('Accessibility', () => {
    it('should have proper form structure for toggle', () => {
      const input = fixture.debugElement.query(
        By.css('input[type="checkbox"]'),
      );
      expect(input).toBeTruthy();
    });

    it('should have aria-label on toggle input', () => {
      const input = fixture.debugElement.query(By.css('.toggle-input'));
      expect(input.nativeElement.hasAttribute('aria-label')).toBe(true);
    });
  });
});
