import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from '../context/CartContext';
import { Product } from '../types';

const mockProduct: Product = {
  id: 101,
  title: 'Classic Wool Trench',
  price: 250.0,
  description: 'Pure tailored wool trench coat.',
  category: "men's clothing",
  image: 'https://example.com/coat.jpg',
  rating: { rate: 4.8, count: 50 },
};

describe('CartContext & cartReducer (Unit 5.4, 5.6, 10.3, 14.5)', () => {
  it('adds item to cart and calculates totals', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartProvider initialItems={[]}>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totals.total).toBe(0);

    // Add item
    act(() => {
      result.current.addItem(mockProduct, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.quantity).toBe(2);
    expect(result.current.totals.subtotal).toBe(500.0);
    expect(result.current.totals.isEligibleForFreeShipping).toBe(true);
  });

  it('updates quantity and removes item when quantity reaches zero', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartProvider initialItems={[{ product: mockProduct, quantity: 2 }]}>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.updateQuantity(mockProduct.id, 5);
    });
    expect(result.current.items[0]?.quantity).toBe(5);

    // Update to 0 removes the item
    act(() => {
      result.current.updateQuantity(mockProduct.id, 0);
    });
    expect(result.current.items).toHaveLength(0);
  });

  it('clears all items when clearCart is dispatched', () => {
    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <CartProvider initialItems={[{ product: mockProduct, quantity: 1 }]}>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totals.total).toBe(0);
  });
});
