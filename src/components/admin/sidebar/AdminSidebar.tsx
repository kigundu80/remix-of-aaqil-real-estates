
import React from "react";
import { 
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  DashboardGroup, 
  PropertiesGroup,
  UsersGroup,
  VIPFeaturesGroup,
  NotificationsGroup,
  AccountGroup
} from "./SidebarGroups";
import { ThemeToggleGroup } from "./ThemeToggleGroup";

interface AdminSidebarProps {
  adminName: string;
  unreadCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ adminName, unreadCount }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin area."
    });
    // This would normally handle actual logout logic
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          <h2 className="text-lg font-bold">Admin Dashboard</h2>
          <p className="text-xs text-muted-foreground">Welcome, {adminName}</p>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <DashboardGroup />
        <PropertiesGroup />
        <UsersGroup />
        <VIPFeaturesGroup />
        <NotificationsGroup unreadCount={unreadCount} />
        <AccountGroup />
        <ThemeToggleGroup />
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> 
            Logout
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
