/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-09A — Axios HTTP Client with Interceptors & Fallbacks
 * Module 9: REST API Integration with TypeScript (Units 9.1, 9.2, 9.7, 9.8)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Configure Axios instance with correlation headers, bearer auth,
 *    structured error normalization, and mock catalog fallback resilience.
 * 📁 Reference: shopsphere-solution/src/services/axiosClient.ts
 * ============================================================================
 */

/**
 * Enterprise Axios HTTP Client Layer
 * Demonstrates Module 9: REST API Integration with TypeScript
 * Features: Request/Response Interceptors, Auth Header Injection, Error Normalization, Timeout & Retry Fallbacks
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { appConfig } from '../config/appConfig';
import { HttpError, logger } from './logger';
import { Product } from '../types';
import { FALLBACK_PRODUCTS, FALLBACK_CATEGORIES } from './mockData';

// 1. Create configured Axios client instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.apiUrl,
  timeout: appConfig.timeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// 2. Request Interceptor: Attach Auth Token and Request Correlation ID
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const correlationId = `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    config.headers.set('X-Correlation-Id', correlationId);

    // Retrieve auth token from localStorage if present
    try {
      const storedAuth = localStorage.getItem('shopsphere_auth');
      if (storedAuth) {
        const parsed = JSON.parse(storedAuth);
        if (parsed.token) {
          config.headers.set('Authorization', `Bearer ${parsed.token}`);
        }
      }
    } catch {
      // Ignore JSON parse errors in storage
    }

    logger.debug(`[Axios Outgoing] ${config.method?.toUpperCase()} ${config.url}`, {
      correlationId,
      params: config.params,
    });

    return config;
  },
  (error) => {
    logger.error('[Axios Request Error]', error);
    return Promise.reject(error);
  }
);

// 3. Response Interceptor: Latency tracking and error normalization
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.debug(`[Axios Success] ${response.status} ${response.config.url}`, {
      status: response.status,
    });
    return response;
  },
  (error) => {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'Network communication failure';

    const normalizedError = new HttpError(message, status, {
      url: error.config?.url,
      method: error.config?.method,
      statusText: error.response?.statusText,
    });

    logger.error(`[Axios Response Error ${status}] ${error.config?.url}`, normalizedError);
    return Promise.reject(normalizedError);
  }
);

// 4. Type-safe Axios Service Wrapper with Resilient Mock Fallbacks
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

  // Specialized Domain Endpoints using Axios
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
      // Mock creation when external API is offline
      return {
        id: Date.now(),
        ...newProduct,
        rating: { rate: 5.0, count: 1 },
      };
    }
  },

  async updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    try {
      return await this.put<Product>(`/products/${id}`, updates);
    } catch {
      const fallbackItem = FALLBACK_PRODUCTS.find((p) => p.id === id);
      const safeId = fallbackItem ? fallbackItem.id : id;
      return { ...fallbackItem, ...updates, id: safeId } as Product;
    }
  },

  async deleteProduct(id: number): Promise<boolean> {
    try {
      await this.delete(`/products/${id}`);
      return true;
    } catch {
      return true; // Graceful mock fallback
    }
  },
};
