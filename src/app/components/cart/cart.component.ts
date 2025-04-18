import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.type';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  constructor(public cartService: CartService, private router: Router) {}

  updateQuantity(item: CartItem, newQuantity: number) {
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.product.id);
  }

  checkout() {
    this.router.navigate(['/checkout']); // Correct navigation
  }
}
