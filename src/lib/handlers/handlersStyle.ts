import { voidishHtmlEl } from '../declarations/types';
import { htmlElementNotFound, listError, typeError } from './handlersErrors';
import { parseFinite } from './handlersMath';

export function fillWithTag(...els: voidishHtmlEl[]): void {
  try {
    if (!Array.isArray(els))
      throw typeError(els, `validation of els argument in fillWithTag`, [
        'Array',
      ]);
    els = els.filter(el => el instanceof HTMLElement);
    if (els.length === 0)
      throw listError(els, `validation of els argument length in fillWithTag`, [
        'HTMLElement',
      ]);
    els.forEach((el, i) => {
      try {
        if (!(el instanceof HTMLElement))
          throw htmlElementNotFound(el, `validation of HTMLElement instance`);
        if (el.children.length === 0 || el.textContent === '')
          el.append(
            Object.assign(document.createElement('span'), {
              innerText: `${el.tagName}`,
            })
          );
      } catch (e) {
        console.error(
          `Error executing iteration ${i} for fillWithTag:\n${
            (e as Error).message
          }`
        );
      }
    });
  } catch (e) {
    console.error(`Error executing fillWithTag:\n${(e as Error).message}`);
  }
}

export function applyDefaultPoppins(): void {
  Array.from(document.querySelectorAll('*'))
    .filter(
      el =>
        el instanceof HTMLElement &&
        !(el instanceof HTMLScriptElement) &&
        parseFinite(getComputedStyle(el).width) > 0 &&
        el.innerText !== ''
    )
    .forEach(htmlEl => {
      parseFinite(getComputedStyle(htmlEl).fontSize) >= 16 &&
        htmlEl.classList.add(`poppins`, `poppins-semibold`);
    });
}

export const ptBrDict: Map<string, { title: string } | { innerText: string }> =
  new Map([
    ['toggle-language', { title: 'Click here to change to en-US' }],
    ['mailto', { title: 'Entre em contato por e-mail clicando aqui!' }],
    [
      'linkedin',
      { title: 'Acesse meu currículo completo no LinkedIn clicando aqui!' },
    ],
    [
      'github',
      { title: 'Acesse aqui meus repositórios no Github clicando aqui!' },
    ],
    ['tech-content', { innerText: 'Conteúdos Tech' }],
  ]);
export const enUsDict: Map<string, { title: string } | { innerText: string }> =
  new Map([
    [
      'toggle-language',
      { title: 'Clique aqui para mudar a língua para pt-BR' },
    ],
    ['mailto', { title: 'Get in contact by email clicking here!' }],
    [
      'linkedin',
      { title: 'Access my complete curriculum on LinkedIn clicking here!' },
    ],
    ['github', { title: 'Check my repositories on Github clicking here!' }],
    ['tech-content', { innerText: 'Tech Content' }],
  ]);
