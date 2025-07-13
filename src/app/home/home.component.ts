import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HomeFooterComponent } from '../home-footer/home-footer.component';
import { HomeMainBodyComponent } from '../home-main-body/home-main-body.component';
import { isPlatformBrowser } from '@angular/common';
import { parseFinite } from '../../lib/handlers/handlersMath';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HomeFooterComponent, HomeMainBodyComponent],
})
export class HomeComponent implements AfterViewInit {
  isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngAfterViewInit(): void {
    this.isBrowser && this.applyDefaultPoppins();
  }
  applyDefaultPoppins(): void {
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
}
