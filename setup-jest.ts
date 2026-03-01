import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock scrollTo
window.scrollTo = jest.fn();

// Mock getComputedStyle for font-related tests
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = jest.fn((element) => {
  const style = originalGetComputedStyle(element);
  return {
    ...style,
    fontSize: '16px',
    width: '100px',
    height: '100px',
    display: 'block',
    getPropertyValue: (prop: string) => style.getPropertyValue(prop),
  };
}) as typeof window.getComputedStyle;

// Console error handling for cleaner test output
const originalError = console.error;
console.error = (...args: any[]) => {
  // Filter out known Angular testing warnings
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('NG0303') || args[0].includes('NG0304'))
  ) {
    return;
  }
  originalError.apply(console, args);
};
