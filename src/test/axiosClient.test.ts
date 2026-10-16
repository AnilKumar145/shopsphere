import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axiosService, axiosInstance } from '../services/axiosClient';
import { FALLBACK_PRODUCTS } from '../services/mockData';

describe('Axios Client & REST Integration Layer', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('provides an axios instance with configured baseURL and timeout', () => {
    expect(axiosInstance.defaults.baseURL).toBeDefined();
    expect(axiosInstance.defaults.timeout).toBeGreaterThan(0);
    expect(axiosInstance.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('falls back to seeded mock catalog data when network request encounters an error', async () => {
    vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('Network offline'));

    const products = await axiosService.getProducts();
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBe(FALLBACK_PRODUCTS.length);
  });

  it('retrieves single product by id with fallback support', async () => {
    vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('Gateway timeout'));

    const product = await axiosService.getProductById(1);
    expect(product).toBeDefined();
    expect(product.id).toBe(1);
  });

  it('returns categories list gracefully with network mock or fallback', async () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: ['electronics', 'jewelery', 'clothing']
    });

    const categories = await axiosService.getCategories();
    expect(categories).toBeDefined();
    expect(categories).toContain('electronics');
  });
});
