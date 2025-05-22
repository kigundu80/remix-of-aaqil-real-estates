
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type NotificationPriority = "default" | "high" | "medium" | "low" | "info";

interface NotificationBadgeProps {
  count: number;
  variant?: "default" | "destructive" | "outline" | "secondary" | null;
  className?: string;
  priority?: NotificationPriority;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  variant = "destructive",
  className = "ml-2",
  priority = "default"
}) => {
  if (count === 0) return null;
  
  // Priority-based styling
  const getPriorityClass = () => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600 border-red-600";
      case "medium":
        return "bg-amber-500 hover:bg-amber-600 border-amber-600";
      case "info":
        return "bg-blue-500 hover:bg-blue-600 border-blue-600";
      case "low":
        return "bg-green-500 hover:bg-green-600 border-green-600";
      default:
        return "";
    }
  };

  const badgeClass = cn(
    className,
    priority !== "default" && getPriorityClass()
  );
  
  return (
    <Badge variant={variant} className={badgeClass}>
      {count} {count === 1 ? "new" : "new"}
    </Badge>
  );
};
