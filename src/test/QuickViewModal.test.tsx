import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { AuthProvider } from '../context/AuthContext';
import { QuickViewModal } from '../components/catalog/QuickViewModal';
import { Product } from '../types';

const mockProduct: Product = {
  id: 42,
  title: 'Solid Platinum Band',
  price: 890.0,
  description: 'Handcrafted luxury platinum ring with high-polish finish.',
  category: 'jewelery',
  image: 'https://example.com/ring.jpg',
  rating: { rate: 4.9, count: 88 },
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MemoryRouter>{ui}</MemoryRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  );
};

describe('QuickViewModal Component', () => {
  it('does not render anything into DOM when isOpen is false', () => {
    renderWithProviders(<QuickViewModal product={mockProduct} isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText(/Solid Platinum Band/i)).not.toBeInTheDocument();
  });

  it('renders product details and actions when isOpen is true', () => {
    renderWithProviders(<QuickViewModal product={mockProduct} isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByText(/Solid Platinum Band/i)).toBeInTheDocument();
    expect(screen.getByText(/\$890\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Jewelry/i)).toBeInTheDocument();
    expect(screen.getByText(/Add to Bag/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    renderWithProviders(<QuickViewModal product={mockProduct} isOpen={true} onClose={handleClose} />);

    const closeBtn = screen.getByLabelText(/Close Quick View/i);
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
