import { Product } from './product.model';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  customizations?: ProductCustomization[];
}

export interface Cart {
  id: string;
  customerId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCustomization {
  type: string; // 'size', 'intensity', etc.
  value: string;
  priceModifier?: number;
}
