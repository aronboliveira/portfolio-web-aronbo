import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-placeholder-kipper-header',
  templateUrl: `./placeholder-kipper-header.component.html`,
  styleUrls: ['./placeholder-kipper-header.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class PlaceholderKipperHeaderComponent {
  isChecked = false;
  handleToggle() {
    this.isChecked = !this.isChecked;
  }
}
