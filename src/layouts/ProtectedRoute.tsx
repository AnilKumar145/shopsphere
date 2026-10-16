/**
 * Protected Route Guard
 * Demonstrates 8.7 Protected Routes & 11.5 Authentication Guards
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'customer' | 'admin';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="skeleton" style={{ width: '200px', height: '24px', margin: '0 auto' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login preserving intended target route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Access Restricted</h2>
        <p style={{ marginTop: '0.5rem' }}>
          This section requires administrative privileges. You are currently signed in as a customer.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
