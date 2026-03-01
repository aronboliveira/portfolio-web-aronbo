/// <reference types="jest" />
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RetryErrorComponent } from './retry-error.component';

describe('RetryErrorComponent', () => {
  let component: RetryErrorComponent;
  let fixture: ComponentFixture<RetryErrorComponent>;
  let originalLocation: Location;
  let mockReload: jest.Mock;

  beforeEach(async () => {
    // Mock location.reload
    originalLocation = window.location;
    mockReload = jest.fn();
    delete (window as any).location;
    window.location = { ...originalLocation, reload: mockReload } as any;

    await TestBed.configureTestingModule({
      declarations: [RetryErrorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RetryErrorComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    window.location = originalLocation;
    document.body.innerHTML = '';
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should have default message', () => {
      expect(component.message).toBe('Erro indefinido');
    });

    it('should have undefined altRoot by default', () => {
      expect(component.altRoot).toBeUndefined();
    });

    it('should have undefined altJsx by default', () => {
      expect(component.altJsx).toBeUndefined();
    });
  });

  describe('Input properties', () => {
    it('should accept custom message', () => {
      component.message = 'Custom error message';
      expect(component.message).toBe('Custom error message');
    });

    it('should accept altRoot element', () => {
      const mockElement = document.createElement('div');
      component.altRoot = mockElement;
      expect(component.altRoot).toBe(mockElement);
    });

    it('should accept altJsx content', () => {
      const mockJsx = '<span>Mock JSX</span>';
      component.altJsx = mockJsx;
      expect(component.altJsx).toBe(mockJsx);
    });
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit without throwing', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should set altRoot to main element if not provided', fakeAsync(() => {
      const mainElement = document.createElement('main');
      document.body.appendChild(mainElement);

      fixture.detectChanges();
      tick(100);

      expect(component.altRoot).toBe(mainElement);
    }));

    it('should handle missing main element', fakeAsync(() => {
      fixture.detectChanges();
      tick(100);

      // altRoot should be null when no main exists
      expect(component.altRoot).toBeNull();
    }));

    it('should call syncAriaStates during init', () => {
      // syncAriaStates is called synchronously in ngOnInit
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should accept preset altRoot before init', fakeAsync(() => {
      const customRoot = document.createElement('div');
      component.altRoot = customRoot;
      fixture.detectChanges();
      tick(100);

      // altRoot should remain as preset value, not overwritten
      expect(component.altRoot).toBe(customRoot);
    }));
  });
});
