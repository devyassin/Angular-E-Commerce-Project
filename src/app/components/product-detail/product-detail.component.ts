import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.type';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressSpinner } from 'primeng/progressspinner';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, ProgressSpinner, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService
  ) {}

  ngOnInit() {
    const productId = +this.route.snapshot.paramMap.get('id')!;
    this.productService.fetchOneProduct(productId);
    console.log(this.productService.selectedProduct());
  }

  selectImage(image: string) {
    this.productService.selectedImage.set(image);
  }

  addToCart(product: Product) {
    this.cartService.toggleItem(product);
    product.isAddedToCart = !product.isAddedToCart;
  }

  get specifications() {
    return Object.entries(this.productService.selectedProduct()!.specs).map(
      ([key, value]) => ({
        key: key.charAt(0).toUpperCase() + key.slice(1),
        value: value,
      })
    );
  }

  get product() {
    return this.productService.selectedProduct();
  }

  get selectedImage() {
    return this.productService.selectedImage();
  }
}
