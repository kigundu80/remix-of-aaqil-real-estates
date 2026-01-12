
import { PropertyType } from "@/types/property";
import { Calendar, Phone, Mail, User, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/currencyUtils";
import { format } from "date-fns";

interface PropertyDetailSidebarProps {
  property: PropertyType;
}

const PropertyDetailSidebar = ({ property }: PropertyDetailSidebarProps) => {
  const { toast } = useToast();

  const handleContactAgent = () => {
    toast({
      title: "Request Sent!",
      description: "Our team will contact you soon about this property.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Property link has been copied to clipboard.",
    });
  };

  const handleSave = () => {
    toast({
      title: "Property Saved!",
      description: "This property has been added to your favorites.",
    });
  };

  const handleMakePayment = () => {
    window.location.href = `/payment?propertyId=${property.id}&amount=${property.price}`;
  };

  return (
    <div className="space-y-6">
      {/* Price Card */}
      <div className="bg-card rounded-xl shadow-sm border p-6">
        <div className="text-sm text-muted-foreground mb-1">Price</div>
        <div className="text-3xl font-bold text-primary mb-4">
          {formatCurrency(property.price)}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Calendar className="h-4 w-4" />
          <span>Listed {format(new Date(property.created_at), 'MMM dd, yyyy')}</span>
        </div>

        <div className="space-y-3">
          {property.status === 'available' && (
            <Button onClick={handleMakePayment} className="w-full" size="lg">
              Make Payment
            </Button>
          )}
          <Button onClick={handleContactAgent} variant="outline" className="w-full" size="lg">
            <Phone className="h-4 w-4 mr-2" />
            Contact Us
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleSave}
          >
            <Heart className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-card rounded-xl shadow-sm border p-6">
        <h3 className="font-semibold mb-4">Have Questions?</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground">Call us</p>
              <a href="tel:+256700123456" className="font-medium hover:text-primary">
                +256 700 123 456
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground">Email us</p>
              <a href="mailto:info@hmproperty.com" className="font-medium hover:text-primary">
                info@hmproperty.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailSidebar;
