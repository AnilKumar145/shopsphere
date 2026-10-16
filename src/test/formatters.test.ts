import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, truncateText, formatCategoryName } from '../utils/formatters';
import { convertCurrency, getCurrencySymbol, SUPPORTED_CURRENCIES } from '../utils/currencyUtils';

describe('formatters utility (CR-02A)', () => {
  it('formats currency correctly for USD', () => {
    expect(formatCurrency(109.95)).toBe('$109.95');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-15.5)).toBe('-$15.50');
  });

  it('handles invalid numbers gracefully in formatCurrency', () => {
    expect(formatCurrency(NaN)).toBe('$0.00');
    // @ts-expect-error Testing runtime invalid input
    expect(formatCurrency(undefined)).toBe('$0.00');
  });

  it('truncates long text properly', () => {
    expect(truncateText('Short text', 20)).toBe('Short text');
    expect(truncateText('A very long text that must be truncated nicely', 15)).toBe(
      'A very long tex...'
    );
  });

  it('formats category names for editorial display', () => {
    expect(formatCategoryName('jewelery')).toBe('Fine Jewelry');
    expect(formatCategoryName("men's clothing")).toBe("Men's Clothing");
    expect(formatCategoryName('electronics')).toBe('Electronics');
  });

  it('formats dates consistently', () => {
    const dateStr = '2026-10-16T10:00:00.000Z';
    const formatted = formatDate(dateStr);
    expect(formatted).not.toBe('N/A');
    expect(formatDate('invalid-date-string')).toBe('N/A');
  });
});

describe('currencyUtils (CR-02A Student Exercise)', () => {
  it('has all 4 supported currencies in SUPPORTED_CURRENCIES', () => {
    const codes = SUPPORTED_CURRENCIES.map(c => c.code);
    expect(codes).toContain('USD');
    expect(codes).toContain('EUR');
    expect(codes).toContain('GBP');
    expect(codes).toContain('JPY');
  });

  it('converts currencies correctly using exchange rates', () => {
    expect(convertCurrency(100, 'USD', 'EUR')).toBe(92);
    expect(convertCurrency(100, 'USD', 'GBP')).toBe(79);
    expect(convertCurrency(100, 'USD', 'USD')).toBe(100);
  });

  it('retrieves currency symbols accurately', () => {
    expect(getCurrencySymbol('USD')).toBe('$');
    expect(getCurrencySymbol('EUR')).toBe('€');
    expect(getCurrencySymbol('GBP')).toBe('£');
    expect(getCurrencySymbol('JPY')).toBe('¥');
  });
});
