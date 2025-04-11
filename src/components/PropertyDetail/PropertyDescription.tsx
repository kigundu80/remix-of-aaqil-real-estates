
import { CheckCircle } from "lucide-react";

interface PropertyDescriptionProps {
  description: string;
  features: string[];
  amenities: string[];
}

const PropertyDescription = ({ 
  description, 
  features, 
  amenities 
}: PropertyDescriptionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Property Description</h2>
      <p className="text-gray-700 mb-6">
        {description}
      </p>
      
      <h3 className="text-lg font-semibold mb-3">Property Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {features?.map((feature, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-hm-green mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <h3 className="text-lg font-semibold mb-3">Nearby Amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {amenities?.map((amenity, index) => (
          <div key={index} className="flex items-center">
            <CheckCircle className="h-5 w-5 text-hm-green mr-2" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDescription;
