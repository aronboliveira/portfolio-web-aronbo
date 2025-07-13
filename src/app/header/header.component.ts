import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: `./header.component.html`,
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [],
})
export class HeaderComponent {
  isChecked = false;
  handleToggle() {
    this.isChecked = !this.isChecked;
  }
}
