/**
 * @jest-environment jsdom
 * @description Comprehensive unit tests for handlersErrors.ts
 * Tests all error factory functions for proper error generation
 */
import {
  listError,
  htmlElementNotFound,
  elementNotFound,
  nodeNotFound,
  evTargNotFound,
  typeError,
  numberError,
  stringError,
  argsError,
  fetchError,
  markWithCommentary,
} from './handlersErrors';

// Suppress console.error during tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});

describe('handlersErrors', () => {
  describe('listError', () => {
    it('should return an Error object for empty list', () => {
      const result = listError([], 'test context', ['string']);
      expect(result).toBeInstanceOf(Error);
    });

    it('should return an Error for undefined list', () => {
      const result = listError(undefined, 'test context', ['Element']);
      expect(result).toBeInstanceOf(Error);
    });

    it('should include context in error message', () => {
      const result = listError([], 'my-context', ['HTMLElement']);
      expect(result.message).toContain('my-context');
    });

    it('should handle NodeList', () => {
      const div = document.createElement('div');
      const nodeList = div.querySelectorAll('span');
      const result = listError(nodeList, 'nodeList test', ['Element']);
      expect(result).toBeInstanceOf(Error);
    });

    it('should handle Map', () => {
      const map = new Map();
      const result = listError(map, 'map test', ['string']);
      expect(result).toBeInstanceOf(Error);
    });

    it('should handle Set', () => {
      const set = new Set();
      const result = listError(set, 'set test', ['number']);
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('htmlElementNotFound', () => {
    it('should return an Error when element is null', () => {
      const result = htmlElementNotFound(null, 'test context');
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('HTMLELEMENT ERROR');
    });

    it('should return an Error when element is undefined', () => {
      const result = htmlElementNotFound(undefined, 'test context');
      expect(result).toBeInstanceOf(Error);
    });

    it('should include element id in error message when present', () => {
      const element = document.createElement('div');
      element.id = 'test-id';
      const result = htmlElementNotFound(element, 'validation');
      expect(result.message).toContain('test-id');
    });

    it('should include element tagName in error message', () => {
      const element = document.createElement('span');
      const result = htmlElementNotFound(element, 'validation');
      expect(result.message).toContain('SPAN');
    });

    it('should list accepted types in error message', () => {
      const result = htmlElementNotFound(null, 'context', ['HTMLDivElement', 'HTMLSpanElement']);
      expect(result.message).toContain('HTMLDivElement');
      expect(result.message).toContain('HTMLSpanElement');
    });
  });

  describe('elementNotFound', () => {
    it('should return an Error when element is null', () => {
      const result = elementNotFound(null, 'test context', ['Element']);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('ELEMENT ERROR');
    });

    it('should handle SVG elements', () => {
      const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const result = elementNotFound(svgElement, 'svg validation', ['SVGElement']);
      expect(result.message).toContain('svg');
    });

    it('should include context in message', () => {
      const result = elementNotFound(null, 'my special context', ['Element']);
      expect(result.message).toContain('my special context');
    });
  });

  describe('nodeNotFound', () => {
    it('should return an Error when node is null', () => {
      const result = nodeNotFound(null, 'test context', ['Node']);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('NODE ERROR');
    });

    it('should include node type information', () => {
      const textNode = document.createTextNode('test');
      const result = nodeNotFound(textNode, 'text node test', ['Element']);
      expect(result.message).toContain(textNode.nodeType.toString());
    });

    it('should include node name', () => {
      const comment = document.createComment('test comment');
      const result = nodeNotFound(comment, 'comment test', ['Element']);
      expect(result.message).toContain('#comment');
    });

    it('should show connected status', () => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      const result = nodeNotFound(div, 'connected test', ['Element']);
      expect(result.message).toMatch(/connected/i);
      document.body.removeChild(div);
    });
  });

  describe('evTargNotFound', () => {
    it('should return an Error for invalid event target', () => {
      const event = new Event('click');
      const result = evTargNotFound(null, event, ['HTMLElement']);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('NODE ERROR');
    });

    it('should include event type in message', () => {
      const event = new Event('submit');
      const result = evTargNotFound(null, event, ['HTMLFormElement']);
      expect(result.message).toContain('submit');
    });

    it('should include event phase', () => {
      const event = new Event('click');
      const result = evTargNotFound(null, event, ['Element']);
      expect(result.message).toMatch(/phase/i);
    });

    it('should include trusted status', () => {
      const event = new Event('click');
      const result = evTargNotFound(null, event, ['Element']);
      expect(result.message).toMatch(/trusted/i);
    });
  });

  describe('typeError', () => {
    it('should return an Error for type mismatch', () => {
      const result = typeError(123, 'string expected', ['string']);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('TYPE ERROR');
    });

    it('should include the obtained value', () => {
      const result = typeError('test value', 'number context', ['number']);
      expect(result.message).toContain('test value');
    });

    it('should handle null values', () => {
      const result = typeError(null, 'null context', ['object']);
      expect(result.message).toContain('nullish');
    });

    it('should handle undefined values', () => {
      const result = typeError(undefined, 'undefined context', ['object']);
      expect(result.message).toContain('nullish');
    });

    it('should list accepted types', () => {
      const result = typeError([], 'array context', ['string', 'number']);
      expect(result.message).toContain('string');
      expect(result.message).toContain('number');
    });
  });

  describe('numberError', () => {
    it('should return an Error for invalid number', () => {
      const result = numberError(NaN, 'NaN context');
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('NUMBER ERROR');
    });

    it('should include the obtained value', () => {
      const result = numberError('not a number', 'validation context');
      expect(result.message).toContain('not a number');
    });

    it('should include context', () => {
      const result = numberError(Infinity, 'infinity check');
      expect(result.message).toContain('infinity check');
    });

    it('should handle null', () => {
      const result = numberError(null, 'null number');
      expect(result.message).toContain('nullish');
    });
  });

  describe('stringError', () => {
    it('should return an Error for string pattern mismatch', () => {
      const result = stringError('abc', 'number pattern');
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('STRING ERROR');
    });

    it('should include fetched string in message', () => {
      const result = stringError('test-string', 'expected-pattern');
      expect(result.message).toContain('test-string');
    });

    it('should include expected pattern', () => {
      const result = stringError('value', 'email@pattern.com');
      expect(result.message).toContain('email@pattern.com');
    });

    it('should handle empty string', () => {
      const result = stringError('', 'non-empty');
      expect(result).toBeInstanceOf(Error);
    });

    it('should handle null/undefined', () => {
      const result = stringError(null as any, 'string expected');
      expect(result).toBeInstanceOf(Error);
    });
  });

  describe('argsError', () => {
    it('should return an Error for argument validation failure', () => {
      const result = argsError(['string'], 123);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('ARGUMENTS ERROR');
    });

    it('should handle multiple values', () => {
      const result = argsError(['string', 'number'], 'test', 42, true);
      expect(result.message).toContain('test');
      expect(result.message).toContain('42');
    });

    it('should include accepted types', () => {
      const result = argsError(['HTMLElement', 'SVGElement'], document.createElement('div'));
      expect(result.message).toContain('HTMLElement');
      expect(result.message).toContain('SVGElement');
    });
  });

  describe('fetchError', () => {
    it('should return an Error for failed fetch response', () => {
      const mockResponse = new Response(null, {
        status: 404,
        statusText: 'Not Found',
      });
      const result = fetchError(mockResponse);
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toContain('FETCH ERROR');
    });

    it('should include status code', () => {
      const mockResponse = new Response(null, {
        status: 500,
        statusText: 'Internal Server Error',
      });
      const result = fetchError(mockResponse);
      expect(result.message).toContain('500');
    });

    it('should include status text', () => {
      const mockResponse = new Response(null, {
        status: 403,
        statusText: 'Forbidden',
      });
      const result = fetchError(mockResponse);
      expect(result.message).toContain('Forbidden');
    });

    it('should include ok status', () => {
      const mockResponse = new Response(null, { status: 200 });
      const result = fetchError(mockResponse);
      expect(result.message).toMatch(/ok/i);
    });
  });

  describe('markWithCommentary', () => {
    it('should add a comment node before the element', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      
      markWithCommentary(child, 'test context');
      
      expect(parent.firstChild).toBeInstanceOf(Comment);
      expect((parent.firstChild as Comment).textContent).toContain('test context');
    });

    it('should handle element without parent gracefully', () => {
      const orphan = document.createElement('div');
      expect(() => markWithCommentary(orphan, 'orphan test')).not.toThrow();
    });

    it('should handle null element gracefully', () => {
      expect(() => markWithCommentary(null, 'null test')).not.toThrow();
    });

    it('should handle undefined element gracefully', () => {
      expect(() => markWithCommentary(undefined, 'undefined test')).not.toThrow();
    });

    it('should include "validation error" in comment', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');
      parent.appendChild(child);
      
      markWithCommentary(child, 'my context');
      
      expect((parent.firstChild as Comment).textContent).toContain('validation error');
    });
  });
});
