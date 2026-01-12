
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyImageCarousel from "@/components/PropertyDetail/PropertyImageCarousel";
import PropertyDetailHeader from "@/components/PropertyDetail/PropertyDetailHeader";
import CategorySpecs from "@/components/PropertyDetail/CategorySpecs";
import PropertyFeatures from "@/components/PropertyDetail/PropertyFeatures";
import PropertyDetailSidebar from "@/components/PropertyDetail/PropertyDetailSidebar";
import PropertyDetailLoading from "@/components/PropertyDetail/PropertyDetailLoading";
import PropertyNotFound from "@/components/PropertyDetail/PropertyNotFound";
import { usePropertyDetail } from "@/hooks/usePropertyDetail";
import { ChevronRight } from "lucide-react";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { property, isLoading, error } = usePropertyDetail(id);
  
  if (isLoading) {
    return <PropertyDetailLoading />;
  }

  if (!property || error) {
    return <PropertyNotFound />;
  }

  const images = property.images.length > 0 ? property.images : ["/placeholder.svg"];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>

          {/* Image Carousel */}
          <PropertyImageCarousel images={images} title={property.title} />

          {/* Header */}
          <PropertyDetailHeader property={property} />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Category-specific specifications */}
              <CategorySpecs property={property} />
              
              {/* Description */}
              {property.description && (
                <div className="bg-card rounded-xl shadow-sm border p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {property.description}
                  </p>
                </div>
              )}
              
              {/* Features */}
              <PropertyFeatures features={property.features} />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PropertyDetailSidebar property={property} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
