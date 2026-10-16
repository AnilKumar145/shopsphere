/**
 * Render Props Pattern Demonstration
 * Demonstrates 12.4 Render Props: Render Props, Function-as-Child, Typing Render Functions
 */

import React, { useState, ReactNode } from 'react';

export interface RenderPropsTogglerState {
  isOn: boolean;
  toggle: () => void;
  setOn: () => void;
  setOff: () => void;
}

export interface RenderPropsTogglerProps {
  initialState?: boolean;
  children: (state: RenderPropsTogglerState) => ReactNode;
}

export function RenderPropsToggler({
  initialState = false,
  children,
}: RenderPropsTogglerProps): React.JSX.Element {
  const [isOn, setIsOn] = useState<boolean>(initialState);

  const toggle = () => setIsOn((prev) => !prev);
  const setOn = () => setIsOn(true);
  const setOff = () => setIsOn(false);

  return <>{children({ isOn, toggle, setOn, setOff })}</>;
}
