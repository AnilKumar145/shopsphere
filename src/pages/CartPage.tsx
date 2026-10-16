/**
 * Shopping Bag & Cart Route
 * Demonstrates 5.4 Array State, 5.7 Derived State, 10.3 Context with Reducers, 12.7 Portals (Modal Confirmation)
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCategoryName, formatCurrency } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './CartPage.css';

export const CartPage: React.FC = () => {
  useDocumentTitle('Shopping Bag');
  const { user } = useAuth();
  const { items, totals, updateQuantity, removeItem, clearCart } = useCart();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const navigate = useNavigate();

  if (user?.role === 'admin') {
    return (
      <div className="cart-empty-page container">
        <div className="cart-empty-card" style={{ borderColor: 'var(--color-accent)' }}>
          <div className="cart-empty-icon" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
            <ShieldAlert size={48} />
          </div>
          <h1 className="cart-empty-title">Customer Shopping Feature</h1>
          <p className="cart-empty-desc">
            You are currently authenticated as an <strong>Administrator</strong>. Shopping bag and checkout operations are strictly reserved for customer accounts.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/admin" className="ui-button ui-button--primary ui-button--lg">
              <span>Go to Admin Portal</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleClearConfirm = () => {
    clearCart();
    setIsClearModalOpen(false);
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty-page container">
        <div className="cart-empty-card">
          <div className="cart-empty-icon">
            <ShoppingBag size={48} />
          </div>
          <h1 className="cart-empty-title">Your Bag is Empty</h1>
          <p className="cart-empty-desc">
            Explore our curated catalog of apparel, fine jewelry, and contemporary electronics to discover distinctive objects.
          </p>
          <Link to="/products" className="ui-button ui-button--primary ui-button--lg">
            <span>Explore Collection</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  const freeShippingProgress = Math.min(
    100,
    Math.round((totals.subtotal / 75) * 100)
  );

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header */}
        <div className="cart-header">
          <div>
            <span className="section-eyebrow">Review Order</span>
            <h1 className="cart-title">Shopping Bag</h1>
          </div>
          <button
            type="button"
            className="cart-clear-btn"
            onClick={() => setIsClearModalOpen(true)}
          >
            <Trash2 size={15} />
            <span>Empty Bag</span>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="shipping-meter">
          <div className="shipping-meter__text">
            {totals.isEligibleForFreeShipping ? (
              <span className="shipping-meter__success">
                <Truck size={16} /> You qualify for complimentary standard shipping!
              </span>
            ) : (
              <span>
                Add <strong>{formatCurrency(totals.amountNeededForFreeShipping)}</strong> more to unlock complimentary shipping.
              </span>
            )}
          </div>
          <div className="shipping-meter__bar">
            <div
              className="shipping-meter__fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Layout Grid */}
        <div className="cart-grid">
          {/* Cart Items List */}
          <div className="cart-items-col">
            <ul className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <Link to={`/products/${product.id}`} className="cart-item__image-link">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="cart-item__image"
                    />
                  </Link>

                  <div className="cart-item__details">
                    <div className="cart-item__header">
                      <div>
                        <span className="cart-item__category">
                          {formatCategoryName(product.category)}
                        </span>
                        <h3 className="cart-item__title">
                          <Link to={`/products/${product.id}`}>{product.title}</Link>
                        </h3>
                      </div>
                      <span className="cart-item__price">
                        {formatCurrency(product.price * quantity)}
                      </span>
                    </div>

                    <div className="cart-item__footer">
                      {/* Quantity Controls */}
                      <div className="cart-item__quantity-box">
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="cart-qty-count">{quantity}</span>
                        <button
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-item__remove-btn"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.title} from bag`}
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-continue-wrap">
              <Link to="/products" className="cart-continue-link">
                <ArrowLeft size={16} />
                <span>Continue Exploring</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="cart-summary-col">
            <div className="order-summary-card">
              <h2 className="order-summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Items Subtotal ({totals.itemCount})</span>
                <span>{formatCurrency(totals.subtotal)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {totals.shippingFee === 0 ? (
                    <strong className="free-shipping-text">FREE</strong>
                  ) : (
                    formatCurrency(totals.shippingFee)
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatCurrency(totals.estimatedTax)}</span>
              </div>

              <div className="summary-divider" />

              <div className="summary-row summary-row--total">
                <span>Estimated Total</span>
                <span>{formatCurrency(totals.total)}</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                isFullWidth
                onClick={() => navigate('/checkout')}
                rightIcon={<ArrowRight size={18} />}
                style={{ marginTop: '1.5rem' }}
              >
                Proceed to Checkout
              </Button>

              <div className="summary-assurances">
                <div className="summary-assurance">
                  <ShieldCheck size={16} className="summary-assurance-icon" />
                  <span>30-Day Effortless Returns Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Emptying Bag (12.7 Portals) */}
      <Modal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        title="Empty Shopping Bag"
        description="Are you certain you wish to remove all pieces from your current shopping bag?"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsClearModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleClearConfirm}>
              Yes, Empty Bag
            </Button>
          </>
        }
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
          This will remove {totals.itemCount} items from your current session. This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
};
