/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-10A & CR-10B — Redux Toolkit Preferences & Toast Slice
 * Module 10: State Management with Redux Toolkit (Units 10.5, 10.6, 10.7)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Manage user display preferences (currency, itemsPerPage, viewMode)
 *    persisted to localStorage, plus transient toast alert notifications.
 * 📖 Reference Spec: change-requests/CR-10A/request.md & CR-10B/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/store/slices/preferencesSlice.ts
 * ============================================================================
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../../utils/storage';
import { CurrencyCode } from '../../types/currency';
export type { CurrencyCode };

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
}

/**
 * 📝 STEP 1: Define Preferences State Interface
 */
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

/**
 * 📝 STEP 2: Implement Reducer Actions with LocalStorage Persistence
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    1. setCurrency: update state.currency and persist to STORAGE_KEYS.PREFERENCES.
 *    2. setItemsPerPage: update state.itemsPerPage and persist.
 *    3. setViewMode: update state.viewMode and persist.
 *    4. addToast: create unique id and append to state.toasts array.
 *    5. removeToast: filter out toast matching action.payload id.
 *    6. clearToasts: reset state.toasts to [].
 */
export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialPreferences,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyCode>) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
      state.currency = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
      state.itemsPerPage = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'compact'>) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
      state.viewMode = action.payload;
      setStorageItem(STORAGE_KEYS.PREFERENCES, {
        currency: state.currency,
        itemsPerPage: state.itemsPerPage,
        viewMode: state.viewMode,
        toasts: [],
      });
    },
    addToast: (state, action: PayloadAction<Omit<ToastNotification, 'id'>>) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      state.toasts.push({ ...action.payload, id });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearToasts: (state) => {
      // TODO: [STUDENT IMPLEMENTATION REQUIRED]
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
