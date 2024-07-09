import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { Store } from '@ngrx/store';
import { applyDefaultPoppins } from '../..//lib/handlers/handlersStyle';
import { HomeFooterComponent } from '../home-footer/home-footer.component';
import { HomeMainBodyComponent } from '../home-main-body/home-main-body.component';

@Component({
  selector: 'app-home',
  templateUrl: `./home.component.html`,
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [HomeFooterComponent, HomeMainBodyComponent],
})
export class HomeComponent implements OnInit, AfterViewInit {
  // constructor(
  //   // private store: Store,
  //   // @Inject(DOCUMENT) private document: Document
  // ) {}
  ngOnInit(): void {
    //   this.store.dispatch(setRouter({ routerState: this.document.location }));
  }
  ngAfterViewInit(): void {
    applyDefaultPoppins();
    addEventListener('copy', (ev: ClipboardEvent) => {
      console.log(
        ev.clipboardData?.items
          .add(
            new File(
              [
                'Hello, File',
                JSON.stringify({ key: 'value' }),
                new Uint16Array([0x0000, 0xffff, 0x7fff]),
              ],
              'newFile.txt'
            )
          )
          ?.webkitGetAsEntry()
      );
    });
  }
}
