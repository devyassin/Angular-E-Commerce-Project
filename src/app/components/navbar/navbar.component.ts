import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../services/cart.service';

// app.component.html

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public cartService: CartService) {}

  navItems = [
    { label: 'Products', route: '/home' },
    { label: 'Shopping Cart', route: '/shopping_cart' },
    { label: 'Contact', route: '/contact' },
  ];

  get cartProducts() {
    return this.cartService.cartProducts();
  }
}
