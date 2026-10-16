/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-04B — Dual-Mode Catalog List Row Presentation
 * Module 4: Rendering and Styling in React with TypeScript (Units 4.2, 4.3, 4.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct a responsive horizontal product card for list view.
 * 📁 Reference: shopsphere-solution/src/features/catalog/components/ProductListRow.tsx
 * ============================================================================
 */

/**
 * Product List Row Component (Horizontal List View Layout)
 * Demonstrates Module 3: Components & Props, Module 4: Rendering Lists
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye, Heart } from 'lucide-react';
import { Product } from '../../../types';
import { formatCategoryName, formatCurrency } from '../../../utils/formatters';
import { Button } from '../../../components/ui/Button';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuth } from '../../../context/AuthContext';
import { useAppDispatch } from '../../../store';
import { addToast } from '../../../store/slices/preferencesSlice';
import './ProductListRow.css';

export interface ProductListRowProps {
  readonly product: Product;
  readonly onQuickView?: (product: Product) => void;
}

export const ProductListRow: React.FC<ProductListRowProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const isAdmin = user?.role === 'admin';

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    dispatch(
      addToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${product.title.slice(0, 30)}... added to your bag.`,
      })
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    dispatch(
      addToast({
        type: 'info',
        title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: isFavorited ? 'Removed from saved pieces.' : 'Added to your private wishlist.',
      })
    );
  };

  return (
    <article className="product-list-row">
      <div className="product-list-row__image-container">
        <Link to={`/products/${product.id}`} className="product-list-row__image-link">
          <img
            src={product.image}
            alt={product.title}
            className="product-list-row__image"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-list-row__content">
        <div className="product-list-row__header">
          <span className="product-list-row__category">{formatCategoryName(product.category)}</span>
          <div className="product-list-row__rating">
            <Star size={13} fill="#d97706" color="#d97706" />
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="product-list-row__review-count">({product.rating.count})</span>
          </div>
        </div>

        <h3 className="product-list-row__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>

        <p className="product-list-row__description">{product.description}</p>
      </div>

      <div className="product-list-row__actions-pane">
        <div className="product-list-row__price">{formatCurrency(product.price)}</div>

        <div className="product-list-row__buttons">
          {!isAdmin ? (
            <>
              <Button
                variant="primary"
                size="sm"
                isFullWidth
                onClick={handleAddToCart}
                leftIcon={<ShoppingBag size={14} />}
              >
                Add to Bag
              </Button>

              <div className="product-list-row__secondary-btns">
                {onQuickView && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuickView(product)}
                    leftIcon={<Eye size={14} />}
                  >
                    Quick View
                  </Button>
                )}
                <button
                  type="button"
                  className={`product-list-row__wishlist-btn ${isFavorited ? 'product-list-row__wishlist-btn--active' : ''}`}
                  onClick={handleToggleWishlist}
                  aria-label={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
                >
                  <Heart size={16} fill={isFavorited ? '#dc2626' : 'none'} color={isFavorited ? '#dc2626' : 'currentColor'} />
                </button>
              </div>
            </>
          ) : (
            <Link to="/admin" className="ui-button ui-button--outline ui-button--sm" style={{ width: '100%', textAlign: 'center' }}>
              Manage in Portal
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
