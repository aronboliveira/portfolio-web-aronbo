import { Component, Input, OnInit } from '@angular/core';
import { syncAriaStates } from '../..//lib/handlers/gHandlers';
import { voidishHtmlEl } from '../../lib/declarations/types';

@Component({
  selector: 'app-retry-error',
  templateUrl: './retry-error.component.html',
  styleUrls: ['./retry-error.component.scss'],
})
export class RetryErrorComponent implements OnInit {
  @Input() message: string = 'Erro indefinido';
  @Input() altRoot?: voidishHtmlEl;
  @Input() altJsx?: any;
  ngOnInit(): void {
    this.altRoot ??= document.querySelector('main');
    setTimeout(() => {
      try {
        if (!(this.altRoot instanceof Element))
          throw new Error('Invalid root element');
        if (!this.altJsx) throw new Error('Invalid JSX element');
        // Assume that altJsx is a template or component to be rendered dynamically
        this.altRoot.innerHTML = this.altJsx;
      } catch (err) {
        setTimeout(() => {
          const productsRoot = document.getElementById('productsRoot');
          if (productsRoot)
            productsRoot.innerHTML = `
              <div>The webpage couldn't recover! 😭 
                <p><strong>Reloading in 5 seconds</strong>.</p>
              </div>
            `;
        }, 3000);
        setTimeout(() => {
          location.reload();
        }, 5000);
      }
    }, 3000);
    syncAriaStates();
  }
}
