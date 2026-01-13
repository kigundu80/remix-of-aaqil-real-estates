
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, User, Briefcase, Award, MapPin, Phone } from "lucide-react";

const AboutPage = () => {
  const coreValues = [
    {
      title: "Integrity",
      description: "We conduct all transactions with honesty and transparency, ensuring that our clients' interests are always our top priority."
    },
    {
      title: "Excellence",
      description: "We strive for excellence in all our services, going above and beyond to exceed our clients' expectations."
    },
    {
      title: "Knowledge",
      description: "We maintain extensive knowledge of the Ugandan land market, laws, and regulations to provide accurate and valuable advice."
    },
    {
      title: "Client-Focused",
      description: "We are committed to understanding our clients' unique needs and providing personalized solutions."
    },
  ];

  const teamMembers = [
    {
      name: "Jairus Mukabya",
      position: "Founder & CEO",
      bio: "With over 20 years in Uganda's real estate industry, Henry founded JAH'S Property Consultants with a vision to make land ownership accessible and transparent.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Sarah Namakula",
      position: "Head of Sales",
      bio: "Sarah has an exceptional ability to match clients with their ideal properties, making the buying process smooth and enjoyable.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "David Okello",
      position: "Legal Consultant",
      bio: "David specializes in land law and ensures all our transactions comply with Ugandan regulations and that titles are properly transferred.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Patricia Nalunga",
      position: "Operations Manager",
      bio: "Patricia ensures that all aspects of our business run smoothly, coordinating between clients, agents, and legal teams.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About JAH'S Property Consultants</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Your trusted partner in finding the perfect land property in Uganda since 2024.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  JAH'S Property Consultants was founded in 2024 by Jairus Mukabya with a vision to transform the 
                  land buying and selling process in Uganda. Having witnessed the challenges and complexities 
                  in the Ugandan real estate market, Henry set out to create a company that would prioritize 
                  transparency, integrity, and client satisfaction above all else.
                </p>
                <p className="text-gray-700 mb-6">
                  What began as a small operation has grown into one of Uganda's most respected property 
                  consultancy firms, specializing in land transactions. Our team has expanded to include 
                  experts in various fields related to real estate, ensuring that we provide comprehensive 
                  service to our clients from start to finish.
                </p>
                <p className="text-gray-700">
                  Today, JAH'S Property Consultants stands as a beacon of trust in the industry, having 
                  facilitated thousands of successful land transactions across Uganda. Our commitment 
                  to our founding principles remains unwavering as we continue to grow and adapt to the 
                  evolving needs of our clients.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="HM Property Office" 
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-hm-gold text-black p-6 rounded-lg shadow-lg hidden md:block">
                  <p className="text-lg font-semibold mb-1">Established</p>
                  <p className="text-3xl font-bold">2024</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-gray-600">
                These principles guide every aspect of our business and ensure that we always provide 
                the highest quality service to our clients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1">
                  <div className="p-2 bg-hm-green/10 text-hm-green rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-gray-600">
                Our experienced team of professionals is dedicated to providing exceptional service 
                and expert guidance throughout your property journey.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-hm-green mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-lg">Satisfied Clients</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <p className="text-lg">Properties Sold</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">18+</div>
                <p className="text-lg">Years of Experience</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">20+</div>
                <p className="text-lg">Team Members</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Whether you're looking to buy or sell land in Uganda, our team is here to help you 
              navigate the process and achieve your goals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/properties">Browse Properties</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
