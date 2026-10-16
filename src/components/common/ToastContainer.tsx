/**
 * Global Toast Container connected to Redux Toolkit
 * Demonstrates 10.6 Redux Toolkit & Accessible Live Regions (aria-live="polite")
 */

import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeToast, ToastNotification } from '../../store/slices/preferencesSlice';
import './ToastContainer.css';

const ToastItem: React.FC<{ toast: ToastNotification }> = ({ toast }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id));
    }, 4500);

    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  const icons = {
    success: <CheckCircle2 size={18} className="toast__icon toast__icon--success" />,
    error: <AlertCircle size={18} className="toast__icon toast__icon--error" />,
    warning: <AlertTriangle size={18} className="toast__icon toast__icon--warning" />,
    info: <Info size={18} className="toast__icon toast__icon--info" />,
  };

  return (
    <div className={`toast-item toast-item--${toast.type}`} role="status">
      <div className="toast-item__icon-wrapper">{icons[toast.type]}</div>
      <div className="toast-item__content">
        <h4 className="toast-item__title">{toast.title}</h4>
        <p className="toast-item__message">{toast.message}</p>
      </div>
      <button
        type="button"
        className="toast-item__close"
        onClick={() => dispatch(removeToast(toast.id))}
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector((state) => state.preferences.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
