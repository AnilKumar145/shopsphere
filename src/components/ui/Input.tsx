/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-06C — Reusable Accessible Form Input
 * Module 6: Forms & User Input in React with TypeScript (Units 6.4, 6.7, 7.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Create a polymorphic forwardRef input component integrating
 *    useId for accessible labels, left/right icon slots, and error feedback.
 * 📖 Reference Spec: change-requests/CR-06C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/ui/Input.tsx
 * ============================================================================
 */

import React, { InputHTMLAttributes, useId, forwardRef } from 'react';
import './FormElements.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * 📝 STEP 1: Generate Unique ID using useId()
 * 📝 STEP 2: Render Label element linked via htmlFor={inputId}
 * 📝 STEP 3: Slot Left & Right Icons inside Input Wrapper
 * 📝 STEP 4: Render Error and Helper Text below Input
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className = '',
      disabled,
      ...restProps
    },
    ref
  ) => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
        )}

        <div className="input-wrapper">
          {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`form-input ${leftIcon ? 'form-input--has-left-icon' : ''} ${
              rightIcon ? 'form-input--has-right-icon' : ''
            }`}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...restProps}
          />

          {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
        </div>

        {error && (
          <span id={`${inputId}-error`} className="form-error-text" role="alert">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${inputId}-helper`} className="form-helper-text">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
