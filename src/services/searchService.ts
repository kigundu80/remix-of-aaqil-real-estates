
import { PropertyType } from "@/types/property";

export const searchProperties = async (query: string): Promise<PropertyType[]> => {
  // This is a mock implementation. In a real app, this would call an API
  // For now, we'll just simulate a delay and return filtered mock data
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock data - in a real app this would come from your backend
  const mockProperties: PropertyType[] = [
    {
      id: "1",
      title: "Prime Residential Land in Kampala",
      location: "Kampala, Uganda",
      price: 150000000,
      size: "0.5 Acres",
      imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      featured: true,
      status: "available"
    },
    // ... more mock properties would be here
  ];

  const lowercaseQuery = query.toLowerCase();
  return mockProperties.filter(property => 
    property.title.toLowerCase().includes(lowercaseQuery) ||
    property.location.toLowerCase().includes(lowercaseQuery) ||
    property.size.toLowerCase().includes(lowercaseQuery) ||
    property.status.toLowerCase().includes(lowercaseQuery)
  );
};
