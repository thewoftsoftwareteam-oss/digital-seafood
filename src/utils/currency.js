/**
 * Precise currency conversion utilities for USD ($) and Khmer Riel (៛)
 */

// Default exchange rate: 1 USD = 4,100 KHR
export const DEFAULT_EXCHANGE_RATE = 4100;

/**
 * Converts USD amount to KHR rounded to the nearest 100 Riels (standard Cambodian cash unit)
 */
export function usdToKhr(usdAmount, rate = DEFAULT_EXCHANGE_RATE) {
  if (!usdAmount || isNaN(usdAmount)) return 0;
  const rawKhr = usdAmount * rate;
  // Round to nearest 100 Riel (e.g., 4125 -> 4100, 4175 -> 4200)
  return Math.round(rawKhr / 100) * 100;
}

/**
 * Formats USD number into clean currency string ($12.50)
 */
export function formatUsd(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  return `$${Number(amount).toFixed(2)}`;
}

/**
 * Formats Khmer Riel number into clean formatted string with commas (61,500 ៛)
 */
export function formatKhr(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '0 ៛';
  return `${Number(amount).toLocaleString('en-US')} ៛`;
}

/**
 * Returns formatted dual price string or individual based on display mode
 * modes: 'dual' | 'usd' | 'khr'
 */
export function formatPriceByMode(usdAmount, mode = 'dual', rate = DEFAULT_EXCHANGE_RATE) {
  const usdStr = formatUsd(usdAmount);
  const khrStr = formatKhr(usdToKhr(usdAmount, rate));

  if (mode === 'usd') {
    return { primary: usdStr, secondary: null };
  }
  if (mode === 'khr') {
    return { primary: khrStr, secondary: null };
  }
  // Dual mode
  return {
    primary: usdStr,
    secondary: khrStr
  };
}
