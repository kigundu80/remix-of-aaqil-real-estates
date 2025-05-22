
export type PropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  features: string[];
  status: 'available' | 'sold' | 'pending';
  type: string;
  createdAt: string;
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
  images?: FileList;
}

// Fix for PropertyManagementTable properties
export const mockProperties: PropertyType[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    description: "Beautiful modern villa with stunning views",
    price: 750000,
    location: "123 Main St, Anytown",
    size: "2500 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    images: ["/placeholder.svg"],
    features: ["Pool", "Garden", "Garage"],
    status: "available",
    type: "villa",
    createdAt: "2023-01-15T10:30:00Z",
  },
  {
    id: "2", 
    title: "Downtown Apartment",
    description: "Modern apartment in the heart of downtown",
    price: 350000,
    location: "456 Center Ave, Downtown",
    size: "1200 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    images: ["/placeholder.svg"],
    features: ["Balcony", "Gym", "Security"],
    status: "pending",
    type: "apartment",
    createdAt: "2023-02-05T14:45:00Z",
  },
  {
    id: "3",
    title: "Family House with Garden",
    description: "Spacious family house with beautiful garden",
    price: 550000,
    location: "789 Oak St, Suburbia",
    size: "1800 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    images: ["/placeholder.svg"],
    features: ["Garden", "Garage", "Fireplace"],
    status: "sold",
    type: "house",
    createdAt: "2023-03-10T09:15:00Z",
  }
];
