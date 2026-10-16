/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02B & CR-15B — Type-Safe Application Configuration
 * Module 2: TypeScript Fundamentals (Unit 2.7) | Module 15: Production Config (Unit 15.6)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Centralize runtime environment variables with strict typing,
 *    feature flags, luxury retail thresholds, and sensible fallback defaults.
 * 📖 Reference Spec: change-requests/CR-02B/request.md & CR-15B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/config/appConfig.ts
 * ============================================================================
 */

import { CurrencyCode } from '../types/currency';

/**
 * 📝 STEP 1: Define AppConfig Interface Contract
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Declare readonly properties for apiUrl, timeoutMs, debugMode, appName,
 *    appVersion, featureFlags, currency, and operational thresholds.
 */
export interface AppConfig {
  readonly apiUrl: string;
  readonly timeoutMs: number;
  readonly debugMode: boolean;
  readonly appName: string;
  readonly appVersion: string;
  readonly featureFlags: {
    readonly enableQuickView: boolean;
    readonly enableTieredDiscounts: boolean;
    readonly enableAuditLogging: boolean;
    readonly enableMultiCurrency: boolean;
  };
  readonly currency: {
    readonly defaultCurrency: CurrencyCode;
    readonly supportedCurrencies: readonly CurrencyCode[];
  };
  readonly thresholds: {
    readonly freeShippingMinimum: number;
    readonly lowStockWarning: number;
  };
}

/**
 * 📝 STEP 2: Configure Environment Fallbacks & Operational Defaults
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Populate the singleton appConfig instance:
 *    1. Read apiUrl from import.meta.env.VITE_API_BASE_URL (fallback: 'https://fakestoreapi.com')
 *    2. Read timeoutMs from import.meta.env.VITE_API_TIMEOUT_MS (fallback: 10000)
 *    3. Configure freeShippingMinimum to 150 and lowStockWarning to 10.
 *    4. Enable feature flags for quick view, tiered discounts, logging, and currency.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED]
// Populate and export the typed appConfig instance following the requirements in STEPS 1-2 above.
export const appConfig: AppConfig = {
  apiUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'https://fakestoreapi.com',
  timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 10000,
  debugMode: (import.meta.env.VITE_DEBUG_MODE as string) === 'true',
  appName: 'ShopSphere Luxury Retail',
  appVersion: '1.0.0',
  featureFlags: {
    enableQuickView: true,
    enableTieredDiscounts: true,
    enableAuditLogging: true,
    enableMultiCurrency: true,
  },
  currency: {
    defaultCurrency: 'USD',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'JPY'] as const,
  },
  thresholds: {
    // Starter stub: student must configure freeShippingMinimum to 150
    freeShippingMinimum: 0,
    lowStockWarning: 10,
  },
};
