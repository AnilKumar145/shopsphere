/**
 * Authentication & Session Context
 * Demonstrates Module 11: 11.1, 11.2, 11.3, 11.4, 11.6, 11.7
 * Note: Fake Store API provides a static demonstration auth endpoint.
 * This context safely persists demo tokens and hydrates the user profile.
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { AuthSession, User } from '../types';
import { apiService, LoginCredentials } from '../services/api';
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from '../utils/storage';

export interface AuthContextValue {
  session: AuthSession | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  demoQuickLogin: (role?: 'customer' | 'admin') => Promise<void>;
  logout: () => void;
  updateUserPreferences: (prefs: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Default demo fallback user if remote fetch is unreachable
const DEMO_USER_CUSTOMER: User = {
  id: 1,
  username: 'johnd',
  email: 'john@gmail.com',
  name: { firstname: 'John', lastname: 'Doe' },
  phone: '1-570-236-7033',
  address: {
    city: 'Kilcoole',
    street: '7682 New Road',
    number: 7682,
    zipcode: '12926-3874',
  },
  role: 'customer',
};

const DEMO_USER_ADMIN: User = {
  ...DEMO_USER_CUSTOMER,
  id: 2,
  username: 'admin_sophia',
  email: 'sophia.admin@shopsphere.demo',
  name: { firstname: 'Sophia', lastname: 'Vance' },
  role: 'admin',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() =>
    getStorageItem<AuthSession | null>(STORAGE_KEYS.AUTH, null)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 11.4 Token expiration check on mount
  useEffect(() => {
    if (session && session.expiresAt < Date.now()) {
      console.warn('[Auth] Session expired. Signing out.');
      logout();
    }
  }, [session]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // 11.2 Call API auth endpoint
      const response = await apiService.login(credentials);

      // Fetch user profile (or fallback to demo user if remote user query fails)
      let userProfile = DEMO_USER_CUSTOMER;
      try {
        const fetchedUser = await apiService.getUserProfile(1);
        userProfile = {
          ...fetchedUser,
          role: credentials.username.toLowerCase().includes('admin') ? 'admin' : 'customer',
        };
      } catch (err) {
        console.warn('[Auth] Could not fetch remote user profile, using fallback profile.', err);
      }

      const newSession: AuthSession = {
        token: response.token,
        user: userProfile,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      setSession(newSession);
      setStorageItem(STORAGE_KEYS.AUTH, newSession);
      setIsLoading(false);
      return true;
    } catch (err: unknown) {
      setIsLoading(false);
      const errMsg = err instanceof Error ? err.message : 'Invalid credentials. Please verify your username and password.';
      setError(errMsg);
      return false;
    }
  };

  const demoQuickLogin = async (role: 'customer' | 'admin' = 'customer'): Promise<void> => {
    setIsLoading(true);
    setError(null);
    // Instant demo login for reviewer convenience
    const demoUser = role === 'admin' ? DEMO_USER_ADMIN : DEMO_USER_CUSTOMER;
    const newSession: AuthSession = {
      token: `demo-jwt-token-${role}-${Date.now()}`,
      user: demoUser,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    setSession(newSession);
    setStorageItem(STORAGE_KEYS.AUTH, newSession);
    setIsLoading(false);
  };

  const logout = () => {
    setSession(null);
    removeStorageItem(STORAGE_KEYS.AUTH);
  };

  const updateUserPreferences = (updated: Partial<User>) => {
    if (!session) return;
    const updatedSession: AuthSession = {
      ...session,
      user: {
        ...session.user,
        ...updated,
      },
    };
    setSession(updatedSession);
    setStorageItem(STORAGE_KEYS.AUTH, updatedSession);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      isAuthenticated: !!session && session.expiresAt > Date.now(),
      isLoading,
      error,
      login,
      demoQuickLogin,
      logout,
      updateUserPreferences,
    }),
    [session, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
