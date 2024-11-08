import { fillWithTag, ptBrDict, enUsDict } from '../handlers/handlersStyle';

describe('fillWithTag', () => {
  let div: HTMLElement;

  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    document.body.removeChild(div);
  });

  it('appends a span with tag name to empty elements', () => {
    fillWithTag(div);
    expect(div.querySelector('span')?.innerText).toBe('DIV');
  });

  it('does nothing if element has children', () => {
    const child = document.createElement('span');
    div.appendChild(child);
    fillWithTag(div);
    expect(div.children.length).toBe(1);
  });

  it('filters out non-HTMLElement elements', () => {
    fillWithTag(null as unknown as HTMLElement, div);
    expect(div.querySelector('span')?.innerText).toBe('DIV');
  });
});
describe('ptBrDict and enUsDict', () => {
  it('contains expected keys and values in ptBrDict', () => {
    expect(ptBrDict.get('toggle-language')).toEqual({
      title: 'Click here to change to en-US',
    });
  });

  it('contains expected keys and values in enUsDict', () => {
    expect(enUsDict.get('toggle-language')).toEqual({
      title: 'Clique aqui para mudar a língua para pt-BR',
    });
  });
});
