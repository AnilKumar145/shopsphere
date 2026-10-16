/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-07A — Custom Hook: useCountdownTimer
 * Module 7: React Hooks with TypeScript (Units 7.1, 7.2, 7.8, 7.9)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Encapsulate countdown interval lifecycle with unmount cleanup
 *    and start/pause/reset control methods.
 * 📖 Reference Spec: change-requests/CR-07A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/hooks/useCountdownTimer.ts
 * ============================================================================
 */

import { useState, useCallback } from 'react';

export interface CountdownTimerReturn {
  secondsRemaining: number;
  isActive: boolean;
  start: () => void;
  pause: () => void;
  reset: (newSeconds?: number) => void;
}

/**
 * 📝 STEP 1: State Initialization
 * 📝 STEP 2: Timer Interval Lifecycle & Clear on Unmount
 * 📝 STEP 3: Control Actions
 */
export function useCountdownTimer(initialSeconds: number, onExpire?: () => void): CountdownTimerReturn {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  void onExpire;
  const [secondsRemaining] = useState<number>(initialSeconds);
  const [isActive] = useState<boolean>(false);

  const start = useCallback(() => {}, []);
  const pause = useCallback(() => {}, []);
  const reset = useCallback((newSeconds?: number) => {
    void newSeconds;
  }, []);

  return { secondsRemaining, isActive, start, pause, reset };
}
