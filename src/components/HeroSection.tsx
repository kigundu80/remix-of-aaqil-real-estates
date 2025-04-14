
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchPanel } from "@/hooks/useSearchPanel";
import SearchPanel from "./SearchPanel";

const HeroSection = () => {
  const { isSearchOpen, openSearch, closeSearch } = useSearchPanel();

  return (
    <div className="relative">
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-36 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Find Your Perfect Land in Uganda
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          HM Property Consultants specializes in helping you find the perfect land 
          for your needs - whether it's for residential, commercial, or agricultural purposes.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Search by location, size or price..."
              className="pl-10 bg-white/90 border-0 text-black h-12 w-full"
              onClick={openSearch}
              readOnly
            />
          </div>
          <Button size="lg" className="bg-hm-green hover:bg-hm-green-dark" onClick={openSearch}>
            Search Properties
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
            <Link to="/properties">Explore Properties</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      {/* Search Panel */}
      <SearchPanel isOpen={isSearchOpen} onClose={closeSearch} />
    </div>
  );
};

export default HeroSection;
