import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-pagination',
  imports: [PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  first1: number = 0;

  rows1: number = 10;

  constructor(public productService: ProductService) {}

  onPageChange1(event: PaginatorState) {
    const page = event.page ?? 0;
    this.productService.fetchProducts(page + 1);
  }

  get totalItems() {
    return this.productService.totalItems;
  }
}
