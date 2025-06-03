import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Order, OrderStatus, OrderItem } from '../models/order.model';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [
    {
      id: 'ORD-001',
      customerId: '1',
      customer: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Coffee Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      items: [
        {
          id: '1',
          productId: '1',
          productName: 'Arpeggio',
          productImage: '/assets/images/arpeggio.jpg',
          quantity: 2,
          unitPrice: 8.5,
          totalPrice: 17.0,
        },
      ],
      totalAmount: 17.0,
      status: OrderStatus.DELIVERED,
      shippingAddress: {
        street: '123 Coffee Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      billingAddress: {
        street: '123 Coffee Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      paymentMethod: {
        type: 'credit_card',
        lastFourDigits: '1234',
        expiryDate: '12/25',
      },
      trackingNumber: 'TRK123456789',
      estimatedDelivery: new Date('2024-01-05'),
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-03'),
    },
    {
      id: 'ORD-002',
      customerId: '1',
      customer: {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        address: {
          street: '123 Coffee Street',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        isActive: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      items: [
        {
          id: '2',
          productId: '5',
          productName: 'Vertuo Next',
          productImage: '/assets/images/vertuo-next.jpg',
          quantity: 1,
          unitPrice: 199.99,
          totalPrice: 199.99,
        },
      ],
      totalAmount: 199.99,
      status: OrderStatus.SHIPPED,
      shippingAddress: {
        street: '123 Coffee Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      billingAddress: {
        street: '123 Coffee Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
      },
      paymentMethod: {
        type: 'credit_card',
        lastFourDigits: '1234',
        expiryDate: '12/25',
      },
      trackingNumber: 'TRK987654321',
      estimatedDelivery: new Date('2024-06-10'),
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-06-05'),
    },
  ];

  getOrdersByCustomer(customerId: string): Observable<Order[]> {
    const customerOrders = this.orders.filter(
      (order) => order.customerId === customerId
    );
    return of(customerOrders);
  }

  getOrderById(orderId: string): Observable<Order | undefined> {
    const order = this.orders.find((o) => o.id === orderId);
    return of(order);
  }

  createOrder(orderData: Partial<Order>): Observable<Order> {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerId: orderData.customerId!,
      customer: orderData.customer!,
      items: orderData.items!,
      totalAmount: orderData.totalAmount!,
      status: OrderStatus.PENDING,
      shippingAddress: orderData.shippingAddress!,
      billingAddress: orderData.billingAddress!,
      paymentMethod: orderData.paymentMethod!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.orders.push(newOrder);
    return of(newOrder);
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<boolean> {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date();
      return of(true);
    }
    return of(false);
  }

  getOrderStatuses(): OrderStatus[] {
    return Object.values(OrderStatus);
  }
}
