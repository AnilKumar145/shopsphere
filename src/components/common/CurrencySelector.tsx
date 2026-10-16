import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setCurrency, CurrencyCode } from '../../store/slices/preferencesSlice';
import { Globe } from 'lucide-react';
import './CurrencySelector.css';

export const CurrencySelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentCurrency = useAppSelector((state) => state.preferences.currency);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(e.target.value as CurrencyCode));
  };

  return (
    <div className="currency-selector" title="Select Display Currency">
      <Globe size={15} className="currency-selector__icon" />
      <select
        value={currentCurrency}
        onChange={handleChange}
        className="currency-selector__select"
        aria-label="Currency Selection"
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="JPY">JPY (¥)</option>
      </select>
    </div>
  );
};
