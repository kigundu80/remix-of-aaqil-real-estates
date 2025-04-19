
import PropertyCard from "@/components/PropertyCard";
import { PropertyType } from "@/types/property";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  results: PropertyType[];
  isLoading: boolean;
}

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
      {results.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
