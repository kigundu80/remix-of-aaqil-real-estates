
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PropertyStatsCardProps {
  title: string;
  value: number;
  change: number;
  icon: ReactNode;
}

const PropertyStatsCard: React.FC<PropertyStatsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon 
}) => {
  const isPositive = change >= 0;
  
  // Format value based on type (currency or number)
  const formattedValue = title.toLowerCase().includes('sales') 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) 
    : value.toLocaleString();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
          
          <div className={cn(
            "flex items-center text-xs font-medium",
            isPositive ? "text-green-500" : "text-red-500"
          )}>
            {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">{formattedValue}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyStatsCard;
