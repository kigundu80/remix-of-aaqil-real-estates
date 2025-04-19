
import { useState, useEffect } from 'react';
import PropertyCard, { PropertyType } from './PropertyCard';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Sample property data - in a real app this would come from an API
const sampleProperties: PropertyType[] = [
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
  {
    id: "2",
    title: "Commercial Plot in Entebbe",
    location: "Entebbe, Uganda",
    price: 350000000,
    size: "1.2 Acres",
    imageUrl: "https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    featured: true,
    status: 'For Sale'
  },
  {
    id: "3",
    title: "Agricultural Land in Jinja",
    location: "Jinja, Uganda",
    price: 75000000,
    size: "5 Acres",
    imageUrl: "https://images.unsplash.com/photo-1629427838059-57187e96728c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZhcm0lMjBsYW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'For Sale'
  },
  {
    id: "4",
    title: "Waterfront Land in Mukono",
    location: "Mukono, Uganda",
    price: 280000000,
    size: "0.8 Acres",
    imageUrl: "https://images.unsplash.com/photo-1575997759258-91792eaaf87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFrZSUyMGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    featured: true,
    status: 'Pending'
  },
  {
    id: "5",
    title: "Investment Plot in Mbarara",
    location: "Mbarara, Uganda",
    price: 120000000,
    size: "2 Acres",
    imageUrl: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'Sold'
  },
  {
    id: "6",
    title: "Residential Land in Wakiso",
    location: "Wakiso, Uganda",
    price: 95000000,
    size: "0.25 Acres",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmVzaWRlbnRpYWwlMjBsYW5kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'For Sale'
  }
];

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setProperties(sampleProperties);
  }, []);

  // Filter to just show featured properties on homepage
  const featuredProperties = properties.filter(property => property.featured).slice(0, 3);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Explore our handpicked selection of prime land properties</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/properties">View All Properties</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
