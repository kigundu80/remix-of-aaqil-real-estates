
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Activity {
  action: string;
  title: string;
  date: string;
  user: string;
}

export interface RecentActivitiesTableProps {
  activities: Activity[];
}

const RecentActivitiesTable: React.FC<RecentActivitiesTableProps> = ({ activities }) => {
  return (
    <div className="max-h-[250px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Property</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.map((activity, index) => (
            <TableRow key={`activity-${index}`}>
              <TableCell className="font-medium">{activity.user}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    activity.action.includes("Added") ? "default" :
                    activity.action.includes("Sold") ? "destructive" :
                    activity.action.includes("Updated") ? "outline" : 
                    activity.action.includes("Pending") ? "secondary" : "default"
                  }
                >
                  {activity.action}
                </Badge>
              </TableCell>
              <TableCell>{activity.date}</TableCell>
              <TableCell>{activity.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentActivitiesTable;
