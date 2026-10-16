/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-10A & CR-10B — Redux Preferences Slice & Toast Feed
 * Module 10: Global State Management (Units 10.4, 10.5, 10.6, 10.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Manage global currency selection and notification toast stream
 *    using Redux Toolkit createSlice, typed actions, and selectors.
 * 📁 Reference: shopsphere-solution/src/store/slices/preferencesSlice.ts
 * ============================================================================
 */

/**
 * Demonstrates 10.5 Redux Fundamentals & 10.6 Redux Toolkit
 * Managing user display preferences and transient toast alerts
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../../utils/storage';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

export interface PreferencesState {
  currency: CurrencyCode;
  itemsPerPage: number;
  viewMode: 'grid' | 'compact';
  toasts: ToastNotification[];
}

const initialPreferences: PreferencesState = getStorageItem<PreferencesState>(STORAGE_KEYS.PREFERENCES, {
  currency: 'USD',
  itemsPerPage: 8,
  viewMode: 'grid',
  toasts: [],
});

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialPreferences,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      state.currency = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'compact'>) => {
      state.viewMode = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    addToast: (state, action: PayloadAction<Omit<ToastNotification, 'id'>>) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const {
  setCurrency,
  setItemsPerPage,
  setViewMode,
  addToast,
  removeToast,
  clearToasts,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;
