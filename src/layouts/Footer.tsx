/**
 * Application Footer
 * Demonstrates 3.1 Functional Components, 6.2 Form Events
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Lock } from 'lucide-react';
import { useAppDispatch } from '../store';
import { addToast } from '../store/slices/preferencesSlice';
import './Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      dispatch(
        addToast({
          type: 'success',
          title: 'Newsletter Subscription',
          message: `Thank you for joining our editorial dispatch.`,
        })
      );
      setEmail('');
    }
  };

  return (
    <footer className="site-footer">
      {/* Editorial Value Pillars */}
      <div className="site-footer__pillars">
        <div className="container site-footer__pillars-grid">
          <div className="pillar-item">
            <Truck size={22} className="pillar-item__icon" />
            <div>
              <h4 className="pillar-item__title">Complimentary Shipping</h4>
              <p className="pillar-item__desc">On all domestic orders over $75.00</p>
            </div>
          </div>
          <div className="pillar-item">
            <RefreshCw size={22} className="pillar-item__icon" />
            <div>
              <h4 className="pillar-item__title">Considered Returns</h4>
              <p className="pillar-item__desc">30-day effortless return window</p>
            </div>
          </div>
          <div className="pillar-item">
            <ShieldCheck size={22} className="pillar-item__icon" />
            <div>
              <h4 className="pillar-item__title">Authentic Curation</h4>
              <p className="pillar-item__desc">Directly sourced quality essentials</p>
            </div>
          </div>
          <div className="pillar-item">
            <Lock size={22} className="pillar-item__icon" />
            <div>
              <h4 className="pillar-item__title">Encrypted Checkout</h4>
              <p className="pillar-item__desc">Simulated secure transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="site-footer__main">
        <div className="container site-footer__grid">
          <div className="site-footer__brand-col">
            <span className="site-footer__brand-title">SHOPSPHERE</span>
            <p className="site-footer__brand-desc">
              A curated digital storefront dedicated to high-craft wardrobe essentials, fine jewelry, and contemporary consumer technology.
            </p>
            <div className="site-footer__demo-badge">
              <span className="badge badge-subtle">Fake Store API Production Baseline</span>
            </div>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__heading">Curations</h4>
            <ul className="site-footer__links">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=women's clothing">Women's Collection</Link></li>
              <li><Link to="/products?category=men's clothing">Men's Apparel</Link></li>
              <li><Link to="/products?category=jewelery">Fine Jewelry</Link></li>
              <li><Link to="/products?category=electronics">Modern Tech</Link></li>
            </ul>
          </div>

          <div className="site-footer__col">
            <h4 className="site-footer__heading">Customer Care</h4>
            <ul className="site-footer__links">
              <li><Link to="/cart">Shopping Bag</Link></li>
              <li><Link to="/wishlist">Saved Pieces</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/account">Account Settings</Link></li>
            </ul>
          </div>

          <div className="site-footer__col site-footer__col--newsletter">
            <h4 className="site-footer__heading">Editorial Dispatch</h4>
            <p className="site-footer__newsletter-desc">
              Subscribe to receive seasonal looks, private releases, and curated object stories.
            </p>
            <form onSubmit={handleSubscribe} className="site-footer__newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="site-footer__newsletter-input"
              />
              <button
                type="submit"
                className="site-footer__newsletter-btn"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p className="site-footer__copyright">
            &copy; {new Date().getFullYear()} ShopSphere Inc. All rights reserved. Built with React &amp; TypeScript.
          </p>
          <div className="site-footer__legal">
            <span>Enterprise React Showcase</span>
            <span>&bull;</span>
            <span>Fake Store API Integration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
