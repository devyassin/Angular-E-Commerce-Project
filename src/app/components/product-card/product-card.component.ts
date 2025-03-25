import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product!: Product;
  constructor(
    public cartService: CartService,
    public productService: ProductService
  ) {}

  addToCart(product: Product) {
    this.cartService.toggleItem(product);
    product.isAddedToCart = !product.isAddedToCart;
  }
}
