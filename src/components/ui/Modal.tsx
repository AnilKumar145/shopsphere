/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12B — Accessible Modal Dialog Component using Portals
 * Module 12: Advanced Component Design Patterns (Units 12.1, 12.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Render dialog overlays via ReactDOM.createPortal directly into
 *    document.body with keyboard Escape dismissal, trapped focus, and ARIA roles.
 * 📖 Reference Spec: change-requests/CR-12B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/ui/Modal.tsx
 * ============================================================================
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

/**
 * 📝 STEP 1: Keyboard Escape Key Listener
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    When isOpen is true, register a window 'keydown' event listener that calls
 *    onClose() when e.key === 'Escape'. Clean up listener on unmount/close.
 *
 * 📝 STEP 2: Body Scroll Lock
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Set document.body.style.overflow = 'hidden' when open, reset on cleanup.
 *
 * 📝 STEP 3: Portal Rendering into Document Body
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Use createPortal to mount the overlay div into document.body.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  maxWidth = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    // Implement Escape key dismissal and body scroll lock described in STEPS 1-2.
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  // Render accessible modal portal dialog:
  return createPortal(
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        ref={modalRef}
        className={`modal-dialog modal-dialog--${maxWidth}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div className="modal-header">
          <div>
            <h2 id="modal-title" className="modal-title">
              {title}
            </h2>
            {description && (
              <p id="modal-description" className="modal-description">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.body
  );
};
