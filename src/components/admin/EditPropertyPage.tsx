
import React, { useEffect, useState } from "react";
import { PropertyForm } from "./PropertyForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyType } from "@/types/property";

// Mock data - this would be replaced with an API call
const mockProperties: PropertyType[] = [
  {
    id: "1",
    title: "Beachfront Land",
    description: "Beautiful beachfront property with ocean views",
    price: 350000,
    location: "Mombasa, Kenya",
    size: "2 acres",
    images: ["/placeholder.svg"],
    features: ["Ocean view", "Flat terrain", "Ready for development"],
    status: "available"
  }
];

const EditPropertyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be an API call in a real app
    const fetchProperty = () => {
      setLoading(true);
      try {
        const found = mockProperties.find(p => p.id === id);
        if (found) {
          setProperty(found);
        } else {
          toast({
            title: "Property Not Found",
            description: "The property you're trying to edit couldn't be found.",
            variant: "destructive"
          });
          navigate("/admin/properties");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load property data.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, navigate, toast]);

  const handleUpdateProperty = (data: any) => {
    // This would normally send data to an API
    console.log("Property data to be updated:", data);
    
    // Show success toast
    toast({
      title: "Property Updated",
      description: "Property has been updated successfully."
    });
    
    // Redirect to the properties list
    navigate("/admin/properties");
  };

  if (loading) {
    return <div>Loading property data...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Property</h1>
        <p className="text-muted-foreground">Update property information</p>
      </div>

      <div className="max-w-2xl">
        <PropertyForm 
          initialValues={property}
          onSubmit={handleUpdateProperty} 
          isEditing={true}
        />
      </div>
    </div>
  );
};

export default EditPropertyPage;
