import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { fillWithTag } from '../..//lib/handlers/handlersStyle';
import { htmlElementNotFound } from '../..//lib/handlers/handlersErrors';

@Component({
  selector: 'app-home-footer',
  templateUrl: `./home-footer.component.html`,
  styleUrls: ['./home-footer.component.scss'],
  standalone: true,
  imports: [],
})
export class HomeFooterComponent implements AfterViewInit {
  @ViewChild('mainRef') mainRef!: ElementRef;
  ngAfterViewInit(): void {
    try {
      const footerElement = this.mainRef.nativeElement;
      if (
        !(
          footerElement instanceof HTMLElement &&
          footerElement.tagName === 'FOOTER'
        )
      )
        throw htmlElementNotFound(
          footerElement,
          `validation of Main Reference in ${HomeFooterComponent.prototype.constructor.name}`,
          ['<footer>']
        );
      fillWithTag(footerElement);
    } catch (e) {
      console.error(
        `Error executing ngAfterViewInit for mainRef in ${
          HomeFooterComponent.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }
}
