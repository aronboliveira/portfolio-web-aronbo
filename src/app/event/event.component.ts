import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  imports: [CommonModule],
  standalone: true,
})
export class EventComponent implements OnInit {
  id: string = '';
  @Input() title: string = '';
  @Input() date: string = '';
  @Input() description: string = '';
  @Input() href?: string = '';
  ngOnInit(): void {
    this.id = `${this.title.slice(0, 1)}${this.title
      .slice(1)
      .toLowerCase()
      .replace(/\s+/g, '-')}`;
  }
}
