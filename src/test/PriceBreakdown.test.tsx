import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PriceBreakdown } from '../components/common/PriceBreakdown';
import { OrderFinancialBreakdown } from '../utils/pricingEngine';

const mockFinancials: OrderFinancialBreakdown = {
  subtotal: 350.0,
  tierName: 'Prestige Member (10% Tier)',
  volumeDiscountPercentage: 10,
  volumeDiscountAmount: 35.0,
  promoDiscountAmount: 0,
  totalDiscountAmount: 35.0,
  netSubtotal: 315.0,
  estimatedTax: 25.99,
  shippingCost: 0,
  grandTotal: 340.99,
  qualifiedForFreeShipping: true,
  amountNeededForFreeShipping: 0,
};

describe('PriceBreakdown Component', () => {
  it('renders all financial rows correctly with formatted values', () => {
    render(<PriceBreakdown financials={mockFinancials} />);

    expect(screen.getByText(/Merchandise Subtotal/i)).toBeInTheDocument();
    expect(screen.getByText(/\$350\.00/i)).toBeInTheDocument();

    expect(screen.getByText(/Prestige Member/i)).toBeInTheDocument();
    expect(screen.getByText(/-\$35\.00/i)).toBeInTheDocument();

    expect(screen.getByText(/Estimated Sales Tax/i)).toBeInTheDocument();
    expect(screen.getByText(/\$25\.99/i)).toBeInTheDocument();

    expect(screen.getByText(/Delivery & Handling/i)).toBeInTheDocument();
    expect(screen.getAllByText(/COMPLIMENTARY/i).length).toBeGreaterThanOrEqual(1);

    expect(screen.getByText(/Total Investment/i)).toBeInTheDocument();
    expect(screen.getByText(/\$340\.99/i)).toBeInTheDocument();
  });

  it('renders free shipping meter qualification notice when qualified', () => {
    render(<PriceBreakdown financials={mockFinancials} showFreeShippingMeter={true} />);
    expect(screen.getByText(/Complimentary Express Shipping Qualified/i)).toBeInTheDocument();
  });

  it('renders remaining amount for free shipping when under threshold', () => {
    const underThreshold: OrderFinancialBreakdown = {
      ...mockFinancials,
      subtotal: 100,
      qualifiedForFreeShipping: false,
      amountNeededForFreeShipping: 50,
      shippingCost: 12,
    };

    render(<PriceBreakdown financials={underThreshold} showFreeShippingMeter={true} />);
    expect(screen.getByText(/\$50\.00/i)).toBeInTheDocument();
  });
});
