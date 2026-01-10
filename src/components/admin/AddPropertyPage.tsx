
import React from "react";
import { useNavigate } from "react-router-dom";
import { PropertyForm } from "./property-form";
import { PropertyFormValues } from "@/types/property";
import { useCreateProperty } from "@/hooks/useProperties";

const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const createProperty = useCreateProperty();

  const handleAddProperty = (data: PropertyFormValues) => {
    createProperty.mutate(data, {
      onSuccess: () => {
        navigate("/admin/properties");
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing (House, Vehicle, Furniture, or Land)</p>
      </div>

      <div className="max-w-2xl">
        <PropertyForm onSubmit={handleAddProperty} isLoading={createProperty.isPending} />
      </div>
    </div>
  );
};

export default AddPropertyPage;
