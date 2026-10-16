/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07A — Custom Hook: useCountdownTimer
 * Module 7: React Hooks with TypeScript (Units 7.1, 7.2, 7.8, 7.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Encapsulate countdown interval lifecycle with unmount cleanup
 *    and start/pause/reset control methods.
 * 📁 Reference: shopsphere-solution/src/hooks/useCountdownTimer.ts
 * ============================================================================
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface CountdownTimerReturn {
  secondsRemaining: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: (newSeconds?: number) => void;
}

export function useCountdownTimer(initialSeconds: number, onExpire?: () => void): CountdownTimerReturn {
  // 📝 STEP 1: State Initialization
  // TODO: Manage secondsRemaining and isActive state
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // 📝 STEP 2: Timer Interval Lifecycle
  // TODO: Setup setInterval with useEffect and ensure clearInterval on unmount
  useEffect(() => {
    if (!isActive) return;

    const intervalId = window.setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          setIsActive(false);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isActive]);

  const start = useCallback(() => setIsActive(true), []);
  const pause = useCallback(() => setIsActive(false), []);
  const reset = useCallback((newSeconds?: number) => {
    setIsActive(false);
    setSecondsRemaining(newSeconds ?? initialSeconds);
  }, [initialSeconds]);

  return { secondsRemaining, isActive, start, pause, reset };
}
