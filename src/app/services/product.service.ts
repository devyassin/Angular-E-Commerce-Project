import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Product, ProductCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Arpeggio',
      description:
        'A deep and dense coffee with a strong character and intense body.',
      price: 8.5,
      image:
        'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=400&fit=crop',
      category: 'coffee',
      intensity: 9,
      cupSize: 'Espresso (40ml)',
      stock: 50,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'Livanto',
      description: 'A well-balanced coffee with a roasted caramelized note.',
      price: 8.0,
      image:
        'https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop',
      category: 'coffee',
      intensity: 6,
      cupSize: 'Espresso (40ml)',
      stock: 45,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '3',
      name: 'Volluto',
      description: 'A light and sweet coffee with fruity and biscuity notes.',
      price: 7.8,
      image:
        'https://images.unsplash.com/photo-1567339850467-5dc8fc2e8e96?w=400&h=400&fit=crop',
      category: 'coffee',
      intensity: 4,
      cupSize: 'Espresso (40ml)',
      stock: 60,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '4',
      name: 'Kazaar',
      description: 'An exceptionally intense coffee with a syrupy body.',
      price: 9.2,
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
      category: 'coffee',
      intensity: 12,
      cupSize: 'Espresso (40ml)',
      stock: 30,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '5',
      name: 'Vertuo Next',
      description: 'Premium coffee machine for the perfect cup every time.',
      price: 199.99,
      image:
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=400&fit=crop',
      category: 'machine',
      intensity: 0,
      cupSize: '',
      stock: 15,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: '6',
      name: 'Essenza Mini',
      description: 'Compact and lightweight machine for authentic espresso.',
      price: 89.99,
      image:
        'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=400&fit=crop',
      category: 'machine',
      intensity: 0,
      cupSize: '',
      stock: 20,
      isActive: true,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
  ];
  private categories: ProductCategory[] = [
    {
      id: '1',
      name: 'Coffee Capsules',
      description: 'Premium coffee capsules for every taste',
      image:
        'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      name: 'Coffee Machines',
      description: 'State-of-the-art coffee machines',
      image:
        'https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=400&h=300&fit=crop',
    },
    {
      id: '3',
      name: 'Accessories',
      description: 'Everything you need for the perfect coffee experience',
      image:
        'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=300&fit=crop',
    },
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.products.filter(
      (p) => p.category === category
    );
    return of(filteredProducts);
  }

  getCategories(): Observable<ProductCategory[]> {
    return of(this.categories);
  }

  getFeaturedProducts(): Observable<Product[]> {
    // Return first 4 products as featured
    return of(this.products.slice(0, 4));
  }

  searchProducts(query: string): Observable<Product[]> {
    const filtered = this.products.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered);
  }
}
