-- Drop the SECURITY DEFINER view and recreate with SECURITY INVOKER (default, safer)
DROP VIEW IF EXISTS public.properties_public;

-- Recreate view without SECURITY DEFINER (uses INVOKER by default which is safer)
CREATE VIEW public.properties_public 
WITH (security_invoker = true)
AS
SELECT 
    id,
    category,
    title,
    description,
    price,
    location,
    status,
    featured,
    images,
    features,
    size,
    bedrooms,
    bathrooms,
    year_built,
    parking_spaces,
    land_size,
    make,
    model,
    year,
    mileage,
    fuel_type,
    transmission,
    color,
    engine_size,
    material,
    dimensions,
    condition,
    brand,
    created_at,
    updated_at
FROM public.properties;

-- Grant access to the view
GRANT SELECT ON public.properties_public TO anon, authenticated;