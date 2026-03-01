/**
 * @jest-environment jsdom
 * @description Comprehensive unit tests for handlersMath.ts
 * Tests parseFinite function with various edge cases
 */
import { parseFinite } from './handlersMath';

describe('handlersMath', () => {
  describe('parseFinite', () => {
    describe('basic float parsing', () => {
      it('should parse a simple float string', () => {
        expect(parseFinite('3.14')).toBe(3.14);
      });

      it('should parse a simple integer string as float', () => {
        expect(parseFinite('42')).toBe(42);
      });

      it('should parse negative numbers', () => {
        expect(parseFinite('-10.5')).toBe(-10.5);
      });

      it('should parse zero', () => {
        expect(parseFinite('0')).toBe(0);
      });

      it('should parse decimal starting with zero', () => {
        expect(parseFinite('0.123')).toBe(0.123);
      });
    });

    describe('integer context', () => {
      it('should parse as integer when context is "int"', () => {
        expect(parseFinite('42.99', 'int')).toBe(42);
      });

      it('should truncate decimal when parsing as int', () => {
        expect(parseFinite('3.14159', 'int')).toBe(3);
      });

      it('should handle negative integers', () => {
        expect(parseFinite('-15.7', 'int')).toBe(-15);
      });
    });

    describe('pixel value handling', () => {
      it('should strip px suffix and parse', () => {
        expect(parseFinite('100px')).toBe(100);
      });

      it('should handle decimal px values', () => {
        expect(parseFinite('16.5px')).toBe(16.5);
      });

      it('should handle zero px', () => {
        expect(parseFinite('0px')).toBe(0);
      });
    });

    describe('default value handling', () => {
      it('should return default when value is not a valid number', () => {
        expect(parseFinite('invalid', 'float', 99)).toBe(99);
      });

      it('should return default value of 0 when invalid and no default provided', () => {
        expect(parseFinite('abc')).toBe(0);
      });

      it('should return custom default for empty string', () => {
        expect(parseFinite('', 'float', 50)).toBe(50);
      });

      it('should return default for NaN strings', () => {
        expect(parseFinite('NaN', 'float', 25)).toBe(25);
      });
    });

    describe('edge cases', () => {
      it('should handle very large numbers', () => {
        expect(parseFinite('999999999.999')).toBe(999999999.999);
      });

      it('should handle very small decimals', () => {
        expect(parseFinite('0.000001')).toBe(0.000001);
      });

      it('should handle whitespace in value', () => {
        // Depends on implementation behavior
        const result = parseFinite(' 42 ');
        expect(typeof result).toBe('number');
      });

      it('should handle scientific notation', () => {
        expect(parseFinite('1e5')).toBe(100000);
      });
    });

    describe('error handling', () => {
      it('should handle Infinity string', () => {
        const result = parseFinite('Infinity', 'float', 0);
        expect(result).toBe(0); // Should return default
      });

      it('should handle negative Infinity string', () => {
        const result = parseFinite('-Infinity', 'float', 0);
        expect(result).toBe(0);
      });

      it('should return -1 when value is not a string', () => {
        // Type coercion test - passing number instead of string
        const result = parseFinite(123 as any, 'float', 0);
        expect(result).toBe(-1);
      });

      it('should return -1 when context is not a string', () => {
        const result = parseFinite('42', 123 as any, 0);
        expect(result).toBe(-1);
      });

      it('should return -1 when context is invalid string', () => {
        const result = parseFinite('42', 'invalid' as any, 0);
        expect(result).toBe(-1);
      });

      it('should return -1 when def is not a number', () => {
        const result = parseFinite('42', 'float', 'default' as any);
        expect(result).toBe(-1);
      });
    });

    describe('integer context edge cases', () => {
      it('should return default for int context with invalid value', () => {
        const result = parseFinite('not-a-number', 'int', 10);
        expect(result).toBe(10);
      });

      it('should handle int conversion for pixel values', () => {
        expect(parseFinite('100px', 'int')).toBe(100);
      });
    });
  });
});
