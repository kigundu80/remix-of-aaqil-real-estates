
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ActivitiesLog } from "@/components/admin/ActivitiesLog";
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

interface ActivitiesTabProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  unseenCount: number;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({
  activities,
  setActivities,
  unseenCount,
}) => {
  const { toast } = useToast();
  
  const markAllActivitiesAsSeen = () => {
    setActivities(activities.map(act => ({ ...act, seen: true })));
    toast({
      title: "Activities Updated",
      description: "All activities have been marked as seen.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>User Activities</CardTitle>
            <CardDescription>
              Recent activities from users across the platform
            </CardDescription>
          </div>
          {unseenCount > 0 && (
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-secondary"
              onClick={markAllActivitiesAsSeen}
            >
              Mark all as seen
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ActivitiesLog activities={activities} setActivities={setActivities} />
      </CardContent>
    </Card>
  );
};
