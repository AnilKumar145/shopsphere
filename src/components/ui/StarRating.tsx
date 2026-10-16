/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-03B — Reusable Star Rating Component Library
 * Module 3: React Components with TypeScript (Units 3.1, 3.2, 3.3, 3.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct an accessible visual star rating component with
 *    optional props, default values, and WCAG 2.1 AA screen-reader labels.
 * 📖 Reference Spec: change-requests/CR-03B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/ui/StarRating.tsx
 * ============================================================================
 */

import React from 'react';
import './StarRating.css';

export interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
}

/**
 * 📝 STEP 1: Constrain rating between 0 and maxStars
 * 📝 STEP 2: Render star elements with accessible ARIA role="img" and aria-label
 * 📝 STEP 3: Handle interactive clicks if interactive is true
 */
export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRatingChange,
}) => {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // 1. Clamp rating between 0 and maxStars:
  const clampedRating = Math.max(0, Math.min(rating, maxStars));

  // 2. Render star rating container with accessible screen reader label:
  return (
    <div
      className={`star-rating star-rating--${size} ${interactive ? 'star-rating--interactive' : ''}`}
      role="img"
      aria-label={`Rated ${clampedRating.toFixed(1)} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = clampedRating >= starValue;
        const isHalf = !isFilled && clampedRating >= starValue - 0.5;

        return (
          <span
            key={index}
            className={`star-rating__star ${isFilled ? 'is-filled' : isHalf ? 'is-half' : 'is-empty'}`}
            onClick={() => interactive && onRatingChange?.(starValue)}
            tabIndex={interactive ? 0 : -1}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};
