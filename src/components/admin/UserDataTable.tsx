
import React from "react";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { DataTableHeader } from "./data-table/DataTableHeader";
import { UserTableRow } from "./data-table/UserTableRow";
import { EmptyTableRow } from "./data-table/EmptyTableRow";
import { usersData } from "@/data/mockUserData";

interface UserDataTableProps {
  searchQuery: string;
  isConverted: boolean;
  currencyType: string;
  notificationsEnabled: boolean;
  accountNumber: string;
}

export const UserDataTable: React.FC<UserDataTableProps> = ({ 
  searchQuery,
  isConverted,
  currencyType,
  notificationsEnabled,
  accountNumber
}) => {
  const columns = ["User", "Data Points", "Converted Value", "Last Active", "Status"];
  
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <DataTableHeader columns={columns} />
        <TableBody>
          {filteredUsers.length === 0 ? (
            <EmptyTableRow colSpan={columns.length} />
          ) : (
            filteredUsers.map((user) => (
              <UserTableRow 
                key={user.id}
                user={user}
                isConverted={isConverted}
                currencyType={currencyType}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
