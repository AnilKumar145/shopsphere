import { describe, it, expect } from 'vitest';
import { sanitizeInput, maskCardNumber, isValidToken } from '../utils/security';

describe('Security & Sanitization Utilities', () => {
  it('sanitizes malicious script tags and event handlers from raw user inputs', () => {
    const malicious = '<script>alert("xss")</script>Hello World';
    expect(sanitizeInput(malicious)).toBe('scriptalert("xss")/scriptHello World');

    const inlineXss = '<img src=x onerror=alert(1)>Luxury Silk';
    expect(sanitizeInput(inlineXss)).toBe('img src=x alert(1)Luxury Silk');
  });

  it('masks credit card numbers exposing only the final 4 digits', () => {
    expect(maskCardNumber('4532 1198 2345 8890')).toBe('•••• •••• •••• 8890');
    expect(maskCardNumber('1234567812345678')).toBe('•••• •••• •••• 5678');
    expect(maskCardNumber('12')).toBe('•••• •••• •••• ••••');
  });

  it('validates JWT token strings securely', () => {
    expect(isValidToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')).toBe(true);
    expect(isValidToken('')).toBe(false);
    expect(isValidToken('short')).toBe(false);
    expect(isValidToken('token with spaces')).toBe(false);
    expect(isValidToken(null)).toBe(false);
    expect(isValidToken(undefined)).toBe(false);
  });
});
