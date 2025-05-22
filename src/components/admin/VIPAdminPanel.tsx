
import React from "react";
import { useVipAdminState } from "@/hooks/useVipAdminState";
import { VipStatCards } from "./vip/VipStatCards";
import { DataConverterCard } from "./vip/DataConverterCard";
import { UserAnalyticsCard } from "./vip/UserAnalyticsCard";
import { UserDataCard } from "./vip/UserDataCard";

const VIPAdminPanel: React.FC = () => {
  const {
    isLoading,
    searchQuery,
    setSearchQuery,
    currency,
    conversionRate,
    setConversionRate,
    isConverted,
    accountNumber,
    setAccountNumber,
    notificationsEnabled,
    setNotificationsEnabled,
    handleCurrencyChange,
    handleConvertData,
    handleExportData
  } = useVipAdminState();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">VIP Admin Panel</h1>
        <p className="text-muted-foreground">Convert user data to digital currency</p>
      </div>

      <VipStatCards 
        conversionRate={conversionRate} 
        currency={currency} 
        isConverted={isConverted}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <DataConverterCard
          accountNumber={accountNumber}
          setAccountNumber={setAccountNumber}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
          conversionRate={conversionRate}
          setConversionRate={setConversionRate}
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          onConvertData={handleConvertData}
          onExportData={handleExportData}
          isLoading={isLoading}
          isConverted={isConverted}
        />

        <UserAnalyticsCard />
      </div>

      <UserDataCard 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isConverted={isConverted}
        currencyType={currency}
        notificationsEnabled={notificationsEnabled}
        accountNumber={accountNumber}
      />
    </div>
  );
};

export default VIPAdminPanel;
