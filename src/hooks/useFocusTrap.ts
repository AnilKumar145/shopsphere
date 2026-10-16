/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07B — Custom Hook: useFocusTrap
 * Module 7: React Hooks with TypeScript (Units 7.3, 7.8, 7.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Contain keyboard Tab and Shift+Tab focus cycling within modal
 *    dialog containers, restoring previous focus on close.
 * 📁 Reference: shopsphere-solution/src/hooks/useFocusTrap.ts
 * ============================================================================
 */

import { useEffect, useRef } from 'react';

export function useFocusTrap<T extends HTMLElement = HTMLElement>(isActive: boolean) {
  const containerRef = useRef<T>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // 📝 STEP 1: Capture previous focus
    previousFocusRef.current = document.activeElement as HTMLElement;

    const container = containerRef.current;
    if (!container) return;

    // 📝 STEP 2: Find all focusable elements
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelectors);
    if (focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }

    // 📝 STEP 3: Handle Tab key containment
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const elements = container.querySelectorAll<HTMLElement>(focusableSelectors);
      if (elements.length === 0) return;

      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}
