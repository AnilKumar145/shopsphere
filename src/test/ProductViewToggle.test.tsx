import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductViewToggle } from '../components/catalog/ProductViewToggle';

describe('ProductViewToggle Component', () => {
  it('renders grid and list toggle buttons', () => {
    const handleChange = vi.fn();
    render(<ProductViewToggle mode="grid" onChange={handleChange} />);

    const gridBtn = screen.getByLabelText(/grid view layout/i);
    const listBtn = screen.getByLabelText(/list view layout/i);

    expect(gridBtn).toBeInTheDocument();
    expect(listBtn).toBeInTheDocument();
    expect(gridBtn).toHaveAttribute('aria-pressed', 'true');
    expect(listBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange callback with "list" when list button is clicked', () => {
    const handleChange = vi.fn();
    render(<ProductViewToggle mode="grid" onChange={handleChange} />);

    const listBtn = screen.getByLabelText(/list view layout/i);
    fireEvent.click(listBtn);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('list');
  });

  it('calls onChange callback with "grid" when grid button is clicked', () => {
    const handleChange = vi.fn();
    render(<ProductViewToggle mode="list" onChange={handleChange} />);

    const gridBtn = screen.getByLabelText(/grid view layout/i);
    fireEvent.click(gridBtn);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith('grid');
  });
});
