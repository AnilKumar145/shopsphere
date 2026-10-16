/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-15C — Accessible Live Region Screen Reader Announcer
 * Module 15: Accessibility & Production Readiness (Units 15.7, 15.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Provide an invisible ARIA live region (aria-live="polite")
 *    broadcasting dynamic system alerts and catalog updates to assistive tech.
 * 📖 Reference Spec: change-requests/CR-15C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/common/LiveAnnouncer.tsx
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';

export interface LiveAnnouncerProps {
  message?: string;
}

/**
 * 📝 STEP 1: Manage Live Announcement Message State
 * 📝 STEP 2: Configure ARIA Attributes (aria-live="polite", aria-atomic="true")
 * 📝 STEP 3: Apply Visually Hidden CSS Bounds
 */
export const LiveAnnouncer: React.FC<LiveAnnouncerProps> = ({ message }) => {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  const [currentMessage, setCurrentMessage] = useState(message ?? '');

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
    }
  }, [message]);

  return (
    <div
      id="live-announcer"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {currentMessage}
    </div>
  );
};
