/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-03B — Reusable Review Badge Component
 * Module 3: React Components with TypeScript (Units 3.2, 3.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Format qualitative customer review scores and review volume.
 * 📁 Reference: shopsphere-solution/src/components/ui/ReviewBadge.tsx
 * ============================================================================
 */

import React from 'react';
import { StarRating } from './StarRating';

export interface ReviewBadgeProps {
  rating: number;
  reviewCount: number;
  size?: 'sm' | 'md' | 'lg';
}

export const ReviewBadge: React.FC<ReviewBadgeProps> = ({
  rating,
  reviewCount,
  size = 'sm'
}) => {
  return (
    <div className={`review-badge review-badge--${size}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
      <StarRating rating={rating} size={size} />
      <span className="review-badge__score" style={{ fontWeight: 600, fontSize: '0.85em' }}>
        {rating.toFixed(1)}
      </span>
      <span className="review-badge__count" style={{ color: 'var(--text-muted, #71717a)', fontSize: '0.8em' }}>
        ({reviewCount} reviews)
      </span>
    </div>
  );
};
