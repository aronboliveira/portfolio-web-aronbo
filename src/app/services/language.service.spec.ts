import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to pt', () => {
    expect(service.lang()).toBe('pt');
  });

  it('should default isPt to true', () => {
    expect(service.isPt()).toBe(true);
  });

  it('should default isEn to false', () => {
    expect(service.isEn()).toBe(false);
  });

  describe('setLang', () => {
    it('should switch to en', () => {
      service.setLang('en');
      expect(service.lang()).toBe('en');
      expect(service.isEn()).toBe(true);
      expect(service.isPt()).toBe(false);
    });

    it('should switch back to pt', () => {
      service.setLang('en');
      service.setLang('pt');
      expect(service.lang()).toBe('pt');
      expect(service.isPt()).toBe(true);
      expect(service.isEn()).toBe(false);
    });
  });
});
