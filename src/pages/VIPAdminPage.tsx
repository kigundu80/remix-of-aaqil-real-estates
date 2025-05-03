
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import VIPAdminPanel from "@/components/admin/VIPAdminPanel";
import { Toaster } from "@/components/ui/sonner";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/sidebar/AdminSidebar";

const VIPAdminPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isVipAdmin = localStorage.getItem("isVipAdmin") === "true";
  const vipAdminName = localStorage.getItem("vipAdminName") || "Kiggundu Aaqil Akram";
  
  // Check VIP authentication on component mount
  useEffect(() => {
    if (!isVipAdmin) {
      toast({
        title: "Authentication Required",
        description: "Please authenticate as a VIP developer to access this area.",
        variant: "destructive"
      });
      navigate("/vip-login");
    }
  }, [isVipAdmin, navigate, toast]);

  if (!isVipAdmin) {
    return <Navigate to="/vip-login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen bg-background">
        <Toaster />
        <AdminSidebar adminName={vipAdminName} unreadCount={5} isVipMode={true} />
        
        <SidebarInset>
          <div className="p-6">
            <VIPAdminPanel />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default VIPAdminPage;
