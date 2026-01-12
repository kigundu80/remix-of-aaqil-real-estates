
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, MapPin, Home, Car, Sofa, TreePine, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { PropertyType, PropertyCategory, PropertyStatus } from "@/types/property";

const PropertiesPage = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  // Fetch properties from database
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedProperties: PropertyType[] = (data || []).map(item => ({
          id: item.id,
          category: item.category as PropertyCategory,
          title: item.title,
          description: item.description,
          price: Number(item.price),
          location: item.location,
          status: item.status as PropertyStatus,
          featured: item.featured || false,
          images: item.images || [],
          features: item.features || [],
          size: item.size,
          bedrooms: item.bedrooms,
          bathrooms: item.bathrooms,
          land_size: item.land_size,
          year_built: item.year_built,
          parking_spaces: item.parking_spaces,
          make: item.make,
          model: item.model,
          year: item.year,
          mileage: item.mileage,
          fuel_type: item.fuel_type,
          transmission: item.transmission,
          color: item.color,
          engine_size: item.engine_size,
          material: item.material,
          dimensions: item.dimensions,
          condition: item.condition,
          brand: item.brand,
          created_at: item.created_at,
          updated_at: item.updated_at,
          created_by: item.created_by,
        }));

        setProperties(formattedProperties);
        setFilteredProperties(formattedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter and sort properties
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
      
      const matchesPrice = 
        property.price >= priceRange[0] && property.price <= priceRange[1];
      
      const matchesCategory = 
        category === "all" || property.category === category;
      
      const matchesLocation =
        location === "all" ||
        (property.location?.toLowerCase().includes(location.toLowerCase()) || false);
      
      const matchesStatus =
        status === "all" || property.status === status;
      
      return matchesSearch && matchesPrice && matchesCategory && matchesLocation && matchesStatus;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
    }
    
    setFilteredProperties(filtered);
  }, [searchTerm, priceRange, category, location, status, properties, sortBy]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Get unique locations from properties
  const uniqueLocations = [...new Set(properties.map(p => p.location).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-16 bg-gradient-to-r from-primary/90 to-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Properties</h1>
            <p className="text-lg max-w-2xl opacity-90">
              Browse through our extensive collection of properties including houses, vehicles, furniture, and land across Uganda.
            </p>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-card shadow-md sticky top-16 z-10 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
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
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="house">
                        <span className="flex items-center gap-2">
                          <Home className="h-4 w-4" /> Houses
                        </span>
                      </SelectItem>
                      <SelectItem value="land">
                        <span className="flex items-center gap-2">
                          <TreePine className="h-4 w-4" /> Land
                        </span>
                      </SelectItem>
                      <SelectItem value="vehicle">
                        <span className="flex items-center gap-2">
                          <Car className="h-4 w-4" /> Vehicles
                        </span>
                      </SelectItem>
                      <SelectItem value="furniture">
                        <span className="flex items-center gap-2">
                          <Sofa className="h-4 w-4" /> Furniture
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {uniqueLocations.map((loc) => (
                        <SelectItem key={loc} value={loc!.toLowerCase()}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="available">For Sale</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Label>Price Range (UGX)</Label>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 1000000000]}
                    min={0}
                    max={1000000000}
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
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading properties...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No properties found</h3>
              <p className="text-muted-foreground">
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
