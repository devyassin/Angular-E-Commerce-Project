import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.type';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private autoSlideInterval: any;
  private autoplaySubscription?: Subscription;
  readonly itemsPerSlide = 3;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
    this.stopAutoplay();
  }

  prevSlide() {
    this.stopAutoSlide();
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.startAutoSlide();
  }

  nextSlide() {
    this.stopAutoSlide();
    const maxIndex = Math.max(0, this.productService.paginatedProducts().length - this.itemsPerSlide);
    this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
    this.startAutoSlide();
  }

  setCurrentIndex(index: number) {
    this.stopAutoSlide();
    const maxIndex = Math.max(0, this.productService.paginatedProducts().length - this.itemsPerSlide);
    this.currentIndex = Math.min(maxIndex, index);
    this.startAutoSlide();
  }

  getTranslateX(): number {
    return this.currentIndex * (100 / this.itemsPerSlide);
  }

  getSlideWidth(): number {
    return (this.productService.paginatedProducts().length * 100) / this.itemsPerSlide;
  }

  private startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      const maxIndex = Math.max(0, this.productService.paginatedProducts().length - this.itemsPerSlide);
      if (this.currentIndex >= maxIndex) {
        this.currentIndex = 0;
      } else {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  private stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private startAutoplay() {
    this.autoplaySubscription = interval(5000).subscribe(() => {
      this.nextSlide();
    });
  }

  private stopAutoplay() {
    if (this.autoplaySubscription) {
      this.autoplaySubscription.unsubscribe();
    }
  }
} 