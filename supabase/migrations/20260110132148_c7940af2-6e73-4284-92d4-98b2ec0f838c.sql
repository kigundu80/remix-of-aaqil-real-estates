-- Create enum for property categories
CREATE TYPE public.property_category AS ENUM ('land', 'house', 'vehicle', 'furniture');

-- Create enum for property status
CREATE TYPE public.property_status AS ENUM ('available', 'sold', 'pending');

-- Create properties table with flexible fields for different categories
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category property_category NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(15,2) NOT NULL,
  location TEXT,
  status property_status NOT NULL DEFAULT 'available',
  featured BOOLEAN DEFAULT false,
  images TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  
  -- House/Land specific fields
  size TEXT,
  bedrooms INTEGER,
  bathrooms INTEGER,
  land_size TEXT,
  year_built INTEGER,
  parking_spaces INTEGER,
  
  -- Vehicle specific fields
  make TEXT,
  model TEXT,
  year INTEGER,
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  color TEXT,
  engine_size TEXT,
  
  -- Furniture specific fields
  material TEXT,
  dimensions TEXT,
  condition TEXT,
  brand TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view properties" 
ON public.properties 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can create properties" 
ON public.properties 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties" 
ON public.properties 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete properties" 
ON public.properties 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for each category
INSERT INTO public.properties (category, title, description, price, location, status, featured, size, bedrooms, bathrooms, features) VALUES
('house', 'Modern Luxury Villa', 'Beautiful modern villa with stunning views and premium finishes', 750000000, 'Kololo, Kampala', 'available', true, '2500 sq ft', 4, 3, ARRAY['Swimming Pool', 'Garden', 'Garage', 'Security']),
('house', 'Downtown Apartment', 'Modern apartment in the heart of downtown with city views', 350000000, 'Nakasero, Kampala', 'available', false, '1200 sq ft', 2, 2, ARRAY['Balcony', 'Gym', 'Security', 'Parking']);

INSERT INTO public.properties (category, title, description, price, location, status, featured, land_size, features) VALUES
('land', 'Prime Agricultural Land', 'Fertile agricultural land perfect for farming', 150000000, 'Mukono District', 'available', true, '5 acres', ARRAY['Fertile Soil', 'Water Access', 'Road Access']);

INSERT INTO public.properties (category, title, description, price, location, status, featured, make, model, year, mileage, fuel_type, transmission, color, features) VALUES
('vehicle', 'Toyota Land Cruiser V8', 'Well-maintained SUV perfect for Ugandan roads', 180000000, 'Kampala', 'available', true, 'Toyota', 'Land Cruiser V8', 2020, 45000, 'Diesel', 'Automatic', 'White', ARRAY['Leather Interior', 'Sunroof', 'Navigation', '4WD']),
('vehicle', 'Mercedes-Benz C-Class', 'Elegant sedan with luxury features', 95000000, 'Kampala', 'available', false, 'Mercedes-Benz', 'C-Class', 2019, 32000, 'Petrol', 'Automatic', 'Black', ARRAY['Leather Seats', 'Bluetooth', 'Backup Camera']);

INSERT INTO public.properties (category, title, description, price, location, status, featured, material, dimensions, condition, brand, features) VALUES
('furniture', 'Executive Office Desk', 'Premium mahogany executive desk with drawers', 2500000, 'Kampala', 'available', true, 'Mahogany Wood', '180cm x 90cm x 75cm', 'New', 'Custom Made', ARRAY['Drawers', 'Cable Management', 'Lockable']),
('furniture', 'L-Shaped Leather Sofa', 'Modern L-shaped sofa set with genuine leather', 4500000, 'Kampala', 'available', false, 'Genuine Leather', '300cm x 200cm', 'New', 'Victoria Furnitures', ARRAY['Reclining', 'Cup Holders', 'USB Charging']);