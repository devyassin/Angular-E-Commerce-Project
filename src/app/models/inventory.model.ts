export interface Inventory {
  id: string;
  productId: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderPoint: number;
  lastRestocked: Date;
  location?: string;
  warehouse?: string;
}

export interface StockMovement {
  id: string;
  inventoryId: string;
  type: 'IN' | 'OUT' | 'ADJUSTMENT';
  quantity: number;
  reason: string;
  reference?: string; // Order ID, Purchase Order, etc.
  createdAt: Date;
}
