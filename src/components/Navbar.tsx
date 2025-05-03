
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Properties", href: "/properties" },
    { title: "About Us", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  const serviceLinks = [
    { title: "Land Buying", href: "/land-buying" },
    { title: "Land Selling", href: "/land-selling" },
    { title: "Property Valuation", href: "/property-valuation" },
    { title: "Legal Consultation", href: "/legal-consultation" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-hm-green">HM</span>
          <span className="hidden sm:inline-block text-lg font-semibold">
            Property Consultants
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-sm font-medium transition-colors hover:text-hm-green"
            >
              {link.title}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium transition-colors hover:text-hm-green flex items-center gap-1">
              Services <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {serviceLinks.map((service) => (
                <DropdownMenuItem key={service.title} asChild>
                  <Link to={service.href}>{service.title}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="text-lg font-medium transition-colors hover:text-hm-green"
                  >
                    {link.title}
                  </Link>
                ))}
                
                {/* Services heading in mobile nav */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium mb-2">Services</h3>
                  <div className="flex flex-col gap-2 pl-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        className="text-sm font-medium transition-colors hover:text-hm-green"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 mt-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
