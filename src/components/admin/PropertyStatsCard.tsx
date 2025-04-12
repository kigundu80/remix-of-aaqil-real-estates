
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building, Home, Clock, CheckCircle } from "lucide-react";

interface PropertyStatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: number;
}

export const PropertyStatsCard: React.FC<PropertyStatsCardProps> = ({
  title,
  value,
  icon,
  change
}) => {
  // Map string icon names to Lucide components
  const iconMap: Record<string, React.ReactNode> = {
    "building": <Building className="h-4 w-4 text-muted-foreground" />,
    "home": <Home className="h-4 w-4 text-muted-foreground" />,
    "clock": <Clock className="h-4 w-4 text-muted-foreground" />,
    "check-circle": <CheckCircle className="h-4 w-4 text-muted-foreground" />
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <p className="text-sm font-medium">{title}</p>
        {iconMap[icon] || <div className="h-4 w-4" />}
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
