
import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  type: string;
  user: string;
  email?: string;
  action: string;
  details: string;
  timestamp: string;
  seen: boolean;
}

interface ActivitiesLogProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export const ActivitiesLog: React.FC<ActivitiesLogProps> = ({ activities, setActivities }) => {
  const { toast } = useToast();
  
  const handleMarkAsSeen = (id: string) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, seen: true } : activity
      )
    );
    
    toast({
      title: "Activity Updated",
      description: "Activity has been marked as seen.",
    });
  };
  
  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "contact_form":
        return "bg-blue-500";
      case "property_view":
        return "bg-green-500";
      case "payment":
        return "bg-hm-gold";
      case "registration":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Action</TableHead>
            <TableHead className="hidden md:table-cell">Details</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-[80px] text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No activities found
              </TableCell>
            </TableRow>
          ) : (
            activities.map((activity) => (
              <TableRow key={activity.id} className={!activity.seen ? "bg-muted/20" : ""}>
                <TableCell>
                  <Badge 
                    className={`${getActivityBadgeColor(activity.type)} text-white`}
                  >
                    {activity.type.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div>
                    <div>{activity.user}</div>
                    {activity.email && (
                      <div className="text-xs text-muted-foreground">{activity.email}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                  {activity.details}
                </TableCell>
                <TableCell>{format(new Date(activity.timestamp), "PP")}</TableCell>
                <TableCell className="text-right">
                  {activity.seen ? (
                    <span className="inline-flex items-center text-xs text-muted-foreground">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Seen
                    </span>
                  ) : (
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMarkAsSeen(activity.id);
                      }}
                    >
                      Mark seen
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
