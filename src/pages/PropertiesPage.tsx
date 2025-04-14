
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard, { PropertyType } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { Slider } from "@/components/ui/slider";

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
  },
  {
    id: "7",
    title: "Mixed-Use Land in Masaka",
    location: "Masaka, Uganda",
    price: 180000000,
    size: "3 Acres",
    imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'For Sale'
  },
  {
    id: "8",
    title: "Lakeside Plot in Entebbe",
    location: "Entebbe, Uganda",
    price: 420000000,
    size: "0.6 Acres",
    imageUrl: "https://images.unsplash.com/photo-1501426919787-0f4b7e1d4c1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'For Sale'
  },
  {
    id: "9",
    title: "Commercial Land in Kampala CBD",
    location: "Kampala, Uganda",
    price: 550000000,
    size: "0.3 Acres",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29tbWVyY2lhbCUyMGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
    featured: false,
    status: 'For Sale'
  }
];

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 600000000]); // Price range in UGX
  const [showFilters, setShowFilters] = useState(false);
  const [propertyType, setPropertyType] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  useEffect(() => {
    // In a real app, this would be an API call
    setProperties(sampleProperties);
    setFilteredProperties(sampleProperties);
  }, []);

  useEffect(() => {
    // Filter properties based on search term and filters
    const filtered = properties.filter(property => {
      // Search term filter
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Price range filter
      const matchesPrice = 
        property.price >= priceRange[0] && property.price <= priceRange[1];
      
      // Property type filter
      const matchesType = 
        propertyType === "all" || 
        (propertyType === "residential" && property.title.toLowerCase().includes("residential")) ||
        (propertyType === "commercial" && property.title.toLowerCase().includes("commercial")) ||
        (propertyType === "agricultural" && property.title.toLowerCase().includes("agricultural"));
      
      // Location filter
      const matchesLocation =
        location === "all" ||
        property.location.toLowerCase().includes(location.toLowerCase());
      
      // Status filter
      const matchesStatus =
        status === "all" ||
        (status === "for-sale" && property.status === "For Sale") ||
        (status === "sold" && property.status === "Sold") ||
        (status === "pending" && property.status === "Pending");
      
      return matchesSearch && matchesPrice && matchesType && matchesLocation && matchesStatus;
    });
    
    setFilteredProperties(filtered);
  }, [searchTerm, priceRange, propertyType, location, status, properties]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-16 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Properties</h1>
            <p className="text-lg max-w-2xl">
              Browse through our extensive collection of land properties across Uganda. 
              Use the filters to find exactly what you're looking for.
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow-md sticky top-16 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search properties by name or location..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 md:w-auto w-full"
                onClick={toggleFilters}
              >
                <SlidersHorizontal size={18} />
                Filters
              </Button>
            </div>
            
            {/* Expanded Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                <div>
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={propertyType}
                    onValueChange={setPropertyType}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Properties</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select
                    value={location}
                    onValueChange={setLocation}
                  >
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="kampala">Kampala</SelectItem>
                      <SelectItem value="entebbe">Entebbe</SelectItem>
                      <SelectItem value="jinja">Jinja</SelectItem>
                      <SelectItem value="mbarara">Mbarara</SelectItem>
                      <SelectItem value="wakiso">Wakiso</SelectItem>
                      <SelectItem value="mukono">Mukono</SelectItem>
                      <SelectItem value="masaka">Masaka</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={status}
                    onValueChange={setStatus}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Price Range (UGX)</Label>
                    <span className="text-sm text-gray-500">
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 600000000]}
                    min={0}
                    max={600000000}
                    step={10000000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredProperties.length}</span> properties
            </p>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="size-asc">Size: Small to Large</SelectItem>
                <SelectItem value="size-desc">Size: Large to Small</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No properties found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertiesPage;
