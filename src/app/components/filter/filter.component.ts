import { CommonModule } from '@angular/common';
import { Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFilter } from '../../models/filter.type';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FilterComponent {
  categories: string[] = ['electronics', 'clothing', 'home', 'accessories'];
  selectedCategory: string = '';

  sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'priceLowToHigh', label: 'Price: Low to High' },
    { value: 'priceHighToLow', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' },
  ];
  selectedSort: string = 'default';

  priceRange = {
    min: 0,
    max: 1000,
  };

  selectedRating: number = 0;

  filter = signal<ProductFilter>({});
  isFilterApplied = signal(false);

  constructor(private productService: ProductService) {}

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  applyFilters() {
    const filters: ProductFilter = {
      sortBy: this.selectedSort !== 'default' ? this.selectedSort : undefined,
      category: this.selectedCategory || undefined,
      minPrice: this.priceRange.min > 0 ? this.priceRange.min : undefined,
      maxPrice: this.priceRange.max < 1000 ? this.priceRange.max : undefined,
      minRating: this.selectedRating > 0 ? this.selectedRating : undefined,
    };

    this.filter.set(filters);
    this.isFilterApplied.set(true);
    this.productService.setFilter(filters);
  }
}
