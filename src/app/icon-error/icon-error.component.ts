import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { syncAriaStates } from '../..//lib/handlers/gHandlers';
import { htmlElementNotFound } from '../..//lib/handlers/handlersErrors';

@Component({
  selector: 'app-icon-error',
  templateUrl: './icon-error.component.html',
  styleUrls: ['./icon-error.component.scss'],
  standalone: true,
  imports: [],
})
export class IconErrorComponent implements AfterViewInit {
  @Input() fill: boolean = false;
  @ViewChild('svgRef') svgRef!: ElementRef;
  ngAfterViewInit(): void {
    try {
      const svgElement = this.svgRef.nativeElement;
      if (!(svgElement instanceof HTMLElement))
        htmlElementNotFound(
          svgElement,
          `validation of SVG span in ${IconErrorComponent.prototype.constructor.name}`,
          ['HTMLElement']
        );
      if (this.fill)
        svgElement.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4m.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
          </svg>
        `;
      syncAriaStates(svgElement.querySelectorAll('*'));
    } catch (e) {
      console.error(
        `Error executing ngAfterViewInit for ${
          IconErrorComponent.prototype.constructor.name
        }: ${(e as Error).message}`
      );
    }
  }
}
