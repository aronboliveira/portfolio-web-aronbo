import { Component } from '@angular/core';
import { PlaceholderKipperHeaderComponent } from '../placeholder-kipper-header/placeholder-kipper-header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-kipper-main',
  standalone: true,
  imports: [PlaceholderKipperHeaderComponent, FormsModule, CommonModule],
  templateUrl: './placeholder-kipper-main.component.html',
  styleUrls: ['./placeholder-kipper-main.component.scss'],
})
export class PlaceHolderKipperMainComponent {
  isChecked = false;
  handleToggle(ev: Event) {
    console.log('handle toggle');
    this.isChecked = !this.isChecked;
    if (
      ev.currentTarget instanceof HTMLInputElement &&
      (ev.currentTarget.type === 'checkbox' ||
        ev.currentTarget.type === 'radio') &&
      ev.currentTarget.classList.contains('toggle-circle')
    )
      ev.currentTarget.checked ? console.log() : console.log();
  }
}
