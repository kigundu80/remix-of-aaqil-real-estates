
import React from "react";
import VIPAdminPanel from "@/components/admin/VIPAdminPanel";
import { Toaster } from "@/components/ui/sonner";

const VIPAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <div className="container mx-auto py-8 px-4">
        <VIPAdminPanel />
      </div>
    </div>
  );
};

export default VIPAdminPage;
