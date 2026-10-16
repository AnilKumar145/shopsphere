/**
 * Product Skeleton Loader
 * Demonstrates 4.5 UI State Representation (Loading States)
 */

import React from 'react';
import './ProductCard.css';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="product-card" aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <div className="product-card__image-container">
        <div className="skeleton" style={{ width: '80%', height: '80%' }} />
      </div>
      <div className="product-card__body">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div className="skeleton" style={{ width: '40%', height: '14px' }} />
          <div className="skeleton" style={{ width: '20%', height: '14px' }} />
        </div>
        <div className="skeleton" style={{ width: '90%', height: '18px', marginBottom: '6px' }} />
        <div className="skeleton" style={{ width: '60%', height: '18px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div className="skeleton" style={{ width: '30%', height: '24px' }} />
          <div className="skeleton" style={{ width: '25%', height: '32px', borderRadius: '4px' }} />
        </div>
      </div>
    </div>
  );
};

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="products-grid">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
};
