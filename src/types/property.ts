
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
}
