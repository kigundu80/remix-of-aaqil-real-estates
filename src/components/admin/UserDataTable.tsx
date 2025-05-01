
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface UserDataTableProps {
  searchQuery: string;
  isConverted: boolean;
  currencyType: string;
}

// Sample user data for demonstration
const usersData = [
  {
    id: "1",
    name: "Kiggundu Akram",
    email: "akram@hmproperty.com",
    dataPoints: 35,
    value: 0.00175, // BTC value
    lastActive: "2023-09-24",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    dataPoints: 28,
    value: 0.00140, // BTC value
    lastActive: "2023-09-22",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    dataPoints: 21,
    value: 0.00105, // BTC value
    lastActive: "2023-08-15",
    status: "inactive",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    dataPoints: 15,
    value: 0.00075, // BTC value
    lastActive: "2023-09-18",
    status: "pending",
  },
];

// Currency symbols mapping
const currencySymbols: Record<string, string> = {
  btc: "₿",
  eth: "Ξ",
  usdt: "$",
  sol: "◎"
};

// Currency conversion rates (simplified)
const conversionRates: Record<string, number> = {
  btc: 1,
  eth: 16, // 1 BTC = 16 ETH (approximate)
  usdt: 20000, // 1 BTC = 20000 USDT (approximate)
  sol: 1000 // 1 BTC = 1000 SOL (approximate)
};

export const UserDataTable: React.FC<UserDataTableProps> = ({ 
  searchQuery,
  isConverted,
  currencyType
}) => {
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to convert and format currency values
  const formatCurrencyValue = (btcValue: number, targetCurrency: string) => {
    const convertedValue = btcValue * conversionRates[targetCurrency];
    
    // Format based on currency type
    if (targetCurrency === "usdt") {
      return `${currencySymbols[targetCurrency]}${convertedValue.toFixed(2)}`;
    } else {
      return `${currencySymbols[targetCurrency]}${convertedValue.toFixed(6)}`;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Data Points</TableHead>
            <TableHead>Converted Value</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </TableCell>
                <TableCell>{user.dataPoints}</TableCell>
                <TableCell className="font-mono">
                  {isConverted ? (
                    formatCurrencyValue(user.value, currencyType)
                  ) : (
                    <span className="text-muted-foreground">Pending</span>
                  )}
                </TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active" ? "default" :
                      user.status === "inactive" ? "secondary" : "outline"
                    }
                    className="capitalize"
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
