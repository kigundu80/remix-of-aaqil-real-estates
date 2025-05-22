
// Conversion rates for admin panel
export const conversionRates = {
  btc: 0.00005,
  eth: 0.0008,
  usdt: 1.0,
  sol: 0.05,
  ugx: 3.75 // 1 data point ≈ 3.75 UGX
};

/**
 * Formats a description for data conversion toast based on notification settings
 * @param currency The currency type in uppercase format
 * @param notificationsEnabled Whether notifications are enabled
 * @param accountNumber The account number receiving the converted data
 * @returns Formatted description for toast message
 */
export const getConversionDescription = (
  currency: string, 
  notificationsEnabled: boolean, 
  accountNumber: string
): string => {
  if (notificationsEnabled) {
    return `User data has been successfully converted to ${currency.toUpperCase()} and sent to account ${accountNumber}.`;
  } else {
    return "User data has been successfully converted to digital currency.";
  }
};

/**
 * Formats a description for data export toast
 * @param currency The currency type in uppercase format
 * @param accountNumber The account number receiving the exported data
 * @returns Formatted description for toast message
 */
export const getExportDescription = (
  currency: string, 
  accountNumber: string
): string => {
  return `User data has been exported in ${currency.toUpperCase()} format to account ${accountNumber}.`;
};
