
import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";
import { AdminSidebar } from "@/components/admin/sidebar/AdminSidebar";

// This would normally come from an authentication context
const isAdmin = true; // For demo purposes, this would be dynamically determined
const adminName = "Kiggundu Akram"; // Add the admin name

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const [unreadCount, setUnreadCount] = useState<number>(0);
  
  // Simulate fetching notification count
  useEffect(() => {
    // In a real app, this would be fetched from an API or websocket
    setUnreadCount(5);
  }, []);
  
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

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        <AdminSidebar adminName={adminName} unreadCount={unreadCount} />
        
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
