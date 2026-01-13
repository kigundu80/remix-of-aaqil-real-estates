-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can create properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated users can update properties" ON public.properties;
DROP POLICY IF EXISTS "Authenticated users can delete properties" ON public.properties;

-- Set default for created_by to auth.uid() for new inserts
ALTER TABLE public.properties ALTER COLUMN created_by SET DEFAULT auth.uid();

-- Create secure INSERT policy: authenticated users can create properties for themselves
CREATE POLICY "Authenticated users can create their own properties" 
ON public.properties 
FOR INSERT 
TO authenticated
WITH CHECK (created_by = auth.uid());

-- Create secure UPDATE policy: users can only update their own properties
-- Legacy properties with null created_by cannot be updated by regular users
CREATE POLICY "Users can update their own properties" 
ON public.properties 
FOR UPDATE 
TO authenticated
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

-- Create secure DELETE policy: users can only delete their own properties
-- Legacy properties with null created_by cannot be deleted by regular users
CREATE POLICY "Users can delete their own properties" 
ON public.properties 
FOR DELETE 
TO authenticated
USING (created_by = auth.uid());