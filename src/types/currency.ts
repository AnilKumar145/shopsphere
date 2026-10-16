/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02A & CR-02B — Multi-Currency Types & Generic Record DTOs
 * Module 2: TypeScript Fundamentals for React (Units 2.1, 2.2, 2.5, 2.6, 2.7, 2.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Model strict union types for global luxury currencies, generic
 *    exchange rate records, and conversion configuration contracts.
 * 📁 Reference: shopsphere-solution/src/types/currency.ts
 * ============================================================================
 */

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export type ExchangeRateMap = Record<CurrencyCode, number>;

export interface CurrencyConfig {
  readonly code: CurrencyCode;
  readonly symbol: string;
  readonly label: string;
  readonly exchangeRateToUSD: number;
}
