/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02A — Multi-Currency Union Types & Pure Conversion Utilities
 * Module 2: TypeScript Fundamentals for React (Units 2.1, 2.2, 2.6, 2.8)
 * ----------------------------------------------------------------------------
 * 🎯 OBJECTIVE: Implement pure currency conversion and lookup functions with
 *    strict parameter and return type annotations, rounding to 2 decimal places.
 * 📖 REFERENCE SPEC: change-requests/CR-02A/request.md
 * 🌟 GOLDEN SOLUTION: shopsphere-solution/src/utils/currencyUtils.ts
 * ============================================================================
 */

import { CurrencyCode, CurrencyConfig } from '../types/currency';

/**
 * 📝 STEP 1: Create Exchange Rate Lookup Table
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Complete the SUPPORTED_CURRENCIES array with configurations for all 4 currencies:
 *    - 'USD': symbol '$', label 'US Dollar', exchangeRateToUSD: 1.0
 *    - 'EUR': symbol '€', label 'Euro', exchangeRateToUSD: 0.92
 *    - 'GBP': symbol '£', label 'British Pound', exchangeRateToUSD: 0.79
 *    - 'JPY': symbol '¥', label 'Japanese Yen', exchangeRateToUSD: 155.0
 *
 * 💡 IMPLEMENTATION HINT:
 *    Each entry must satisfy the CurrencyConfig interface contract.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED]
// Complete the SUPPORTED_CURRENCIES array by adding EUR, GBP, and JPY configurations:
export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', label: 'US Dollar', exchangeRateToUSD: 1.0 },
  // TODO: Add EUR, GBP, and JPY objects here
];

/**
 * 📝 STEP 2: Implement convertCurrency Function
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Convert an amount from one currency to another using exchange rates:
 *    1. If from === to, return amount immediately.
 *    2. Find the config object for 'from' in SUPPORTED_CURRENCIES (fallback to USD if missing).
 *    3. Find the config object for 'to' in SUPPORTED_CURRENCIES (fallback to USD if missing).
 *    4. Convert amount to base USD: inUSD = amount / (fromConfig.exchangeRateToUSD ?? 1.0).
 *    5. Convert from base USD to target: converted = inUSD * (toConfig.exchangeRateToUSD ?? 1.0).
 *    6. Round result to 2 decimal places: Math.round((converted + Number.EPSILON) * 100) / 100.
 *
 * 🧠 WHY IT MATTERS:
 *    Ensures deterministic, testable financial arithmetic without floating-point inaccuracies.
 *
 * 💡 IMPLEMENTATION HINT:
 *    Use SUPPORTED_CURRENCIES.find(c => c.code === from) to look up configs.
 *
 * @param amount - The numeric price to convert
 * @param from - The source CurrencyCode (e.g. 'USD', 'EUR')
 * @param to - The target CurrencyCode (e.g. 'EUR', 'GBP')
 * @returns The converted amount rounded to 2 decimal places
 */
export function convertCurrency(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Remove this starter stub and implement the conversion logic described in STEP 2 above.
  void from;
  void to;

  // Starter stub (returns raw unconverted amount):
  return amount;
}

/**
 * 📝 STEP 3: Implement getCurrencySymbol Function
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Look up and return the matching currency symbol ('$', '€', '£', '¥')
 *    from SUPPORTED_CURRENCIES for the provided CurrencyCode.
 *    If no matching currency is found, default to '$'.
 *
 * 💡 IMPLEMENTATION HINT:
 *    Use SUPPORTED_CURRENCIES.find(c => c.code === code)?.symbol ?? '$'
 *
 * @param code - The CurrencyCode to look up
 * @returns The symbol string (e.g., '$', '€', '£', '¥')
 */
export function getCurrencySymbol(code: CurrencyCode): string {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Find the currency configuration for the given code and return its symbol.
  void code;

  // Starter stub:
  return '$';
}
