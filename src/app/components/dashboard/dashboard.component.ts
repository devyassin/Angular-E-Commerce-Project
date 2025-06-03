import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductCategory } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  featuredProducts$: Observable<Product[]>;
  categories$: Observable<ProductCategory[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
    this.categories$ = this.productService.getCategories();
  }

  ngOnInit(): void {}

  addToCart(productId: string): void {
    this.cartService.addToCart(productId, 1).subscribe();
  }
}
