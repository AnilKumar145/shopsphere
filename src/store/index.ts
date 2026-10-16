/**
 * Redux Toolkit Store Configuration
 * Demonstrates 10.5 & 10.6: configureStore, createSlice, useSelector, useDispatch, Typed Hooks
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import preferencesReducer from './slices/preferencesSlice';

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// RootState and AppDispatch types derived directly from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed Redux Hooks for type safety throughout application components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
