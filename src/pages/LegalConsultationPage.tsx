
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, FileText, Briefcase, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const LegalConsultationPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Consultation Services</h1>
            <p className="text-xl max-w-3xl mx-auto mb-6">
              Expert legal guidance for all your property transactions and land matters in Uganda.
            </p>
            <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
              <Link to="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Legal Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-hm-green rounded-full flex items-center justify-center mr-4">
                      <FileText className="text-white" />
                    </div>
                    <CardTitle>Title Verification & Transfer</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We conduct comprehensive title searches and verification to confirm ownership and identify any encumbrances before proceeding with property transfers. Our team handles all documentation to ensure legally sound title transfers.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-hm-green rounded-full flex items-center justify-center mr-4">
                      <Briefcase className="text-white" />
                    </div>
                    <CardTitle>Contract Drafting & Review</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Our legal team drafts and reviews purchase agreements, lease contracts, and other real estate documents to protect your interests and ensure compliance with Ugandan property laws and regulations.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-hm-green rounded-full flex items-center justify-center mr-4">
                      <Scale className="text-white" />
                    </div>
                    <CardTitle>Dispute Resolution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">We provide expert mediation and legal representation for resolving property disputes, boundary issues, inheritance claims, and other land-related conflicts through negotiation or formal legal channels.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <div className="w-12 h-12 bg-hm-green rounded-full flex items-center justify-center mr-4">
                      <ShieldCheck className="text-white" />
                    </div>
                    <CardTitle>Compliance & Regulatory Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">Stay compliant with Uganda's land use regulations, zoning laws, and property taxation requirements. We provide guidance on permits, approvals, and regulatory compliance for development projects.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Legal Consultation Process</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-hm-green transform -translate-x-1/2"></div>
              
              <div className="space-y-12">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold text-hm-green mb-2">Initial Consultation</h3>
                    <p>We begin with a detailed discussion of your legal needs, background of your property matter, and objectives you wish to achieve.</p>
                  </div>
                  <div className="md:w-10 md:h-10 bg-hm-green rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 order-1 md:order-none"></div>
                  <div className="md:w-10 md:h-10 bg-hm-green rounded-full flex items-center justify-center z-10 my-4 md:my-0 order-3 md:order-none">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2 md:order-none">
                    <h3 className="text-xl font-semibold text-hm-green mb-2">Legal Assessment</h3>
                    <p>Our legal team conducts thorough research, document review, and assessment of the legal aspects of your property situation.</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold text-hm-green mb-2">Strategy Development</h3>
                    <p>We develop a customized legal strategy and action plan tailored to your specific property matter and objectives.</p>
                  </div>
                  <div className="md:w-10 md:h-10 bg-hm-green rounded-full flex items-center justify-center z-10 my-4 md:my-0">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 order-1 md:order-none"></div>
                  <div className="md:w-10 md:h-10 bg-hm-green rounded-full flex items-center justify-center z-10 my-4 md:my-0 order-3 md:order-none">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 order-2 md:order-none">
                    <h3 className="text-xl font-semibold text-hm-green mb-2">Implementation & Resolution</h3>
                    <p>We implement the agreed strategy through document preparation, negotiation, representation, or other appropriate legal actions to achieve your goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Legal Services</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">Specialized Expertise</h3>
                <p>Our legal team specializes in Ugandan property law with extensive experience in handling complex land transactions and disputes.</p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">Preventative Approach</h3>
                <p>We focus on preventing legal issues through thorough due diligence and proper documentation rather than resolving problems after they occur.</p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">End-to-End Support</h3>
                <p>From initial consultation to implementation, we provide comprehensive legal support throughout the entire property transaction process.</p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">Client-Centered Service</h3>
                <p>We prioritize your needs and objectives, providing personalized legal solutions tailored to your specific situation.</p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">Clear Communication</h3>
                <p>We explain complex legal matters in simple terms, ensuring you fully understand your options and the implications of various legal decisions.</p>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-hm-green">Ethical Practice</h3>
                <p>Our legal services adhere to the highest ethical standards, prioritizing integrity and transparency in all client interactions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Need Legal Guidance for Your Property?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Contact our legal team today to schedule a consultation and protect your property interests.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-hm-gold hover:bg-hm-gold-dark text-black">
                <Link to="/contact">Schedule Consultation</Link>
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

export default LegalConsultationPage;
