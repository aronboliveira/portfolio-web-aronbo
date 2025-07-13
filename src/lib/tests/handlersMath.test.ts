import { parseFinite } from '../handlers/handlersMath';

describe('parseFinite', () => {
  it('parses float value from string', () => {
    expect(parseFinite('3.14')).toBe(3.14);
  });

  it('parses integer value from string when context is int', () => {
    expect(parseFinite('3.14', 'int')).toBe(3);
  });

  it('returns default value if NaN is passed', () => {
    expect(parseFinite('not-a-number')).toBe(0);
  });

  it('throws type error if context is not a valid string', () => {
    expect(() => parseFinite('3.14', 'invalid')).toThrow();
  });
});
