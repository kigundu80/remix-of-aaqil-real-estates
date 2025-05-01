
import React, { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Database, Users, Search, DollarSign, Bitcoin, Bell } from "lucide-react";
import { UserDataTable } from "./UserDataTable";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const VIPAdminPanel: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("btc");
  const [conversionRate, setConversionRate] = useState(0.00005);
  const [isConverted, setIsConverted] = useState(false);
  const [accountNumber, setAccountNumber] = useState("01310016042209");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { toast } = useToast();

  // Mock conversion rates - in a real app this would come from an API
  const conversionRates = {
    btc: 0.00005,
    eth: 0.0008,
    usdt: 1.0,
    sol: 0.05,
    ugx: 3.75 // 1 data point ≈ 3.75 UGX
  };

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setConversionRate(conversionRates[value as keyof typeof conversionRates]);
  };

  const handleConvertData = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsConverted(true);
      
      if (notificationsEnabled) {
        toast({
          title: "Conversion Complete",
          description: `User data has been successfully converted to ${currency.toUpperCase()} and sent to account ${accountNumber}.`,
        });
      } else {
        toast({
          title: "Conversion Complete",
          description: "User data has been successfully converted to digital currency.",
        });
      }
    }, 1500);
  };

  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: `User data has been exported in ${currency.toUpperCase()} format to account ${accountNumber}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">VIP Admin Panel</h1>
        <p className="text-muted-foreground">Convert user data to digital currency</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,254</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Data Points
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,760</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {conversionRate} {currency.toUpperCase()}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Status
            </CardTitle>
            <Bitcoin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className="text-2xl font-bold mr-2">
                {isConverted ? "Complete" : "Pending"}
              </span>
              <Badge variant={isConverted ? "default" : "outline"}>
                {isConverted ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                onValueChange={handleCurrencyChange}
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
              onClick={handleExportData}
              disabled={!isConverted || isLoading}
            >
              Export Data
            </Button>
            <Button 
              onClick={handleConvertData}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? "Converting..." : "Convert Data"}
              {notificationsEnabled && <Bell className="h-4 w-4 ml-1" />}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription>
              User engagement and conversion metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[230px] flex items-center justify-center bg-muted rounded-md">
              <p className="text-muted-foreground">Analytics visualization will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle>User Data</CardTitle>
          <CardDescription>
            View and manage user data for currency conversion
          </CardDescription>
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <UserDataTable 
            searchQuery={searchQuery} 
            isConverted={isConverted} 
            currencyType={currency} 
            notificationsEnabled={notificationsEnabled}
            accountNumber={accountNumber}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <p className="text-xs text-muted-foreground">
            Showing {Math.min(4, isConverted ? 4 : 0)} of 1,254 users with converted data
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VIPAdminPanel;
