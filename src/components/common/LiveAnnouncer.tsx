/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-15C — WCAG 2.1 AA Live Announcer Region
 * Module 15: Enterprise React Application Architecture (Unit 15.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Provide polite screen-reader announcements for dynamic cart
 *    updates and asynchronous state transitions using aria-live="polite".
 * 📁 Reference: shopsphere-solution/src/components/common/LiveAnnouncer.tsx
 * ============================================================================
 */

import React, { useState, useEffect } from 'react';

export interface LiveAnnouncerProps {
  message?: string;
}

export const LiveAnnouncer: React.FC<LiveAnnouncerProps> = ({ message }) => {
  const [currentMessage, setCurrentMessage] = useState(message ?? '');

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
    }
  }, [message]);

  return (
    <div
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
        border: 0
      }}
    >
      {currentMessage}
    </div>
  );
};
