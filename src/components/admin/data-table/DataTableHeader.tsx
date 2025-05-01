
import React from "react";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableHeaderProps {
  columns: string[];
}

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({ columns }) => {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHead key={index}>{column}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};
