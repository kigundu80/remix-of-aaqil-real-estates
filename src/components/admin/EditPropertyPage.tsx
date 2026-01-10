
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PropertyForm } from "./property-form";
import { PropertyFormValues } from "@/types/property";
import { useProperty, useUpdateProperty } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const EditPropertyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading: isFetching } = useProperty(id || "");
  const updateProperty = useUpdateProperty();

  const handleSubmit = (formData: PropertyFormValues) => {
    if (!id) return;
    
    updateProperty.mutate(
      { id, formData },
      {
        onSuccess: () => {
          navigate("/admin/properties");
        },
      }
    );
  };

  const initialValues: Partial<PropertyFormValues> | undefined = property
    ? {
        category: property.category,
        title: property.title,
        description: property.description || "",
        price: property.price.toString(),
        location: property.location || "",
        status: property.status,
        featured: property.featured,
        features: property.features?.join(", ") || "",
        size: property.size || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        year_built: property.year_built || undefined,
        parking_spaces: property.parking_spaces || undefined,
        land_size: property.land_size || "",
        make: property.make || "",
        model: property.model || "",
        year: property.year || undefined,
        mileage: property.mileage || undefined,
        fuel_type: property.fuel_type || "",
        transmission: property.transmission || "",
        color: property.color || "",
        engine_size: property.engine_size || "",
        material: property.material || "",
        dimensions: property.dimensions || "",
        condition: property.condition || "",
        brand: property.brand || "",
      }
    : undefined;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <Button variant="outline" size="sm" onClick={() => navigate("/admin/properties")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isFetching ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : property ? (
            <PropertyForm 
              initialValues={initialValues} 
              onSubmit={handleSubmit} 
              isLoading={updateProperty.isPending}
            />
          ) : (
            <p className="text-center py-10 text-muted-foreground">Property not found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPropertyPage;
