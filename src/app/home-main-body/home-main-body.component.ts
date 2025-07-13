import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fillWithTag } from '../..//lib/handlers/handlersStyle';
import { htmlElementNotFound } from '../..//lib/handlers/handlersErrors';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-home-main-body',
  templateUrl: `./home-main-body.component.html`,
  styleUrls: ['./home-main-body.component.scss'],
  standalone: true,
  imports: [MainComponent],
})
export class HomeMainBodyComponent implements AfterViewInit {
  @ViewChild('mainRef') mainRef!: ElementRef;
  ngAfterViewInit(): void {
    try {
      const mainElement = this.mainRef.nativeElement;
      if (
        !(mainElement instanceof HTMLElement && mainElement.tagName === 'MAIN')
      )
        throw htmlElementNotFound(
          mainElement,
          `validation of Main Reference in ${HomeMainBodyComponent.prototype.constructor.name}`,
          ['<main>']
        );
      fillWithTag(mainElement);
    } catch (e) {
      console.error(
        `Error executing ngAfterViewInit for mainRef in ${
          HomeMainBodyComponent.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }
}
