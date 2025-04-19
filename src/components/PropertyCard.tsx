import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/types/property";

const PropertyCard = ({ property }: { property: PropertyType }) => {
  const { id, title, location, price, size, imageUrl, featured, status } = property;

  const statusColor = 
    status === 'available' ? 'bg-green-100 text-green-800' :
    status === 'sold' ? 'bg-red-100 text-red-800' :
    'bg-yellow-100 text-yellow-800';

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {featured && (
            <Badge variant="secondary" className="bg-hm-gold text-hm-gold-dark font-medium">
              Featured
            </Badge>
          )}
          <Badge className={`${statusColor}`}>
            {status}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <div className="flex items-center mt-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{location}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Size</p>
            <p className="font-semibold">{size}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold text-hm-green">USh {price.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild variant="outline" className="w-full">
          <Link to={`/properties/${id}`} className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
