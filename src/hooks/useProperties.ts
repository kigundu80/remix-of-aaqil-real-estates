
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PropertyType, PropertyCategory, PropertyFormValues } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

export const useProperties = (category?: PropertyCategory) => {
  return useQuery({
    queryKey: ["properties", category],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as PropertyType[];
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      return data as PropertyType | null;
    },
    enabled: !!id,
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (formData: PropertyFormValues) => {
      const propertyData = {
        category: formData.category,
        title: formData.title,
        description: formData.description || null,
        price: parseFloat(formData.price),
        location: formData.location || null,
        status: formData.status,
        featured: formData.featured,
        features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
        
        // House fields
        size: formData.size || null,
        bedrooms: formData.bedrooms || null,
        bathrooms: formData.bathrooms || null,
        year_built: formData.year_built || null,
        parking_spaces: formData.parking_spaces || null,
        
        // Land fields
        land_size: formData.land_size || null,
        
        // Vehicle fields
        make: formData.make || null,
        model: formData.model || null,
        year: formData.year || null,
        mileage: formData.mileage || null,
        fuel_type: formData.fuel_type || null,
        transmission: formData.transmission || null,
        color: formData.color || null,
        engine_size: formData.engine_size || null,
        
        // Furniture fields
        material: formData.material || null,
        dimensions: formData.dimensions || null,
        condition: formData.condition || null,
        brand: formData.brand || null,
      };

      const { data, error } = await supabase
        .from("properties")
        .insert(propertyData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Property Added",
        description: "New property has been added successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: PropertyFormValues }) => {
      const propertyData = {
        category: formData.category,
        title: formData.title,
        description: formData.description || null,
        price: parseFloat(formData.price),
        location: formData.location || null,
        status: formData.status,
        featured: formData.featured,
        features: formData.features ? formData.features.split(",").map(f => f.trim()) : [],
        
        // House fields
        size: formData.size || null,
        bedrooms: formData.bedrooms || null,
        bathrooms: formData.bathrooms || null,
        year_built: formData.year_built || null,
        parking_spaces: formData.parking_spaces || null,
        
        // Land fields
        land_size: formData.land_size || null,
        
        // Vehicle fields
        make: formData.make || null,
        model: formData.model || null,
        year: formData.year || null,
        mileage: formData.mileage || null,
        fuel_type: formData.fuel_type || null,
        transmission: formData.transmission || null,
        color: formData.color || null,
        engine_size: formData.engine_size || null,
        
        // Furniture fields
        material: formData.material || null,
        dimensions: formData.dimensions || null,
        condition: formData.condition || null,
        brand: formData.brand || null,
      };

      const { data, error } = await supabase
        .from("properties")
        .update(propertyData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Property Updated",
        description: "Property has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Property Deleted",
        description: "Property has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
