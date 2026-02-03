import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/admin/sidebar/AdminSidebar";
import { Loader2 } from "lucide-react";

const AdminPage: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin area.
          </p>
        </div>
      </div>
    );
  }

  // Get admin name from user metadata
  const adminName = user.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ''}`
    : user.email || 'Admin';

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <AdminSidebar adminName={adminName} unreadCount={0} />
        
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
