import { ConciergeModal } from '../features/concierge/ConciergeModal';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { CurrencySelector } from '../components/common/CurrencySelector';
/**
 * Primary Application Navigation
 * Demonstrates 3.1 Functional Components, 8.3 Navigation (NavLink, Link), 11.6 Role-Based UI
 */

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  Heart,
  User as UserIcon,
  Search,
  Menu,
  X,
  LogOut,
  Package,
  ShieldAlert,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const { totals } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navCategories = [
    { label: 'All Catalog', path: '/products' },
    { label: 'Women', path: "/products?category=women's clothing" },
    { label: 'Men', path: "/products?category=men's clothing" },
    { label: 'Jewelry', path: '/products?category=jewelery' },
    { label: 'Electronics', path: '/products?category=electronics' },
  ];

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        {/* Mobile menu button */}
        <button
          type="button"
          className="site-header__mobile-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand identity */}
        <Link to="/" className="site-header__brand">
          <span className="site-header__logo-text">SHOPSPHERE</span>
          <span className="site-header__logo-sub">Curated Retail</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="site-header__nav" aria-label="Main Navigation">
          <ul className="site-header__nav-list">
            {navCategories.map((item) => (
              <li key={item.path} className="site-header__nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `site-header__nav-link ${isActive ? 'site-header__nav-link--active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Search, Wishlist, Cart, Account) */}
        <div className="site-header__actions">
          {/* Multi-Currency Selection (CR-02A & CR-10A) */}
          <CurrencySelector />
          {/* Theme Switcher (CR-04A) */}
          <ThemeToggle />

          {/* VIP Concierge Booking (CR-17A) */}
          <button
            type="button"
            className="site-header__action-btn"
            onClick={() => setIsConciergeOpen(true)}
            title="Book VIP Concierge Appointment"
            aria-label="Book VIP Concierge Appointment"
            style={{ color: 'var(--color-accent)' }}
          >
            <Sparkles size={18} />
          </button>
          {/* Search Toggle */}
          <button
            type="button"
            className="site-header__action-btn"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label="Toggle search bar"
          >
            <Search size={20} />
          </button>

          {/* Customer-only actions: Wishlist & Cart (hidden for Administrator) */}
          {user?.role !== 'admin' && (
            <>
              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="site-header__action-btn site-header__action-btn--badge"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="site-header__badge" aria-hidden="true">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="site-header__action-btn site-header__action-btn--badge"
                aria-label={`Shopping bag, ${totals.itemCount} items`}
              >
                <ShoppingBag size={20} />
                {totals.itemCount > 0 && (
                  <span className="site-header__badge site-header__badge--accent" aria-hidden="true">
                    {totals.itemCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Admin shortcut in action bar */}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="site-header__action-btn"
              title="Admin Control Center"
              style={{ color: 'var(--color-accent)' }}
              aria-label="Admin Control Center"
            >
              <ShieldAlert size={20} />
            </Link>
          )}

          {/* User Account Menu */}
          <div className="site-header__account-wrapper">
            {isAuthenticated && user ? (
              <div className="site-header__user-menu">
                <button
                  type="button"
                  className="site-header__user-btn"
                  onClick={() => setIsUserDropdownOpen((prev) => !prev)}
                  aria-expanded={isUserDropdownOpen}
                  aria-label="Account options"
                >
                  <UserIcon size={18} />
                  <span className="site-header__user-name">
                    {user.name.firstname}
                  </span>
                </button>

                {isUserDropdownOpen && (
                  <div
                    className="site-header__dropdown"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    <div className="site-header__dropdown-header">
                      <p className="site-header__dropdown-greeting">
                        {user.name.firstname} {user.name.lastname}
                      </p>
                      <p className="site-header__dropdown-email">{user.email}</p>
                      <span className="badge badge-accent" style={{ marginTop: '4px' }}>
                        {user.role}
                      </span>
                    </div>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="site-header__dropdown-link" style={{ color: 'var(--color-accent)', fontWeight: 600 }}>
                        <ShieldAlert size={16} />
                        <span>Admin Management</span>
                      </Link>
                    )}
                    <Link to="/account" className="site-header__dropdown-link">
                      <UserIcon size={16} />
                      <span>Account Profile</span>
                    </Link>
                    <Link to="/orders" className="site-header__dropdown-link">
                      <Package size={16} />
                      <span>Order History</span>
                    </Link>
                    <button
                      type="button"
                      className="site-header__dropdown-link site-header__dropdown-link--danger"
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="site-header__login-link">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className="site-header__search-bar">
          <div className="container">
            <form onSubmit={handleSearchSubmit} className="site-header__search-form">
              <Search size={18} className="site-header__search-icon" />
              <input
                type="search"
                placeholder="Search products by name, category, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="site-header__search-input"
              />
              <button
                type="button"
                className="site-header__search-close"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="site-header__mobile-drawer">
          <nav className="site-header__mobile-nav">
            <ul>
              {navCategories.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="site-header__mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="site-header__mobile-divider" />
              {user?.role !== 'admin' && (
                <>
                  <li>
                    <Link
                      to="/wishlist"
                      className="site-header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Wishlist ({wishlistCount})
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="site-header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Shopping Bag ({totals.itemCount})
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <li>
                      <Link
                        to="/admin"
                        className="site-header__mobile-link"
                        style={{ color: 'var(--color-accent)', fontWeight: 700 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Admin Management
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/account"
                      className="site-header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="site-header__mobile-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Order History
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="site-header__mobile-link site-header__mobile-link--danger"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="site-header__mobile-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign In / Register
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
          {/* VIP Concierge Modal (CR-17A) */}
      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        productTitle="Private Atelier Consultation"
      />
    </header>
  );
};
