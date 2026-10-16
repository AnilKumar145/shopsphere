/**
 * Account Profile & User Preferences Route
 * Demonstrates 10.6 Redux Toolkit, 11.3 Authentication State, 11.6 Role-Based Access
 */

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Shield,
  Sliders,
  Package,
  Heart,
  LogOut,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { orderService } from '../services/orderService';
import { useAppDispatch, useAppSelector } from '../store';
import {
  setCurrency,
  setItemsPerPage,
  CurrencyCode,
} from '../store/slices/preferencesSlice';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './AccountPage.css';

export const AccountPage: React.FC = () => {
  useDocumentTitle('Account Profile');
  const { user, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const orders = orderService.getOrders();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { currency, itemsPerPage } = useAppSelector((state) => state.preferences);

  if (!user) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Session Not Found</h2>
        <p style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
          Please sign in to access your personal profile.
        </p>
        <Link to="/login" className="ui-button ui-button--primary">
          Sign In
        </Link>
      </div>
    );
  }

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="account-page">
      <div className="container">
        {/* Header */}
        <div className="account-header">
          <div className="account-avatar">
            <UserIcon size={32} />
          </div>
          <div className="account-header__info">
            <div className="account-header__name-row">
              <h1 className="account-name">
                {user.name.firstname} {user.name.lastname}
              </h1>
              <span className={`badge ${user.role === 'admin' ? 'badge-accent' : 'badge-subtle'}`}>
                <Shield size={12} /> {user.role.toUpperCase()}
              </span>
            </div>
            <p className="account-username">@{user.username} &bull; {user.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            leftIcon={<LogOut size={16} />}
            className="account-signout-btn"
          >
            Sign Out
          </Button>
        </div>

        <div className="account-grid">
          {/* Column 1: Profile Details */}
          <div className="account-card">
            <div className="account-card__header">
              <UserIcon size={18} className="account-card__icon" />
              <h2 className="account-card__title">Profile Information</h2>
            </div>

            <div className="profile-details-list">
              <div className="profile-detail-item">
                <Mail size={16} className="detail-icon" />
                <div>
                  <span className="detail-label">Email Address</span>
                  <strong className="detail-val">{user.email}</strong>
                </div>
              </div>

              <div className="profile-detail-item">
                <Phone size={16} className="detail-icon" />
                <div>
                  <span className="detail-label">Contact Phone</span>
                  <strong className="detail-val">{user.phone}</strong>
                </div>
              </div>

              {user.address && (
                <div className="profile-detail-item">
                  <MapPin size={16} className="detail-icon" />
                  <div>
                    <span className="detail-label">Default Shipping Location</span>
                    <strong className="detail-val">
                      {user.address.number} {user.address.street}, {user.address.city},{' '}
                      {user.address.zipcode}
                    </strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Column 2: Application Preferences (Redux Toolkit Integration) */}
          <div className="account-card">
            <div className="account-card__header">
              <Sliders size={18} className="account-card__icon" />
              <h2 className="account-card__title">Display &amp; Store Preferences</h2>
            </div>

            <div className="preferences-form">
              <Select
                label="Display Currency"
                value={currency}
                onChange={(e) => dispatch(setCurrency(e.target.value as CurrencyCode))}
                options={[
                  { label: 'USD ($)', value: 'USD' },
                  { label: 'EUR (€)', value: 'EUR' },
                  { label: 'GBP (£)', value: 'GBP' },
                ]}
                helperText="Synchronized through Redux Toolkit state"
              />

              <Select
                label="Products Per Page"
                value={itemsPerPage}
                onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
                options={[
                  { label: '8 items per page', value: 8 },
                  { label: '12 items per page', value: 12 },
                  { label: '16 items per page', value: 16 },
                ]}
                helperText="Controls catalog pagination thresholds"
              />
            </div>
          </div>
        </div>

        {/* Quick Links Row */}
        <div className="account-shortcuts">
          {user.role === 'admin' && (
            <Link to="/admin" className="shortcut-card" style={{ borderColor: 'var(--color-accent)' }}>
              <div className="shortcut-card__icon" style={{ backgroundColor: 'var(--color-accent-light)', color: 'var(--color-accent)' }}>
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="shortcut-card__title">Admin Control Portal</h3>
                <p className="shortcut-card__desc">
                  Inventory CRUD, prices &amp; order fulfillment
                </p>
              </div>
            </Link>
          )}

          <Link to="/orders" className="shortcut-card">
            <div className="shortcut-card__icon">
              <Package size={24} />
            </div>
            <div>
              <h3 className="shortcut-card__title">Order History</h3>
              <p className="shortcut-card__desc">
                {orders.length} simulated {orders.length === 1 ? 'order' : 'orders'} recorded
              </p>
            </div>
          </Link>

          {/* Customer only: Personal Wishlist Archive */}
          {user.role !== 'admin' && (
            <Link to="/wishlist" className="shortcut-card">
              <div className="shortcut-card__icon">
                <Heart size={24} />
              </div>
              <div>
                <h3 className="shortcut-card__title">Saved Pieces</h3>
                <p className="shortcut-card__desc">
                  {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in personal wishlist
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
