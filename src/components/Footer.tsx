
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Paintbrush, Copyright } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-hm-green text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold text-white">HM</span>
              <span className="ml-2 text-lg font-semibold">Property Consultants</span>
            </Link>
            <p className="text-sm text-gray-200 mb-4">
              Your trusted partner in finding the perfect land property in Uganda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-hm-gold">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-hm-gold">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white hover:text-hm-gold">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-hm-gold">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-200 hover:text-white">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-200 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/land-buying" className="text-gray-200 hover:text-white">
                  Land Buying
                </Link>
              </li>
              <li>
                <Link to="/land-selling" className="text-gray-200 hover:text-white">
                  Land Selling
                </Link>
              </li>
              <li>
                <Link to="/property-valuation" className="text-gray-200 hover:text-white">
                  Property Valuation
                </Link>
              </li>
              <li>
                <Link to="/legal-consultation" className="text-gray-200 hover:text-white">
                  Legal Consultation
                </Link>
              </li>
              <li>
                <Link to="/theme" className="text-gray-200 hover:text-white flex items-center gap-1">
                  <Paintbrush size={14} />
                  Customize Theme
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>123 Kampala Road, Kampala, Uganda</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="tel:+256700000000" className="hover:text-hm-gold">
                  +256 700 000 000
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <a href="mailto:info@hmproperty.com" className="hover:text-hm-gold">
                  info@hmproperty.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-hm-green-dark mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <Copyright className="h-4 w-4 mr-1" />
            <p className="text-sm text-gray-200">
              {new Date().getFullYear()} HM Property Consultants. All rights reserved. 
              <span className="ml-2 font-medium">Created by Karma Aaqil Akram Kiggundu</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-white hover:bg-hm-green-dark">
              <Link to="/theme" className="flex items-center gap-1">
                <Paintbrush size={16} />
                <span>Customize Theme</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
