
import { PropertyType, PropertyCategory } from "@/types/property";
import { MapPin, Home, Car, Sofa, TreePine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currencyUtils";

interface PropertyDetailHeaderProps {
  property: PropertyType;
}

const getCategoryIcon = (category: PropertyCategory) => {
  switch (category) {
    case 'house':
      return <Home className="h-5 w-5" />;
    case 'vehicle':
      return <Car className="h-5 w-5" />;
    case 'furniture':
      return <Sofa className="h-5 w-5" />;
    case 'land':
      return <TreePine className="h-5 w-5" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'available':
      return 'default';
    case 'sold':
      return 'destructive';
    case 'pending':
      return 'secondary';
    default:
      return 'default';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'available':
      return 'For Sale';
    case 'sold':
      return 'Sold';
    case 'pending':
      return 'Pending';
    default:
      return status;
  }
};

const PropertyDetailHeader = ({ property }: PropertyDetailHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <Badge variant="outline" className="flex items-center gap-1.5 px-3 py-1 capitalize">
          {getCategoryIcon(property.category)}
          {property.category}
        </Badge>
        <Badge variant={getStatusVariant(property.status)}>
          {getStatusLabel(property.status)}
        </Badge>
        {property.featured && (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            Featured
          </Badge>
        )}
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
        {property.title}
      </h1>
      
      {property.location && (
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <MapPin className="h-5 w-5" />
          <span className="text-lg">{property.location}</span>
        </div>
      )}
      
      <div className="text-3xl md:text-4xl font-bold text-primary">
        {formatCurrency(property.price)}
      </div>
    </div>
  );
};

export default PropertyDetailHeader;
