
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { detailedProperties } from "@/components/PropertyDetail/PropertyDetailData";
import PropertyImageCarousel from "@/components/PropertyDetail/PropertyImageCarousel";
import PropertyHeader from "@/components/PropertyDetail/PropertyHeader";
import PropertyDescription from "@/components/PropertyDetail/PropertyDescription";
import PropertyLocation from "@/components/PropertyDetail/PropertyLocation";
import PropertySidebar from "@/components/PropertyDetail/PropertySidebar";
import PropertyActions from "@/components/PropertyDetail/PropertyActions";
import PropertyDetailLoading from "@/components/PropertyDetail/PropertyDetailLoading";
import PropertyNotFound from "@/components/PropertyDetail/PropertyNotFound";
import { ExtendedPropertyType } from "@/types/property";

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<ExtendedPropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProperty = detailedProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  if (isLoading) {
    return <PropertyDetailLoading />;
  }

  if (!property) {
    return <PropertyNotFound />;
  }

  const imageList = [property.imageUrl, ...(property.additionalImages || [])];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-hm-green">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-hm-green">Properties</Link>
            <span>/</span>
            <span className="text-gray-700">{property.title}</span>
          </div>

          <PropertyImageCarousel images={imageList} title={property.title} />

          <PropertyHeader 
            title={property.title}
            location={property.location}
            status={property.status}
            featured={property.featured}
            price={property.price}
            size={property.size}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PropertyDescription 
                description={property.description}
                features={property.features}
                amenities={property.amenities}
              />
              
              <PropertyLocation 
                latitude={property.latitude}
                longitude={property.longitude}
              />
            </div>
            
            <div className="lg:col-span-1">
              <PropertySidebar 
                listedDate={property.listedDate}
                price={property.price}
                size={property.size}
                agentName={property.agentName}
                agentPhone={property.agentPhone}
                agentEmail={property.agentEmail}
                propertyId={property.id}
                status={property.status}
              />
              
              <PropertyActions />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
