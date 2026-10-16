/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-06B — Checkout Form Validation & Luhn Card Algorithm
 * Module 6: Events and Forms with TypeScript (Units 6.3, 6.5, 6.6, 6.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Enforce client-side Luhn checksum card validation, MM/YY expiry
 *    formatting, and CVV checks preventing invalid submission.
 * 📁 Reference: shopsphere-solution/src/pages/CheckoutPage.tsx
 * ============================================================================
 */

/**
 * Multi-Step Checkout Flow
 * Demonstrates 6.2, 6.4 Controlled Components, 6.5 Form Data Modeling, 6.6 Form Validation, 6.8 Advanced Forms
 */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  ArrowLeft,
  Truck,
  CreditCard,
  FileText,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/orderService';
import { PaymentMethod, ShippingAddressInput } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './CheckoutPage.css';

type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review';

export const CheckoutPage: React.FC = () => {
  useDocumentTitle('Secure Checkout');
  const { items, totals, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSimulationFail, setPaymentSimulationFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State: Shipping Address
  const [addressData, setAddressData] = useState<ShippingAddressInput>({
    fullName: user ? `${user.name.firstname} ${user.name.lastname}` : 'John Doe',
    email: user ? user.email : 'john@gmail.com',
    addressLine1: user?.address ? `${user.address.number} ${user.address.street}` : '7682 New Road',
    city: user?.address?.city || 'Kilcoole',
    stateOrProvince: 'Dublin',
    postalCode: user?.address?.zipcode || '12926',
    country: 'United States',
    phone: user?.phone || '1-570-236-7033',
  });

  // Shipping Method
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<'standard' | 'express'>('standard');
  const shippingCost = selectedShippingMethod === 'express' ? 19.99 : totals.shippingFee;
  const finalTotal = Math.round((totals.subtotal + shippingCost + totals.estimatedTax) * 100) / 100;

  // Form State: Payment Simulation
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [cardholderName, setCardholderName] = useState(addressData.fullName);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');

  // Validation Errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  if (user?.role === 'admin') {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '560px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '1rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent-light)',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}
          >
            <ShieldAlert size={40} />
          </div>
          <h2 style={{ fontSize: 'var(--text-2xl)', fontFamily: 'var(--font-serif)', marginBottom: '0.75rem' }}>
            Administrator Session Active
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: '1.5rem', lineHeight: 'var(--leading-relaxed)' }}>
            Checkout and payment transactions are designated exclusively for customer accounts. Administrator accounts manage catalog inventory and monitor orders.
          </p>
          <Link to="/admin" className="ui-button ui-button--primary ui-button--lg">
            Return to Admin Portal
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Your Bag is Empty</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          Please add products to your shopping bag before proceeding to checkout.
        </p>
        <Link to="/products" className="ui-button ui-button--primary">
          Explore Products
        </Link>
      </div>
    );
  }

  const validateAddress = (): boolean => {
    const errors: Record<string, string> = {};
    if (!addressData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!addressData.email.trim() || !addressData.email.includes('@')) errors.email = 'Valid email is required';
    if (!addressData.addressLine1.trim()) errors.addressLine1 = 'Street address is required';
    if (!addressData.city.trim()) errors.city = 'City is required';
    if (!addressData.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!addressData.country.trim()) errors.country = 'Country is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

    /**
   * 📝 STEP 1: Implement Payment Method & Card Number Validation
   * ----------------------------------------------------------------------------
   * 🛠️ WHAT TO DO:
   *    Validate payment fields:
   *    1. Require non-empty cardholderName.
   *    2. Verify cardNumber has at least 16 digits and meets basic checksum rules.
   *    3. Verify expiration date format (MM/YY).
   *    4. Verify CVV is 3 or 4 digits.
   */
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
const validatePayment = (): boolean => {
    if (paymentMethod === PaymentMethod.DEMO_INVOICE) return true;
    const errors: Record<string, string> = {};
    if (!cardholderName.trim()) errors.cardholderName = 'Cardholder name is required';
    if (!cardNumber.trim()) errors.cardNumber = 'Card number is required';
    if (!expiry.trim()) errors.expiry = 'Expiry is required';
    if (!cvv.trim()) errors.cvv = 'CVV is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    setErrorMessage(null);
    if (currentStep === 'address') {
      if (!validateAddress()) return;
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      if (!validatePayment()) return;
      setCurrentStep('review');
    }
  };

  const handlePreviousStep = () => {
    setErrorMessage(null);
    if (currentStep === 'shipping') setCurrentStep('address');
    if (currentStep === 'payment') setCurrentStep('shipping');
    if (currentStep === 'review') setCurrentStep('payment');
  };

  // Duplicate Submission Prevention & Simulated Payment
  const handleFinalOrderSubmit = async () => {
    if (isSubmitting) return; // Prevent duplicate submission
    setIsSubmitting(true);
    setErrorMessage(null);

    // Simulate payment processing latency
    await new Promise((res) => setTimeout(res, 1200));

    // Simulated error check
    if (paymentSimulationFail) {
      setIsSubmitting(false);
      setErrorMessage(
        'Simulated Payment Failure: Your demo card was declined by the simulated gateway. Uncheck "Simulate Payment Failure" to proceed.'
      );
      return;
    }

    try {
      // Record simulated order
      const newOrder = orderService.createOrder({
        items: items.map((i) => ({
          productId: i.product.id,
          title: i.product.title,
          price: i.product.price,
          image: i.product.image,
          quantity: i.quantity,
        })),
        subtotal: totals.subtotal,
        shippingFee: shippingCost,
        estimatedTax: totals.estimatedTax,
        total: finalTotal,
        shippingAddress: addressData,
        paymentMethod,
        userId: user?.id,
      });

      // Clear cart
      clearCart();

      // Navigate to order confirmation
      navigate(`/order-confirmation/${newOrder.id}`, { replace: true });
    } catch {
      setIsSubmitting(false);
      setErrorMessage('An unexpected error occurred while placing your order.');
    }
  };

  const stepsList = [
    { id: 'address', label: '1. Shipping Address' },
    { id: 'shipping', label: '2. Delivery Method' },
    { id: 'payment', label: '3. Simulated Payment' },
    { id: 'review', label: '4. Final Review' },
  ];

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Progress Bar */}
        <div className="checkout-progress">
          {stepsList.map((step, idx) => (
            <div
              key={step.id}
              className={`checkout-progress__step ${
                currentStep === step.id ? 'checkout-progress__step--active' : ''
              } ${
                idx < stepsList.findIndex((s) => s.id === currentStep)
                  ? 'checkout-progress__step--completed'
                  : ''
              }`}
            >
              <span className="checkout-progress__label">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="checkout-alert checkout-alert--error" role="alert">
            <AlertTriangle size={20} className="checkout-alert__icon" />
            <div style={{ flex: 1 }}>
              <strong>Payment Simulation Notice</strong>
              <p>{errorMessage}</p>
              {paymentSimulationFail && (
                <div style={{ marginTop: '0.75rem' }}>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setPaymentSimulationFail(false);
                      setErrorMessage(null);
                    }}
                  >
                    Disable Failure Simulation &amp; Try Again
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="checkout-grid">
          {/* Main Checkout Step Content */}
          <div className="checkout-main">
            {/* STEP 1: Address */}
            {currentStep === 'address' && (
              <div className="checkout-panel">
                <h2 className="checkout-panel__title">Delivery Address</h2>
                <div className="form-grid">
                  <Input
                    label="Full Recipient Name"
                    required
                    value={addressData.fullName}
                    onChange={(e) =>
                      setAddressData({ ...addressData, fullName: e.target.value })
                    }
                    error={fieldErrors.fullName}
                  />

                  <Input
                    label="Email for Dispatch Notifications"
                    type="email"
                    required
                    value={addressData.email}
                    onChange={(e) =>
                      setAddressData({ ...addressData, email: e.target.value })
                    }
                    error={fieldErrors.email}
                  />

                  <Input
                    label="Street Address"
                    required
                    value={addressData.addressLine1}
                    onChange={(e) =>
                      setAddressData({ ...addressData, addressLine1: e.target.value })
                    }
                    error={fieldErrors.addressLine1}
                  />

                  <Input
                    label="City"
                    required
                    value={addressData.city}
                    onChange={(e) =>
                      setAddressData({ ...addressData, city: e.target.value })
                    }
                    error={fieldErrors.city}
                  />

                  <Input
                    label="Postal / Zip Code"
                    required
                    value={addressData.postalCode}
                    onChange={(e) =>
                      setAddressData({ ...addressData, postalCode: e.target.value })
                    }
                    error={fieldErrors.postalCode}
                  />

                  <Input
                    label="Country / Region"
                    required
                    value={addressData.country}
                    onChange={(e) =>
                      setAddressData({ ...addressData, country: e.target.value })
                    }
                    error={fieldErrors.country}
                  />

                  <Input
                    label="Phone Number"
                    value={addressData.phone}
                    onChange={(e) =>
                      setAddressData({ ...addressData, phone: e.target.value })
                    }
                  />
                </div>

                <div className="checkout-actions">
                  <Link to="/cart" className="checkout-back-btn">
                    <ArrowLeft size={16} /> Return to Bag
                  </Link>
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    Continue to Delivery
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Shipping Method */}
            {currentStep === 'shipping' && (
              <div className="checkout-panel">
                <h2 className="checkout-panel__title">Select Delivery Option</h2>
                <div className="shipping-options">
                  <label
                    className={`shipping-card ${
                      selectedShippingMethod === 'standard' ? 'shipping-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={selectedShippingMethod === 'standard'}
                      onChange={() => setSelectedShippingMethod('standard')}
                    />
                    <div className="shipping-card__info">
                      <Truck size={20} className="shipping-card__icon" />
                      <div>
                        <strong>Standard Ground Delivery</strong>
                        <p>3-5 business days via carbon-neutral transit</p>
                      </div>
                    </div>
                    <span className="shipping-card__cost">
                      {totals.shippingFee === 0 ? 'FREE' : formatCurrency(totals.shippingFee)}
                    </span>
                  </label>

                  <label
                    className={`shipping-card ${
                      selectedShippingMethod === 'express' ? 'shipping-card--active' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingOption"
                      checked={selectedShippingMethod === 'express'}
                      onChange={() => setSelectedShippingMethod('express')}
                    />
                    <div className="shipping-card__info">
                      <Truck size={20} className="shipping-card__icon" />
                      <div>
                        <strong>Priority Air Express</strong>
                        <p>1-2 business days with signature confirmation</p>
                      </div>
                    </div>
                    <span className="shipping-card__cost">$19.99</span>
                  </label>
                </div>

                <div className="checkout-actions">
                  <button type="button" onClick={handlePreviousStep} className="checkout-back-btn">
                    <ArrowLeft size={16} /> Back to Address
                  </button>
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Simulated Payment */}
            {currentStep === 'payment' && (
              <div className="checkout-panel">
                <div className="checkout-panel__header">
                  <h2 className="checkout-panel__title">Simulated Payment</h2>
                  <span className="badge badge-subtle">
                    <Lock size={12} /> Sandbox Mode
                  </span>
                </div>

                <p className="payment-disclaimer">
                  This checkout is strictly a simulation for demonstration and curriculum evaluation. No real payment will be charged.
                </p>

                {/* Payment Method Selector */}
                <div className="payment-tabs">
                  <button
                    type="button"
                    className={`payment-tab ${
                      paymentMethod === PaymentMethod.CREDIT_CARD ? 'payment-tab--active' : ''
                    }`}
                    onClick={() => setPaymentMethod(PaymentMethod.CREDIT_CARD)}
                  >
                    <CreditCard size={18} />
                    <span>Demo Credit Card</span>
                  </button>
                  <button
                    type="button"
                    className={`payment-tab ${
                      paymentMethod === PaymentMethod.DEMO_INVOICE ? 'payment-tab--active' : ''
                    }`}
                    onClick={() => setPaymentMethod(PaymentMethod.DEMO_INVOICE)}
                  >
                    <FileText size={18} />
                    <span>Demo Corporate Invoice</span>
                  </button>
                </div>

                {paymentMethod === PaymentMethod.CREDIT_CARD && (
                  <div className="payment-card-inputs">
                    <Input
                      label="Name on Card"
                      required
                      value={cardholderName}
                      onChange={(e) => setCardholderName(e.target.value)}
                      error={fieldErrors.cardholderName}
                    />

                    <Input
                      label="Card Number (Simulated)"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      error={fieldErrors.cardNumber}
                      leftIcon={<CreditCard size={16} />}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <Input
                        label="Expiry (MM/YY)"
                        required
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        error={fieldErrors.expiry}
                      />
                      <Input
                        label="CVV / CVC"
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        error={fieldErrors.cvv}
                      />
                    </div>
                  </div>
                )}

                {/* Failure simulation checkbox to test error recovery */}
                <div className="simulation-toggle">
                  <label className="simulation-toggle__label">
                    <input
                      type="checkbox"
                      checked={paymentSimulationFail}
                      onChange={(e) => setPaymentSimulationFail(e.target.checked)}
                    />
                    <span>Simulate Payment Gateway Failure (to test error recovery)</span>
                  </label>
                </div>

                <div className="checkout-actions">
                  <button type="button" onClick={handlePreviousStep} className="checkout-back-btn">
                    <ArrowLeft size={16} /> Back to Delivery
                  </button>
                  <Button variant="primary" size="lg" onClick={handleNextStep}>
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {currentStep === 'review' && (
              <div className="checkout-panel">
                <h2 className="checkout-panel__title">Review &amp; Place Order</h2>

                <div className="review-section">
                  <div className="review-box">
                    <span className="review-box__label">Shipping To:</span>
                    <p className="review-box__val">
                      {addressData.fullName}
                      <br />
                      {addressData.addressLine1}
                      <br />
                      {addressData.city}, {addressData.postalCode}, {addressData.country}
                    </p>
                  </div>

                  <div className="review-box">
                    <span className="review-box__label">Delivery Method:</span>
                    <p className="review-box__val">
                      {selectedShippingMethod === 'express'
                        ? 'Priority Air Express (1-2 days)'
                        : 'Standard Ground Delivery (3-5 days)'}
                    </p>
                  </div>

                  <div className="review-box">
                    <span className="review-box__label">Payment Instrument:</span>
                    <p className="review-box__val">
                      {paymentMethod === PaymentMethod.CREDIT_CARD
                        ? `Demo Card ending in 4242`
                        : `Corporate Demo Invoice`}
                    </p>
                  </div>
                </div>

                <div className="checkout-actions">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    disabled={isSubmitting}
                    className="checkout-back-btn"
                  >
                    <ArrowLeft size={16} /> Modify Details
                  </button>
                  <Button
                    variant="accent"
                    size="lg"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    onClick={handleFinalOrderSubmit}
                    rightIcon={<CheckCircle2 size={18} />}
                  >
                    Place Simulated Order &bull; {formatCurrency(finalTotal)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="checkout-sidebar">
            <div className="checkout-summary-card">
              <h3 className="checkout-summary__title">Order Summary ({totals.itemCount})</h3>

              <div className="checkout-summary__items">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="checkout-summary__item">
                    <img src={product.image} alt="" className="checkout-summary__item-img" />
                    <div className="checkout-summary__item-info">
                      <p className="checkout-summary__item-title">{product.title}</p>
                      <span className="checkout-summary__item-qty">Qty: {quantity}</span>
                    </div>
                    <span className="checkout-summary__item-price">
                      {formatCurrency(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__row">
                <span>Subtotal</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>Estimated Tax</span>
                <span>{formatCurrency(totals.estimatedTax)}</span>
              </div>

              <div className="checkout-summary__divider" />

              <div className="checkout-summary__row checkout-summary__row--total">
                <span>Total Due</span>
                <span>{formatCurrency(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
