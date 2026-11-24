import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_EXCHANGE_RATE, formatPriceByMode, usdToKhr, formatUsd, formatKhr } from '../utils/currency';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Exchange rate: 1 USD = rate in KHR
  const [exchangeRate, setExchangeRateState] = useState(() => {
    const saved = localStorage.getItem('seafood_exchange_rate');
    return saved ? parseInt(saved, 10) : DEFAULT_EXCHANGE_RATE;
  });

  // Display mode: 'dual' | 'usd' | 'khr'
  const [displayMode, setDisplayModeState] = useState(() => {
    return localStorage.getItem('seafood_currency_mode') || 'dual';
  });

  useEffect(() => {
    localStorage.setItem('seafood_exchange_rate', exchangeRate.toString());
  }, [exchangeRate]);

  useEffect(() => {
    localStorage.setItem('seafood_currency_mode', displayMode);
  }, [displayMode]);

  const setExchangeRate = (newRate) => {
    const rateNum = parseInt(newRate, 10);
    if (!isNaN(rateNum) && rateNum > 0) {
      setExchangeRateState(rateNum);
    }
  };

  const setDisplayMode = (mode) => {
    if (['dual', 'usd', 'khr'].includes(mode)) {
      setDisplayModeState(mode);
    }
  };

  // Helper function to format any USD price according to current settings
  const formatPrice = (usdAmount) => {
    return formatPriceByMode(usdAmount, displayMode, exchangeRate);
  };

  // Helper to convert USD to KHR with current rate
  const convertUsdToKhr = (usdAmount) => {
    return usdToKhr(usdAmount, exchangeRate);
  };

  return (
    <CurrencyContext.Provider
      value={{
        exchangeRate,
        setExchangeRate,
        displayMode,
        setDisplayMode,
        formatPrice,
        convertUsdToKhr,
        formatUsd,
        formatKhr
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
