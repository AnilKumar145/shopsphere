/**
 * Wishlist Context with localStorage persistence
 * Demonstrates 5.4, 7.4, 10.2
 */

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product, WishlistItem } from '../types';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useCart } from './CartContext';

export interface WishlistContextValue {
  items: readonly WishlistItem[];
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  moveToCart: (product: Product) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>(() =>
    getStorageItem<WishlistItem[]>(STORAGE_KEYS.WISHLIST, [])
  );

  const { addItem } = useCart();

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.WISHLIST, items);
  }, [items]);

  const isInWishlist = (productId: number): boolean => {
    return items.some((item) => item.product.id === productId);
  };

  const toggleWishlist = (product: Product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        return prev.filter((item) => item.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const moveToCart = (product: Product) => {
    addItem(product, 1);
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setItems([]);
  };

  const value = useMemo<WishlistContextValue>(
    () => ({
      items,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      moveToCart,
      clearWishlist,
      count: items.length,
    }),
    [items]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
