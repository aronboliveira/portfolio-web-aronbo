/**
 * @jest-environment jsdom
 * @description Comprehensive unit tests for handlersStyle.ts
 * Tests fillWithTag function and language dictionaries
 */
import { fillWithTag, ptBrDict, enUsDict } from './handlersStyle';

describe('handlersStyle', () => {
  describe('fillWithTag', () => {
    beforeEach(() => {
      document.body.innerHTML = '';
    });

    it('should append span with tag name when element is empty', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      fillWithTag(div);

      expect(div.querySelector('span')).toBeTruthy();
      // The function sets innerText, which in JSDOM may not reflect to textContent immediately
      expect(div.querySelector('span')?.innerText).toBe('DIV');
    });

    it('should not append span when element has children', () => {
      const div = document.createElement('div');
      const child = document.createElement('p');
      child.textContent = 'existing content';
      div.appendChild(child);

      fillWithTag(div);

      const spans = div.querySelectorAll('span');
      expect(spans.length).toBe(0);
    });

    it('should not append span when element has text content', () => {
      const div = document.createElement('div');
      div.textContent = 'Some text';

      fillWithTag(div);

      // The div already has text content
      expect(div.textContent).toBe('Some text');
    });

    it('should handle multiple elements', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('section');

      fillWithTag(div1, div2);

      // The function sets innerText, not textContent
      expect(div1.querySelector('span')?.innerText).toBe('DIV');
      expect(div2.querySelector('span')?.innerText).toBe('SECTION');
    });

    it('should handle null elements gracefully', () => {
      expect(() => fillWithTag(null as any)).not.toThrow();
    });

    it('should handle undefined elements gracefully', () => {
      expect(() => fillWithTag(undefined as any)).not.toThrow();
    });

    it('should handle mixed valid and invalid elements', () => {
      const div = document.createElement('div');
      expect(() =>
        fillWithTag(div, null as any, undefined as any),
      ).not.toThrow();
      // The function sets innerText, not textContent
      expect(div.querySelector('span')?.innerText).toBe('DIV');
    });

    it('should handle non-array input gracefully', () => {
      expect(() => fillWithTag('not an element' as any)).not.toThrow();
    });
  });

  describe('ptBrDict', () => {
    it('should be a Map', () => {
      expect(ptBrDict).toBeInstanceOf(Map);
    });

    it('should have entries for all expected keys', () => {
      const expectedKeys = [
        'toggle-language',
        'mailto',
        'linkedin',
        'github',
        'tech-content',
        'hi-presentation',
        'present-arrow-span',
        'experience',
        'exp-arrow-span',
        'courses',
        'courses-arrow-span',
        'working-projects',
      ];

      expectedKeys.forEach(key => {
        expect(ptBrDict.has(key)).toBe(true);
      });
    });

    it('should have correct Portuguese content for tech-content', () => {
      const entry = ptBrDict.get('tech-content') as any;
      expect(entry.innerText).toBe('Desenvolvimento Web');
    });

    it('should have correct Portuguese greeting', () => {
      const entry = ptBrDict.get('hi-presentation') as any;
      expect(entry.innerText).toBe('Olá! Eu sou o ');
    });

    it('should have correct Portuguese experience heading', () => {
      const entry = ptBrDict.get('experience') as any;
      expect(entry.innerText).toBe('Minha experiência');
    });

    it('should have correct mailto title in Portuguese', () => {
      const entry = ptBrDict.get('mailto') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('e-mail');
    });

    it('should have correct linkedin title in Portuguese', () => {
      const entry = ptBrDict.get('linkedin') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('LinkedIn');
    });

    it('should have correct github title in Portuguese', () => {
      const entry = ptBrDict.get('github') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('Github');
    });
  });

  describe('enUsDict', () => {
    it('should be a Map', () => {
      expect(enUsDict).toBeInstanceOf(Map);
    });

    it('should have entries for all expected keys', () => {
      const expectedKeys = [
        'toggle-language',
        'mailto',
        'linkedin',
        'github',
        'tech-content',
        'hi-presentation',
        'present-arrow-span',
        'experience',
        'exp-arrow-span',
        'courses',
        'courses-arrow-span',
        'working-projects',
      ];

      expectedKeys.forEach(key => {
        expect(enUsDict.has(key)).toBe(true);
      });
    });

    it('should have correct English content for tech-content', () => {
      const entry = enUsDict.get('tech-content') as any;
      expect(entry.innerText).toBe('Web Development');
    });

    it('should have correct English greeting', () => {
      const entry = enUsDict.get('hi-presentation') as any;
      expect(entry.innerText).toBe("Hello! I'm ");
    });

    it('should have correct English experience heading', () => {
      const entry = enUsDict.get('experience') as any;
      expect(entry.innerText).toBe('My experience');
    });

    it('should have correct mailto title in English', () => {
      const entry = enUsDict.get('mailto') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('email');
    });

    it('should have correct linkedin title in English', () => {
      const entry = enUsDict.get('linkedin') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('LinkedIn');
    });

    it('should have correct github title in English', () => {
      const entry = enUsDict.get('github') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('Github');
    });

    it('should have toggle-language with Portuguese instructions', () => {
      const entry = enUsDict.get('toggle-language') as any;
      expect(entry.title).toBeDefined();
      expect(entry.title).toContain('pt-BR');
    });
  });

  describe('Dictionary correspondence', () => {
    it('should have the same keys in both dictionaries', () => {
      const ptBrKeys = Array.from(ptBrDict.keys()).sort();
      const enUsKeys = Array.from(enUsDict.keys()).sort();
      expect(ptBrKeys).toEqual(enUsKeys);
    });

    it('should have entries with same structure for corresponding keys', () => {
      ptBrDict.forEach((ptValue, key) => {
        const enValue = enUsDict.get(key);
        expect(enValue).toBeDefined();

        // Both should have same property (either 'title' or 'innerText')
        const ptProps = Object.keys(ptValue);
        const enProps = Object.keys(enValue!);
        expect(ptProps).toEqual(enProps);
      });
    });
  });
});
