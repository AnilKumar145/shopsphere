import { describe, it, expect } from 'vitest';
import { appConfig } from '../config/appConfig';

describe('Application Environment Configuration', () => {
  it('loads valid default application configuration settings', () => {
    expect(appConfig.appName).toBe('ShopSphere Luxury Retail');
    expect(appConfig.appVersion).toBe('1.0.0');
    expect(typeof appConfig.apiUrl).toBe('string');
    expect(appConfig.apiUrl.length).toBeGreaterThan(0);
    expect(appConfig.timeoutMs).toBeGreaterThanOrEqual(1000);
  });

  it('exposes feature flags and supported currencies', () => {
    expect(appConfig.featureFlags.enableQuickView).toBe(true);
    expect(appConfig.featureFlags.enableTieredDiscounts).toBe(true);
    expect(appConfig.currency.defaultCurrency).toBe('USD');
    expect(appConfig.currency.supportedCurrencies).toContain('EUR');
    expect(appConfig.currency.supportedCurrencies).toContain('GBP');
    expect(appConfig.currency.supportedCurrencies).toContain('JPY');
  });

  it('defines operational thresholds for luxury retail', () => {
    expect(appConfig.thresholds.freeShippingMinimum).toBe(150);
    expect(appConfig.thresholds.lowStockWarning).toBe(10);
  });
});
