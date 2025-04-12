
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
