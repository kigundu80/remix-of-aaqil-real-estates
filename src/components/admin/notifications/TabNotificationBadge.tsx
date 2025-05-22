
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TabNotificationBadgeProps {
  count: number;
}

export const TabNotificationBadge: React.FC<TabNotificationBadgeProps> = ({
  count,
}) => {
  if (count === 0) return null;
  
  return (
    <Badge
      variant="destructive"
      className="ml-2 absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
    >
      {count}
    </Badge>
  );
};
