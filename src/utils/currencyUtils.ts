
// Currency symbols mapping
const currencySymbols: Record<string, string> = {
  btc: "₿",
  eth: "Ξ",
  usdt: "$",
  sol: "◎",
  ugx: "USh"
};

// Currency conversion rates (simplified)
const conversionRates: Record<string, number> = {
  btc: 1,
  eth: 16, // 1 BTC = 16 ETH (approximate)
  usdt: 20000, // 1 BTC = 20000 USDT (approximate)
  sol: 1000, // 1 BTC = 1000 SOL (approximate)
  ugx: 75000000 // 1 BTC = 75,000,000 UGX (approximate)
};

/**
 * Formats a BTC value to the specified currency with appropriate formatting
 * 
 * @param btcValue - The Bitcoin value to convert
 * @param targetCurrency - The currency to convert to (btc, eth, usdt, sol, ugx)
 * @returns Formatted currency string with symbol
 */
export const formatCurrencyValue = (btcValue: number, targetCurrency: string): string => {
  const convertedValue = btcValue * conversionRates[targetCurrency as keyof typeof conversionRates];
  
  // Format based on currency type
  if (targetCurrency === "usdt") {
    return `${currencySymbols[targetCurrency]}${convertedValue.toFixed(2)}`;
  } else if (targetCurrency === "ugx") {
    return `${currencySymbols[targetCurrency]} ${convertedValue.toLocaleString()}`;
  } else {
    return `${currencySymbols[targetCurrency]}${convertedValue.toFixed(6)}`;
  }
};

/**
 * Formats a UGX value to a readable currency string
 * 
 * @param value - The UGX value to format
 * @returns Formatted currency string with UGX prefix
 */
export const formatCurrency = (value: number): string => {
  return `UGX ${value.toLocaleString()}`;
};

export { currencySymbols, conversionRates };
