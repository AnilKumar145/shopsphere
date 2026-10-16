/**
 * Centralized REST API Service Layer
 * Demonstrating Module 9: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8
 */

import { Product, User } from '../types';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from './mockData';

const BASE_URL = 'https://fakestoreapi.com';

export class ApiError extends Error {
  public status?: number;
  public isFallback: boolean;

  constructor(message: string, status?: number, isFallback: boolean = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isFallback = isFallback;
  }
}

// 9.3 & 9.8 Data Transformation & DTOs
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

// 9.2 Typed fetch wrapper with AbortController cancellation & error handling
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackData?: T
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

  const mergedSignal = options.signal || controller.signal;

  try {
    const res = await fetch(url, {
      ...options,
      signal: mergedSignal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new ApiError(`Request failed with status ${res.status}: ${res.statusText}`, res.status);
    }

    const data = (await res.json()) as T;
    return data;
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    if (fallbackData !== undefined) {
      console.warn(`[API] Fallback used for ${endpoint}:`, err);
      return fallbackData;
    }

    if (err instanceof ApiError) {
      throw err;
    }

    const message = err instanceof Error ? err.message : 'An unknown network error occurred';
    throw new ApiError(message, 500);
  }
}

export const apiService = {
  // 9.6 GET Products
  async getProducts(limit?: number): Promise<Product[]> {
    const endpoint = limit ? `/products?limit=${limit}` : '/products';
    return request<Product[]>(endpoint, { method: 'GET' }, FALLBACK_PRODUCTS);
  },

  // 9.6 GET Single Product by ID
  async getProductById(id: number, signal?: AbortSignal): Promise<Product> {
    const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id);
    return request<Product>(`/products/${id}`, { method: 'GET', signal }, fallback);
  },

  // 9.6 GET Categories
  async getCategories(): Promise<string[]> {
    return request<string[]>('/products/categories', { method: 'GET' }, FALLBACK_CATEGORIES);
  },

  // 9.6 GET Products by Category
  async getProductsByCategory(category: string): Promise<Product[]> {
    const fallback = FALLBACK_PRODUCTS.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return request<Product[]>(
      `/products/category/${encodeURIComponent(category)}`,
      { method: 'GET' },
      fallback
    );
  },

  // 9.6 POST Login
  async login(credentials: LoginCredentials): Promise<LoginResponseDto> {
    return request<LoginResponseDto>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // 9.6 GET User Profile
  async getUserProfile(userId: number): Promise<User> {
    return request<User>(`/users/${userId}`, { method: 'GET' });
  },

  // 9.6 CRUD Demonstrations: PUT & DELETE (Module 9.6 type-safe payloads)
  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    return request<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  async deleteProduct(id: number): Promise<{ id: number }> {
    return request<{ id: number }>(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
