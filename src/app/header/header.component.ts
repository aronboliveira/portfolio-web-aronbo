/**
 * @deprecated LEGACY COMPONENT — Not routed after ATS/SEO refactoring.
 * Language switching moved to URL-based routing (/en, /pt).
 * Mantido comentado para referência futura.
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HeaderComponent {
  isChecked = false;
  handleToggle() {
    this.isChecked = !this.isChecked;
  }
}
