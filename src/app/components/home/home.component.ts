import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProductListComponent } from "../product-list/product-list.component";
import { FilterComponent } from "../filter/filter.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, ProductListComponent, FilterComponent, PaginationComponent, CarouselComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto py-8 px-10">
        <app-banner></app-banner>
        <div class="mt-8 mb-12">
          <app-carousel></app-carousel>
        </div>
        <app-filter></app-filter>
        <app-product-list></app-product-list>
        <app-pagination></app-pagination>
      </div>
    </div>
  `
})
export class HomeComponent {}
