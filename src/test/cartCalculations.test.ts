import { describe, it, expect } from 'vitest';
import {
  calculateCartTotals,
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_FEE,
} from '../utils/cartCalculations';
import { CartItem } from '../types';

describe('cartCalculations utility (Unit 5.7, 14.1, 14.8)', () => {
  it('returns zeroes for empty cart', () => {
    const totals = calculateCartTotals([]);
    expect(totals.subtotal).toBe(0);
    expect(totals.total).toBe(0);
    expect(totals.shippingFee).toBe(0);
    expect(totals.itemCount).toBe(0);
    expect(totals.isEligibleForFreeShipping).toBe(false);
    expect(totals.amountNeededForFreeShipping).toBe(FREE_SHIPPING_THRESHOLD);
  });

  it('calculates totals correctly when below free shipping threshold', () => {
    const items: CartItem[] = [
      {
        product: {
          id: 1,
          title: 'Test Shirt',
          price: 25.0,
          description: '',
          category: "men's clothing",
          image: '',
          rating: { rate: 4, count: 10 },
        },
        quantity: 2,
      },
    ];

    const totals = calculateCartTotals(items);
    expect(totals.subtotal).toBe(50.0);
    expect(totals.itemCount).toBe(2);
    expect(totals.isEligibleForFreeShipping).toBe(false);
    expect(totals.shippingFee).toBe(STANDARD_SHIPPING_FEE);
    expect(totals.estimatedTax).toBe(4.0); // 8% of 50
    expect(totals.total).toBe(50.0 + STANDARD_SHIPPING_FEE + 4.0);
    expect(totals.amountNeededForFreeShipping).toBe(25.0);
  });

  it('applies free shipping when subtotal reaches threshold', () => {
    const items: CartItem[] = [
      {
        product: {
          id: 2,
          title: 'Fine Jacket',
          price: 80.0,
          description: '',
          category: "men's clothing",
          image: '',
          rating: { rate: 4.5, count: 20 },
        },
        quantity: 1,
      },
    ];

    const totals = calculateCartTotals(items);
    expect(totals.subtotal).toBe(80.0);
    expect(totals.isEligibleForFreeShipping).toBe(true);
    expect(totals.shippingFee).toBe(0);
    expect(totals.amountNeededForFreeShipping).toBe(0);
  });

  it('safely handles malformed item objects without throwing', () => {
    const items = [
      { product: { price: 'not-a-number' as unknown as number }, quantity: 2 },
      { quantity: 5 },
    ] as unknown as CartItem[];

    expect(() => calculateCartTotals(items)).not.toThrow();
    const totals = calculateCartTotals(items);
    expect(totals.subtotal).toBe(0);
  });
});
