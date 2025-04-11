
import { ExtendedPropertyType } from "@/types/property";

// Sample properties data
export const sampleProperties = [
  {
    id: "1",
    title: "Prime Residential Land in Kampala",
    location: "Kampala, Uganda",
    price: 150000000,
    size: "0.5 Acres",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    featured: true,
    status: 'For Sale'
  },
];

// Extended properties with more details
export const detailedProperties: ExtendedPropertyType[] = [
  {
    id: "1",
    title: "Prime Residential Land in Kampala",
    description: "This is a prime piece of land located in a serene environment with good access to social amenities. The land is fully titled and ready for immediate development. It's perfect for residential use with excellent soil quality and gently sloping terrain, offering good drainage. The property has access to electricity and water supply networks.",
    price: 150000000,
    location: "Kampala, Uganda",
    size: "0.5 Acres",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    featured: true,
    status: 'For Sale',
    features: ["Flat Terrain", "Good Drainage", "Electricity Available", "Water Available", "Road Access", "Clear Title Deed"],
    amenities: ["Schools Nearby", "Shopping Centers", "Hospitals", "Public Transportation", "Security"],
    listedDate: "2023-02-15",
    agentName: "John Mukasa",
    agentPhone: "+256 700 123 456",
    agentEmail: "john@hmproperty.com",
    additionalImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGFuZHNjYXBlJTIwbGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1622379686890-43c28c26d1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHNjYXBlJTIwbGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1490682143684-14369e18dce8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZHNjYXBlJTIwbGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
    ],
    latitude: 0.3476,
    longitude: 32.5825,
    seller: {
      name: "Uganda Land Holdings Ltd",
      phone: "+256 780 123 456",
      email: "info@uglandholds.com"
    },
    nearbyFacilities: ["Kampala International School", "Bugolobi Market", "Nsambya Hospital"],
    legalStatus: "Freehold Title",
    zoning: "Residential",
    utilities: ["Electricity", "Water", "Road Access"]
  }
];
