
export type PropertyStatus = 'available' | 'sold' | 'pending';

export interface PropertyType {
  id: string;
  title: string;
  location: string;
  price: number;
  size: string;
  imageUrl: string;
  featured?: boolean;
  status: PropertyStatus;
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  createdAt?: string;
  images?: string[];
  features?: string[];
}

export interface PropertyFormValues {
  title: string;
  description: string;
  price: string;
  location: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  features: string;
  status: string;
  type: string;
}

export interface ExtendedPropertyType extends PropertyType {
  description: string;
  amenities?: string[];
  listedDate?: string;
  agentName?: string;
  agentPhone?: string;
  agentEmail?: string;
  additionalImages?: string[];
  latitude?: number;
  longitude?: number;
  seller?: {
    name: string;
    phone: string;
    email: string;
  };
  nearbyFacilities?: string[];
  legalStatus?: string;
  zoning?: string;
  utilities?: string[];
}

// Mock properties data for use in the admin panel
export const mockProperties: PropertyType[] = [
  {
    id: "1",
    title: "Prime Residential Land in Kampala",
    location: "Kampala, Uganda",
    price: 150000000,
    size: "0.5 Acres",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
    featured: true,
    status: "available",
    description: "Beautiful plot of land in a prime location",
    bedrooms: 0,
    bathrooms: 0,
    type: "land",
    features: ["Flat Terrain", "Good Drainage", "Electricity Available"]
  },
  {
    id: "2",
    title: "Commercial Plot in Entebbe",
    location: "Entebbe, Uganda",
    price: 350000000,
    size: "1.2 Acres",
    imageUrl: "https://images.unsplash.com/photo-1592595896616-c37162298647",
    featured: true,
    status: "pending",
    description: "Prime commercial land in busy area",
    bedrooms: 0,
    bathrooms: 0,
    type: "land",
    features: ["Corner Plot", "Main Road Access", "Commercial Zone"]
  },
  {
    id: "3",
    title: "Agricultural Land in Jinja",
    location: "Jinja, Uganda",
    price: 75000000,
    size: "5 Acres",
    imageUrl: "https://images.unsplash.com/photo-1629427838059-57187e96728c",
    featured: false,
    status: "available",
    description: "Fertile agricultural land with water access",
    bedrooms: 0,
    bathrooms: 0,
    type: "land",
    features: ["Fertile Soil", "Water Access", "Flat Terrain"]
  }
];

