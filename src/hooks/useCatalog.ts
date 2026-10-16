/**
 * Catalog data fetching using TanStack Query
 * Demonstrates 9.9 TanStack Query: Queries, Query Keys, Cache Invalidation, Refetching
 */

import { useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';
import { Product } from '../types';

export const queryKeys = {
  products: ['products'] as const,
  product: (id: number) => ['product', id] as const,
  categories: ['categories'] as const,
  categoryProducts: (category: string) => ['categoryProducts', category] as const,
};

export function useProducts() {
  return useQuery<Product[], Error>({
    queryKey: queryKeys.products,
    queryFn: () => apiService.getProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutes cache freshness
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useProductDetail(id: number) {
  return useQuery<Product, Error>({
    queryKey: queryKeys.product(id),
    queryFn: ({ signal }) => apiService.getProductById(id, signal),
    enabled: !isNaN(id) && id > 0,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

export function useCategories() {
  return useQuery<string[], Error>({
    queryKey: queryKeys.categories,
    queryFn: () => apiService.getCategories(),
    staleTime: 15 * 60 * 1000, // Categories change rarely
  });
}
