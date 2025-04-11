
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, MapPin, Calculator, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const PropertyValuationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Property Valuation Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-6">
              Accurate and professional property valuation services for all types of land and real estate in Uganda.
            </p>
            <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
              <Link to="/contact">Request a Valuation</Link>
            </Button>
          </div>
        </div>

        {/* Services Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Valuation Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-l-4 border-l-hm-green">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 text-hm-green" />
                    Land Valuation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive valuation of land properties based on location, size, accessibility, zoning regulations, and market trends. Ideal for sale preparation, taxation, or investment planning.</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-hm-green">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ClipboardCheck className="mr-2 text-hm-green" />
                    Due Diligence Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Thorough verification of property details, title history, encumbrances, and legal status to ensure you have complete information before making investment decisions.</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-hm-green">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 text-hm-green" />
                    Rental Value Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Accurate determination of potential rental income for your property based on current market rates, location advantages, and property features.</p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-hm-green">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Landmark className="mr-2 text-hm-green" />
                    Asset Valuation for Financing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Professional property valuation reports accepted by banks and financial institutions for mortgage applications, loans, and other financing purposes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Valuation Process</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-hm-green text-white flex items-center justify-center font-bold text-xl">1</div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Initial Consultation</h3>
                <p>We discuss your property and valuation needs to determine the appropriate assessment approach.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-hm-green text-white flex items-center justify-center font-bold text-xl">2</div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Site Inspection</h3>
                <p>Our experts conduct a thorough on-site inspection to assess property features and condition.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-hm-green text-white flex items-center justify-center font-bold text-xl">3</div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Market Analysis</h3>
                <p>We analyze current market trends, comparable properties, and location factors to determine value.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-hm-green text-white flex items-center justify-center font-bold text-xl">4</div>
                <h3 className="text-xl font-semibold mb-3 mt-2">Detailed Report</h3>
                <p>You receive a comprehensive valuation report with detailed analysis and evidence-based conclusions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Valuation Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Professional Expertise</h3>
                <p>Our valuation team consists of certified professionals with extensive experience in the Ugandan property market.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Accuracy & Reliability</h3>
                <p>We use proven methodologies and up-to-date market data to ensure accurate and defensible valuations.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-hm-green-dark rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Turnaround</h3>
                <p>We deliver comprehensive valuation reports within agreed timeframes without compromising on quality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need a Property Valuation?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our team today for a professional and accurate assessment of your property value.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
                <Link to="/contact">Request a Valuation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/about">Learn About Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyValuationPage;
