/**
 * ============================================================================
 * 🚀 CHANGE REQUEST: CR-04A
 * Luxury Dark Mode & Dynamic CSS Theme Tokens
 * Module 4: Rendering and Styling in React with TypeScript (Units 4.1, 4.3, 4.4)
 * ----------------------------------------------------------------------------
 * 🎯 OBJECTIVE: Implement data-theme attribute toggling with smooth transitions
 *    and localStorage preference persistence.
 * 📖 REFERENCE SPEC: change-requests/CR-04A/request.md
 * 🌟 GOLDEN SOLUTION: shopsphere-solution/src/components/common/ThemeToggle.tsx
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  /**
   * 📝 STEP 1: Initialize Theme State with localStorage Persistence
   * ----------------------------------------------------------------------------
   * 🛠️ WHAT TO DO:
   *    1. Initialize `theme` state defaulting to 'light'.
   *    2. In `useEffect`, read saved preference: `localStorage.getItem('shopsphere-theme')`.
   *    3. Apply to DOM root: `document.documentElement.dataset.theme = savedTheme`.
   */
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = (localStorage.getItem('shopsphere-theme') as 'light' | 'dark') || 'light';
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  /**
   * 📝 STEP 2: Implement Toggle Theme Handler
   * ----------------------------------------------------------------------------
   * 🛠️ WHAT TO DO:
   *    1. Determine opposite theme: `const next = theme === 'light' ? 'dark' : 'light'`.
   *    2. Update component state with `setTheme(next)`.
   *    3. Update DOM attribute: `document.documentElement.dataset.theme = next`.
   *    4. Persist to storage: `localStorage.setItem('shopsphere-theme', next)`.
   */
  const toggleTheme = () => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Implement the theme toggle handler described in STEP 2 above.
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('shopsphere-theme', next);
  };

  return (
    <button
      className="site-header__action-btn theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
};
