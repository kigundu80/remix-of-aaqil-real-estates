
import { CheckCircle } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="bg-card rounded-xl shadow-sm border p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Features & Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10"
          >
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;
