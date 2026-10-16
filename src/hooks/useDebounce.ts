/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07C — Custom Hook: useDebounce
 * Module 7: React Hooks with TypeScript (Units 7.8, 7.9, 13.3)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Create a generic debouncing hook that delays updating a value
 *    until a specified delay has elapsed since the last change.
 * 📖 Reference Spec: change-requests/CR-07C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/hooks/useDebounce.ts
 * ============================================================================
 */

import { useState } from 'react';

/**
 * 📝 STEP 1: State Initialization
 * 📝 STEP 2: Timer Lifecycle & Cleanup
 * 📝 STEP 3: Return Value
 */
export function useDebounce<T>(value: T, delayMs: number = 300): T {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  void delayMs;
  const [debouncedValue] = useState<T>(value);
  return debouncedValue;
}
