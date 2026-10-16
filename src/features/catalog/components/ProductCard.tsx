/**
 * Product Card Component
 * Demonstrates 3.5 Reusable Components, 4.4 Styling, 13.2 Component Memoization (React.memo)
 */

import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Edit, Eye } from 'lucide-react';
import { Product } from '../../../types';
import { formatCategoryName, formatCurrency } from '../../../utils/formatters';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuth } from '../../../context/AuthContext';
import { useAppDispatch } from '../../../store';
import { addToast } from '../../../store/slices/preferencesSlice';
import './ProductCard.css';

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard = memo<ProductCardProps>(({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    dispatch(
      addToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${product.title.slice(0, 32)}... has been added to your shopping bag.`,
      })
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    dispatch(
      addToast({
        type: 'info',
        title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: isFavorited
          ? `Item removed from your saved pieces.`
          : `Item saved to your wishlist.`,
      })
    );
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__link">
        <div className="product-card__image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-card__image"
            loading="lazy"
            onError={(e) => {
              // Fallback to graceful placeholder if external image URL is blocked
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80';
            }}
          />
          {/* Quick View Button */}
          {onQuickView && (
            <button
              type="button"
              className="product-card__quickview-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.title}`}
              title="Quick View"
            >
              <Eye size={16} />
            </button>
          )}

          {/* Wishlist button (Customer only) */}
          {!isAdmin && (
            <button
              type="button"
              className={`product-card__wishlist-btn ${
                isFavorited ? 'product-card__wishlist-btn--active' : ''
              }`}
              onClick={handleToggleWishlist}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>

        <div className="product-card__body">
          <div className="product-card__meta">
            <span className="product-card__category">
              {formatCategoryName(product.category)}
            </span>
            {product.rating && (
              <div className="product-card__rating" title={`Rated ${product.rating.rate} out of 5`}>
                <Star size={13} fill="currentColor" />
                <span>{product.rating.rate}</span>
                <span className="product-card__rating-count">({product.rating.count})</span>
              </div>
            )}
          </div>

          <h3 className="product-card__title" title={product.title}>
            {product.title}
          </h3>

          <div className="product-card__footer">
            <span className="product-card__price">{formatCurrency(product.price)}</span>
            {isAdmin ? (
              <span
                className="product-card__add-btn"
                style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-accent)' }}
              >
                <Edit size={14} />
                <span>Manage</span>
              </span>
            ) : (
              <button
                type="button"
                className="product-card__add-btn"
                onClick={handleAddToCart}
                aria-label={`Add ${product.title} to bag`}
              >
                <ShoppingBag size={16} />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';
