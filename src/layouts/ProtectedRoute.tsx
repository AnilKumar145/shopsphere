/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-08B — Protected Route Authentication Guard
 * Module 8: Routing with React Router v6 & TypeScript (Units 8.7, 11.5)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Implement an authentication guard that intercepts unauthorized
 *    navigation, preserves attempted route in location state, and verifies roles.
 * 📖 Reference Spec: change-requests/CR-08B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/layouts/ProtectedRoute.tsx
 * ============================================================================
 */

import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'customer' | 'admin';
}

/**
 * 📝 STEP 1: Handle Authentication Loading State
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    If isLoading is true, render a centered loading placeholder / skeleton.
 *
 * 📝 STEP 2: Handle Unauthenticated Users
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    If !isAuthenticated, redirect to '/login' using:
 *    <Navigate to="/login" state={{ from: location }} replace />
 *
 * 📝 STEP 3: Role-Based Authorization Guard
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    If requiredRole is specified and user?.role !== requiredRole,
 *    render an 'Access Restricted' notice.
 *
 * 📝 STEP 4: Render Authorized Content
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    If all checks pass, return <>{children}</>.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // 1. If isLoading: return loading skeleton.
  if (isLoading) {
    return (
      <div style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="skeleton" style={{ width: '200px', height: '24px', margin: '0 auto' }} />
      </div>
    );
  }

  // 2. If !isAuthenticated: redirect to login preserving state.from.
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If requiredRole mismatch: render restricted banner.
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

  // 4. Render protected child tree:
  return <>{children}</>;
};
