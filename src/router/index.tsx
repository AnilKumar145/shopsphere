/**
 * Application Routing Configuration
 * Demonstrates Module 8: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8
 * Demonstrates 12.8 Lazy Loading & Suspense and 13.5 Code Splitting
 */

import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RootLayout } from '../layouts/RootLayout';
import { ProtectedRoute } from '../layouts/ProtectedRoute';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

// 12.8 & 13.5 Lazy Loading and Route-Based Code Splitting
const HomePage = lazy(() =>
  import('../pages/HomePage').then((m) => ({ default: m.HomePage }))
);
const ProductListPage = lazy(() =>
  import('../pages/ProductListPage').then((m) => ({ default: m.ProductListPage }))
);
const ProductDetailPage = lazy(() =>
  import('../pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage }))
);
const CartPage = lazy(() =>
  import('../pages/CartPage').then((m) => ({ default: m.CartPage }))
);
const WishlistPage = lazy(() =>
  import('../pages/WishlistPage').then((m) => ({ default: m.WishlistPage }))
);
const LoginPage = lazy(() =>
  import('../pages/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const CheckoutPage = lazy(() =>
  import('../pages/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
);
const OrderConfirmationPage = lazy(() =>
  import('../pages/OrderConfirmationPage').then((m) => ({ default: m.OrderConfirmationPage }))
);
const OrdersPage = lazy(() =>
  import('../pages/OrdersPage').then((m) => ({ default: m.OrdersPage }))
);
const AccountPage = lazy(() =>
  import('../pages/AccountPage').then((m) => ({ default: m.AccountPage }))
);
const NotFoundPage = lazy(() =>
  import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const AdminPage = lazy(() =>
  import('../pages/AdminPage').then((m) => ({ default: m.AdminPage }))
);

const PageLoader: React.FC = () => (
  <div
    style={{
      padding: '8rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
    }}
  >
    <div
      className="skeleton"
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
    />
    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
      Loading collection...
    </p>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <ErrorBoundary fallbackMessage="A routing error occurred. Please refresh or navigate back to the home page.">
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductListPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="login" element={<LoginPage />} />

            {/* Checkout & Orders */}
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="order-confirmation/:id" element={<OrderConfirmationPage />} />
            <Route path="orders" element={<OrdersPage />} />

            {/* Protected Routes (8.7 & 11.5) */}
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />

            {/* Admin Portal (11.6 Role-Based Access Control) */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* 404 Route (8.8) */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};
