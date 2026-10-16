/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-17B — Interactive Delivery Milestone Progress Timeline
 * Module 17: Capstone Project (Units 17.3, 17.4, 17.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Render an animated 5-step delivery milestone stepper:
 *    Confirmed -> Packed -> In Transit -> Out for Delivery -> Delivered.
 * 📁 Reference: shopsphere-solution/src/components/orders/OrderTimeline.tsx
 * ============================================================================
 */

import React from 'react';

export type DeliveryMilestone = 'Confirmed' | 'Packed' | 'In Transit' | 'Out for Delivery' | 'Delivered';

export interface OrderTimelineProps {
  currentMilestone: DeliveryMilestone;
  orderTimestamp: string;
}

const MILESTONES: DeliveryMilestone[] = [
  'Confirmed',
  'Packed',
  'In Transit',
  'Out for Delivery',
  'Delivered'
];

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ currentMilestone, orderTimestamp }) => {
  const currentIndex = MILESTONES.indexOf(currentMilestone);

  return (
    <div className="order-timeline" style={{ padding: '1.5rem 0', margin: '1.5rem 0' }}>
      <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-heading)' }}>Delivery Journey</h4>
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        {MILESTONES.map((milestone, index) => {
          const isComplete = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={milestone} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center', zIndex: 1 }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: isComplete ? 'var(--color-primary, #000)' : 'var(--border-color, #e4e4e7)',
                  color: isComplete ? '#fff' : 'var(--text-muted, #71717a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: isCurrent ? '2px solid var(--color-accent, #c5a880)' : 'none'
                }}
              >
                {index + 1}
              </div>
              <span style={{ fontSize: '0.75rem', marginTop: '0.5rem', fontWeight: isCurrent ? 700 : 500 }}>
                {milestone}
              </span>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted, #71717a)', marginTop: '1rem', textAlign: 'center' }}>
        Order placed on: {new Date(orderTimestamp).toLocaleDateString()}
      </p>
    </div>
  );
};
