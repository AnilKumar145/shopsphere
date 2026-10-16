import { CartItem } from '../types';

export const FREE_SHIPPING_THRESHOLD = 75;
export const STANDARD_SHIPPING_FEE = 9.99;
export const ESTIMATED_TAX_RATE = 0.08; // 8% sales tax

export interface CartTotals {
  subtotal: number;
  shippingFee: number;
  estimatedTax: number;
  total: number;
  itemCount: number;
  isEligibleForFreeShipping: boolean;
  amountNeededForFreeShipping: number;
}

/**
 * Calculates cart totals strictly derived from cart items.
 * Validates prices and quantities to protect against malformed state.
 */
export function calculateCartTotals(items: readonly CartItem[]): CartTotals {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      subtotal: 0,
      shippingFee: 0,
      estimatedTax: 0,
      total: 0,
      itemCount: 0,
      isEligibleForFreeShipping: false,
      amountNeededForFreeShipping: FREE_SHIPPING_THRESHOLD,
    };
  }

  let subtotal = 0;
  let itemCount = 0;

  for (const item of items) {
    const qty = Math.max(0, Math.floor(item.quantity || 0));
    const price = typeof item.product?.price === 'number' && !isNaN(item.product.price) && item.product.price > 0
      ? item.product.price
      : 0;

    subtotal += price * qty;
    itemCount += qty;
  }

  // Round subtotal to 2 decimals
  subtotal = Math.round(subtotal * 100) / 100;

  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = subtotal === 0 || isEligibleForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const estimatedTax = Math.round(subtotal * ESTIMATED_TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + shippingFee + estimatedTax) * 100) / 100;
  const amountNeededForFreeShipping = isEligibleForFreeShipping
    ? 0
    : Math.max(0, Math.round((FREE_SHIPPING_THRESHOLD - subtotal) * 100) / 100);

  return {
    subtotal,
    shippingFee,
    estimatedTax,
    total,
    itemCount,
    isEligibleForFreeShipping,
    amountNeededForFreeShipping,
  };
}
