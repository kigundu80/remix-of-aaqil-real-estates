import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PropertyType } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MapPin, Phone, Mail, Calendar, Ruler, CheckCircle, DollarSign, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
];

const detailedProperties: ExtendedPropertyType[] = sampleProperties.map(property => ({
  ...property,
  description: "This is a prime piece of land located in a serene environment with good access to social amenities. The land is fully titled and ready for immediate development. It's perfect for residential use with excellent soil quality and gently sloping terrain, offering good drainage. The property has access to electricity and water supply networks.",
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
  ]
}));

const PropertyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<ExtendedPropertyType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProperty = detailedProperties.find(p => p.id === id);
      setProperty(foundProperty || null);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleContactAgent = () => {
    toast({
      title: "Request Sent!",
      description: "The agent will contact you soon.",
      variant: "default",
    });
  };
  
  const handleSaveProperty = () => {
    toast({
      title: "Property Saved!",
      description: "You can view it in your saved properties.",
      variant: "default",
    });
  };
  
  const handleShareProperty = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied!",
      description: "Property link copied to clipboard.",
      variant: "default",
    });
  };

  const handleMakePayment = () => {
    window.location.href = `/payment?propertyId=${property.id}&amount=${property.price}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-6 w-full max-w-5xl">
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
          <p className="text-gray-600 mb-6">The property you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/properties">Back to Properties</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const statusColor = 
    property.status === 'For Sale' ? 'bg-green-100 text-green-800' :
    property.status === 'Sold' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800';

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

          <div className="mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {imageList.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[300px] md:h-[500px] w-full">
                      <img 
                        src={img} 
                        alt={`${property.title} - Image ${index + 1}`} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-4 gap-4">
                <CarouselPrevious className="relative right-auto" />
                <CarouselNext className="relative left-auto" />
              </div>
            </Carousel>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColor}>
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge variant="secondary" className="bg-hm-gold text-hm-gold-dark">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-2xl font-bold text-hm-green mb-1">
                USh {property.price.toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Ruler className="h-4 w-4 mr-1" />
                <span>{property.size}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Property Description</h2>
                <p className="text-gray-700 mb-6">
                  {property.description}
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Property Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {property.features?.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-hm-green mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Nearby Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.amenities?.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-hm-green mr-2" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden h-64 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-600">Google Map would appear here</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Property Information</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-hm-green mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Date Listed</p>
                      <p>{property.listedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-hm-green mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p>USh {property.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Ruler className="h-5 w-5 text-hm-green mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Land Size</p>
                      <p>{property.size}</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <div className="space-y-4">
                  <p className="font-medium text-lg">{property.agentName}</p>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-hm-green mr-2" />
                    <a href={`tel:${property.agentPhone}`} className="hover:text-hm-green">
                      {property.agentPhone}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-hm-green mr-2" />
                    <a href={`mailto:${property.agentEmail}`} className="hover:text-hm-green">
                      {property.agentEmail}
                    </a>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      onClick={handleContactAgent}
                      className="w-full"
                    >
                      Contact Agent
                    </Button>
                    
                    {property.status === 'For Sale' && (
                      <Button 
                        onClick={handleMakePayment}
                        className="w-full bg-hm-gold hover:bg-hm-gold-dark text-black"
                      >
                        Make Payment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleSaveProperty}
                >
                  <Heart className="h-4 w-4" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={handleShareProperty}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;
