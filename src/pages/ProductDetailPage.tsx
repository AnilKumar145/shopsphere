import { Sparkles } from 'lucide-react';
import { ConciergeModal } from '../features/concierge/ConciergeModal';
import { convertCurrency } from '../utils/currencyUtils';
import { useAppSelector } from '../store';
/**
 * Product Detail Route
 * Demonstrates 3.3 Composition, 8.4 Route Parameters, 9.4 Data Fetching, 12.3 Compound Components (Accordion)
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Star,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Edit,
  ShieldAlert,
} from 'lucide-react';
import { useProductDetail, useProducts } from '../hooks/useCatalog';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { formatCategoryName, formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useAppDispatch } from '../store';
import { addToast } from '../store/slices/preferencesSlice';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const activeCurrency = useAppSelector((state) => state.preferences.currency);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(1);
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { data: allProducts } = useProducts();

  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const isAdmin = user?.role === 'admin';

  useDocumentTitle(product ? product.title : 'Product Details');

  const isFavorited = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    dispatch(
      addToast({
        type: 'success',
        title: 'Added to Bag',
        message: `${quantity} × ${product.title.slice(0, 30)}... added to your bag.`,
      })
    );
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
    dispatch(
      addToast({
        type: 'info',
        title: isFavorited ? 'Removed from Wishlist' : 'Saved to Wishlist',
        message: isFavorited
          ? 'Removed from your saved items.'
          : 'Added to your private wishlist.',
      })
    );
  };

  // Find related products in the same category
  const relatedProducts = allProducts && product
    ? allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (isLoading) {
    return (
      <div className="container product-detail-loading">
        <div className="skeleton product-detail-skeleton-img" />
        <div className="product-detail-skeleton-info">
          <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '16px' }} />
          <div className="skeleton" style={{ width: '80%', height: '40px', marginBottom: '16px' }} />
          <div className="skeleton" style={{ width: '30%', height: '32px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ width: '100%', height: '120px', marginBottom: '24px' }} />
          <div className="skeleton" style={{ width: '60%', height: '48px' }} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container product-detail-error">
        <h2>Product Not Found</h2>
        <p>The product you requested does not exist or may have been retired from the catalog.</p>
        <Button variant="primary" onClick={() => navigate('/products')} style={{ marginTop: '1.5rem' }}>
          Back to Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container">
        {/* Breadcrumb Navigation (8.3 & Accessibility) */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <ol className="breadcrumbs__list">
            <li><Link to="/">Home</Link></li>
            <li><ChevronRight size={14} className="breadcrumbs__sep" /></li>
            <li><Link to="/products">Catalog</Link></li>
            <li><ChevronRight size={14} className="breadcrumbs__sep" /></li>
            <li>
              <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                {formatCategoryName(product.category)}
              </Link>
            </li>
            <li><ChevronRight size={14} className="breadcrumbs__sep" /></li>
            <li aria-current="page" className="breadcrumbs__current">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Hero Grid */}
        <div className="product-detail__grid">
          {/* Product Media Gallery */}
          <div className="product-detail__gallery">
            <div className="product-detail__image-box">
              <img
                src={product.image}
                alt={product.title}
                className="product-detail__image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
                }}
              />
            </div>
          </div>

          {/* Product Purchasing Info */}
          <div className="product-detail__info">
            <div className="product-detail__header">
              <span className="badge badge-subtle">{formatCategoryName(product.category)}</span>
              {product.rating && (
                <div className="product-detail__rating">
                  <Star size={16} fill="currentColor" color="#b45309" />
                  <span className="rating-score">{product.rating.rate}</span>
                  <span className="rating-reviews">({product.rating.count} verified reviews)</span>
                </div>
              )}
            </div>

            <h1 className="product-detail__title">{product.title}</h1>
            <div className="product-detail__price">{formatCurrency(convertCurrency(product.price, 'USD', activeCurrency), activeCurrency)}</div>

            <p className="product-detail__description">{product.description}</p>

            {/* Quantity Selector & Action Buttons (Customer Only) */}
            {isAdmin ? (
              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '2rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldAlert size={20} color="var(--color-accent)" />
                  <strong style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-primary)' }}>
                    Administrator Operations Mode
                  </strong>
                </div>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', marginBottom: '1.25rem', lineHeight: 'var(--leading-relaxed)' }}>
                  Customer purchasing, quantity selection, and wishlist actions are disabled for administrator sessions. To modify prices or inventory, visit the management portal.
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/admin')}
                  leftIcon={<Edit size={16} />}
                >
                  Manage in Admin Portal
                </Button>
              </div>
            ) : (
              <div className="product-detail__actions-section">
                <div className="quantity-selector" role="group" aria-label="Select quantity">
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity-display" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="quantity-btn"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    disabled={quantity >= 10}
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="product-detail__cta-row">
                  <Button
                    variant="primary"
                    size="lg"
                    isFullWidth
                    onClick={handleAddToCart}
                    leftIcon={<ShoppingBag size={18} />}
                  >
                    Add to Bag &bull; {formatCurrency(convertCurrency(product.price * quantity, 'USD', activeCurrency), activeCurrency)}
                  </Button>

                  <Button
                    variant={isFavorited ? 'accent' : 'outline'}
                    size="lg"
                    onClick={handleToggleWishlist}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
                  </Button>
                </div>

                {/* VIP Concierge Consultation Trigger (CR-17A) */}
                <Button
                  variant="outline"
                  size="md"
                  isFullWidth
                  onClick={() => setIsConciergeOpen(true)}
                  leftIcon={<Sparkles size={16} />}
                  style={{ marginTop: '0.75rem', borderColor: 'var(--color-accent)' }}
                >
                  Book VIP Concierge Consultation
                </Button>
              </div>
            )}

            {/* Assurances */}
            <div className="product-assurances">
              <div className="assurance-item">
                <Truck size={18} className="assurance-icon" />
                <span>Complimentary standard shipping on orders over $75</span>
              </div>
              <div className="assurance-item">
                <RotateCcw size={18} className="assurance-icon" />
                <span>30-day effortless return and exchange policy</span>
              </div>
              <div className="assurance-item">
                <ShieldCheck size={18} className="assurance-icon" />
                <span>Guaranteed authenticity &amp; inspected craftsmanship</span>
              </div>
            </div>

            {/* Accordion Component Demonstration (12.3 Compound Components) */}
            <div className="product-accordion-wrapper">
              <Accordion defaultExpanded={['specifications']}>
                <Accordion.Item id="specifications">
                  <Accordion.Header itemId="specifications">
                    Material &amp; Construction Details
                  </Accordion.Header>
                  <Accordion.Body itemId="specifications">
                    Designed with precision for daily endurance. Crafted from authentic components adhering to international standards. Clean lines with reinforced structural points ensure prolonged aesthetic vitality.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="shipping">
                  <Accordion.Header itemId="shipping">
                    Shipping &amp; Delivery Logistics
                  </Accordion.Header>
                  <Accordion.Body itemId="shipping">
                    All orders are packaged in recycled kraft materials. Dispatches take place within 24 hours from our regional distribution hub. Tracking details are provided upon dispatch.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item id="care">
                  <Accordion.Header itemId="care">
                    Care Guidelines &amp; Longevity
                  </Accordion.Header>
                  <Accordion.Body itemId="care">
                    Store away from direct moisture and extreme temperatures. Use a dry microfiber cloth to buff surfaces. For apparel, follow the care label for garment longevity.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>

      {/* VIP Concierge Modal (CR-17A) */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        productTitle={product.title}
      />

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="related-section">
            <div className="section-header">
              <div>
                <span className="section-eyebrow">Complementary Style</span>
                <h2 className="section-title">You May Also Appreciate</h2>
              </div>
              <Link
                to={`/products?category=${encodeURIComponent(product.category)}`}
                className="section-link"
              >
                <span>View more in {formatCategoryName(product.category)}</span>
                <ChevronRight size={16} />
              </Link>
            </div>
            <div className="products-grid">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
