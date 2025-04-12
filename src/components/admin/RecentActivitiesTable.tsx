
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

// Sample data - in a real app, this would be fetched from an API
const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Property Added",
    subject: "Beachfront Villa",
    date: "2 hours ago",
    status: "success"
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "User Registration",
    subject: "New Account",
    date: "5 hours ago",
    status: "success"
  },
  {
    id: 3,
    user: "Admin",
    action: "Property Updated",
    subject: "Luxury Apartment",
    date: "1 day ago",
    status: "info"
  },
  {
    id: 4,
    user: "Mike Johnson",
    action: "Payment Failed",
    subject: "Property Booking",
    date: "2 days ago",
    status: "error"
  }
];

export const RecentActivitiesTable: React.FC = () => {
  return (
    <div className="max-h-[250px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentActivities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.user}</TableCell>
              <TableCell>
                {activity.action}
                <span className="block text-xs text-muted-foreground">
                  {activity.subject}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    activity.status === "success" ? "default" :
                    activity.status === "error" ? "destructive" : "outline"
                  }
                  className="capitalize"
                >
                  {activity.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">{activity.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
