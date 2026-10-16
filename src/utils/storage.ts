/**
 * Type-safe and resilient LocalStorage wrapper
 * Handles SSR/Node contexts, malformed JSON, and quota exceptions
 * Demonstrates 2.7, 7.8, 15.9, 15.10
 */

export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined' || !window.localStorage) {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[Storage] Failed to read or parse key "${key}". Resetting to fallback.`, error);
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined' || !window.localStorage) {
    return false;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.warn(`[Storage] Failed to write key "${key}". Storage quota exceeded or disabled.`, error);
    return false;
  }
}

export function removeStorageItem(key: string): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Storage] Failed to remove key "${key}".`, error);
  }
}

export const STORAGE_KEYS = {
  CART: 'shopsphere_cart_v1',
  WISHLIST: 'shopsphere_wishlist_v1',
  AUTH: 'shopsphere_auth_v1',
  ORDERS: 'shopsphere_demo_orders_v1',
  PREFERENCES: 'shopsphere_user_preferences_v1',
} as const;
