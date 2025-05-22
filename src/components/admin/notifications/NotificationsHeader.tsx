
import React from "react";
import { Bell } from "lucide-react";
import { NotificationBadge } from "./NotificationBadge";

interface NotificationsHeaderProps {
  totalNotifications: number;
}

export const NotificationsHeader: React.FC<NotificationsHeaderProps> = ({
  totalNotifications,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Bell className="h-5 w-5 text-amber-500" />
          {totalNotifications > 0 && (
            <NotificationBadge count={totalNotifications} />
          )}
        </div>
        <p className="text-muted-foreground">
          Manage incoming messages and user activities
        </p>
      </div>
    </div>
  );
};
