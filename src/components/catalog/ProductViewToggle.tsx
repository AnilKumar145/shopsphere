/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-03A & CR-04B — Parent-to-Child Props Flow & View Mode Toggle
 * Module 3 (Unit 3.1, 3.2, 3.4) & Module 4 (Unit 4.2, 4.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Build a presentational toggle component with explicit prop
 *    interfaces communicating mode changes to parent catalog via callbacks.
 * 📁 Reference: shopsphere-solution/src/components/catalog/ProductViewToggle.tsx
 * ============================================================================
 */

/**
 * Product View Mode Toggle Component (Grid vs List)
 * Demonstrates Module 3: Component Props & Callbacks
 */

import React from 'react';
import { LayoutGrid, List } from 'lucide-react';
import './ProductViewToggle.css';

export type CatalogViewMode = 'grid' | 'list';

export interface ProductViewToggleProps {
  readonly mode: CatalogViewMode;
  readonly onChange: (newMode: CatalogViewMode) => void;
}

export const ProductViewToggle: React.FC<ProductViewToggleProps> = ({ mode, onChange }) => {
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
