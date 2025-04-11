
export type PropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  size: string;
  images: string[];
  features: string[];
  status: 'available' | 'sold' | 'pending';
};

export type ExtendedPropertyType = PropertyType & {
  amenities: string[];
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
  // Additional fields needed for PropertyDetailPage
  imageUrl: string;
  featured: boolean;
  description: string;
  features: string[];
  listedDate: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  additionalImages?: string[];
  status: 'For Sale' | 'Sold' | 'Pending';
};
