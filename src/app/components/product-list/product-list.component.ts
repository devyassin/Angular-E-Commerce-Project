import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, ProductCategory } from '../../models/product.model';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<ProductCategory[]>;
  filteredProducts$: Observable<Product[]>;

  private categoryFilter$ = new BehaviorSubject<string>('all');
  private searchFilter$ = new BehaviorSubject<string>('');
  private sortFilter$ = new BehaviorSubject<string>('name');

  selectedCategory = 'all';
  searchTerm = '';
  sortBy = 'name';
  viewMode = 'grid';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.products$ = this.productService.getAllProducts();
    this.categories$ = this.productService.getCategories();

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.categoryFilter$,
      this.searchFilter$,
      this.sortFilter$,
    ]).pipe(
      map(([products, category, search, sort]) => {
        let filtered = products;

        // Filter by category
        if (category !== 'all') {
          filtered = filtered.filter((p) => p.category === category);
        }

        // Filter by search term
        if (search) {
          filtered = filtered.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.description.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Sort products
        filtered = filtered.sort((a, b) => {
          switch (sort) {
            case 'name':
              return a.name.localeCompare(b.name);
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'intensity':
              return (b.intensity || 0) - (a.intensity || 0);
            default:
              return 0;
          }
        });

        return filtered;
      })
    );
  }

  ngOnInit(): void {}

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.categoryFilter$.next(category);
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.searchFilter$.next(term);
  }

  onSortChange(sort: string): void {
    this.sortBy = sort;
    this.sortFilter$.next(sort);
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId, 1).subscribe();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }
}
