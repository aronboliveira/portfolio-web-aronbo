import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  elementNotFound,
  htmlElementNotFound,
} from '../../lib/handlers/handlersErrors';
import { enUsDict, ptBrDict } from '../../lib/handlers/handlersStyle';
import { EventComponent } from '../event/event.component';
import { voidishEl } from '../../lib/declarations/types';
import { parseFinite } from '../../lib/handlers/handlersMath';
import { ProjectComponent } from '../project/project.component';

export const iniHeights: { [k: string]: number } = {};
export const iniDisplays: { [k: string]: string } = {};

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, EventComponent, ProjectComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit {
  isChecked = false;
  isBrowser: boolean;
  projectStacks: { [k: string]: string[] } = {
    anhanga: ['Next.js', 'Typescript', 'Express.js', 'Python'],
    webflora: ['Next.js', 'Typescript', 'Python'],
    math: ['Typescript'],
  };
  @ViewChild('ptBrTemplate', { static: true }) ptBrTemplate!: TemplateRef<any>;
  @ViewChild('enUsTemplate', { static: true }) enUsTemplate!: TemplateRef<any>;
  @ViewChild('presentArrow') presentArrowRef!: TemplateRef<any>;
  @ViewChild('coursesArrow') coursesArrowRef!: TemplateRef<any>;
  @ViewChild('expArrow') expArrowRef!: TemplateRef<any>;
  @ViewChild('topArrow') topArrowRef!: TemplateRef<any>;
  @ViewChild('projectsArrow') projectsArrowRef!: TemplateRef<any>;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngAfterViewInit(): void {
    if (this.isBrowser) {
      [
        document.getElementById('timeline'),
        document.getElementById('timeline-courses'),
        document.getElementById('description'),
        document.getElementById('projects-list'),
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
              iniDisplays[`${timeline.id}`] =
                getComputedStyle(timeline).display;
            if (
              !(
                timeline.id === 'timeline-courses' ||
                timeline.id === 'projects-list'
              )
            )
              return;
            const arrow =
              timeline.id === 'timeline-courses'
                ? document.getElementById('courses-arrow')
                : document.getElementById('projects-arrow');
            arrow instanceof Element && arrow.classList.add('toggled');
            arrow instanceof Element &&
              arrow.closest('span')?.id === 'projects-arrow-span' &&
              (arrow.closest('span')!.title = 'Mostrar Projetos');
            if (arrow?.id === 'projects-arrow') {
              setTimeout(() => {
                document
                  .getElementById('projects-list')
                  ?.querySelectorAll('li')
                  .forEach((item, i) => {
                    try {
                      item.style.display = 'none';
                    } catch (e) {
                      console.error(
                        `Error executing iteration ${i} for hidding items in projects list:\n${
                          (e as Error).message
                        }`
                      );
                    }
                  });
              }, 200);
            }
            const iniHeight = iniHeights[`${timeline.id}`];
            if (iniHeight <= 0 || !Number.isFinite(iniHeight)) return;
            const htFract = iniHeight / 20;
            const interv = setInterval(interv => {
              if (!(timeline instanceof HTMLElement)) return;
              if (
                !document
                  .getElementById('courses-arrow')
                  ?.classList.contains('toggled') &&
                !document
                  .getElementById('projects-arrow')
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
              if (htReduced <= 0.1) {
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
            iniHeights['projects-list'] = 515;
            iniDisplays['projects-list'] = 'flex';
          }
        } catch (e) {
          console.error(
            `Error executing iteration ${i} during onInit:\n${
              (e as Error).message
            }`
          );
        }
      });
      this.handleResize();
      addEventListener('resize', this.handleResize);
      try {
        const title = document.getElementById('tech-content');
        if (!(title instanceof HTMLElement))
          throw htmlElementNotFound(title, `Validation of title instance`);
        title.innerText = '';
        if (!this.isChecked) {
          const titleLetters = [
            'D',
            'e',
            's',
            'e',
            'n',
            'v',
            'o',
            'l',
            'v',
            'i',
            'm',
            'e',
            'n',
            't',
            'o',
            '.',
            'w',
            'e',
            'b',
          ];
          let letterAcc = 0;
          const letterInterv = setInterval(interv => {
            if (title.innerText.length === titleLetters.length) {
              clearInterval(interv);
              return;
            }
            title.innerText += titleLetters[letterAcc];
            letterAcc += 1;
          }, 200);
          setTimeout(
            () => clearInterval(letterInterv),
            titleLetters.length * 200
          );
        } else {
          const titleLetters = [
            'W',
            'e',
            'b',
            '.',
            'D',
            'e',
            'v',
            'e',
            'l',
            'o',
            'p',
            'm',
            'e',
            'n',
            't',
          ];
          let letterAcc = 0;
          const letterInterv = setInterval(interv => {
            if (title.innerText.length === titleLetters.length) {
              clearInterval(interv);
              return;
            }
            title.innerText += titleLetters[letterAcc];
            letterAcc = letterAcc++;
          }, 200);
          setTimeout(
            () => clearInterval(letterInterv),
            titleLetters.length * 200
          );
        }
      } catch (e) {
        console.error(
          `Error executing procedure for filling title:${(e as Error).message}`
        );
      }
    }
  }
  handleResize = (): void => {
    const list = document.getElementById('projects-list');
    const arrow = document.getElementById('projects-arrow');
    try {
      if (!(list instanceof HTMLElement))
        throw htmlElementNotFound(list, `Validation of list instance`);
      if (!(arrow instanceof Element))
        throw elementNotFound(arrow, `Validation of projects-arrow`, [
          'Element',
        ]);
      if (!arrow.classList.contains('toggled')) {
        if (innerWidth < 800) {
          try {
            this.adjustStacksHeight(list, arrow);
            const sumHeights =
              Array.from(list.querySelectorAll('.project')).reduce(
                (acc, project, i) => {
                  try {
                    if (!(project instanceof HTMLElement)) {
                      throw htmlElementNotFound(
                        project,
                        `Validation of project instance`
                      );
                    }
                    return (
                      acc +
                      ((parseFinite(
                        getComputedStyle(project)
                          .height.replace('px', '')
                          .trim()
                      ) || 250) +
                        (parseFinite(
                          getComputedStyle(project)
                            .paddingTop.replace('px', '')
                            .trim()
                        ) || 16) +
                        (parseFinite(
                          getComputedStyle(project)
                            .paddingBottom.replace('px', '')
                            .trim()
                        ) || 16) +
                        (parseFinite(
                          getComputedStyle(list).gap.replace('px', '').trim()
                        ) || 32))
                    );
                  } catch (e) {
                    console.error(
                      `Error executing iteration ${i} for reducer of project heights:\n${
                        (e as Error).message
                      }`
                    );
                    return acc + 314;
                  }
                },
                0
              ) + 50;
            list.style.minHeight = `${sumHeights}px`;
          } catch (e) {
            console.error(
              `Error executing handleResize:\n${(e as Error).message}`
            );
            list.style.minHeight = '61rem';
          }
        } else list.style.minHeight = '61rem';
      } else list.style.minHeight = '0';
    } catch (e) {
      console.error(`Error executing handleResize:\n${(e as Error).message}`);
    }
  };
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
    try {
      const title = document.getElementById('tech-content');
      if (!(title instanceof HTMLElement))
        throw htmlElementNotFound(title, `Validation of title instance`);
      title.innerText = '';
      if (!this.isChecked) {
        const titleLetters = [
          'D',
          'e',
          's',
          'e',
          'n',
          'v',
          'o',
          'l',
          'v',
          'i',
          'm',
          'e',
          'n',
          't',
          'o',
          '.',
          'w',
          'e',
          'b',
        ];
        let letterAcc = 0;
        const letterInterv = setInterval(interv => {
          if (title.innerText.length > letterAcc) return;
          if (this.isChecked) {
            title.innerText = '';
            clearInterval(interv);
            return;
          }
          if (title.innerText.length === titleLetters.length) {
            clearInterval(interv);
            return;
          }
          title.innerText += titleLetters[letterAcc];
          letterAcc += 1;
        }, 200);
        setTimeout(
          () => clearInterval(letterInterv),
          titleLetters.length * 200
        );
        title.style.marginLeft = '-0.5rem';
        if (title.innerText !== 'Desenvolvimento.web') {
          letterAcc = 0;
          const letterInterv = setInterval(interv => {
            if (title.innerText.length > letterAcc) return;
            if (!this.isChecked) {
              title.innerText = '';
              clearInterval(interv);
              return;
            }
            if (title.innerText.length === titleLetters.length) {
              clearInterval(interv);
              return;
            }
            title.innerText += titleLetters[letterAcc];
            letterAcc += 1;
          }, 200);
          setTimeout(
            () => clearInterval(letterInterv),
            titleLetters.length * 200
          );
        }
      } else {
        const titleLetters = [
          'W',
          'e',
          'b',
          '.',
          'd',
          'e',
          'v',
          'e',
          'l',
          'o',
          'p',
          'm',
          'e',
          'n',
          't',
        ];
        let letterAcc = 0;
        const letterInterv = setInterval(interv => {
          if (title.innerText.length > letterAcc) return;
          if (!this.isChecked) {
            title.innerText = '';
            clearInterval(interv);
            return;
          }
          if (title.innerText.length === titleLetters.length) {
            clearInterval(interv);
            return;
          }
          title.innerText += titleLetters[letterAcc];
          letterAcc += 1;
        }, 200);
        setTimeout(
          () => clearInterval(letterInterv),
          titleLetters.length * 200
        );
        title.style.marginLeft = '0.8rem';
        if (title.innerText !== 'Web.development') {
          letterAcc = 0;
          const letterInterv = setInterval(interv => {
            if (title.innerText.length > letterAcc) return;
            if (!this.isChecked) {
              title.innerText = '';
              clearInterval(interv);
              return;
            }
            if (title.innerText.length === titleLetters.length) {
              clearInterval(interv);
              return;
            }
            title.innerText += titleLetters[letterAcc];
            letterAcc += 1;
          }, 200);
          setTimeout(
            () => clearInterval(letterInterv),
            titleLetters.length * 200
          );
        }
      }
    } catch (e) {
      console.error(
        `Error executing procedure for filling title:${(e as Error).message}`
      );
    }
    this.adjustStacksHeight(
      document.getElementById('projects-list'),
      document.getElementById('projects-arrow')
    );
  }
  adjustStacksHeight(list: voidishEl, arrow: voidishEl): void {
    try {
      if (!(list instanceof HTMLElement))
        throw htmlElementNotFound(list, `Validation of list instance`);
      if (!(arrow instanceof Element))
        throw elementNotFound(arrow, `Validation of projects-arrow`, [
          'Element',
        ]);
      if (!arrow.classList.contains('toggled')) {
        const arrLangs = Array.from(document.querySelectorAll('.languages'));
        if (innerWidth < 800) {
          for (const language of arrLangs) {
            const arrStacks = Array.from(language.querySelectorAll('.stack'));
            if (language instanceof HTMLElement) {
              innerWidth > 425
                ? (language.style.height = `${
                    Math.ceil(arrStacks.length / 2) * 4
                  }rem`)
                : (language.style.height = `${arrStacks.length * 4}rem`);
              language.style.paddingTop = '1rem';
            }
          }
        } else {
          list.style.minHeight = '61rem';
          for (const language of arrLangs)
            if (language instanceof HTMLElement) language.style.height = '3rem';
        }
      } else list.style.minHeight = '0';
    } catch (e) {
      console.error(
        `Error adjusting stacks elements height:\n${(e as Error).message}`
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
      } else if (targ.id === 'projects-arrow' && targ.closest('span')) {
        if (this.isChecked)
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Show projects')
            : (targ.closest('span')!.title = 'Hide projects');
        else
          targ.classList.contains('toggled')
            ? (targ.closest('span')!.title = 'Mostrar Projetos')
            : (targ.closest('span')!.title = 'Esconder Projetos');
      }
      const timeline =
        document.getElementById(timelineIdf) ||
        document.querySelector(timelineIdf);
      targ.closest('button')?.nextElementSibling;
      if (!(timeline instanceof HTMLElement))
        throw htmlElementNotFound(timeline, `Validation of timeline instance`);
      if (
        !timeline.querySelector('.event') &&
        !timeline.querySelector('.project')
      ) {
        console.warn(
          `No event or project found for timeline. Aborting process.`
        );
        return;
      }
      if (targ.classList.contains('toggled')) {
        if (targ.id === 'projects-arrow') {
          setTimeout(() => {
            document
              .getElementById('projects-list')
              ?.querySelectorAll('li')
              .forEach((item, i) => {
                try {
                  item.style.display = 'none';
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for hidding items in projects list:\n${
                      (e as Error).message
                    }`
                  );
                }
              });
          }, 200);
        }
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
        targ.id === 'projects-arrow' && setTimeout(this.handleResize, 300);
      } else {
        if (targ.id === 'projects-arrow') {
          setTimeout(() => {
            document
              .getElementById('projects-list')
              ?.querySelectorAll('li')
              .forEach((item, i) => {
                try {
                  item.style.display = 'block';
                } catch (e) {
                  console.error(
                    `Error executing iteration ${i} for hidding items in projects list:\n${
                      (e as Error).message
                    }`
                  );
                }
              });
          }, 200);
        }
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
        timeline.style.display =
          iniDisplays[timeline.id] ||
          (timeline.id === 'projects-list' ? 'flex' : 'block');
        timeline.id === 'projects-list' && (timeline.style.display = 'flex');
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
          timeline.id === 'projects-list'
            ? (timeline.style.height = `${iniHeight + 50}px`)
            : (timeline.style.height = `${iniHeight}px`);
          clearInterval(interv);
        }, 1000);
        targ.id === 'projects-arrow' && setTimeout(this.handleResize, 300);
        if (targ.id === 'courses-arrow') timeline.style.minHeight = `0`;
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
