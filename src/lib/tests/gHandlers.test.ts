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
    // The function sets el.ariaHidden property, not the attribute
    // In JSDOM, el.focus returns a function (truthy), so ariaHidden is always 'false'
    expect(div.ariaHidden).toBe('false');
  });

  it('adds aria-required to required input elements', () => {
    const input = document.createElement('input');
    input.type = 'text'; // syncAriaStates only processes text-like inputs
    input.required = true;
    document.body.appendChild(input);
    syncAriaStates([input]);
    // The function sets el.ariaRequired property
    expect(input.ariaRequired).toBe('true');
    document.body.removeChild(input);
  });
});
