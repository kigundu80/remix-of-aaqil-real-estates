
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
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode } = useTheme();

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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className={`p-1 rounded ${isDarkMode ? 'bg-white/10' : ''}`}>
            <img 
              src="/lovable-uploads/b4f632ed-048f-43a5-a317-0f23e3ec897f.png" 
              alt="HM Property Consultants Logo" 
              className="h-12 w-auto" 
            />
          </div>
          <span className="hidden sm:inline-block text-lg font-semibold text-foreground">
            HM PROPERTY CONSULTANTS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-hm-green"
            >
              {link.title}
            </Link>
          ))}
          
          {/* Services Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-foreground/80 transition-colors hover:text-hm-green flex items-center gap-1">
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
          <ThemeToggle />
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
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center">
                  <div className={`p-1 rounded ${isDarkMode ? 'bg-white/10' : ''}`}>
                    <img 
                      src="/lovable-uploads/b4f632ed-048f-43a5-a317-0f23e3ec897f.png" 
                      alt="HM Property Consultants Logo" 
                      className="h-10 w-auto" 
                    />
                  </div>
                  <span className="inline-block mt-1 font-semibold text-foreground">
                    HM PROPERTY CONSULTANTS
                  </span>
                </Link>
                <ThemeToggle />
              </div>
              <div className="flex flex-col gap-6 pt-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-hm-green"
                  >
                    {link.title}
                  </Link>
                ))}
                
                {/* Services heading in mobile nav */}
                <div className="mt-2">
                  <h3 className="text-lg font-medium mb-2 text-foreground">Services</h3>
                  <div className="flex flex-col gap-2 pl-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.title}
                        to={service.href}
                        className="text-sm font-medium text-foreground/80 transition-colors hover:text-hm-green"
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
