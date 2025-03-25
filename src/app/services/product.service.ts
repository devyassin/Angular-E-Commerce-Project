import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.type';
import { finalize } from 'rxjs';
import { ProductFilter } from '../models/filter.type';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart.type';

const API_URL = 'http://localhost:3000';
type PaginatedResponse<T> = {
  data: T[];
  pages: number;
  items: number;
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);
  cartService = inject(CartService);
  paginatedProducts = signal<Product[]>([]);
  totalPages = signal<number>(0);
  totalItems = signal<number>(0);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);
  activeFilter = signal<ProductFilter>({});
  selectedProduct = signal<Product | null>(null);
  selectedImage = signal<string>('');
  cartProducts = signal<CartItem[]>([]);

  constructor() {
    this.loadItemsFromLocalStorage();
  }

  setFilter(filter: ProductFilter): void {
    this.activeFilter.set(filter);
    this.fetchProducts();
  }
  private applyFilterToProducts(
    products: Product[],
    filter: ProductFilter
  ): Product[] {
    return products
      .filter((product) => {
        if (filter.category && product.category !== filter.category)
          return false;

        if (filter.minPrice !== undefined && product.price < filter.minPrice)
          return false;
        if (filter.maxPrice !== undefined && product.price > filter.maxPrice)
          return false;

        if (filter.minRating !== undefined && product.rating < filter.minRating)
          return false;

        return true;
      })
      .sort((a, b) => {
        if (!filter.sortBy) return 0;

        switch (filter.sortBy) {
          case 'priceLowToHigh':
            return a.price - b.price;
          case 'priceHighToLow':
            return b.price - a.price;
          case 'popularity':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }

  fetchProducts(page: number = 1, limit: number = 6) {
    this.isLoading.set(true);
    this.error.set(null);

    const filter = this.activeFilter();

    let params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', limit.toString());

    if (filter.category) {
      params = params.set('category', filter.category);
    }

    if (filter.minPrice !== undefined) {
      params = params.set('price_gte', filter.minPrice.toString()); // `_gte` for min
    }
    if (filter.maxPrice !== undefined) {
      params = params.set('price_lte', filter.maxPrice.toString()); // `_lte` for max
    }
    if (filter.minRating !== undefined) {
      params = params.set('rating_gte', filter.minRating.toString()); // `_gte` for rating
    }

    // Apply sorting
    if (filter.sortBy) {
      let sortField = 'price';
      let sortOrder = 'asc';

      switch (filter.sortBy) {
        case 'priceLowToHigh':
          sortField = 'price';
          sortOrder = 'asc';
          break;
        case 'priceHighToLow':
          sortField = 'price';
          sortOrder = 'desc';
          break;
        case 'popularity':
          sortField = 'reviews';
          sortOrder = 'desc';
          break;
      }

      params = params.set('_sort', sortField).set('_order', sortOrder);
    }

    return this.http
      .get<PaginatedResponse<Product>>(`${API_URL}/products`, {
        params,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.paginatedProducts.set(this.addItemToCart(response.data));
          console.log(this.paginatedProducts());
          this.totalPages.set(response.pages);
          this.totalItems.set(response.items);
        },
        error: (error) => {
          this.error.set(error.message);
        },
      });
  }

  fetchOneProduct(productId: number) {
    this.isLoading.set(true);
    this.error.set(null);

    return this.http
      .get<Product>(`${API_URL}/products?id=${productId}`)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (product: any) => {
          console.log(product[0]);
          this.selectedProduct.set(this.addSingleItemToCart(product[0]));
          this.selectedImage.set(product[0].images[0]);
        },
        error: (error) => {
          this.error.set(error.message);
        },
      });
  }

  private loadItemsFromLocalStorage() {
    const items = localStorage.getItem('items');
    if (items) {
      this.cartProducts.set(JSON.parse(items));
    }
  }

  private addItemToCart(products: Product[]): Product[] {
    return products.map((product) => ({
      ...product,
      isAddedToCart: this.cartProducts().some(
        (item) => item.product.id === product.id
      ),
    }));
  }
  private addSingleItemToCart(product: Product): Product {
    return {
      ...product,
      isAddedToCart: this.cartProducts().some(
        (item) => item.product.id === product.id
      ),
    };
  }
}
