
export type PropertyCategory = 'land' | 'house' | 'vehicle' | 'furniture';
export type PropertyStatus = 'available' | 'sold' | 'pending';

export type PropertyType = {
  id: string;
  category: PropertyCategory;
  title: string;
  description: string | null;
  price: number;
  location: string | null;
  status: PropertyStatus;
  featured: boolean;
  images: string[];
  features: string[];
  
  // House/Land specific
  size?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  land_size?: string | null;
  year_built?: number | null;
  parking_spaces?: number | null;
  
  // Vehicle specific
  make?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  fuel_type?: string | null;
  transmission?: string | null;
  color?: string | null;
  engine_size?: string | null;
  
  // Furniture specific
  material?: string | null;
  dimensions?: string | null;
  condition?: string | null;
  brand?: string | null;
  
  created_at: string;
  updated_at: string;
  created_by?: string | null;
};

export type ExtendedPropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  size: string;
  imageUrl: string;
  featured: boolean;
  status: 'For Sale' | 'Sold' | 'Pending';
  features: string[];
  amenities: string[];
  listedDate: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  additionalImages?: string[];
  latitude: number;
  longitude: number;
  seller: {
    name: string;
    phone: string;
    email: string;
  };
  nearbyFacilities: string[];
  legalStatus: string;
  zoning: string;
  utilities: string[];
};

export interface PropertyFormValues {
  category: PropertyCategory;
  title: string;
  description: string;
  price: string;
  location: string;
  status: PropertyStatus;
  featured: boolean;
  features: string;
  
  // House/Land specific
  size?: string;
  bedrooms?: number;
  bathrooms?: number;
  land_size?: string;
  year_built?: number;
  parking_spaces?: number;
  
  // Vehicle specific
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel_type?: string;
  transmission?: string;
  color?: string;
  engine_size?: string;
  
  // Furniture specific
  material?: string;
  dimensions?: string;
  condition?: string;
  brand?: string;
  
  images?: FileList;
}

// Mock properties for backwards compatibility
export const mockProperties: PropertyType[] = [
  {
    id: "1",
    category: "house",
    title: "Modern Luxury Villa",
    description: "Beautiful modern villa with stunning views",
    price: 750000000,
    location: "Kololo, Kampala",
    status: "available",
    featured: true,
    images: ["/placeholder.svg"],
    features: ["Pool", "Garden", "Garage"],
    size: "2500 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    created_at: "2023-01-15T10:30:00Z",
    updated_at: "2023-01-15T10:30:00Z",
  },
  {
    id: "2",
    category: "vehicle", 
    title: "Toyota Land Cruiser V8",
    description: "Well-maintained SUV perfect for Ugandan roads",
    price: 180000000,
    location: "Kampala",
    status: "available",
    featured: true,
    images: ["/placeholder.svg"],
    features: ["Leather Interior", "Sunroof", "Navigation"],
    make: "Toyota",
    model: "Land Cruiser V8",
    year: 2020,
    mileage: 45000,
    fuel_type: "Diesel",
    transmission: "Automatic",
    color: "White",
    created_at: "2023-02-05T14:45:00Z",
    updated_at: "2023-02-05T14:45:00Z",
  },
  {
    id: "3",
    category: "furniture",
    title: "Executive Office Desk",
    description: "Premium mahogany executive desk with drawers",
    price: 2500000,
    location: "Kampala",
    status: "available",
    featured: false,
    images: ["/placeholder.svg"],
    features: ["Drawers", "Cable Management", "Lockable"],
    material: "Mahogany Wood",
    dimensions: "180cm x 90cm x 75cm",
    condition: "New",
    brand: "Custom Made",
    created_at: "2023-03-10T09:15:00Z",
    updated_at: "2023-03-10T09:15:00Z",
  }
];
