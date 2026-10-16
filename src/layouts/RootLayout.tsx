/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-08C — Root Application Layout Shell
 * Module 8: Routing with React Router v6 & TypeScript (Units 8.2, 8.3)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct a persistent application shell composing the Navbar,
 *    nested route outlet (<Outlet />), accessible LiveAnnouncer, and footer.
 * 📖 Reference Spec: change-requests/CR-08C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/layouts/RootLayout.tsx
 * ============================================================================
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { LiveAnnouncer } from '../components/common/LiveAnnouncer';

/**
 * 📝 STEP 1: Compose Navbar Navigation Header
 * 📝 STEP 2: Mount Nested Route <Outlet /> in Main Container
 * 📝 STEP 3: Mount Accessible LiveAnnouncer for Screen Reader Announcements
 */
export const RootLayout: React.FC = () => {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <LiveAnnouncer />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <footer style={{ padding: '2rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color, #e4e4e7)' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted, #71717a)' }}>
          ShopSphere Luxury Atelier &copy; {new Date().getFullYear()} — Built for Trainee Excellence.
        </p>
      </footer>
    </div>
  );
};
