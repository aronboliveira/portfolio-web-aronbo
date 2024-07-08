import { Component, OnInit } from '@angular/core';
import { PlaceholderKipperHeaderComponent } from './placeholder-kipper-header/placeholder-kipper-header.component';
import { HomeComponent } from './home/home.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    PlaceholderKipperHeaderComponent,
    HomeComponent,
    RouterOutlet,
    FormsModule,
  ],
})
export class AppComponent implements OnInit {
  title = 'portfolio-web-aronbo-ng';
  ngOnInit(): void {
    // this.store.dispatch(setRouter({ routerState: window.location }));
  }
}
