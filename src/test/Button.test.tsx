import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/ui/Button';

describe('Button component (Unit 3.5, 14.3, 14.4)', () => {
  it('renders button text correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('triggers onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables button and shows spinner when isLoading is true', () => {
    render(<Button isLoading>Processing</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('ui-button--loading');
  });

  it('applies variant and size classes correctly', () => {
    render(
      <Button variant="accent" size="lg">
        Accent Large
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('ui-button--accent');
    expect(button).toHaveClass('ui-button--lg');
  });
});
