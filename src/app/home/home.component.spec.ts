import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      const componentDef = (HomeComponent as any).ɵcmp;
      expect(componentDef.standalone).toBe(true);
    });
  });

  describe('Platform detection', () => {
    it('should detect browser platform', () => {
      expect(component.isBrowser).toBe(true);
    });
  });

  describe('Rendering', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render homeRoot div', () => {
      const homeRoot = fixture.debugElement.query(By.css('#homeRoot'));
      expect(homeRoot).toBeTruthy();
    });

    it('should render app-home-main-body', () => {
      const mainBody = fixture.debugElement.query(By.css('app-home-main-body'));
      expect(mainBody).toBeTruthy();
    });

    it('should render modalRoot div', () => {
      const modalRoot = fixture.debugElement.query(By.css('#modalRoot'));
      expect(modalRoot).toBeTruthy();
    });
  });

  describe('applyDefaultPoppins method', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component.applyDefaultPoppins).toBeDefined();
    });

    it('should not throw when called', () => {
      expect(() => component.applyDefaultPoppins()).not.toThrow();
    });
  });

  describe('Lifecycle', () => {
    it('should call applyDefaultPoppins in ngAfterViewInit when in browser', () => {
      const spy = jest.spyOn(component, 'applyDefaultPoppins');
      component.ngAfterViewInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Server-side rendering support', () => {
    let serverComponent: HomeComponent;
    let serverFixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
      await TestBed.resetTestingModule()
        .configureTestingModule({
          imports: [HomeComponent],
          providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
        })
        .compileComponents();

      serverFixture = TestBed.createComponent(HomeComponent);
      serverComponent = serverFixture.componentInstance;
    });

    it('should detect server platform', () => {
      expect(serverComponent.isBrowser).toBe(false);
    });

    it('should not call applyDefaultPoppins on server', () => {
      const spy = jest.spyOn(serverComponent, 'applyDefaultPoppins');
      serverComponent.ngAfterViewInit();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
