
import React from "react";
import { Search } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserDataTable } from "@/components/admin/UserDataTable";

interface UserDataCardProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isConverted: boolean;
  currencyType: string;
  notificationsEnabled: boolean;
  accountNumber: string;
}

export const UserDataCard: React.FC<UserDataCardProps> = ({
  searchQuery,
  setSearchQuery,
  isConverted,
  currencyType,
  notificationsEnabled,
  accountNumber
}) => {
  return (
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
          currencyType={currencyType} 
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
  );
};
