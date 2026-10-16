/**
 * Local Demo Order Service
 * Handles simulated checkout, order recording, order history retrieval, and local persistence.
 * Note: Browser localStorage is used for demonstration purposes only.
 */

import { Order, OrderItem, OrderStatus, PaymentMethod, ShippingAddressInput } from '../types';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

export interface CreateOrderParams {
  items: readonly OrderItem[];
  subtotal: number;
  shippingFee: number;
  estimatedTax: number;
  total: number;
  shippingAddress: ShippingAddressInput;
  paymentMethod: PaymentMethod;
  userId?: number;
}

export const orderService = {
  getOrders(): Order[] {
    return getStorageItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  },

  getOrderById(id: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === id || o.orderNumber === id);
  },

  createOrder(params: CreateOrderParams): Order {
    const orders = this.getOrders();
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `SP-${timestamp.toString().slice(-6)}-${randomSuffix}`;
    const id = `order_${timestamp}_${randomSuffix}`;

    const newOrder: Order = {
      id,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...params.items],
      subtotal: params.subtotal,
      shippingFee: params.shippingFee,
      estimatedTax: params.estimatedTax,
      total: params.total,
      shippingAddress: params.shippingAddress,
      paymentMethod: params.paymentMethod,
      status: OrderStatus.CONFIRMED,
      userId: params.userId,
    };

    // Store newest first
    const updatedOrders = [newOrder, ...orders];
    setStorageItem(STORAGE_KEYS.ORDERS, updatedOrders);

    return newOrder;
  },

  updateOrderStatus(id: string, status: OrderStatus): Order | undefined {
    const orders = this.getOrders();
    const index = orders.findIndex((o) => o.id === id || o.orderNumber === id);
    if (index === -1) return undefined;
    const existing = orders[index]!;
    const updated: Order = {
      ...existing,
      status,
    };
    orders[index] = updated;
    setStorageItem(STORAGE_KEYS.ORDERS, orders);
    return updated;
  },

  clearOrders(): void {
    setStorageItem(STORAGE_KEYS.ORDERS, []);
  },
};
