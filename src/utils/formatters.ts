/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-02A — Multi-Currency Formatter Utilities
 * Module 2: TypeScript Fundamentals for React (Units 2.2, 14.1, 15.10)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Implement localized currency formatting using Intl.NumberFormat
 *    accepting an active currency parameter with safe fallbacks.
 * 📖 Reference Spec: change-requests/CR-02A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/utils/formatters.ts
 * ============================================================================
 */

/**
 * 📝 STEP 1: Extend formatCurrency to Support Multi-Currency with Intl.NumberFormat
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    1. Handle edge cases: if amount is not a number or isNaN(amount), return '$0.00'.
 *    2. Instantiate Intl.NumberFormat for 'en-US' locale with:
 *       - style: 'currency'
 *       - currency: currency (defaults to 'USD')
 *       - minimumFractionDigits: 2
 *       - maximumFractionDigits: 2
 *    3. Format and return amount.
 *
 * 🧠 WHY IT MATTERS:
 *    Hardcoding '$' leads to collisions when displaying EUR, GBP, or JPY prices.
 *    Using Intl.NumberFormat handles currency symbols, negative signs (-$15.50),
 *    and grouping delimiters automatically.
 *
 * 💡 IMPLEMENTATION HINT:
 *    return new Intl.NumberFormat('en-US', {
 *      style: 'currency',
 *      currency,
 *      minimumFractionDigits: 2,
 *      maximumFractionDigits: 2,
 *    }).format(amount);
 *
 * @param amount - Numeric price to format
 * @param currency - Active ISO currency code (defaults to 'USD')
 * @returns Localized currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Remove this starter stub and implement the Intl.NumberFormat logic described in STEP 1 above.
  void currency;
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '$0.00';
  }

  // Placeholder starter stub (simple string concatenation without Intl multi-currency support):
  // NOTE: This stub will fail negative number and multi-currency tests until students implement Intl.NumberFormat!
  return `$${amount.toFixed(2)}`;
}

/**
 * Formats date input into human-readable editorial display format
 */
export function formatDate(dateInput: string | number | Date): string {
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return 'N/A';
  }
}

/**
 * Truncates long text strings with trailing ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

/**
 * Formats raw API category strings for luxury editorial display
 */
export function formatCategoryName(category: string): string {
  if (!category) return '';
  if (category.toLowerCase() === 'jewelery') return 'Fine Jewelry';
  return category
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
