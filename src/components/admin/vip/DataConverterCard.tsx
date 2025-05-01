
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

interface DataConverterCardProps {
  accountNumber: string;
  setAccountNumber: (value: string) => void;
  currency: string;
  onCurrencyChange: (value: string) => void;
  conversionRate: number;
  setConversionRate: (value: number) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  onConvertData: () => void;
  onExportData: () => void;
  isLoading: boolean;
  isConverted: boolean;
}

export const DataConverterCard: React.FC<DataConverterCardProps> = ({
  accountNumber,
  setAccountNumber,
  currency,
  onCurrencyChange,
  conversionRate,
  setConversionRate,
  notificationsEnabled,
  setNotificationsEnabled,
  onConvertData,
  onExportData,
  isLoading,
  isConverted
}) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Data Converter</CardTitle>
        <CardDescription>
          Convert user data to digital currency format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="account">Receiving Account</Label>
          <Input
            id="account"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />
          <p className="text-xs text-muted-foreground">
            Converted currency will be sent to this account
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="currency">Target Currency</Label>
          <Select
            value={currency}
            onValueChange={onCurrencyChange}
          >
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
              <SelectItem value="eth">Ethereum (ETH)</SelectItem>
              <SelectItem value="usdt">Tether (USDT)</SelectItem>
              <SelectItem value="sol">Solana (SOL)</SelectItem>
              <SelectItem value="ugx">Uganda Shillings (UGX)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rate">Conversion Rate</Label>
          <div className="flex items-center">
            <Input
              id="rate"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              type="number"
              step="0.00001"
              min="0"
            />
            <span className="ml-2 text-sm text-muted-foreground">
              {currency.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="notifications"
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
          <Label htmlFor="notifications" className="cursor-pointer">
            Enable transaction notifications
          </Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onExportData}
          disabled={!isConverted || isLoading}
        >
          Export Data
        </Button>
        <Button 
          onClick={onConvertData}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {isLoading ? "Converting..." : "Convert Data"}
          {notificationsEnabled && <Bell className="h-4 w-4 ml-1" />}
        </Button>
      </CardFooter>
    </Card>
  );
};
