
import React from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyValue } from "@/utils/currencyUtils";
import { UserData } from "@/types/admin";

interface UserTableRowProps {
  user: UserData;
  isConverted: boolean;
  currencyType: string;
}

export const UserTableRow: React.FC<UserTableRowProps> = ({ 
  user, 
  isConverted, 
  currencyType 
}) => {
  return (
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
  );
};
