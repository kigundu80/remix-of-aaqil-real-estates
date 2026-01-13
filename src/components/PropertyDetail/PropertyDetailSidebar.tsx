
import { PropertyType } from "@/types/property";
import { Calendar, Phone, Mail, Share2, Heart, CreditCard, Building2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/currencyUtils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface PropertyDetailSidebarProps {
  property: PropertyType;
}

const PropertyDetailSidebar = ({ property }: PropertyDetailSidebarProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const getPaymentUrl = (method: string) => {
    const params = new URLSearchParams({
      propertyId: property.id,
      amount: property.price.toString(),
      title: property.title,
    });
    return `/payment/${method}?${params.toString()}`;
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

        {property.status === 'available' && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Payment Options</p>
            
            <Button 
              onClick={() => navigate(getPaymentUrl('card'))}
              variant="outline" 
              className="w-full justify-start gap-3 h-14"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-medium">Credit/Debit Card</p>
                <p className="text-xs text-muted-foreground">Visa, Mastercard</p>
              </div>
            </Button>

            <Button 
              onClick={() => navigate(getPaymentUrl('bank-transfer'))}
              variant="outline" 
              className="w-full justify-start gap-3 h-14"
            >
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">Direct bank payment</p>
              </div>
            </Button>

            <Button 
              onClick={() => navigate(getPaymentUrl('mobile-money'))}
              variant="outline" 
              className="w-full justify-start gap-3 h-14"
            >
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Smartphone className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-medium">Mobile Money</p>
                <p className="text-xs text-muted-foreground">MTN, Airtel Money</p>
              </div>
            </Button>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={handleContactAgent} variant="secondary" className="w-full" size="lg">
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
