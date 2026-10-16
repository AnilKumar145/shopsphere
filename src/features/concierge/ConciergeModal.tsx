/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-17A — VIP Concierge Consultation Inquiry Workflow
 * Module 17: Capstone Project (Units 17.1, 17.3, 17.7, 17.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct a bespoke luxury styling consultation booking modal
 *    capturing appointment date, time, and styling preferences.
 * 📁 Reference: shopsphere-solution/src/features/concierge/ConciergeModal.tsx
 * ============================================================================
 */

import React, { useState } from 'react';

export interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
}

export const ConciergeModal: React.FC<ConciergeModalProps> = ({ isOpen, onClose, productTitle }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
      <div className="modal-content" style={{ background: 'var(--surface-card, #fff)', color: 'var(--text-primary, #000)', padding: '2rem', borderRadius: '8px', maxWidth: '500px', width: '90%' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: 0 }}>VIP Concierge Consultation</h2>
        <p style={{ color: 'var(--text-muted, #71717a)' }}>Book a bespoke private appointment for <strong>{productTitle}</strong>.</p>

        {submitted ? (
          <div>
            <p style={{ color: 'var(--color-success, #22c55e)', fontWeight: 600 }}>Thank you. An Atelier concierge consultant will reach out to confirm your booking.</p>
            <button className="btn btn-primary" onClick={onClose} style={{ marginTop: '1rem' }}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Preferred Date</label>
              <input type="date" required value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '0.6rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Time</label>
              <select value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '0.6rem' }}>
                <option value="11:00">11:00 AM (Morning Session)</option>
                <option value="14:00">2:00 PM (Afternoon Session)</option>
                <option value="17:00">5:00 PM (Evening Salon)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Styling Preferences</label>
              <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Share sizing or collection preferences..." style={{ width: '100%', padding: '0.6rem' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Book Consultation</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
