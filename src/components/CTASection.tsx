
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-hm-green py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Find Your Perfect Land in Uganda?
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
          Let HM Property Consultants guide you through the process of finding and purchasing 
          the ideal land that meets your needs and budget.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
            <Link to="/properties">Browse Properties</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/contact">Get in Touch</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-hm-green hover:bg-gray-100">
            <Link to="/payment">Make a Payment</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
