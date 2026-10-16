/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-09A — Enterprise Axios HTTP Client Layer
 * Module 9: REST API Integration with TypeScript (Units 9.1, 9.2, 9.3, 9.4)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Build a resilient Axios HTTP client with request/response
 *    interceptors, bearer token attachment, correlation IDs, and error normalization.
 * 📖 Reference Spec: change-requests/CR-09A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/services/axiosClient.ts
 * ============================================================================
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '../config/appConfig';
import { HttpError, logger } from './logger';
import { Product } from '../types';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from './mockData';

// 📝 STEP 1: Create Configured Axios Instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: appConfig.timeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 📝 STEP 2: Request Interceptor (Auth Token & Correlation ID)
// 🛠️ WHAT TO DO:
//    1. Attach 'X-Correlation-Id' header with a unique request identifier.
//    2. Read 'shopsphere_auth' from localStorage; if present with a token,
//       attach 'Authorization: Bearer <token>'.
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    const correlationId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    config.headers.set('X-Correlation-Id', correlationId);

    try {
      const storedAuth = localStorage.getItem('shopsphere_auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed.token) {
          config.headers.set('Authorization', `Bearer ${parsed.token}`);
        }
      }
    } catch {
      // Ignore parse error
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 📝 STEP 3: Response Interceptor (Error Normalization)
// 🛠️ WHAT TO DO:
//    Normalize raw Axios errors into custom HttpError instances with status and context.
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'Network communication failure';

    const normalizedError = new HttpError(message, status, {
      url: error.config?.url,
      method: error.config?.method,
      statusText: error.response?.statusText,
    });

    return Promise.reject(normalizedError);
  }
);

// 📝 STEP 4: Type-Safe Service Wrapper with Mock Fallbacks
export const axiosService = {
  async get<T>(url: string, config?: AxiosRequestConfig, fallback?: T): Promise<T> {
    try {
      const response = await axiosInstance.get<T>(url, config);
      return response.data;
    } catch (err) {
      if (fallback !== undefined) {
        logger.warn(`[Axios Fallback] Falling back to mock data for ${url}`);
        return fallback;
      }
      throw err;
    }
  },

  async post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  async put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },

  async getProducts(limit?: number): Promise<Product[]> {
    const params = limit ? { limit } : undefined;
    return this.get<Product[]>('/products', { params }, FALLBACK_PRODUCTS);
  },

  async getProductById(id: number): Promise<Product> {
    const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id) || FALLBACK_PRODUCTS[0];
    return this.get<Product>(`/products/${id}`, undefined, fallback);
  },

  async getCategories(): Promise<string[]> {
    return this.get<string[]>('/products/categories', undefined, FALLBACK_CATEGORIES);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const fallback = FALLBACK_PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    return this.get<Product[]>(`/products/category/${encodeURIComponent(category)}`, undefined, fallback);
  },

  async createProduct(newProduct: Omit<Product, 'id'>): Promise<Product> {
    try {
      return await this.post<Product>('/products', newProduct);
    } catch {
      return { id: Date.now(), ...newProduct, rating: { rate: 5.0, count: 1 } };
    }
  },

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    try {
      return await this.put<Product>(`/products/${id}`, updates);
    } catch {
      const fallbackItem = FALLBACK_PRODUCTS.find((p) => p.id === id);
      return { ...fallbackItem, ...updates, id: fallbackItem ? fallbackItem.id : id } as Product;
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    try {
      await this.delete(`/products/${id}`);
      return true;
    } catch {
      return true;
    }
  },
};
