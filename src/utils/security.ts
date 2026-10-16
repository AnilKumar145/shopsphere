/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-11C — Client-Side Security Sanitization
 * Module 11: Authentication and Authorization (Unit 11.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Provide XSS string sanitization, PAN credit card masking, token
 *    validity verification, and secure session clearing.
 * 📁 Reference: shopsphere-solution/src/utils/security.ts
 * ============================================================================
 */

/**
 * Enterprise Frontend Security Utilities
 * Demonstrates Module 11: 11.7 Security Considerations, Module 15: 15.9 Security Best Practices
 */

/**
 * Sanitizes raw string input against cross-site scripting (XSS)
 * Strips angle brackets and script/event injection sequences
 */
export function sanitizeInput(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/[<>]/g, '') // strip < and >
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '') // strip onclick=, onerror=
    .trim();
}

/**
 * Masks credit card numbers, revealing only the final 4 digits
 * Formats as "•••• •••• •••• 1234"
 */
export function maskCardNumber(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 4) {
    return '•••• •••• •••• ••••';
  }
  const lastFour = digits.slice(-4);
  return `•••• •••• •••• ${lastFour}`;
}

/**
 * Validates whether an authentication token meets basic structural JWT requirements
 */
export function isValidToken(token: unknown): boolean {
  if (typeof token !== 'string') return false;
  if (!token || token.trim().length === 0) return false;
  // Valid token must not contain whitespace and have at least 10 characters
  return token.length >= 10 && !/\s/.test(token);
}

/**
 * Securely clear all sensitive auth and session keys from browser storage
 */
export function clearSecureSession(): void {
  try {
    sessionStorage.clear();
    localStorage.removeItem('shopsphere_auth');
    localStorage.removeItem('shopsphere_user');
  } catch (error) {
    console.error('Failed to clear secure session', error);
  }
}
