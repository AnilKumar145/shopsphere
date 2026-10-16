import { LiveAnnouncer } from '../components/common/LiveAnnouncer';
/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-08C — Application Shell & Reusable Layout System
 * Module 8: Routing with React Router (Units 8.2, 8.5, 8.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct the shared application shell wrapping nested routes
 *    with luxury Navbar, Footer, ToastContainer, and scroll restoration.
 * 📁 Reference: shopsphere-solution/src/layouts/RootLayout.tsx
 * ============================================================================
 */

/**
 * Application Shell / Root Layout
 * Demonstrates 8.5 Nested Routes (Outlet, Shared Layouts)
 */

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ToastContainer } from '../components/common/ToastContainer';

export const RootLayout: React.FC = () => {
  const { pathname } = useLocation();

  // Scroll to top on navigation (8.3 & UX quality)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <ToastContainer />
      {/* WCAG 2.1 AA Live Announcer (CR-15C) */}
      <LiveAnnouncer />
    </div>
  );
};
