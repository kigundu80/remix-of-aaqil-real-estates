
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2, MapPin } from "lucide-react";
import { PropertyType } from "@/components/PropertyCard";
import { Link } from "react-router-dom";

// Sample property data - in a real app this would be fetched from an API
// This is the same data used in PropertiesPage
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

// Type for search results categories
type SearchResults = {
  properties: PropertyType[];
  loading: boolean;
};

interface SearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchPanel = ({ isOpen, onClose }: SearchPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    properties: [],
    loading: false
  });
  
  // Function to handle search
  const handleSearch = () => {
    if (searchQuery.trim().length === 0) {
      setResults({ properties: [], loading: false });
      return;
    }

    setResults(prev => ({ ...prev, loading: true }));

    // Simulating an API call with a setTimeout
    setTimeout(() => {
      const filteredProperties = sampleProperties.filter(property => {
        const query = searchQuery.toLowerCase();
        return (
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.size.toLowerCase().includes(query) ||
          property.price.toString().includes(query) ||
          property.status.toLowerCase().includes(query)
        );
      });

      setResults({
        properties: filteredProperties,
        loading: false
      });
    }, 500); // 500ms delay to simulate API call
  };

  // Trigger search when query changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        handleSearch();
      } else {
        setResults({ properties: [], loading: false });
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Handle escape key to close the panel
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // Clear search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setResults({ properties: [], loading: false });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-3xl p-0 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center border-b pb-4 mb-4">
            <Search className="h-5 w-5 text-muted-foreground mr-2" />
            <Input
              type="text"
              placeholder="Search for properties by location, price, size..."
              className="flex-grow border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="max-h-[60vh] overflow-auto">
            {/* Loading indicator */}
            {results.loading && (
              <div className="py-8 flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Empty results */}
            {!results.loading && searchQuery && results.properties.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-gray-500">No results found for "{searchQuery}"</p>
              </div>
            )}

            {/* Property results */}
            {!results.loading && results.properties.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Properties</h3>
                <div className="grid gap-3">
                  {results.properties.map(property => (
                    <Link 
                      to={`/properties/${property.id}`} 
                      key={property.id}
                      onClick={onClose}
                      className="flex items-start p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <img 
                        src={property.imageUrl} 
                        alt={property.title} 
                        className="w-16 h-16 object-cover rounded-md mr-3"
                      />
                      <div>
                        <h4 className="font-medium">{property.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {property.location}
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                          <span className="text-muted-foreground mr-2">{property.size}</span>
                          <span className="font-medium text-hm-green">UGX {property.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Initial state - no search yet */}
            {!results.loading && !searchQuery && (
              <div className="py-8 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="text-muted-foreground mt-2">
                  Search for properties by location, price, size, or status
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer with search button */}
        <div className="border-t p-4 flex justify-between">
          <Button 
            variant="outline"
            onClick={onClose}
            className="flex items-center"
          >
            Close
          </Button>
          <Button
            onClick={handleSearch}
            disabled={searchQuery.trim().length === 0 || results.loading}
            className="flex items-center"
          >
            {results.loading ? 
              <Loader2 className="h-4 w-4 animate-spin mr-1" /> :
              <Search className="h-4 w-4 mr-1" />
            }
            Search
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPanel;
