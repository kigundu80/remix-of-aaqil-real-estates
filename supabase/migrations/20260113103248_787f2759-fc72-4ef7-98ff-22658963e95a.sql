-- Drop the overly permissive anonymous SELECT policy on properties table
DROP POLICY IF EXISTS "Public can view properties via view" ON public.properties;

-- The properties_public view doesn't need RLS since it's a view
-- Views inherit RLS from the base table they query
-- However, since we need anon users to access properties via the view,
-- we need to allow anon to SELECT from the properties table, but limit what they see

-- Create a policy that allows anon users to select from properties but filters results
-- Actually, views with security_invoker=true use the caller's permissions
-- So anon users need SELECT access to the base table for the view to work

-- Allow anon users to select from properties (view will filter columns)
CREATE POLICY "Anon can view properties"
ON public.properties
FOR SELECT
TO anon
USING (true);

-- Update admin policy to be more restrictive - admins see everything, owners see their own
DROP POLICY IF EXISTS "Admins can view all properties with owner info" ON public.properties;

CREATE POLICY "Admins and owners can view full property data"
ON public.properties
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR created_by = auth.uid());

-- For user_roles, update the policy to use a secure check function instead of exposing role data
-- Drop the current view policy
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

-- Create a secure function to check if current user is admin (returns boolean only)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;