/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07B — Custom Hook: useFocusTrap
 * Module 7: React Hooks with TypeScript (Units 7.3, 7.8, 7.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Contain keyboard Tab and Shift+Tab focus cycling within modal
 *    dialog containers, restoring previous focus on close.
 * 📖 Reference Spec: change-requests/CR-07B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/hooks/useFocusTrap.ts
 * ============================================================================
 */

import { useEffect, useRef } from 'react';

/**
 * 📝 STEP 1: Capture Previous Focus
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    When isActive becomes true, store document.activeElement in previousFocusRef
 *    so focus can be restored when the dialog unmounts/closes.
 *
 * 📝 STEP 2: Query Focusable Child Elements
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Query the container for focusable elements using:
 *    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
 *    If elements exist, focus the first element initially.
 *
 * 📝 STEP 3: Handle Tab Key Containment & Boundary Wrap
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Listen to window 'keydown' events:
 *    - If e.key !== 'Tab', do nothing.
 *    - If e.shiftKey and activeElement === firstElement, focus lastElement and preventDefault().
 *    - If !e.shiftKey and activeElement === lastElement, focus firstElement and preventDefault().
 *    On cleanup, removeEventListener and restore previousFocusRef.current?.focus().
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Implement the focus trap lifecycle described in STEPS 1-3 above.
    if (!isActive) return;
    void previousFocusRef;
  }, [isActive]);

  return containerRef;
}
