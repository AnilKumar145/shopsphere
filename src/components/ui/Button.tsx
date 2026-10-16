/**
 * Reusable Button Component
 * Demonstrates 3.2 (Component Props), 3.4 (Return Types), 3.5 (Reusable Components)
 */

import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isFullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      isFullWidth = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ): React.JSX.Element => {
    const classNames = [
      'ui-button',
      `ui-button--${variant}`,
      `ui-button--${size}`,
      isFullWidth ? 'ui-button--full' : '',
      isLoading ? 'ui-button--loading' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classNames}
        {...props}
      >
        {isLoading && (
          <span className="ui-button__spinner" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="ui-button__icon ui-button__icon--left">{leftIcon}</span>
        )}
        <span className="ui-button__content">{children}</span>
        {!isLoading && rightIcon && (
          <span className="ui-button__icon ui-button__icon--right">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
