import React from "react";
import { 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  Building, 
  PlusCircle, 
  Users, 
  LayoutDashboard, 
  User, 
  Bell, 
  Bitcoin 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface SidebarGroupProps {
  unreadCount?: number;
}

export const DashboardGroup: React.FC = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const PropertiesGroup: React.FC = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Properties</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/properties">
                <Building className="w-4 h-4" />
                <span>All Properties</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/properties/add">
                <PlusCircle className="w-4 h-4" />
                <span>Add Property</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const UsersGroup: React.FC = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Users</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/users">
                <Users className="w-4 h-4" />
                <span>Manage Users</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const VIPFeaturesGroup = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>VIP Features</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/vip-admin">
                <Bitcoin className="h-4 w-4" />
                <span>VIP Admin Panel</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const NotificationsGroup: React.FC<SidebarGroupProps> = ({ unreadCount = 0 }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Notifications</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/messages" className="relative">
                <Bell className="w-4 h-4" />
                <span>Messages & Activities</span>
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="ml-2 absolute -right-2 -top-2 h-5 w-5 flex items-center justify-center p-0"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export const AccountGroup: React.FC = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/admin/profile">
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
