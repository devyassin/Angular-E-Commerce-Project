import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

// app.component.html

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    public cartService: CartService,
    public themeService: ThemeService
  ) {}

  navItems = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Home', route: '/home' },
    { label: 'Cart', route: '/shopping_cart' },
    { label: 'Orders', route: '/orders' }
  ];

  authItems = [
    { label: 'Login', route: '/login' },
    { label: 'Sign Up', route: '/signup' }
  ];

  get cartProducts() {
    return this.cartService.cartProducts();
  }
}
