import { Component, OnInit } from '@angular/core';
import { syncAriaStates } from '../../lib/handlers/gHandlers';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error-component.component.html',
  styleUrls: ['./generic-error.component.scss'],
  standalone: true,
  imports: [],
})
export class GenericErrorComponent implements OnInit {
  message: string = 'Erro indefinido';
  ngOnInit(): void {
    syncAriaStates();
  }
}
