/**
 * Reusable Accessible Form Select
 * Demonstrates 6.3 Select Events, 6.7 Reusable Form Controls, 7.7 useId
 */

import React, { SelectHTMLAttributes, useId, forwardRef } from 'react';
import './FormElements.css';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: readonly SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, id, required, className = '', ...props }, ref): React.JSX.Element => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const errorId = `${selectId}-error`;

    return (
      <div className={`form-field ${error ? 'form-field--error' : ''} ${className}`}>
        {label && (
          <label htmlFor={selectId} className="form-field__label">
            {label}
            {required && <span className="form-field__required"> *</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="form-field__input form-field__select"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={errorId} className="form-field__error-msg" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && <p className="form-field__helper-text">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
