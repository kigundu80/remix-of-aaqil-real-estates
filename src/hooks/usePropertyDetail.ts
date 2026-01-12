
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PropertyType } from "@/types/property";

export const usePropertyDetail = (id: string | undefined) => {
  const [property, setProperty] = useState<PropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (data) {
          setProperty({
            id: data.id,
            category: data.category,
            title: data.title,
            description: data.description,
            price: Number(data.price),
            location: data.location,
            status: data.status,
            featured: data.featured || false,
            images: data.images || [],
            features: data.features || [],
            size: data.size,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            land_size: data.land_size,
            year_built: data.year_built,
            parking_spaces: data.parking_spaces,
            make: data.make,
            model: data.model,
            year: data.year,
            mileage: data.mileage,
            fuel_type: data.fuel_type,
            transmission: data.transmission,
            color: data.color,
            engine_size: data.engine_size,
            material: data.material,
            dimensions: data.dimensions,
            condition: data.condition,
            brand: data.brand,
            created_at: data.created_at,
            updated_at: data.updated_at,
            created_by: data.created_by,
          });
        } else {
          setProperty(null);
        }
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message || 'Failed to load property');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, isLoading, error };
};
