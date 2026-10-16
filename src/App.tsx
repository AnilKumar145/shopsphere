/**
 * Main ShopSphere Application Root
 * Demonstrates Module 10: 10.4 Global State Architecture, 10.6 Redux Toolkit Provider, 10.7 State Selection
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AppRouter } from './router';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// 9.9 TanStack Query Client Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <AppRouter />
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

export default App;
