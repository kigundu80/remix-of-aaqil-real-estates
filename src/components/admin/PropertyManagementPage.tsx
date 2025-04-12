
import React from "react";
import { PropertyManagementTable } from "./PropertyManagementTable";

const PropertyManagementPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Property Management</h1>
        <p className="text-muted-foreground">View and manage all properties</p>
      </div>

      <PropertyManagementTable />
    </div>
  );
};

export default PropertyManagementPage;
