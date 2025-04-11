
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PropertyActions = () => {
  const { toast } = useToast();

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

  return (
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
  );
};

export default PropertyActions;
