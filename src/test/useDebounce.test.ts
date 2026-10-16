import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce custom hook (Unit 7.8, 14.5)', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('debounces value updates according to delay', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: 'first', delay: 300 } }
    );

    expect(result.current).toBe('first');

    // Change input value
    rerender({ val: 'second', delay: 300 });

    // Should still be 'first' prior to timer expiration
    expect(result.current).toBe('first');

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second');
    vi.useRealTimers();
  });
});
