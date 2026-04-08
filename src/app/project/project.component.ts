import { Component, Input } from '@angular/core';

import { StackComponent } from '../stack/stack.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
  imports: [StackComponent],
})
export class ProjectComponent {
  @Input() href: string = '';
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() hover: string = '';
  @Input() stacks: string[] = [];
}
