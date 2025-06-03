import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject = new BehaviorSubject<Cart>({
    id: '1',
    customerId: '1',
    items: [],
    totalAmount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  public cart$ = this.cartSubject.asObservable();

  constructor(private productService: ProductService) {}

  getCart(): Observable<Cart> {
    return this.cart$;
  }

  addToCart(productId: string, quantity: number = 1): Observable<boolean> {
    this.productService.getProductById(productId).subscribe((product) => {
      if (product) {
        const currentCart = this.cartSubject.value;
        const existingItem = currentCart.items.find(
          (item) => item.productId === productId
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          const newItem: CartItem = {
            id: Date.now().toString(),
            productId: productId,
            product: product,
            quantity: quantity,
          };
          currentCart.items.push(newItem);
        }

        this.updateCartTotal(currentCart);
        this.cartSubject.next(currentCart);
      }
    });

    return of(true);
  }

  removeFromCart(itemId: string): Observable<boolean> {
    const currentCart = this.cartSubject.value;
    currentCart.items = currentCart.items.filter((item) => item.id !== itemId);
    this.updateCartTotal(currentCart);
    this.cartSubject.next(currentCart);
    return of(true);
  }

  updateQuantity(itemId: string, quantity: number): Observable<boolean> {
    const currentCart = this.cartSubject.value;
    const item = currentCart.items.find((item) => item.id === itemId);

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }
      item.quantity = quantity;
      this.updateCartTotal(currentCart);
      this.cartSubject.next(currentCart);
    }

    return of(true);
  }

  clearCart(): Observable<boolean> {
    const currentCart = this.cartSubject.value;
    currentCart.items = [];
    currentCart.totalAmount = 0;
    this.cartSubject.next(currentCart);
    return of(true);
  }

  getItemCount(): Observable<number> {
    return new BehaviorSubject(
      this.cartSubject.value.items.reduce(
        (count, item) => count + item.quantity,
        0
      )
    );
  }

  private updateCartTotal(cart: Cart): void {
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    cart.updatedAt = new Date();
  }
}
