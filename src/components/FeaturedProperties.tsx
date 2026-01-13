
import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { PropertyType, PropertyCategory, PropertyStatus } from "@/types/property";
import { Loader2 } from "lucide-react";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      setIsLoading(true);
      try {
        // Use the public view which hides created_by for security
        const { data, error } = await supabase
          .from('properties_public')
          .select('*')
          .eq('featured', true)
          .limit(3);

        if (error) throw error;

        const formattedProperties: PropertyType[] = (data || []).map(item => ({
          id: item.id,
          category: item.category as PropertyCategory,
          title: item.title,
          description: item.description,
          price: Number(item.price),
          location: item.location,
          status: item.status as PropertyStatus,
          featured: item.featured || false,
          images: item.images || [],
          features: item.features || [],
          size: item.size,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          land_size: item.land_size,
          year_built: item.year_built,
          parking_spaces: item.parking_spaces,
          make: item.make,
          model: item.model,
          year: item.year,
          mileage: item.mileage,
          fuel_type: item.fuel_type,
          transmission: item.transmission,
          color: item.color,
          engine_size: item.engine_size,
          material: item.material,
          dimensions: item.dimensions,
          condition: item.condition,
          brand: item.brand,
          created_at: item.created_at,
          updated_at: item.updated_at,
          // created_by is not exposed in public view for security
          created_by: undefined,
        }));

        setProperties(formattedProperties);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Explore our handpicked selection of premium properties</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/properties">View All Properties</Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No featured properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
