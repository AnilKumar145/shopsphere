import { describe, it, expect, beforeEach } from 'vitest';
import { logger, HttpError, ValidationError } from '../services/logger';

describe('Centralized Logger & Exception Handling', () => {
  beforeEach(() => {
    logger.clear();
  });

  it('records structured info, warn, and error log events', () => {
    logger.info('User navigating to catalog', { route: '/products' });
    logger.warn('Inventory below threshold', { productId: 5, stock: 2 });
    logger.error('Failed transaction', new Error('Gateway timeout'));

    const history = logger.getLogs();
    expect(history.length).toBe(3);
    expect(history[0]?.level).toBe('info');
    expect(history[0]?.message).toBe('User navigating to catalog');
    expect(history[1]?.level).toBe('warn');
    expect(history[2]?.level).toBe('error');
  });

  it('instantiates custom HttpError with HTTP status code', () => {
    const error = new HttpError('Resource not found', 404, { endpoint: '/products/999' });
    expect(error.name).toBe('HttpError');
    expect(error.status).toBe(404);
    expect(error.code).toBe('HTTP_404');
    expect(error.context?.endpoint).toBe('/products/999');
  });

  it('instantiates ValidationError with field error mappings', () => {
    const error = new ValidationError('Invalid checkout data', {
      cardNumber: 'Luhn validation failed',
      zipCode: 'Must be 5 digits',
    });

    expect(error.name).toBe('ValidationError');
    expect(error.fieldErrors.cardNumber).toBe('Luhn validation failed');
    expect(error.fieldErrors.zipCode).toBe('Must be 5 digits');
  });

  it('clears log history when requested', () => {
    logger.info('Test log');
    expect(logger.getLogs().length).toBe(1);
    logger.clear();
    expect(logger.getLogs().length).toBe(0);
  });
});
