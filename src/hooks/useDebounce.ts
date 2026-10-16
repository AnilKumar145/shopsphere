/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07C — Custom Hook: useDebounce
 * Module 7: React Hooks with TypeScript (Units 7.2, 7.8, 7.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Optimize search input typing by delaying state emission until
 *    user pauses keystrokes, avoiding rapid re-filtering churn.
 * 📁 Reference: shopsphere-solution/src/hooks/useDebounce.ts
 * ============================================================================
 */

/**
 * Generic useDebounce hook
 * Demonstrates 7.8 Custom Hooks, 7.9 Hook Design Patterns, 13.3 Hook Optimization
 */

import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delayMs: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
