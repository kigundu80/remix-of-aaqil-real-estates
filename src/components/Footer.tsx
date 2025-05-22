
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Copyright } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`bg-primary text-primary-foreground`}>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex flex-col items-start mb-4">
              <div className={`p-2 rounded ${isDarkMode ? 'bg-white/10' : 'bg-background'}`}>
                <img 
                  src="/lovable-uploads/b4f632ed-048f-43a5-a317-0f23e3ec897f.png" 
                  alt="HM Property Consultants Logo" 
                  className="h-16 w-auto" 
                />
              </div>
              <span className="text-xl font-bold mt-3 tracking-tighter text-primary-foreground">
                HM PROPERTY CONSULTANTS
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Your trusted partner in finding the perfect land property in Uganda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-foreground hover:text-accent">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-primary-foreground hover:text-accent">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-primary-foreground hover:text-accent">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-primary-foreground hover:text-accent">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/land-buying" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Land Buying
                </Link>
              </li>
              <li>
                <Link to="/land-selling" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Land Selling
                </Link>
              </li>
              <li>
                <Link to="/property-valuation" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link to="/legal-consultation" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Legal Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary-foreground">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>123 Kampala Road, Kampala, Uganda</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="tel:+256700000000" className="hover:text-accent">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="mailto:info@hmproperty.com" className="hover:text-accent">
                  info@hmproperty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`border-t border-primary-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center`}>
          <div className="flex items-center">
            <Copyright className="h-4 w-4 mr-1" />
            <p className="text-sm text-primary-foreground/80">
              {new Date().getFullYear()} HM PROPERTY CONSULTANTS. All rights reserved. 
              <span className="ml-2 font-medium">Created by Karma Aaqil Akram Kiggundu</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
