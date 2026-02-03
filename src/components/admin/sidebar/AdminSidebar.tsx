
import React from "react";
import { 
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  isVipMode?: boolean;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  adminName, 
  unreadCount,
  isVipMode = false 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    if (isVipMode) {
      localStorage.removeItem("isVipAdmin");
      localStorage.removeItem("vipAdminName");
      localStorage.removeItem("vipAdminEmail");
      
      toast({
        title: "VIP Session Ended",
        description: "You have been logged out of the VIP admin area."
      });
      
      navigate("/vip-login");
    } else {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been logged out of the admin area."
      });
      navigate("/login");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-2">
          {isVipMode ? (
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-500" />
              <div>
                <h2 className="text-lg font-bold flex items-center">
                  VIP Admin Dashboard
                </h2>
                <p className="text-xs text-red-400">Developer Access</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-bold">Admin Dashboard</h2>
              <p className="text-xs text-muted-foreground">Welcome, {adminName}</p>
            </>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <DashboardGroup isVipMode={isVipMode} />
        <PropertiesGroup />
        <UsersGroup />
        {!isVipMode && <VIPFeaturesGroup />}
        <NotificationsGroup unreadCount={unreadCount} />
        <AccountGroup />
        <ThemeToggleGroup />
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <Button 
            variant={isVipMode ? "destructive" : "outline"} 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> 
            {isVipMode ? "Exit VIP Mode" : "Logout"}
          </Button>
          {isVipMode && (
            <div className="mt-2 text-center text-xs text-red-400">
              Secure Developer Access
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
