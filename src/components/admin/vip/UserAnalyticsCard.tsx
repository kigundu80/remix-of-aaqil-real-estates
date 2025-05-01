
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export const UserAnalyticsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Analytics</CardTitle>
        <CardDescription>
          User engagement and conversion metrics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[230px] flex items-center justify-center bg-muted rounded-md">
          <p className="text-muted-foreground">Analytics visualization will appear here</p>
        </div>
      </CardContent>
    </Card>
  );
};
