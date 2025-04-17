import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';
  private readonly DARK_THEME = 'dark';
  private readonly LIGHT_THEME = 'light';

  isDarkMode = signal<boolean>(false);

  constructor() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    const initialTheme = savedTheme === this.DARK_THEME || (!savedTheme && prefersDark);
    this.isDarkMode.set(initialTheme);
    this.applyTheme(initialTheme);

    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.isDarkMode.set(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }

  toggleTheme() {
    const newTheme = !this.isDarkMode();
    this.isDarkMode.set(newTheme);
    this.applyTheme(newTheme);
  }

  private applyTheme(isDark: boolean) {
    const theme = isDark ? this.DARK_THEME : this.LIGHT_THEME;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(this.THEME_KEY, theme);
  }
} 