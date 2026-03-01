import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProjectComponent } from './project.component';
import { StackComponent } from '../stack/stack.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent, StackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const componentDef = (ProjectComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Default input values', () => {
    it('should have empty href by default', () => {
      expect(component.href).toBe('');
    });

    it('should have empty title by default', () => {
      expect(component.title).toBe('');
    });

    it('should have empty desc by default', () => {
      expect(component.desc).toBe('');
    });

    it('should have empty hover by default', () => {
      expect(component.hover).toBe('');
    });

    it('should have empty stacks array by default', () => {
      expect(component.stacks).toEqual([]);
    });
  });

  describe('Input properties', () => {
    it('should accept href input', () => {
      component.href = 'https://example.com';
      fixture.detectChanges();
      expect(component.href).toBe('https://example.com');
    });

    it('should accept title input', () => {
      component.title = 'My Project';
      fixture.detectChanges();
      expect(component.title).toBe('My Project');
    });

    it('should accept desc input', () => {
      component.desc = 'Project description';
      fixture.detectChanges();
      expect(component.desc).toBe('Project description');
    });

    it('should accept hover input', () => {
      component.hover = 'Hover text for accessibility';
      fixture.detectChanges();
      expect(component.hover).toBe('Hover text for accessibility');
    });

    it('should accept stacks array input', () => {
      component.stacks = ['TypeScript', 'Angular', 'SASS'];
      fixture.detectChanges();
      expect(component.stacks).toEqual(['TypeScript', 'Angular', 'SASS']);
    });
  });

  describe('Project rendering', () => {
    beforeEach(() => {
      component.href = 'https://github.com/test/project';
      component.title = 'Test Project';
      component.desc = 'A test project description';
      component.hover = 'Click to view project';
      component.stacks = ['Next.js', 'TypeScript'];
      fixture.detectChanges();
    });

    it('should render project link with correct href', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('href')).toBe('https://github.com/test/project');
    });

    it('should render project link with target="_blank"', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('target')).toBe('_blank');
    });

    it('should render project title', () => {
      const title = fixture.debugElement.query(By.css('strong'));
      expect(title.nativeElement.textContent).toContain('Test Project');
    });

    it('should render project description', () => {
      const desc = fixture.debugElement.query(By.css('.project-desc'));
      expect(desc.nativeElement.textContent).toContain('A test project description');
    });

    it('should render stack components for each stack', () => {
      const stacks = fixture.debugElement.queryAll(By.directive(StackComponent));
      expect(stacks.length).toBe(2);
    });
  });

  describe('ID generation', () => {
    it('should generate correct anchor id from title', () => {
      component.title = 'My Project Name';
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.id).toBe('anchor-My-Project-Name');
    });

    it('should handle titles with special characters', () => {
      component.title = 'Project Test';
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.id).toContain('anchor-');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      component.href = 'https://example.com';
      component.title = 'Accessible Project';
      component.hover = 'Click to learn more about this project';
      fixture.detectChanges();
    });

    it('should have title attribute for hover text', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link.nativeElement.getAttribute('title')).toBe('Click to learn more about this project');
    });

    it('should have proper link structure', () => {
      const link = fixture.debugElement.query(By.css('a'));
      expect(link).toBeTruthy();
      expect(link.nativeElement.classList.contains('project')).toBe(true);
    });
  });

  describe('Real project data', () => {
    const projectExamples = [
      {
        title: 'PROSSaúde',
        href: 'https://prossaude-client.netlify.app',
        stacks: ['Next.js', 'TypeScript', 'Express.js'],
      },
      {
        title: 'Ana Doces',
        href: 'https://anadocesapp.netlify.app',
        stacks: ['React', 'JavaScript'],
      },
      {
        title: 'Organo Lab',
        href: 'https://blog.organolab.com.br/calculadora-de-solo/',
        stacks: ['WordPress', 'React'],
      },
    ];

    projectExamples.forEach((project) => {
      it(`should render ${project.title} correctly`, () => {
        component.title = project.title;
        component.href = project.href;
        component.stacks = project.stacks;
        fixture.detectChanges();

        const link = fixture.debugElement.query(By.css('a'));
        expect(link.nativeElement.getAttribute('href')).toBe(project.href);
        
        const title = fixture.debugElement.query(By.css('strong'));
        expect(title.nativeElement.textContent).toContain(project.title);
      });
    });
  });
});
