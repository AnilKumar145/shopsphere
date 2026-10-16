/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-04B — Horizontal Product List Row Presentation
 * Module 4: Dynamic Styling in React (Units 4.3, 4.5, 4.6)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Implement a horizontal row presentation for catalog list view
 *    with responsive collapse on mobile viewports and quick action buttons.
 * 📖 Reference Spec: change-requests/CR-04B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/features/catalog/components/ProductListRow.tsx
 * ============================================================================
 */

import React from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../../types';
import { formatCurrency, formatCategoryName } from '../../../utils/formatters';
import { StarRating } from '../../../components/ui/StarRating';
import { Button } from '../../../components/ui/Button';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import './ProductListRow.css';

export interface ProductListRowProps {
  readonly product: Product;
  readonly onQuickView?: (product: Product) => void;
}

/**
 * 📝 STEP 1: Horizontal Flexbox Container Layout
 * 📝 STEP 2: Render Product Thumbnail, Title, Category, Rating, and Price
 * 📝 STEP 3: Wire Action Handlers (Add to Bag, Quick View, Wishlist)
 */
export const ProductListRow: React.FC<ProductListRowProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Render accessible horizontal product list row:
  return (
    <article className="product-list-row" aria-label={product.title}>
      <div className="product-list-row__image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-list-row__image"
          loading="lazy"
        />
      </div>

      <div className="product-list-row__details">
        <span className="product-list-row__category">
          {formatCategoryName(product.category)}
        </span>
        <h3 className="product-list-row__title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h3>
        <p className="product-list-row__description">{product.description}</p>
        <div className="product-list-row__rating">
          <StarRating rating={product.rating?.rate || 0} size="sm" />
          <span className="product-list-row__review-count">
            ({product.rating?.count || 0})
          </span>
        </div>
      </div>

      <div className="product-list-row__pricing-actions">
        <div className="product-list-row__price">
          {formatCurrency(product.price)}
        </div>

        <div className="product-list-row__actions">
          <Button
            variant="primary"
            size="sm"
            onClick={() => addItem(product)}
            className="product-list-row__btn-add"
          >
            <ShoppingBag size={14} /> Add to Bag
          </Button>

          {onQuickView && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onQuickView(product)}
              aria-label={`Quick view ${product.title}`}
            >
              <Eye size={14} />
            </Button>
          )}

          <button
            type="button"
            className={`product-list-row__wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist(product)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </article>
  );
};
