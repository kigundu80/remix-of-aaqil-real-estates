
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";
import { Building, PlusCircle, Users, LayoutDashboard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// This would normally come from an authentication context
const isAdmin = true; // For demo purposes, this would be dynamically determined

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  
  // For demonstration purposes, we're hardcoding admin access
  // In a real app, this would check user roles from authentication
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin area",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out of the admin area."
    });
    // This would normally handle actual logout logic
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="p-2">
              <h2 className="text-lg font-bold">Admin Dashboard</h2>
              <p className="text-xs text-muted-foreground">Manage your properties and users</p>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
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
        
        <SidebarInset>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminPage;
