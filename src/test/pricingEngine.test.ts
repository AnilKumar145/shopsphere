import { describe, it, expect } from 'vitest';
import {
  calculateTieredDiscount,
  calculateSalesTax,
  calculateShippingFee,
  computeOrderFinancials,
} from '../utils/pricingEngine';
import { CartItem, Product } from '../types';

const mockProduct: Product = {
  id: 101,
  title: 'Luxury Gold Chronograph',
  price: 120.0,
  description: 'Precision handcrafted timepiece.',
  category: 'jewelery',
  image: 'https://example.com/watch.jpg',
  rating: { rate: 4.8, count: 50 },
};

describe('Pricing Engine & Business Financial Calculations', () => {
  it('correctly calculates tiered discounts based on subtotal thresholds', () => {
    // $0 - $99 -> 0%
    const tier0 = calculateTieredDiscount(80);
    expect(tier0.discountPercentage).toBe(0);
    expect(tier0.discountAmount).toBe(0);

    // $100 - $249 -> 5%
    const tier1 = calculateTieredDiscount(150);
    expect(tier1.discountPercentage).toBe(5);
    expect(tier1.discountAmount).toBe(7.5);

    // $250 - $499 -> 10%
    const tier2 = calculateTieredDiscount(300);
    expect(tier2.discountPercentage).toBe(10);
    expect(tier2.discountAmount).toBe(30);

    // $500+ -> 15% VIP
    const tier3 = calculateTieredDiscount(600);
    expect(tier3.discountPercentage).toBe(15);
    expect(tier3.discountAmount).toBe(90);
  });

  it('calculates luxury sales tax accurately at 8.25%', () => {
    const tax = calculateSalesTax(100);
    expect(tax).toBe(8.25);

    const tax2 = calculateSalesTax(245.5);
    expect(tax2).toBe(20.25);
  });

  it('determines shipping fees based on threshold and delivery method', () => {
    // Under $150 standard -> $12
    expect(calculateShippingFee(100, 'standard')).toBe(12.0);

    // $150 or above standard -> Complimentary ($0)
    expect(calculateShippingFee(150, 'standard')).toBe(0.0);
    expect(calculateShippingFee(250, 'standard')).toBe(0.0);

    // Express is always $18
    expect(calculateShippingFee(300, 'express')).toBe(18.0);

    // Overnight Courier is always $35
    expect(calculateShippingFee(500, 'overnight')).toBe(35.0);
  });

  it('computes complete order financials including promotional vouchers', () => {
    const items: CartItem[] = [
      { product: mockProduct, quantity: 2 }, // $240 subtotal
    ];

    // Subtotal: $240 -> Tier: 5% ($12 discount) -> Net: $228
    // Under $150 threshold? No, $240 >= $150, so standard shipping is $0
    // Tax: 8.25% of $228 = $18.81
    // Total: $228 + $18.81 = $246.81
    const financials = computeOrderFinancials(items, 'standard');

    expect(financials.subtotal).toBe(240);
    expect(financials.volumeDiscountPercentage).toBe(5);
    expect(financials.volumeDiscountAmount).toBe(12);
    expect(financials.netSubtotal).toBe(228);
    expect(financials.shippingCost).toBe(0);
    expect(financials.qualifiedForFreeShipping).toBe(true);
    expect(financials.estimatedTax).toBe(18.81);
    expect(financials.grandTotal).toBe(246.81);
  });

  it('applies coupon voucher ATELIER20 (20% off subtotal)', () => {
    const items: CartItem[] = [{ product: mockProduct, quantity: 1 }]; // $120 subtotal
    const financials = computeOrderFinancials(items, 'standard', 'ATELIER20');

    // 20% of $120 = $24 promo discount
    expect(financials.promoDiscountAmount).toBe(24);
    expect(financials.totalDiscountAmount).toBe(30); // 6 (5% volume) + 24 (promo)
  });
});
