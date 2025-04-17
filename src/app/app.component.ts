import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  template: `
    <div class="min-h-screen bg-white dark:bg-gray-900">
      <app-navbar></app-navbar>
      <main class="container mx-auto px-4 py-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title = 'testLib';

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Initialize theme
    this.themeService.isDarkMode();
  }
}
