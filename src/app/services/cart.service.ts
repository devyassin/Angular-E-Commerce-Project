import { inject, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart.type';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.type';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  http = inject(HttpClient);
  cartProducts = signal<CartItem[]>([]);
  updateQuantity: any;

  constructor() {
    this.loadItemsFromLocalStorage();
  }

  private addItemToCart(products: Product[]): Product[] {
    return products.map((product) => ({
      ...product,
      isAddedToCart: this.cartProducts().some(
        (item) => item.product.id === product.id
      ),
    }));
  }
  toggleItem(product: Product) {
    this.cartProducts.update((items) => {
      const existingItemIndex = items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        return items.filter((_, index) => index !== existingItemIndex);
      } else {
        return [
          ...items,
          {
            product: product,
            quantity: 1,
          },
        ];
      }
    });

    this.saveItemsToLocalStorage();
  }

  private saveItemsToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(this.cartProducts()));
  }

  private loadItemsFromLocalStorage() {
    const items = localStorage.getItem('items');
    if (items) {
      this.cartProducts.set(JSON.parse(items));
    }
  }

  incrementQuantity(productId: number) {
    this.cartProducts.update((items) =>
      items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    this.saveItemsToLocalStorage();
  }

  decrementQuantity(productId: number) {
    this.cartProducts.update((items) =>
      items
        .map((item) =>
          item.product.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    this.saveItemsToLocalStorage();
  }

  removeFromCart(productId: number) {
    this.cartProducts.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
    this.saveItemsToLocalStorage();
  }
  getTotalPrice(): number {
    return this.cartProducts().reduce(
      (total, item) =>
        total +
        (item.product.discountPrice ?? item.product.price) * item.quantity,
      0
    );
  }
}
