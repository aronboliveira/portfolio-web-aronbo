import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackComponent } from '../stack/stack.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  standalone: true,
  imports: [CommonModule, StackComponent],
})
export class ProjectComponent {
  @Input() href: string = '';
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() stacks: string[] = [];
}
