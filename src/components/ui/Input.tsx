/**
 * Reusable Accessible Form Input
 * Demonstrates 6.4 Controlled Components, 6.7 Reusable Form Components, 7.7 useId
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
      required,
      disabled,
      ...props
    },
    ref
  ): React.JSX.Element => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={inputId} className="form-field__label">
            {label}
            {required && <span className="form-field__required" aria-hidden="true"> *</span>}
          </label>
        )}
        <div className="form-field__input-wrapper">
          {leftIcon && <span className="form-field__icon form-field__icon--left">{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`form-field__input ${leftIcon ? 'form-field__input--has-left' : ''} ${
              rightIcon ? 'form-field__input--has-right' : ''
            }`}
            {...props}
          />
          {rightIcon && <span className="form-field__icon form-field__icon--right">{rightIcon}</span>}
        </div>
        {error && (
          <p id={errorId} className="form-field__error-msg" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="form-field__helper-text">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
