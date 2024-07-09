import { Component, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  elementNotFound,
  htmlElementNotFound,
} from '../../lib/handlers/handlersErrors';
import { enUsDict, ptBrDict } from '../../lib/handlers/handlersStyle';
import { EventComponent } from '../event/event.component';

@Component({
  selector: 'app-placeholder-kipper-main',
  standalone: true,
  imports: [FormsModule, CommonModule, EventComponent],
  templateUrl: './placeholder-kipper-main.component.html',
  styleUrls: ['./placeholder-kipper-main.component.scss'],
})
export class PlaceHolderKipperMainComponent {
  isChecked = false;
  @ViewChild('ptBrTemplate', { static: true }) ptBrTemplate!: TemplateRef<any>;
  @ViewChild('enUsTemplate', { static: true }) enUsTemplate!: TemplateRef<any>;
  changeLanguage(ev: Event): void {
    try {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        try {
          try {
            const ptBR = document.getElementById('pt-br');
            const enUS = document.getElementById('en-us');
            if (!(ptBR instanceof HTMLElement))
              throw htmlElementNotFound(ptBR, `Validation of ptBR instance`);
            if (!(enUS instanceof HTMLElement))
              throw htmlElementNotFound(enUS, `Validation of enUS instance`);
            ptBR.style.fontWeight = 'normal';
            enUS.style.fontWeight = 'bolder';
          } catch (e) {
            console.error(
              `Error executing change of language acronyms spans:\n${
                (e as Error).message
              }`
            );
            document
              .getElementById('leg-lang')
              ?.querySelectorAll('*')
              .forEach((textEl, i) => {
                try {
                  if (!(textEl instanceof HTMLElement))
                    throw htmlElementNotFound(
                      textEl,
                      `Validation of Legend Text Element`
                    );
                  textEl.style.fontWeight = 'bold';
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for language text elements in legend:\n${
                      (e as Error).message
                    }`
                  );
                }
              });
          }
          try {
            let keyAcc = 0;
            for (const key of enUsDict.keys()) {
              try {
                const currEl = document.getElementById(key);
                if (!(currEl instanceof Element))
                  throw elementNotFound(
                    currEl,
                    `Validation of element instance`,
                    ['Element']
                  );
                const attrs = enUsDict.get(key);
                if (!attrs)
                  throw new Error(`Failed to fetch attrs using id key`);
                Object.entries(attrs).forEach(attr => {
                  console.log(attr);
                  if (
                    attr[0] in currEl &&
                    ((ptBrDict.get(currEl.id) &&
                      (ptBrDict.get(currEl.id) as any)[`${attr[0]}`] ===
                        (currEl as any)[`${attr[0]}`]) ||
                      (enUsDict.get(currEl.id) &&
                        (enUsDict.get(currEl.id) as any)[`${attr[0]}`] ===
                          (currEl as any)[`${attr[0]}`]))
                  )
                    (currEl as any)[`${attr[0]}`] = attr[1];
                });
              } catch (e) {
                console.error(
                  `Error executing iteration ${keyAcc} while iterating over enUsDict keys:\n${
                    (e as Error).message
                  }`
                );
              }
              keyAcc += 1;
            }
          } catch (e) {
            console.error(
              `Error executing procedure for checking enUsDict:\n${
                (e as Error).message
              }`
            );
          }
        } catch (e) {
          console.error(
            `Error executing colateral effects for checked:\n${
              (e as Error).message
            }`
          );
        }
      } else {
        try {
          try {
            const ptBR = document.getElementById('pt-br');
            const enUS = document.getElementById('en-us');
            if (!(ptBR instanceof HTMLElement))
              throw htmlElementNotFound(ptBR, `Validation of ptBR instance`);
            if (!(enUS instanceof HTMLElement))
              throw htmlElementNotFound(enUS, `Validation of enUS instance`);
            ptBR.style.fontWeight = 'bolder';
            enUS.style.fontWeight = 'normal';
          } catch (e) {
            console.error(
              `Error executing change of language acronyms spans:\n${
                (e as Error).message
              }`
            );
            document
              .getElementById('leg-lang')
              ?.querySelectorAll('*')
              .forEach((textEl, i) => {
                try {
                  if (!(textEl instanceof HTMLElement))
                    throw htmlElementNotFound(
                      textEl,
                      `Validation of Legend Text Element`
                    );
                  textEl.style.fontWeight = 'bold';
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for language text elements in legend:\n${
                      (e as Error).message
                    }`
                  );
                }
              });
          }
          try {
            let keyAcc = 0;
            for (const key of ptBrDict.keys()) {
              try {
                const currEl = document.getElementById(key);
                if (!(currEl instanceof Element))
                  throw elementNotFound(
                    currEl,
                    `Validation of element instance`,
                    ['Element']
                  );
                const attrs = ptBrDict.get(key);
                if (!attrs)
                  throw new Error(`Failed to fetch attributes using id key`);
                Object.entries(attrs).forEach(attr => {
                  console.log(attr);
                  if (
                    attr[0] in currEl &&
                    ((ptBrDict.get(currEl.id) &&
                      (ptBrDict.get(currEl.id) as any)[`${attr[0]}`] ===
                        (currEl as any)[`${attr[0]}`]) ||
                      (enUsDict.get(currEl.id) &&
                        (enUsDict.get(currEl.id) as any)[`${attr[0]}`]) ===
                        (currEl as any)[`${attr[0]}`])
                  )
                    (currEl as any)[`${attr[0]}`] = attr[1];
                });
              } catch (e) {
                console.error(
                  `Error executing iteration ${keyAcc} while iterating over ptBrDict keys:\n${
                    (e as Error).message
                  }`
                );
              }
              keyAcc += 1;
            }
          } catch (e) {
            console.error(
              `Error executing procedure for checking ptBrDict:\n${
                (e as Error).message
              }`
            );
          }
        } catch (e) {
          console.error(
            `Error executing colateral effects for unchecked:${
              (e as Error).message
            }`
          );
        }
      }
    } catch (e) {
      console.error(
        `Error executing changeLanguage for ${ev.currentTarget}:\n${
          (e as Error).message
        }`
      );
    }
  }
}
