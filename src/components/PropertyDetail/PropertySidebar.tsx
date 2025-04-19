
import { useState } from "react";
import { Calendar, DollarSign, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PropertySidebarProps {
  listedDate: string;
  price: number;
  size: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  propertyId: string;
  status: 'For Sale' | 'Sold' | 'Pending';
}

const PropertySidebar = ({
  listedDate,
  price,
  size,
  agentName,
  agentPhone,
  agentEmail,
  propertyId,
  status
}: PropertySidebarProps) => {
  const { toast } = useToast();
  
  const handleContactAgent = () => {
    toast({
      title: "Request Sent!",
      description: "The agent will contact you soon.",
      variant: "default",
    });
  };

  const handleMakePayment = () => {
    window.location.href = `/payment?propertyId=${propertyId}&amount=${price}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Property Information</h2>
      <div className="space-y-4 mb-6">
        <div className="flex items-start">
          <Calendar className="h-5 w-5 text-hm-green mr-3 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Date Listed</p>
            <p>{listedDate}</p>
          </div>
        </div>
        <div className="flex items-start">
          <DollarSign className="h-5 w-5 text-hm-green mr-3 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p>UGX {price.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="h-5 w-5 text-hm-green mr-3 mt-1" />
          <div>
            <p className="text-sm text-gray-500">Land Size</p>
            <p>{size}</p>
          </div>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
      <div className="space-y-4">
        <p className="font-medium text-lg">{agentName}</p>
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-hm-green mr-2" />
          <a href={`tel:${agentPhone}`} className="hover:text-hm-green">
            {agentPhone}
          </a>
        </div>
        <div className="flex items-center">
          <Mail className="h-5 w-5 text-hm-green mr-2" />
          <a href={`mailto:${agentEmail}`} className="hover:text-hm-green">
            {agentEmail}
          </a>
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={handleContactAgent}
            className="w-full"
          >
            Contact Agent
          </Button>
          
          {status === 'For Sale' && (
            <Button 
              onClick={handleMakePayment}
              className="w-full bg-hm-gold hover:bg-hm-gold-dark text-black"
            >
              Make Payment
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySidebar;
