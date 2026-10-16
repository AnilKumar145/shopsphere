/**
 * ShopSphere Home Page
 * Curated editorial storefront with real API catalog data
 * Demonstrates 3.1, 4.1, 4.2, 4.3, 8.3, 9.9
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { useProducts, useCategories } from '../hooks/useCatalog';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { ProductGridSkeleton } from '../features/catalog/components/ProductSkeleton';
import { formatCategoryName } from '../utils/formatters';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './HomePage.css';

export const HomePage: React.FC = () => {
  useDocumentTitle('Curated Contemporary Retail');

  const { data: products, isLoading, isError } = useProducts();
  const { data: categories } = useCategories();

  // Curate specific showcase sets from genuine API data
  const featuredProducts = products ? products.slice(0, 4) : [];
  const fineAccents = products
    ? products.filter((p) => p.category === 'jewelery' || p.category === 'electronics').slice(0, 4)
    : [];

  return (
    <div className="home-page">
      {/* Editorial Hero Section */}
      <section className="hero-section">
        <div className="container hero-section__inner">
          <div className="hero-section__content">
            <div className="hero-section__badge">
              <Sparkles size={14} className="hero-section__badge-icon" />
              <span>Autumn / Winter Curation</span>
            </div>
            <h1 className="hero-section__title">
              Objects of Distinction, Designed for Living.
            </h1>
            <p className="hero-section__lead">
              ShopSphere gathers honest materials, refined silhouettes, and enduring consumer technology into a harmonious everyday collection.
            </p>
            <div className="hero-section__actions">
              <Link to="/products" className="ui-button ui-button--primary ui-button--lg">
                <span>Explore Full Collection</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=jewelery" className="ui-button ui-button--outline ui-button--lg">
                <span>Fine Jewelry</span>
              </Link>
            </div>
          </div>

          <div className="hero-section__visual">
            <div className="hero-card">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"
                alt="Editorial styling showcase"
                className="hero-card__image"
              />
              <div className="hero-card__caption">
                <span className="hero-card__tag">Curator's Note</span>
                <p className="hero-card__text">
                  Pure wool tailoring, architectural jewelry, and precision-engineered audio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Discovery Tiles */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Explore Collections</span>
              <h2 className="section-title">Shop by Category</h2>
            </div>
            <Link to="/products" className="section-link">
              <span>View all categories</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories?.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="category-tile"
              >
                <div className="category-tile__backdrop" />
                <div className="category-tile__content">
                  <span className="category-tile__name">{formatCategoryName(cat)}</span>
                  <span className="category-tile__cta">
                    Browse <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Collection */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Curated Pieces</span>
              <h2 className="section-title">Essential Highlights</h2>
            </div>
            <Link to="/products" className="section-link">
              <span>Browse all 20 products</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {isLoading && <ProductGridSkeleton count={4} />}

          {isError && (
            <div className="error-banner">
              <p>Unable to connect to live catalog service. Showing offline essentials.</p>
            </div>
          )}

          {!isLoading && (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial Craftsmanship Narrative */}
      <section className="editorial-story">
        <div className="container editorial-story__inner">
          <div className="editorial-story__media">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80"
              alt="Artisanal display studio"
              className="editorial-story__image"
            />
          </div>
          <div className="editorial-story__text">
            <span className="section-eyebrow">The ShopSphere Philosophy</span>
            <h2 className="editorial-story__title">
              Craftsmanship Over Fast Commodities
            </h2>
            <p className="editorial-story__body">
              Every garment and artifact in our store is selected for provenance, structural integrity, and enduring utility. We reject ephemeral trends in favor of pieces that develop patina and character over years of everyday use.
            </p>
            <div className="editorial-story__points">
              <div className="story-point">
                <Compass size={20} className="story-point__icon" />
                <div>
                  <strong>Intentional Sourcing</strong>
                  <p>Certified partner workshops with transparent labor standards.</p>
                </div>
              </div>
              <div className="story-point">
                <Shield size={20} className="story-point__icon" />
                <div>
                  <strong>Longevity Guarantee</strong>
                  <p>Hardware, seams, and electronics tested for extended cycles.</p>
                </div>
              </div>
            </div>
            <Link to="/products" className="ui-button ui-button--primary" style={{ marginTop: '1.5rem' }}>
              Explore Our Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Fine Accents & Electronics Section */}
      <section className="accents-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Design &amp; Technology</span>
              <h2 className="section-title">Jewelry &amp; Audio Innovations</h2>
            </div>
            <Link to="/products?category=electronics" className="section-link">
              <span>View Tech Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {!isLoading && fineAccents.length > 0 && (
            <div className="products-grid">
              {fineAccents.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
