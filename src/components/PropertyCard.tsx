
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, ArrowRight, Home, Car, Sofa, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyType, PropertyCategory } from "@/types/property";
import { formatCurrency } from "@/utils/currencyUtils";
import { getPropertyImage } from "@/assets/properties";

interface PropertyCardProps {
  property: PropertyType;
}

const getCategoryIcon = (category: PropertyCategory) => {
  switch (category) {
    case 'house':
      return <Home className="h-3 w-3" />;
    case 'vehicle':
      return <Car className="h-3 w-3" />;
    case 'furniture':
      return <Sofa className="h-3 w-3" />;
    case 'land':
      return <TreePine className="h-3 w-3" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'sold':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    default:
      return 'bg-gray-100 text-gray-800';
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

const getSecondaryInfo = (property: PropertyType) => {
  switch (property.category) {
    case 'house':
      return property.size || property.land_size;
    case 'vehicle':
      return property.year ? `${property.year} ${property.make || ''}`.trim() : property.make;
    case 'furniture':
      return property.brand || property.material;
    case 'land':
      return property.size || property.land_size;
    default:
      return property.size;
  }
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  // Use property images from database, or fall back to generated images
  const imageUrl = property.images?.[0] || getPropertyImage(property.id, property.category);
  const secondaryInfo = getSecondaryInfo(property);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg bg-card">
      <div className="relative">
        <img
          src={imageUrl}
          alt={property.title}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="flex items-center gap-1 capitalize">
            {getCategoryIcon(property.category)}
            {property.category}
          </Badge>
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {property.featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white font-medium">
              Featured
            </Badge>
          )}
          <Badge className={getStatusColor(property.status)}>
            {getStatusLabel(property.status)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate text-foreground">{property.title}</h3>
        {property.location && (
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.location}</span>
          </div>
        )}
        <div className="mt-4 flex justify-between items-center">
          {secondaryInfo && (
            <div>
              <p className="text-sm text-muted-foreground">
                {property.category === 'vehicle' ? 'Details' : 'Size'}
              </p>
              <p className="font-semibold text-foreground">{secondaryInfo}</p>
            </div>
          )}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold text-primary">{formatCurrency(property.price)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/properties/${property.id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
