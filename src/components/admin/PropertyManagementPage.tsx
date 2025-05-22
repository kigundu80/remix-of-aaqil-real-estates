
import React from "react";
import { Button } from "@/components/ui/button";
import PropertyManagementTable from "./PropertyManagementTable";
import { Plus, FileDown, FileUp, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const PropertyManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Button onClick={() => navigate("/admin/properties/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Property
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-9 w-full sm:w-[300px]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <FileUp className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <PropertyManagementTable />
    </div>
  );
};

export default PropertyManagementPage;
