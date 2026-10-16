/**
 * ============================================================================
 * 🚀 CHANGE REQUEST: CR-02A
 * Multi-Currency Union Types & Pure Conversion Utilities
 * Module 2: TypeScript Fundamentals for React (Units 2.1, 2.2, 2.6, 2.8)
 * ----------------------------------------------------------------------------
 * 🎯 OBJECTIVE: Implement pure currency conversion and lookup functions with
 *    strict parameter and return type annotations, rounding to 2 decimal places.
 * 📖 REFERENCE SPEC: change-requests/CR-02A/request.md
 * 🌟 GOLDEN SOLUTION: shopsphere-solution/src/utils/currencyUtils.ts
 * ============================================================================
 */

import { CurrencyCode, CurrencyConfig } from '../types/currency';

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar', exchangeRateToUSD: 1.0 },
  { code: 'EUR', symbol: '€', label: 'Euro', exchangeRateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', label: 'British Pound', exchangeRateToUSD: 0.79 },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen', exchangeRateToUSD: 155.0 }
];

/**
 * 📝 STEP 1: Implement convertCurrency Function
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Convert an amount from one currency to another using the exchange rates in
 *    SUPPORTED_CURRENCIES.
 *    
 *    Requirements:
 *    1. If rom === to, return mount immediately without conversion.
 *    2. Find the configuration object for rom in SUPPORTED_CURRENCIES. Fall back to USD if not found.
 *    3. Find the configuration object for 	o in SUPPORTED_CURRENCIES. Fall back to USD if not found.
 *    4. Convert mount to base USD: inUSD = amount / fromConfig.exchangeRateToUSD.
 *    5. Convert from base USD to target currency: converted = inUSD * toConfig.exchangeRateToUSD.
 *    6. Round the result to 2 decimal places using Math.round((converted + Number.EPSILON) * 100) / 100.
 * 
 * 🧠 WHY IT MATTERS:
 *    Ensures deterministic, testable financial arithmetic without floating-point inaccuracies.
 * 
 * 💡 IMPLEMENTATION HINT:
 *    - Use SUPPORTED_CURRENCIES.find(c => c.code === from) to look up currency configs.
 *    - Guard with nullish coalescing (??) for safety.
 * 
 * @param amount - The numeric price to convert
 * @param from - The source CurrencyCode (e.g. 'USD', 'EUR')
 * @param to - The target CurrencyCode (e.g. 'EUR', 'GBP')
 * @returns The converted amount rounded to 2 decimal places
 */
export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Remove this fallback stub and implement the conversion logic described in STEP 1 above.
  if (from === to) return amount;

  // Placeholder starter stub:
  return amount;
}

/**
 * 📝 STEP 2: Implement getCurrencySymbol Function
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Look up and return the matching currency symbol ('$', '€', '£', '¥')
 *    from SUPPORTED_CURRENCIES for the provided CurrencyCode.
 *    If no matching currency is found, default to '$'.
 * 
 * 💡 IMPLEMENTATION HINT:
 *    - Use SUPPORTED_CURRENCIES.find(c => c.code === code) to find the config.
 * 
 * @param code - The CurrencyCode to look up
 * @returns The symbol string (e.g., '$', '€', '£', '¥')
 */
export function getCurrencySymbol(code: CurrencyCode): string {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Find the currency configuration for the given code and return its symbol.
  if (!code) return '$';
  return '$';
}
