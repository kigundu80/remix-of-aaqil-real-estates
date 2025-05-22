
import React from "react";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface EmptyTableRowProps {
  colSpan: number;
  message?: string;
}

export const EmptyTableRow: React.FC<EmptyTableRowProps> = ({ 
  colSpan, 
  message = "No users found" 
}) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="text-center">
        {message}
      </TableCell>
    </TableRow>
  );
};
