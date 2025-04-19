
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyHeaderProps {
  title: string;
  location: string;
  status: 'For Sale' | 'Sold' | 'Pending';
  featured: boolean;
  price: number;
  size: string;
}

const PropertyHeader = ({ 
  title, 
  location, 
  status, 
  featured, 
  price, 
  size 
}: PropertyHeaderProps) => {
  const statusColor = 
    status === 'For Sale' ? 'bg-green-100 text-green-800' :
    status === 'Sold' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800';

  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge className={statusColor}>
            {status}
          </Badge>
          {featured && (
            <Badge variant="secondary" className="bg-hm-gold text-hm-gold-dark">
              Featured
            </Badge>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-2xl font-bold text-hm-green mb-1">
          USh {price.toLocaleString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span>{size}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyHeader;
