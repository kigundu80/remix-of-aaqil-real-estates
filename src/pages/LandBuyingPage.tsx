
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Banknote, FileCheck, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const LandBuyingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Land Buying Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-6">
              Let our experts help you find and purchase the perfect land property in Uganda.
            </p>
            <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
              <Link to="/properties">Browse Available Land</Link>
            </Button>
          </div>
        </div>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Land Buying Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <MapPin className="text-white" />
                  </div>
                  <CardTitle>Property Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We help you identify suitable land properties based on your requirements, 
                    budget, and preferred locations across Uganda.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <FileCheck className="text-white" />
                  </div>
                  <CardTitle>Due Diligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our team conducts thorough checks on land titles, ownership history, 
                    and legal status to ensure you're making a secure investment.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <Banknote className="text-white" />
                  </div>
                  <CardTitle>Price Negotiation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We leverage our market expertise to negotiate the best possible 
                    price and terms for your land purchase.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <Shield className="text-white" />
                  </div>
                  <CardTitle>Transfer & Registration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We handle all legal aspects of the transfer process and ensure 
                    proper registration of your new property.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose HM Property Consultants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Local Market Expertise</h3>
                <p>Our team has extensive knowledge of Uganda's land market across different regions.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Legal Protection</h3>
                <p>We ensure all transactions are legally sound, protecting your investment from future disputes.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">End-to-End Support</h3>
                <p>From property search to final registration, we support you at every step of the buying process.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Transparent Pricing</h3>
                <p>No hidden fees or costs—we maintain complete transparency throughout our services.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">After-Sale Support</h3>
                <p>Our relationship doesn't end after purchase; we offer continued support for land development.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Customized Solutions</h3>
                <p>We tailor our services to meet your specific needs, whether you're buying for investment or development.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Land Buying Journey?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our team today for a free consultation and let us help you find the perfect land property.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/properties">View Properties</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandBuyingPage;
