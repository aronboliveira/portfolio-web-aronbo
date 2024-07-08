import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { fillWithTag } from '../..//lib/handlers/handlersStyle';
import { htmlElementNotFound } from '../..//lib/handlers/handlersErrors';
import { PlaceholderKipperHeaderComponent } from '../placeholder-kipper-header/placeholder-kipper-header.component';

@Component({
  selector: 'app-home-header',
  templateUrl: `./home-header.component.html`,
  styleUrls: ['./home-header.component.scss'],
  standalone: true,
  imports: [PlaceholderKipperHeaderComponent],
})
export class HomeHeaderComponent implements AfterViewInit {
  @ViewChild('mainRef') mainRef!: ElementRef;
  ngAfterViewInit(): void {
    try {
      const headerElement = this.mainRef.nativeElement;
      if (
        !(
          headerElement instanceof HTMLElement &&
          headerElement.tagName === 'HEADER'
        )
      )
        throw htmlElementNotFound(
          headerElement,
          `validation of Main Reference in ${HomeHeaderComponent.prototype.constructor.name}`,
          ['<footer>']
        );
      fillWithTag(headerElement);
    } catch (e) {
      console.error(
        `Error executing ngAfterViewInit for mainRef in ${
          HomeHeaderComponent.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }
}
