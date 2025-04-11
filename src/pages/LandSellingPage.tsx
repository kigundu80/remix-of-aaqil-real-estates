
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, PresentationChart, HandshakeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LandSellingPage = () => {
  // Manually create the HandshakeIcon since it's not available in lucide-react
  const HandshakeIcon = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 6l7 7-4 4-7-7V6h4z" />
      <path d="M10 18l-7-7 4-4 7 7v4h-4z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Land Selling Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-6">
              Maximize the value of your land property with our expert selling services.
            </p>
            <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
              <Link to="/contact">Request Property Valuation</Link>
            </Button>
          </div>
        </div>

        {/* Process Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Land Selling Process</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <Search className="text-white" />
                  </div>
                  <CardTitle>Property Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We conduct a thorough assessment of your land to determine its market value 
                    and identify unique selling points.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="text-white" />
                  </div>
                  <CardTitle>Marketing Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We develop a customized marketing plan to showcase your property 
                    to the right audience through multiple channels.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <PresentationChart className="text-white" />
                  </div>
                  <CardTitle>Buyer Negotiations</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Our team handles all negotiations with potential buyers to ensure 
                    you get the best possible price for your property.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                    <HandshakeIcon className="text-white" />
                  </div>
                  <CardTitle>Closing & Transfer</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    We manage all documentation and legal processes to ensure 
                    a smooth and secure property transfer.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Benefits of Our Selling Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Maximum Market Value</h3>
                <p>Our expertise in the Ugandan land market ensures that your property is priced correctly to maximize returns while attracting serious buyers.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Wider Exposure</h3>
                <p>We promote your land through our extensive network of investors, developers, and individual buyers both locally and internationally.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Faster Sales Process</h3>
                <p>Our streamlined approach and qualified buyer database help reduce the time your property stays on the market.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Legal Security</h3>
                <p>We ensure all transactions are legally compliant, protecting you from future claims and disputes over the sale.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Hassle-Free Experience</h3>
                <p>We handle viewings, negotiations, paperwork, and closing procedures, saving you time and reducing stress.</p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 text-hm-green">Post-Sale Support</h3>
                <p>Our services extend beyond the sale closure, ensuring smooth transfer of ownership and addressing any post-sale matters.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Sell Your Land Property?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our team today for a free property valuation and consultation on how we can help you achieve the best sale price.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/payment">Payment Options</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandSellingPage;
