/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-03A & CR-04B — Product View Mode Toggle Component
 * Module 3: Component Props & Callbacks | Module 4: Dynamic Styling
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Render a toolbar toggle switching between Grid and List view
 *    with accessible ARIA attributes and visual active states.
 * 📖 Reference Spec: change-requests/CR-03A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/catalog/ProductViewToggle.tsx
 * ============================================================================
 */

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import './ProductViewToggle.css';

export type CatalogViewMode = 'grid' | 'list';

export interface ProductViewToggleProps {
  readonly mode: CatalogViewMode;
  readonly onChange: (newMode: CatalogViewMode) => void;
}

/**
 * 📝 STEP 1: Accessible Container Structure
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Render a container div with className="product-view-toggle",
 *    role="group", and aria-label="Catalog layout display mode".
 *
 * 📝 STEP 2: Grid Mode Toggle Button
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Render button with:
 *    - type="button"
 *    - className includes 'view-toggle-btn--active' when mode === 'grid'
 *    - onClick calls onChange('grid')
 *    - aria-label="Grid view layout"
 *    - aria-pressed={mode === 'grid'}
 *    - Icon: <LayoutGrid size={16} />
 *
 * 📝 STEP 3: List Mode Toggle Button
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Render button with:
 *    - type="button"
 *    - className includes 'view-toggle-btn--active' when mode === 'list'
 *    - onClick calls onChange('list')
 *    - aria-label="List view layout"
 *    - aria-pressed={mode === 'list'}
 *    - Icon: <List size={16} />
 */
export const ProductViewToggle: React.FC<ProductViewToggleProps> = ({ mode, onChange }) => {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Remove this starter stub and implement the toggle buttons described in STEPS 1-3 above.
  return (
    <div className="product-view-toggle" role="group" aria-label="Catalog layout display mode">
      <button
        type="button"
        className={`view-toggle-btn ${mode === 'grid' ? 'view-toggle-btn--active' : ''}`}
        onClick={() => onChange('grid')}
        aria-label="Grid view layout"
        aria-pressed={mode === 'grid'}
      >
        <LayoutGrid size={16} />
      </button>

      <button
        type="button"
        className={`view-toggle-btn ${mode === 'list' ? 'view-toggle-btn--active' : ''}`}
        onClick={() => onChange('list')}
        aria-label="List view layout"
        aria-pressed={mode === 'list'}
      >
        <List size={16} />
      </button>
    </div>
  );
};
