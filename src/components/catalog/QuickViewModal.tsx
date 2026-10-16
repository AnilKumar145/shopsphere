/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12A — Accessible Quick View Modal Dialog
 * Module 12: Advanced Component Design Patterns (Units 12.1, 12.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Build an accessible quick-view product dialog overlay with
 *    keyboard dismissal, trapped focus, and streamlined add-to-bag action.
 * 📖 Reference Spec: change-requests/CR-12A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/catalog/QuickViewModal.tsx
 * ============================================================================
 */

import React from 'react';
import { X, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency, formatCategoryName } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { StarRating } from '../ui/StarRating';
import { Button } from '../ui/Button';
import './QuickViewModal.css';

export interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * 📝 STEP 1: Conditional Mounting Guard
 * 📝 STEP 2: Dialog Backdrop & Container Overlay
 * 📝 STEP 3: Product Detail Content (Title, Price, Description, Rating)
 * 📝 STEP 4: Action Buttons (Add to Bag, Wishlist, Full Details Link)
 */
export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  if (!isOpen || !product) {
    return null;
  }

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="quick-view-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <div className="quick-view-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="quick-view-close"
          onClick={onClose}
          aria-label="Close Quick View"
        >
          <X size={20} />
        </button>

        <div className="quick-view-grid">
          <div className="quick-view-image-container">
            <img src={product.image} alt={product.title} className="quick-view-image" />
          </div>

          <div className="quick-view-details">
            <span className="quick-view-category">{formatCategoryName(product.category)}</span>
            <h2 id="quick-view-title" className="quick-view-title">{product.title}</h2>
            
            <div className="quick-view-rating">
              <StarRating rating={product.rating?.rate || 0} />
            </div>

            <div className="quick-view-price">
              {formatCurrency(product.price)}
            </div>

            <p className="quick-view-description">{product.description}</p>

            <div className="quick-view-actions">
              <Button
                variant="primary"
                onClick={() => {
                  addItem(product);
                  onClose();
                }}
                className="quick-view-add-btn"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </Button>

              <button
                type="button"
                className={`quick-view-wishlist-btn ${isFavorited ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link to={`/products/${product.id}`} onClick={onClose} className="quick-view-full-details">
              View Complete Product Details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
