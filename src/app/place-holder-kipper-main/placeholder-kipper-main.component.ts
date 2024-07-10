import { Component, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  elementNotFound,
  htmlElementNotFound,
} from '../../lib/handlers/handlersErrors';
import { enUsDict, ptBrDict } from '../../lib/handlers/handlersStyle';
import { EventComponent } from '../event/event.component';
import { voidishEl } from '../../lib/declarations/types';
import { parseFinite } from '../../lib/handlers/handlersMath';

export const iniHeights: { [k: string]: number } = {};
export const iniDisplays: { [k: string]: string } = {};

@Component({
  selector: 'app-placeholder-kipper-main',
  standalone: true,
  imports: [FormsModule, CommonModule, EventComponent],
  templateUrl: './placeholder-kipper-main.component.html',
  styleUrls: ['./placeholder-kipper-main.component.scss'],
})
export class PlaceHolderKipperMainComponent implements OnInit {
  isChecked = false;
  @ViewChild('ptBrTemplate', { static: true }) ptBrTemplate!: TemplateRef<any>;
  @ViewChild('enUsTemplate', { static: true }) enUsTemplate!: TemplateRef<any>;
  @ViewChild('presentArrow') presentArrowRef!: TemplateRef<any>;
  @ViewChild('coursesArrow') coursesArrowRef!: TemplateRef<any>;
  @ViewChild('expArrow') expArrowRef!: TemplateRef<any>;
  @ViewChild('topArrow') topArrowRef!: TemplateRef<any>;
  ngOnInit(): void {
    [
      document.getElementById('timeline'),
      document.getElementById('timeline-courses'),
      document.getElementById('description'),
    ].forEach((timeline, i) => {
      try {
        if (timeline instanceof HTMLElement) {
          iniHeights[`${timeline.id}`] = parseFinite(
            getComputedStyle(timeline).height.replace('px', '').trim()
          );
          if (
            !iniHeights[`${timeline.id}`] &&
            getComputedStyle(timeline).display !== 'none' &&
            parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            ) > 0
          )
            iniHeights[`${timeline.id}`] = parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            );
          if (
            !iniHeights[`${timeline.id}`] &&
            getComputedStyle(timeline).display !== 'none' &&
            parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            ) > 0
          )
            iniDisplays[`${timeline.id}`] = getComputedStyle(timeline).display;
          if (!(timeline.id === 'timeline-courses')) return;
          const arrow = document.getElementById('courses-arrow');
          arrow instanceof Element && arrow.classList.add('toggled');
          const iniHeight = iniHeights[`${timeline.id}`];
          if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
          const htFract = iniHeight / 20;
          const interv = setInterval(interv => {
            if (!(timeline instanceof HTMLElement)) return;
            if (
              !document
                .getElementById('courses-arrow')
                ?.classList.contains('toggled')
            ) {
              clearInterval(interv);
              return;
            }
            const htReduced =
              parseFinite(
                getComputedStyle(timeline).height.replace('px', '').trim()
              ) - htFract;
            if (!Number.isFinite(htReduced)) return;
            if (htReduced <= 0) {
              timeline.style.display = 'none';
              clearInterval(interv);
              return;
            }
            if (htReduced > 0) timeline.style.height = `${htReduced}px`;
          }, 15);
          setTimeout(() => clearInterval(interv), 1000);
        } else {
          iniHeights['timeline-courses'] = 400;
          iniDisplays['timeline-courses'] = 'block';
          iniHeights['timeline'] = 326;
          iniDisplays['timeline'] = 'block';
          iniHeights['description'] = 342;
          iniDisplays['description'] = 'block';
        }
      } catch (e) {
        console.error(
          `Error executing iteration ${i} during onInit:\n${
            (e as Error).message
          }`
        );
      }
    });
  }
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
                  if (currEl.id === 'present-arrow')
                    currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Show paragraph')
                      : ((currEl as any).title = 'Hide paragraph');
                  if (currEl.id === 'exp-arrow')
                    currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Show experience')
                      : ((currEl as any).title = 'Hide experience');
                  if (currEl.id === 'courses-arrow')
                    !currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Hide courses')
                      : ((currEl as any).title = 'Show courses');
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
                  if (currEl.id === 'present-arrow')
                    currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Mostrar parágrafo')
                      : ((currEl as any).title = 'Esconder parágrafo');
                  if (currEl.id === 'exp-arrow')
                    currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Mostrar experiência')
                      : ((currEl as any).title = 'Esconder experiência');
                  if (currEl.id === 'courses-arrow')
                    !currEl.classList.contains('toggled')
                      ? ((currEl as any).title = 'Esconder cursos')
                      : ((currEl as any).title = 'Mostrar cursos');
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
  toggleArrow(ev: MouseEvent, timelineIdf: string = 'timeline-courses'): void {
    try {
      if (!(ev instanceof MouseEvent))
        throw new Error(`Invalid Event passed to toggleArrow`);
      if (!(ev.currentTarget instanceof HTMLElement))
        throw new Error(`Invalid target passed to toggleArrow`);
      if (typeof timelineIdf !== 'string')
        throw new Error(`Invalid type passed as timelineIdf`);
      let targ: voidishEl = ev.currentTarget;
      if (ev.currentTarget instanceof HTMLButtonElement)
        targ = ev.currentTarget.querySelector('svg');
      if (!(targ instanceof SVGElement)) {
        if (targ?.closest('button'))
          targ = targ.closest('button')?.querySelector('svg');
        if (!(targ instanceof SVGElement))
          throw new Error(`Failed to fetch SVG`);
      }
      const targId = targ.id;
      targ.classList.toggle('toggled');
      if (targ.id === 'exp-arrow' && targ.closest('span')) {
        if (this.isChecked)
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Show experience')
            : (targ.closest('span')!.title = 'Hide experience');
        else
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Mostrar experiência')
            : (targ.closest('span')!.title = 'Esconder experiência');
      } else if (targ.id === 'courses-arrow' && targ.closest('span')) {
        if (this.isChecked)
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Show courses')
            : (targ.closest('span')!.title = 'Hide courses');
        else
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Mostrar cursos')
            : (targ.closest('span')!.title = 'Esconder cursos');
      }
      const timeline =
        document.getElementById(timelineIdf) ||
        document.querySelector(timelineIdf);
      targ.closest('button')?.nextElementSibling;
      if (!(timeline instanceof HTMLElement))
        throw htmlElementNotFound(timeline, `Validation of timeline instance`);
      if (!timeline.querySelector('.event')) {
        console.warn(`No event found for timeline. Aborting process.`);
        return;
      }
      if (targ.classList.contains('toggled')) {
        if (
          !iniHeights[timeline.id] &&
          getComputedStyle(timeline).display !== 'none' &&
          parseFinite(
            getComputedStyle(timeline).height.replace('px', '').trim()
          ) > 0
        )
          iniHeights[`${timeline.id}`] = parseFinite(
            getComputedStyle(timeline).height.replace('px', '').trim()
          );
        const iniHeight = iniHeights[timeline.id];
        if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
        const htFract = iniHeight / 20;
        const interv = setInterval(interv => {
          if (!(timeline instanceof HTMLElement)) return;
          if (!document.getElementById(targId)?.classList.contains('toggled')) {
            clearInterval(interv);
            return;
          }
          const htReduced =
            parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            ) - htFract;
          if (!Number.isFinite(htReduced)) return;
          if (htReduced <= 0) {
            timeline.style.display = 'none';
            clearInterval(interv);
            return;
          }
          if (htReduced > 0) timeline.style.height = `${htReduced}px`;
        }, 15);
        setTimeout(() => clearInterval(interv), 1000);
      } else {
        if (
          !iniHeights[timeline.id] &&
          getComputedStyle(timeline).display !== 'none' &&
          parseFinite(
            getComputedStyle(timeline).height.replace('px', '').trim()
          ) > 0
        )
          iniHeights[timeline.id] = parseFinite(
            getComputedStyle(timeline).height.replace('px', '').trim()
          );
        const iniHeight = iniHeights[timeline.id];
        if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
        const htFract = iniHeight / 20;
        timeline.style.display = iniDisplays[timeline.id] || 'block';
        const interv = setInterval(interv => {
          if (!(timeline instanceof HTMLElement)) return;
          const htAdded =
            parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            ) + htFract;
          if (!Number.isFinite(htAdded)) return;
          if (htAdded < iniHeight) timeline.style.height = `${htAdded}px`;
          else if (
            parseFinite(
              getComputedStyle(timeline).height.replace('px', '').trim()
            ) >= iniHeight
          ) {
            clearInterval(interv);
            return;
          }
        }, 15);
        setTimeout(() => {
          timeline.style.height = `${iniHeight}px`;
          clearInterval(interv);
        }, 1000);
      }
    } catch (e) {
      console.error(`Error executing toggleArrow:\n${(e as Error).message}`);
    }
  }
  toggleParagraphArrow(ev: MouseEvent, idf: string = 'description'): void {
    try {
      if (!(ev instanceof MouseEvent))
        throw new Error(`Invalid Event passed to toggleArrow`);
      if (!(ev.currentTarget instanceof HTMLElement))
        throw new Error(`Invalid target passed to toggleArrow`);
      if (typeof idf !== 'string')
        throw new Error(`Invalid type passed as idf`);
      let targ: voidishEl = ev.currentTarget;
      if (
        ev.currentTarget instanceof HTMLButtonElement ||
        ev.currentTarget instanceof HTMLSpanElement
      )
        targ = ev.currentTarget.querySelector('svg');
      if (!(targ instanceof SVGElement)) {
        if (targ?.closest('button'))
          targ = targ.closest('button')?.querySelector('svg');
        if (!(targ instanceof SVGElement))
          throw new Error(`Failed to fetch SVG`);
      }
      const targId = targ.id;
      targ.classList.toggle('toggled');
      if (targ.id === 'present-arrow' && targ.closest('span')) {
        if (this.isChecked)
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Show paragraph')
            : (targ.closest('span')!.title = 'Hide paragraph ');
        else
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Mostrar parágrafo')
            : (targ.closest('span')!.title = 'Esconder parágrafo');
      }
      const paragraph =
        document.getElementById(idf) || document.querySelector(idf);
      targ.closest('button')?.nextElementSibling;
      if (!(paragraph instanceof HTMLElement))
        throw htmlElementNotFound(
          paragraph,
          `Validation of paragraph instance`
        );
      if (!paragraph.querySelector('span')) {
        console.warn(`No span found for paragraph. Aborting process.`);
        return;
      }
      if (targ.classList.contains('toggled')) {
        if (
          !iniHeights[`${paragraph.id}`] &&
          getComputedStyle(paragraph).display !== 'none' &&
          parseFinite(
            getComputedStyle(paragraph).height.replace('px', '').trim()
          ) > 0
        )
          iniHeights[`${paragraph.id}`] = parseFinite(
            getComputedStyle(paragraph).height.replace('px', '').trim()
          );
        const iniHeight = iniHeights[`${paragraph.id}`];
        if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
        const htFract = iniHeight / 20;
        const interv = setInterval(interv => {
          if (!(paragraph instanceof HTMLElement)) return;
          if (!document.getElementById(targId)?.classList.contains('toggled')) {
            clearInterval(interv);
            return;
          }
          const htReduced =
            parseFinite(
              getComputedStyle(paragraph).height.replace('px', '').trim()
            ) - htFract;
          if (!Number.isFinite(htReduced)) return;
          if (htReduced <= 0) {
            paragraph.style.display = 'none';
            clearInterval(interv);
            return;
          }
          if (htReduced > 0) paragraph.style.height = `${htReduced}px`;
        }, 15);
        setTimeout(() => clearInterval(interv), 1000);
      } else {
        if (
          !iniHeights[`${paragraph.id}`] &&
          getComputedStyle(paragraph).display !== 'none' &&
          parseFinite(
            getComputedStyle(paragraph).height.replace('px', '').trim()
          ) > 0
        )
          iniHeights[`${paragraph.id}`] = parseFinite(
            getComputedStyle(paragraph).height.replace('px', '').trim()
          );
        const iniHeight = iniHeights[`${paragraph.id}`];
        if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
        const htFract = iniHeight / 20;
        paragraph.style.display = iniDisplays[paragraph.id] || 'block';
        const interv = setInterval(interv => {
          if (!(paragraph instanceof HTMLElement)) return;
          const htAdded =
            parseFinite(
              getComputedStyle(paragraph).height.replace('px', '').trim()
            ) + htFract;
          if (!Number.isFinite(htAdded)) return;
          if (htAdded < iniHeight) paragraph.style.height = `${htAdded}px`;
          else if (
            parseFinite(
              getComputedStyle(paragraph).height.replace('px', '').trim()
            ) >= iniHeight
          ) {
            clearInterval(interv);
            return;
          }
        }, 15);
        setTimeout(() => {
          paragraph.style.height = `${iniHeight}px`;
          clearInterval(interv);
        }, 1000);
      }
    } catch (e) {
      console.error(
        `Error executing toggleParagraphArrow:\n${(e as Error).message}`
      );
    }
  }
  scrollToTop(): void {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}
