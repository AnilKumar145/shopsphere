/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02A & CR-02B — Multi-Currency Types & Generic Record DTOs
 * Module 2: TypeScript Fundamentals for React (Units 2.1, 2.2, 2.5, 2.6, 2.7, 2.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Model strict union types for global luxury currencies, generic
 *    exchange rate records, and conversion configuration contracts.
 * 📖 Reference Spec: change-requests/CR-02A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/types/currency.ts
 * ============================================================================
 */

/**
 * 📝 STEP 1: Define Strict CurrencyCode Union Type
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Declare a strict string literal union type CurrencyCode containing the
 *    4 supported global luxury currencies:
 *    - 'USD' (US Dollar - base currency)
 *    - 'EUR' (Euro)
 *    - 'GBP' (British Pound Sterling)
 *    - 'JPY' (Japanese Yen)
 *
 * 🧠 WHY IT MATTERS:
 *    Prevents arbitrary strings ('usd', 'CAD', 'bitcoin') from entering financial
 *    calculations, giving compile-time type safety across the entire application.
 *
 * 💡 IMPLEMENTATION HINT:
 *    Use TypeScript union type syntax (`|`). Do NOT use enum or `any`.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED] Declare the CurrencyCode union type:
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

/**
 * 📝 STEP 2: Define CurrencyConfig Interface Contract
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Define the CurrencyConfig interface representing the metadata for each currency:
 *    - readonly code: CurrencyCode
 *    - readonly symbol: string (e.g., '$', '€', '£', '¥')
 *    - readonly label: string (e.g., 'US Dollar', 'Euro')
 *    - readonly exchangeRateToUSD: number (conversion rate relative to 1.0 USD)
 *
 * 💡 IMPLEMENTATION HINT:
 *    Mark properties with `readonly` to enforce immutability.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED] Define the CurrencyConfig interface:
export interface CurrencyConfig {
  readonly code: CurrencyCode;
  readonly symbol: string;
  readonly label: string;
  readonly exchangeRateToUSD: number;
}

/**
 * 📝 STEP 3: Define ExchangeRateMap Generic Record
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Define ExchangeRateMap using TypeScript's built-in Record<K, V> utility type,
 *    mapping each CurrencyCode key to its numeric exchange rate.
 *
 * 💡 IMPLEMENTATION HINT:
 *    Record<CurrencyCode, number>
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED] Define the ExchangeRateMap generic record:
export type ExchangeRateMap = Record<CurrencyCode, number>;
