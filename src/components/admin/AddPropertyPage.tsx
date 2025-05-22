
import React from "react";
import { useNavigate } from "react-router-dom";
import { PropertyForm } from "./property-form";
import { useToast } from "@/components/ui/use-toast";
import { PropertyFormValues } from "@/types/property";

const AddPropertyPage: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddProperty = (data: PropertyFormValues) => {
    // This would normally send data to an API
    console.log("Property data to be saved:", data);
    
    // Show success toast
    toast({
      title: "Property Added",
      description: "New property has been added successfully."
    });
    
    // Redirect to the properties list
    navigate("/admin/properties");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Add New Property</h1>
        <p className="text-muted-foreground">Create a new property listing</p>
      </div>

      <div className="max-w-2xl">
        <PropertyForm onSubmit={handleAddProperty} />
      </div>
    </div>
  );
};

export default AddPropertyPage;
