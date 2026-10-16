/**
 * Wishlist / Saved Items Route
 * Demonstrates 5.4 Array State, 7.4 useContext, 10.2 Context API
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight, Shield } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { formatCategoryName, formatCurrency } from '../utils/formatters';
import { Button } from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useAppDispatch } from '../store';
import { addToast } from '../store/slices/preferencesSlice';
import './WishlistPage.css';

export const WishlistPage: React.FC = () => {
  useDocumentTitle('Saved Pieces');
  const { user } = useAuth();
  const { items, removeFromWishlist, moveToCart, clearWishlist, count } = useWishlist();
  const dispatch = useAppDispatch();

  if (user?.role === 'admin') {
    return (
      <div className="wishlist-empty-page container">
        <div className="wishlist-empty-card" style={{ maxWidth: 540 }}>
          <div className="wishlist-empty-icon" style={{ background: 'rgba(230, 81, 0, 0.12)', color: '#d97706' }}>
            <Shield size={44} />
          </div>
          <h1 className="wishlist-empty-title">Administrator Persona</h1>
          <p className="wishlist-empty-desc">
            Personal curation archives and consumer wishlists are disabled for the Administrator account.
            Store management, inventory controls, and order dispatching are handled in the Admin Portal.
          </p>
          <Link to="/admin" className="ui-button ui-button--primary ui-button--lg">
            <Shield size={18} />
            <span>Open Admin Control Portal</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleMoveToCart = (product: (typeof items)[0]['product']) => {
    moveToCart(product);
    dispatch(
      addToast({
        type: 'success',
        title: 'Moved to Bag',
        message: `${product.title.slice(0, 30)}... moved from wishlist to bag.`,
      })
    );
  };

  if (count === 0) {
    return (
      <div className="wishlist-empty-page container">
        <div className="wishlist-empty-card">
          <div className="wishlist-empty-icon">
            <Heart size={44} />
          </div>
          <h1 className="wishlist-empty-title">Your Wishlist is Empty</h1>
          <p className="wishlist-empty-desc">
            Save exceptional pieces while browsing our collections to revisit or acquire them later.
          </p>
          <Link to="/products" className="ui-button ui-button--primary ui-button--lg">
            <span>Discover Pieces</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <div className="wishlist-header">
          <div>
            <span className="section-eyebrow">Personal Archive</span>
            <h1 className="wishlist-title">Saved Pieces</h1>
            <p className="wishlist-count">
              You have {count} {count === 1 ? 'item' : 'items'} saved in your archive.
            </p>
          </div>
          <button
            type="button"
            className="wishlist-clear-btn"
            onClick={clearWishlist}
          >
            <Trash2 size={15} />
            <span>Clear Archive</span>
          </button>
        </div>

        <div className="wishlist-grid">
          {items.map(({ product, addedAt }) => (
            <div key={product.id} className="wishlist-card">
              <div className="wishlist-card__image-wrap">
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="wishlist-card__image"
                  />
                </Link>
                <button
                  type="button"
                  className="wishlist-card__remove"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.title} from wishlist`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="wishlist-card__body">
                <span className="wishlist-card__category">
                  {formatCategoryName(product.category)}
                </span>
                <h3 className="wishlist-card__title">
                  <Link to={`/products/${product.id}`}>{product.title}</Link>
                </h3>
                <span className="wishlist-card__price">{formatCurrency(product.price)}</span>

                <div className="wishlist-card__actions">
                  <Button
                    variant="primary"
                    size="sm"
                    isFullWidth
                    onClick={() => handleMoveToCart(product)}
                    leftIcon={<ShoppingBag size={14} />}
                  >
                    Move to Bag
                  </Button>
                </div>
                <span className="wishlist-card__date">
                  Added on {new Date(addedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
