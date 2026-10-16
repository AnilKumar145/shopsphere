/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-05B — Financial Price Breakdown UI Component
 * Module 5: State Management with TypeScript (Units 5.2, 5.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Display subtotal, tiered discounts, sales tax, shipping fee,
 *    and complimentary delivery threshold progress meter.
 * 📁 Reference: shopsphere-solution/src/components/common/PriceBreakdown.tsx
 * ============================================================================
 */

/**
 * Shared Price Breakdown Presentation Component
 * Demonstrates Module 3: Components & Props, Module 4: Rendering & Styling, Module 5: Derived State
 */

import React from 'react';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { OrderFinancialBreakdown } from '../../utils/pricingEngine';
import { formatCurrency } from '../../utils/formatters';
import './PriceBreakdown.css';

export interface PriceBreakdownProps {
  readonly financials: OrderFinancialBreakdown;
  readonly showFreeShippingMeter?: boolean;
  readonly className?: string;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  financials,
  showFreeShippingMeter = true,
  className = '',
}) => {
  return (
    <div className={`price-breakdown ${className}`}>
      {showFreeShippingMeter && (
        <div className="price-breakdown__shipping-meter">
          <div className="shipping-meter__header">
            <Truck size={16} />
            {financials.qualifiedForFreeShipping ? (
              <span className="shipping-meter__qualified">Complimentary Express Shipping Qualified</span>
            ) : (
              <span>
                Add <strong>{formatCurrency(financials.amountNeededForFreeShipping)}</strong> more for complimentary delivery
              </span>
            )}
          </div>
          <div className="shipping-meter__track">
            <div
              className="shipping-meter__progress"
              style={{
                width: `${Math.min(100, (financials.subtotal / 150) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      <div className="price-breakdown__rows">
        <div className="price-breakdown__row">
          <span>Merchandise Subtotal</span>
          <span>{formatCurrency(financials.subtotal)}</span>
        </div>

        {financials.volumeDiscountAmount > 0 && (
          <div className="price-breakdown__row price-breakdown__row--savings">
            <span className="price-breakdown__tier-label">
              <Sparkles size={14} />
              {financials.tierName} (-{financials.volumeDiscountPercentage}%)
            </span>
            <span>-{formatCurrency(financials.volumeDiscountAmount)}</span>
          </div>
        )}

        {financials.promoDiscountAmount > 0 && (
          <div className="price-breakdown__row price-breakdown__row--savings">
            <span>Promotional Voucher Applied</span>
            <span>-{formatCurrency(financials.promoDiscountAmount)}</span>
          </div>
        )}

        <div className="price-breakdown__row">
          <span>Estimated Sales Tax (8.25%)</span>
          <span>{formatCurrency(financials.estimatedTax)}</span>
        </div>

        <div className="price-breakdown__row">
          <span>Delivery & Handling</span>
          <span>{financials.shippingCost === 0 ? 'COMPLIMENTARY' : formatCurrency(financials.shippingCost)}</span>
        </div>

        <div className="price-breakdown__divider" />

        <div className="price-breakdown__row price-breakdown__row--total">
          <span>Total Investment</span>
          <span className="price-breakdown__grand-total">{formatCurrency(financials.grandTotal)}</span>
        </div>
      </div>

      <div className="price-breakdown__footer">
        <ShieldCheck size={14} />
        <span>Insured Courier Delivery & Authenticity Certificate Included</span>
      </div>
    </div>
  );
};
