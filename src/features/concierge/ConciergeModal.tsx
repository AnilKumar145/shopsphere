/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-17A — VIP Concierge Consultation Inquiry Workflow
 * Module 17: Capstone Project (Units 17.1, 17.3, 17.7, 17.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct a bespoke luxury styling consultation booking modal
 *    capturing appointment date, time, and styling preferences.
 * 📖 Reference Spec: change-requests/CR-17A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/features/concierge/ConciergeModal.tsx
 * ============================================================================
 */

import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import './ConciergeModal.css';

export interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle?: string;
}

/**
 * 📝 STEP 1: Controlled Form Input State (name, email, preferredDate, notes)
 * 📝 STEP 2: Field Validation Rules
 * 📝 STEP 3: Submission Handler & Toast Feedback
 */
export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose, productTitle }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="concierge-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="concierge-title">
      <div className="concierge-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="concierge-close" onClick={onClose} aria-label="Close concierge dialog">
          <X size={20} />
        </button>

        <div className="concierge-header">
          <Sparkles className="concierge-icon" size={24} />
          <h2 id="concierge-title">VIP Concierge Consultation</h2>
          <p>Book a personalized styling appointment with a ShopSphere Atelier Advisor.</p>
          {productTitle && <p className="concierge-product-context">Inquiring about: <strong>{productTitle}</strong></p>}
        </div>

        {submitted ? (
          <div className="concierge-success">
            <h3>Appointment Request Received</h3>
            <p>Our concierge team will reach out to <strong>{email}</strong> within 2 hours to confirm your consultation.</p>
            <Button variant="primary" onClick={onClose} style={{ marginTop: '1.5rem' }}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="concierge-form">
            <div className="form-group">
              <label htmlFor="concierge-name">Full Name</label>
              <input id="concierge-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Lady Eleanor Vance" />
            </div>

            <div className="form-group">
              <label htmlFor="concierge-email">Email Address</label>
              <input id="concierge-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="eleanor@atelier.com" />
            </div>

            <div className="form-group">
              <label htmlFor="concierge-date">Preferred Date</label>
              <input id="concierge-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
            </div>

            <div className="concierge-actions">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="primary">Schedule Consultation</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
