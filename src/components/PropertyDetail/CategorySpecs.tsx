
import { PropertyType } from "@/types/property";
import { 
  Car, Fuel, Gauge, Calendar, Palette, Settings2, 
  Bed, Bath, ParkingCircle, Ruler, Building2, MapPin,
  Sofa, Box, Sparkles, Tag
} from "lucide-react";

interface CategorySpecsProps {
  property: PropertyType;
}

const SpecItem = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number | null | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
};

const VehicleSpecs = ({ property }: { property: PropertyType }) => (
  <div className="bg-card rounded-xl shadow-sm border p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Car className="h-5 w-5 text-primary" />
      Vehicle Specifications
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SpecItem icon={Car} label="Make" value={property.make} />
      <SpecItem icon={Tag} label="Model" value={property.model} />
      <SpecItem icon={Calendar} label="Year" value={property.year} />
      <SpecItem icon={Gauge} label="Mileage" value={property.mileage ? `${property.mileage.toLocaleString()} km` : null} />
      <SpecItem icon={Fuel} label="Fuel Type" value={property.fuel_type} />
      <SpecItem icon={Settings2} label="Transmission" value={property.transmission} />
      <SpecItem icon={Palette} label="Color" value={property.color} />
      <SpecItem icon={Gauge} label="Engine Size" value={property.engine_size} />
    </div>
  </div>
);

const HouseSpecs = ({ property }: { property: PropertyType }) => (
  <div className="bg-card rounded-xl shadow-sm border p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Building2 className="h-5 w-5 text-primary" />
      House Specifications
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SpecItem icon={Ruler} label="Size" value={property.size} />
      <SpecItem icon={Bed} label="Bedrooms" value={property.bedrooms} />
      <SpecItem icon={Bath} label="Bathrooms" value={property.bathrooms} />
      <SpecItem icon={MapPin} label="Land Size" value={property.land_size} />
      <SpecItem icon={Calendar} label="Year Built" value={property.year_built} />
      <SpecItem icon={ParkingCircle} label="Parking Spaces" value={property.parking_spaces} />
    </div>
  </div>
);

const LandSpecs = ({ property }: { property: PropertyType }) => (
  <div className="bg-card rounded-xl shadow-sm border p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <MapPin className="h-5 w-5 text-primary" />
      Land Details
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <SpecItem icon={Ruler} label="Size" value={property.size} />
      <SpecItem icon={MapPin} label="Land Size" value={property.land_size} />
    </div>
  </div>
);

const FurnitureSpecs = ({ property }: { property: PropertyType }) => (
  <div className="bg-card rounded-xl shadow-sm border p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Sofa className="h-5 w-5 text-primary" />
      Furniture Details
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SpecItem icon={Tag} label="Brand" value={property.brand} />
      <SpecItem icon={Box} label="Material" value={property.material} />
      <SpecItem icon={Ruler} label="Dimensions" value={property.dimensions} />
      <SpecItem icon={Sparkles} label="Condition" value={property.condition} />
    </div>
  </div>
);

const CategorySpecs = ({ property }: CategorySpecsProps) => {
  switch (property.category) {
    case 'vehicle':
      return <VehicleSpecs property={property} />;
    case 'house':
      return <HouseSpecs property={property} />;
    case 'land':
      return <LandSpecs property={property} />;
    case 'furniture':
      return <FurnitureSpecs property={property} />;
    default:
      return null;
  }
};

export default CategorySpecs;
