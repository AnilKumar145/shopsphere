/**
 * ============================================================================
 * 🚀 CHANGE REQUEST: CR-06A
 * Controlled Product Review Form & Field-Level Validation
 * Module 6: Events and Forms with TypeScript (Units 6.1, 6.2, 6.4, 6.6)
 * ----------------------------------------------------------------------------
 * 🎯 OBJECTIVE: Build a controlled review form handling rating, headline, and
 *    commentary with real-time field error banners and submit handlers.
 * 📖 REFERENCE SPEC: change-requests/CR-06A/request.md
 * 🌟 GOLDEN SOLUTION: shopsphere-solution/src/features/reviews/ReviewForm.tsx
 * ============================================================================
 */

import React, { useState } from 'react';

export interface ReviewFormData {
  rating: number;
  headline: string;
  commentary: string;
}

export interface ReviewFormProps {
  productId: number;
  onSubmitReview: (review: ReviewFormData) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ productId: _productId, onSubmitReview }) => {
  // 📝 STEP 1: Controlled Form State
  // Initialize state hooks for rating, headline, commentary, and field errors.
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [commentary, setCommentary] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * 📝 STEP 2: Implement Field-Level Validation Function
   * ----------------------------------------------------------------------------
   * 🛠️ WHAT TO DO:
   *    Validate all three form fields and build a record of errors:
   *    1. If `rating < 1` or `rating > 5`, set `errs.rating = 'Rating must be between 1 and 5 stars'`.
   *    2. If `headline.trim().length < 5`, set `errs.headline = 'Headline must be at least 5 characters'`.
   *    3. If `commentary.trim().length < 20`, set `errs.commentary = 'Commentary must be at least 20 characters'`.
   *    4. Update state with `setErrors(errs)`.
   *    5. Return `true` if there are 0 errors, otherwise `false`.
   * 
   * 💡 IMPLEMENTATION HINT:
   *    - Check `Object.keys(errs).length === 0` to determine validity.
   */
  const validate = (): boolean => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Implement field validation rules and return boolean validity.
    // Suppress unused error state warning during starter phase:
    void errors;
    void setErrors;
    return true; // 👈 Starter stub
  };

  /**
   * 📝 STEP 3: Implement Form Submission Handler
   * ----------------------------------------------------------------------------
   * 🛠️ WHAT TO DO:
   *    1. Call `e.preventDefault()` to stop the browser's native page reload.
   *    2. Execute `validate()`.
   *    3. If valid:
   *       - Dispatch `onSubmitReview({ rating, headline, commentary })`.
   *       - Reset form fields: `setHeadline('')`, `setCommentary('')`, `setErrors({})`.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Call validate() and dispatch onSubmitReview with sanitized inputs if valid.
    if (validate()) {
      onSubmitReview({ rating, headline, commentary });
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
      <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>Write a Client Review</h3>

      <div>
        <label htmlFor="review-rating" style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>
          Rating: {rating} ★
        </label>
        <input
          id="review-rating"
          type="range"
          min="1"
          max="5"
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        {errors.rating && <span style={{ color: 'var(--color-danger, #ef4444)', fontSize: '0.85em' }}>{errors.rating}</span>}
      </div>

      <div>
        <label htmlFor="review-headline" style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Headline</label>
        <input
          id="review-headline"
          type="text"
          value={headline}
          onChange={e => setHeadline(e.target.value)}
          placeholder="Summarize your experience (e.g. Exceptional craftsmanship)"
          style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color, #e4e4e7)' }}
        />
        {errors.headline && <span style={{ color: 'var(--color-danger, #ef4444)', fontSize: '0.85em' }}>{errors.headline}</span>}
      </div>

      <div>
        <label htmlFor="review-commentary" style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Commentary</label>
        <textarea
          id="review-commentary"
          rows={4}
          value={commentary}
          onChange={e => setCommentary(e.target.value)}
          placeholder="Share details on fit, texture, and presentation (minimum 20 characters)..."
          style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color, #e4e4e7)' }}
        />
        {errors.commentary && <span style={{ color: 'var(--color-danger, #ef4444)', fontSize: '0.85em' }}>{errors.commentary}</span>}
      </div>

      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem' }}>
        Submit Client Review
      </button>
    </form>
  );
};
