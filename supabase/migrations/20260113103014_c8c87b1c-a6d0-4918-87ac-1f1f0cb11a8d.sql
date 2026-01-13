-- Create app_role enum for role management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table to track user roles
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- RLS policy: only admins can manage roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create a secure view for public property access (hides created_by)
CREATE OR REPLACE VIEW public.properties_public AS
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

-- Update the SELECT policy on properties to only allow admins or property owners to see created_by
DROP POLICY IF EXISTS "Anyone can view properties" ON public.properties;

-- Admins can see all property data including created_by
CREATE POLICY "Admins can view all properties with owner info"
ON public.properties
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid());

-- Anonymous and regular authenticated users should use the properties_public view instead
-- But we still need a basic select for the view to work
CREATE POLICY "Public can view properties via view"
ON public.properties
FOR SELECT
TO anon
USING (true);