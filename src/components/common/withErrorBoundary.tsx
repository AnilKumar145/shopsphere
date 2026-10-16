/**
 * Higher-Order Component (HOC) Pattern
 * Demonstrates 12.5 Higher-Order Components: Generic Props, Limitations and Alternatives
 */

import React, { ComponentType, ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export interface WithErrorBoundaryOptions {
  fallbackMessage?: string;
  fallbackRender?: (error: Error, reset: () => void) => ReactNode;
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithErrorBoundaryOptions = {}
): React.FC<P> {
  const ComponentWithErrorBoundary: React.FC<P> = (props: P) => {
    return (
      <ErrorBoundary
        fallbackMessage={options.fallbackMessage}
        fallbackRender={options.fallbackRender}
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ComponentWithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`;

  return ComponentWithErrorBoundary;
}
