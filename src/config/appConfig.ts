/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02B & CR-15B — Type-Safe Application Configuration
 * Module 2 (Unit 2.7) & Module 15 (Unit 15.6, 15.10)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Centralize runtime environment variables with strict fallback
 *    defaults and zero implicit 'any' annotations.
 * 📁 Reference: shopsphere-solution/src/config/appConfig.ts
 * ============================================================================
 */

/**
 * Application Configuration Module
 * Demonstrates Module 15: 15.6 Configuration Management
 * Demonstrates Module 16: 16.3 Environment Configuration
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
    readonly defaultCurrency: 'USD' | 'EUR' | 'GBP' | 'JPY';
    readonly supportedCurrencies: readonly ['USD', 'EUR', 'GBP', 'JPY'];
  };
  readonly thresholds: {
    readonly freeShippingMinimum: number;
    readonly lowStockWarning: number;
  };
}

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
    freeShippingMinimum: 150,
    lowStockWarning: 10,
  },
};
