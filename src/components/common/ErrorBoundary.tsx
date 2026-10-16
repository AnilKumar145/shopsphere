/**
 * Class-based Error Boundary with type-safe state and props
 * Demonstrates 12.6 Error Boundaries: Error Handling, Fallback UI, Error Boundary Components
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackMessage?: string;
  fallbackRender?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallbackRender) {
        return this.props.fallbackRender(this.state.error, this.handleReset);
      }

      return (
        <div
          role="alert"
          style={{
            padding: '2.5rem',
            margin: '2rem auto',
            maxWidth: '640px',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-error-border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '0.75rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-error-bg)',
              color: 'var(--color-error)',
              marginBottom: '1rem',
            }}
          >
            <AlertTriangle size={32} />
          </div>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '0.5rem' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
            {this.props.fallbackMessage ||
              this.state.error.message ||
              'An unexpected error occurred while rendering this component.'}
          </p>
          <Button
            variant="primary"
            onClick={this.handleReset}
            leftIcon={<RotateCcw size={16} />}
          >
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
