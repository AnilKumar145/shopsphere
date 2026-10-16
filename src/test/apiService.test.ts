import { describe, it, expect, vi, beforeEach } from 'vitest';
import { apiService, ApiError } from '../services/api';
import { FALLBACK_PRODUCTS } from '../services/mockData';

describe('apiService REST integration (Unit 9.2, 9.6, 9.7, 14.6)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches products successfully with mocked fetch response', async () => {
    const mockProducts = [FALLBACK_PRODUCTS[0]];
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const data = await apiService.getProducts(1);
    expect(data).toEqual(mockProducts);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/products?limit=1'),
      expect.any(Object)
    );
  });

  it('falls back to mock catalog data when network request fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const data = await apiService.getProducts();
    // Should gracefully return fallback products rather than crashing
    expect(data).toHaveLength(FALLBACK_PRODUCTS.length);
  });

  it('throws ApiError with status when server returns 401 on login', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: 'Unauthorized',
      json: async () => ({ message: 'Bad credentials' }),
    });

    await expect(
      apiService.login({ username: 'wrong', password: 'bad' })
    ).rejects.toThrow(ApiError);
  });
});
