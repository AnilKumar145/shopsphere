/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12B — Compound Dialog Pattern
 * Module 12: Advanced Component Patterns (Units 12.1, 12.3)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Construct compound dialog components (<Modal.Header>,
 *    <Modal.Body>, <Modal.Footer>) sharing state via context.
 * 📁 Reference: shopsphere-solution/src/components/ui/Modal.tsx
 * ============================================================================
 */

/**
 * Accessible Modal Dialog using React Portals
 * Demonstrates 12.7 Portals: createPortal, Modal Dialogs, Overlay Components
 * Demonstrates 7.3 useRef & 6.1 Keyboard Event Handling (Escape key listener)
 */

import React, { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}): React.JSX.Element | null => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press (6.1 & 15.8 Accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="ui-modal-overlay" onClick={onClose} aria-hidden="true">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
        className={`ui-modal-content ui-modal-content--${maxWidth}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal body
      >
        <div className="ui-modal-header">
          <div>
            <h2 id="modal-title" className="ui-modal-title">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="ui-modal-desc">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            className="ui-modal-close"
            onClick={onClose}
            aria-label="Close modal dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="ui-modal-body">{children}</div>

        {footer && <div className="ui-modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
