import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@testing-library/jest-dom';

setupZoneTestEnv();

// Declare global for TypeScript
declare const global: typeof globalThis;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
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
(window as any).ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
(window as any).IntersectionObserver = jest.fn().mockImplementation(() => ({
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
window.getComputedStyle = jest.fn(element => {
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

// Add Response to global (for fetch tests) - Node.js 18+ has native fetch
// If Response is not available, create a minimal mock
if (typeof global.Response === 'undefined') {
  (global as any).Response = class Response {
    ok: boolean;
    status: number;
    statusText: string;
    headers: Headers;
    body: any;

    constructor(body?: BodyInit | null, init?: ResponseInit) {
      this.ok = !init?.status || (init.status >= 200 && init.status < 300);
      this.status = init?.status || 200;
      this.statusText = init?.statusText || 'OK';
      this.headers = new Headers(init?.headers);
      this.body = body;
    }

    json() {
      return Promise.resolve(JSON.parse(this.body || '{}'));
    }

    text() {
      return Promise.resolve(this.body?.toString() || '');
    }
  };
}

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
