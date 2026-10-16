/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-03B — Reusable Customer Review Badge Component
 * Module 3: React Components with TypeScript (Units 3.2, 3.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Compose visual StarRating with formatted review scores and
 *    qualitative review counts for luxury product cards and details.
 * 📖 Reference Spec: change-requests/CR-03B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/ui/ReviewBadge.tsx
 * ============================================================================
 */

import React from 'react';
import { StarRating } from './StarRating';

export interface ReviewBadgeProps {
  rating: number;
  reviewCount: number;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 📝 STEP 1: Format Rating Score and Review Volume Label
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Display formatted rating: rating.toFixed(1)
 *    Display formatted review count: `(${reviewCount} reviews)`
 *
 * 📝 STEP 2: Compose Child StarRating Component
 */
export const ReviewBadge: React.FC<ReviewBadgeProps> = ({
  rating,
  reviewCount,
  size = 'sm',
}) => {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Render composite review badge combining StarRating and textual metrics:
  return (
    <div
      className={`review-badge review-badge--${size}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
    >
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
