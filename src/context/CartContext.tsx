/**
 * Cart Context with useReducer
 * Demonstrates 5.4 (Array State), 5.6 (useReducer Hook), 7.4 (useContext), 10.2, 10.3 (Context with Reducers)
 */

import React, { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { calculateCartTotals, CartTotals } from '../utils/cartCalculations';
import { getStorageItem, setStorageItem, STORAGE_KEYS } from '../utils/storage';

// 5.6 Discriminated Union Actions
export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE_CART'; payload: { items: CartItem[] } };

export interface CartContextValue {
  items: readonly CartItem[];
  totals: CartTotals;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.findIndex((item) => item.product.id === product.id);

      if (existingIndex > -1) {
        return state.map((item, idx) => {
          if (idx === existingIndex) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      }

      return [...state, { product, quantity }];
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.product.id !== action.payload.productId);

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((item) => item.product.id !== productId);
      }
      return state.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'HYDRATE_CART':
      return action.payload.items;

    default:
      return state;
  }
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export interface CartProviderProps {
  children: ReactNode;
  initialItems?: CartItem[];
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, initialItems }) => {
  // 5.2 Initial state with hydration from localStorage
  const [items, dispatch] = useReducer(
    cartReducer,
    initialItems || getStorageItem<CartItem[]>(STORAGE_KEYS.CART, [])
  );

  // Sync to localStorage on cart change
  useEffect(() => {
    setStorageItem(STORAGE_KEYS.CART, items);
  }, [items]);

  // Derived state memoized (5.7 State Design & 7.5 useMemo)
  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: number): number => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      totals,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
    }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
