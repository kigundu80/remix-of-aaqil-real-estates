
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
};
