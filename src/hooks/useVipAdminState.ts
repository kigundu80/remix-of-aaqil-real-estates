
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getConversionDescription, getExportDescription } from "@/utils/adminConversionUtils";

interface UseVipAdminStateProps {
  initialCurrency?: string;
  initialAccountNumber?: string;
}

export const useVipAdminState = ({
  initialCurrency = "btc",
  initialAccountNumber = "01310016042209"
}: UseVipAdminStateProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState(initialCurrency);
  const [conversionRate, setConversionRate] = useState(0.00005);
  const [isConverted, setIsConverted] = useState(false);
  const [accountNumber, setAccountNumber] = useState(initialAccountNumber);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  // Handle currency change
  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    const conversionRates = {
      btc: 0.00005,
      eth: 0.0008,
      usdt: 1.0,
      sol: 0.05,
      ugx: 3.75
    };
    setConversionRate(conversionRates[value as keyof typeof conversionRates]);
  };

  // Handle conversion of data
  const handleConvertData = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsConverted(true);
      
      toast({
        title: "Conversion Complete",
        description: getConversionDescription(currency, notificationsEnabled, accountNumber),
      });
    }, 1500);
  };

  // Handle export of data
  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: getExportDescription(currency, accountNumber),
    });
  };

  return {
    isLoading,
    searchQuery,
    setSearchQuery,
    currency,
    setCurrency,
    conversionRate,
    setConversionRate,
    isConverted,
    setIsConverted,
    accountNumber,
    setAccountNumber,
    notificationsEnabled,
    setNotificationsEnabled,
    handleCurrencyChange,
    handleConvertData,
    handleExportData
  };
};
