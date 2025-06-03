import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined>;
  quantity = 1;
  selectedImage = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product$ = this.productService.getProductById(productId);
    } else {
      this.product$ = new Observable();
    }
  }

  ngOnInit(): void {}

  incrementQuantity(): void {
    this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId, this.quantity).subscribe();
  }

  selectImage(index: number): void {
    this.selectedImage = index;
  }
}
