/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12A — Accessible createPortal Quick View Dialog
 * Module 12: Advanced Component Patterns (Units 12.1, 12.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Render modal dialog outside root DOM using ReactDOM.createPortal
 *    with keyboard Escape listener, focus trapping, and body scroll lock.
 * 📁 Reference: shopsphere-solution/src/components/catalog/QuickViewModal.tsx
 * ============================================================================
 */

/**
 * Quick View Modal Component
 * Demonstrates Module 3: Components & Props, Module 12: Portals & Modals, Module 15: Responsive a11y
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, ShoppingBag, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCategoryName, formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useAppDispatch } from '../../store';
import { addToast } from '../../store/slices/preferencesSlice';
import './QuickViewModal.css';

export interface QuickViewModalProps {
  readonly product: Product | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const isAdmin = user?.role === 'admin';

  // Handle Escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, 1);
    dispatch(
      addToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${product.title.slice(0, 32)}... added to your bag.`,
      })
    );
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    dispatch(
      addToast({
        type: 'info',
        title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: isFavorited ? 'Removed from your archive.' : 'Added to your private wishlist.',
      })
    );
  };

  return createPortal(
    <div className="quickview-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quickview-title">
      <div className="quickview-content" onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <button
          type="button"
          className="quickview-close"
          onClick={onClose}
          aria-label="Close Quick View"
        >
          <X size={20} />
        </button>

        <div className="quickview-grid">
          <div className="quickview-image-pane">
            <img src={product.image} alt={product.title} className="quickview-image" />
          </div>

          <div className="quickview-details-pane">
            <span className="quickview-category">{formatCategoryName(product.category)}</span>
            <h2 id="quickview-title" className="quickview-title">{product.title}</h2>

            <div className="quickview-rating-row">
              <div className="quickview-stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.round(product.rating.rate) ? '#d97706' : 'none'}
                    color={i < Math.round(product.rating.rate) ? '#d97706' : '#d4d4d4'}
                  />
                ))}
              </div>
              <span className="quickview-rating-text">
                {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </span>
            </div>

            <div className="quickview-price">{formatCurrency(product.price)}</div>

            <p className="quickview-description">{product.description}</p>

            <div className="quickview-meta">
              <div className="quickview-meta-item">
                <ShieldCheck size={16} />
                <span>Certified Authentic Luxury Guarantee</span>
              </div>
            </div>

            <div className="quickview-actions">
              {!isAdmin ? (
                <>
                  <Button
                    variant="primary"
                    size="lg"
                    isFullWidth
                    onClick={handleAddToCart}
                    leftIcon={<ShoppingBag size={18} />}
                  >
                    Add to Bag
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleToggleWishlist}
                    aria-label={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                  </Button>
                </>
              ) : (
                <Link to="/admin" className="ui-button ui-button--primary ui-button--lg" style={{ width: '100%' }}>
                  Manage in Admin Portal
                </Link>
              )}
            </div>

            <div className="quickview-footer">
              <Link to={`/products/${product.id}`} className="quickview-view-full" onClick={onClose}>
                <span>View Full Specifications & Provenance</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
