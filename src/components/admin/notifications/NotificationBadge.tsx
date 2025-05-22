
import React from "react";
import { Badge } from "@/components/ui/badge";

interface NotificationBadgeProps {
  count: number;
  variant?: "default" | "destructive" | "outline" | "secondary" | null;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  variant = "destructive",
  className = "ml-2",
}) => {
  if (count === 0) return null;
  
  return (
    <Badge variant={variant} className={className}>
      {count} {count === 1 ? "new" : "new"}
    </Badge>
  );
};
