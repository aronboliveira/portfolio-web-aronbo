import { syncAriaStates } from '../handlers/gHandlers';

describe('syncAriaStates', () => {
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('adds aria-hidden to hidden elements', () => {
    div.hidden = true;
    syncAriaStates([div]);
    expect(div.getAttribute('aria-hidden')).toBe('true');
  });

  it('adds aria-required to required input elements', () => {
    const input = document.createElement('input');
    input.required = true;
    syncAriaStates([input]);
    expect(input.getAttribute('aria-required')).toBe('true');
  });
});
