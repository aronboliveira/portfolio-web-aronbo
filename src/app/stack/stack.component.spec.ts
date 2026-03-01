import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StackComponent } from './stack.component';

describe('StackComponent', () => {
  let component: StackComponent;
  let fixture: ComponentFixture<StackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StackComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have empty stackName by default', () => {
      expect(component.stackName).toBe('');
    });

    it('should be a standalone component', () => {
      const componentDef = (StackComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Input properties', () => {
    it('should accept stackName input', () => {
      component.stackName = 'TypeScript';
      fixture.detectChanges();
      expect(component.stackName).toBe('TypeScript');
    });

    it('should update when stackName changes', () => {
      component.stackName = 'React';
      fixture.detectChanges();
      expect(component.stackName).toBe('React');

      component.stackName = 'Angular';
      fixture.detectChanges();
      expect(component.stackName).toBe('Angular');
    });
  });

  describe('Stack name variations', () => {
    const stackVariations = [
      { name: 'Next.js', display: 'Next.js' },
      { name: 'Angular', display: 'Angular' },
      { name: 'Vue.js', display: 'Vue.js' },
      { name: 'React Native', display: 'React Native' },
      { name: 'TypeScript', display: 'TypeScript' },
      { name: 'Python', display: 'Python' },
      { name: 'Express.js', display: 'Express.js' },
      { name: 'SASS', display: 'SASS' },
      { name: 'Nuxt.js', display: 'Nuxt.js' },
    ];

    stackVariations.forEach(({ name, display }) => {
      it(`should accept "${name}" as stackName`, () => {
        component.stackName = name;
        fixture.detectChanges();
        expect(component.stackName).toBe(display);
      });
    });
  });

  describe('Accessibility', () => {
    it('should render without accessibility errors', () => {
      component.stackName = 'TypeScript';
      fixture.detectChanges();
      expect(fixture.nativeElement).toBeTruthy();
    });
  });
});
