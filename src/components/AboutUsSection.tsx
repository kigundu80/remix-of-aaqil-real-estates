
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const AboutUsSection = () => {
  const features = [
    "Expert knowledge of Ugandan land market",
    "Transparent and ethical business practices",
    "Comprehensive legal guidance and support",
    "Customized service for each client's needs",
    "Access to exclusive property listings",
    "Free property valuation services",
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              About HM Property Consultants
            </h2>
            <p className="text-gray-700 mb-4">
              HM Property Consultants is a leading land property agency in Uganda, 
              specializing in connecting buyers and sellers for mutually beneficial transactions.
              With decades of combined experience, our team offers unparalleled knowledge 
              and service in the Ugandan real estate market.
            </p>
            <p className="text-gray-700 mb-6">
              Our mission is to make land ownership in Uganda accessible, transparent, 
              and hassle-free. Whether you're looking to buy land for development, 
              investment, or agricultural purposes, our dedicated team is here to guide 
              you through every step of the process.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-hm-green mr-2 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
          
          <div className="lg:ml-auto">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlYWwlMjBlc3RhdGUlMjB0ZWFtfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" 
                alt="Our Team" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-hm-green text-white p-6 rounded-lg shadow-lg hidden md:block">
                <p className="text-lg font-semibold mb-1">Trusted by</p>
                <p className="text-3xl font-bold">500+ Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
