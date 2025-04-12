
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { PropertyForm } from "./PropertyForm";
import { useToast } from "@/hooks/use-toast";
import { PropertyType, PropertyFormValues } from "@/types/property";

const EditPropertyPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Demo data for properties
  const demoProperties: PropertyType[] = [
    {
      id: "1",
      title: "Modern Villa",
      description: "Beautiful modern villa with stunning views",
      price: 750000,
      location: "123 Main St, Anytown",
      size: "2500 sq ft",
      bedrooms: 4,
      bathrooms: 3,
      images: ["/placeholder.svg"],
      features: ["Swimming Pool", "Garden", "Garage"],
      status: "available",
      type: "villa",
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      title: "Downtown Apartment",
      description: "Modern apartment in the heart of downtown",
      price: 350000,
      location: "456 Center Ave, Downtown",
      size: "1200 sq ft",
      bedrooms: 2,
      bathrooms: 2,
      images: ["/placeholder.svg"],
      features: ["Balcony", "Gym", "Security"],
      status: "pending",
      type: "apartment",
      createdAt: "2023-02-05",
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch property
    const fetchProperty = () => {
      setIsLoading(true);
      
      // Find property by id in demo data
      setTimeout(() => {
        const foundProperty = demoProperties.find(p => p.id === id);
        
        if (foundProperty) {
          setProperty(foundProperty);
        } else {
          toast({
            title: "Property not found",
            description: "The requested property could not be found.",
            variant: "destructive",
          });
          navigate("/admin/properties");
        }
        
        setIsLoading(false);
      }, 1000);
    };

    fetchProperty();
  }, [id, navigate, toast]);

  const handleSubmit = (formData: PropertyFormValues) => {
    // Simulate API call to update property
    setIsLoading(true);
    
    // Convert string price to number for storing in PropertyType
    const updatedProperty: Partial<PropertyType> = {
      ...property,
      ...formData,
      price: parseFloat(formData.price),
      features: typeof formData.features === 'string' ? 
        formData.features.split(',').map(item => item.trim()) : 
        formData.features,
    };
    
    setTimeout(() => {
      toast({
        title: "Property updated",
        description: "The property has been updated successfully.",
      });
      
      setIsLoading(false);
      navigate("/admin/properties");
    }, 1000);
  };

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
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : property ? (
            <PropertyForm 
              initialValues={{
                title: property.title,
                description: property.description,
                price: property.price.toString(), // Convert number to string
                location: property.location,
                size: property.size,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                features: property.features.join(", "), // Convert array to string
                status: property.status,
                type: property.type,
              }} 
              onSubmit={handleSubmit} 
              isLoading={isLoading}
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
