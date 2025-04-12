
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
}

export const PropertyStatsCard: React.FC<PropertyStatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium">{title}</p>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {typeof change !== 'undefined' && (
          <div className="flex items-center text-xs mt-1">
            <span 
              className={cn("flex items-center",
                change > 0 ? "text-green-500" : 
                change < 0 ? "text-red-500" : 
                "text-muted-foreground"
              )}
            >
              {change > 0 && "+"}
              {change}%
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
