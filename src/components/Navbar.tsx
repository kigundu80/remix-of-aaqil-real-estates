import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Sun, Moon, User, LogIn, Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import SearchPanel from "./SearchPanel";
import { useSearchPanel } from "@/hooks/useSearchPanel";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { isSearchOpen, openSearch, closeSearch } = useSearchPanel();

  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "Services", path: "#", dropdown: [
      { name: "Land Buying", path: "/land-buying" },
      { name: "Land Selling", path: "/land-selling" },
      { name: "Property Valuation", path: "/property-valuation" },
      { name: "Legal Consultation", path: "/legal-consultation" },
    ]},
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-hm-green">HM</span>
            <span className="ml-1 text-lg">Property Consultants</span>
          </Link>
          <nav className="hidden md:flex ml-8">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  {link.dropdown ? (
                    <>
                      <span className={`cursor-pointer py-2 text-sm font-medium ${location.pathname === link.path ? "text-hm-green" : "text-foreground hover:text-hm-green"}`}>
                        {link.name}
                      </span>
                      <div className="absolute left-0 top-full pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <ul className="bg-background shadow-lg rounded-md py-2 border">
                          {link.dropdown.map((subLink) => (
                            <li key={subLink.name}>
                              <Link 
                                to={subLink.path} 
                                className="block px-4 py-2 text-sm hover:bg-muted hover:text-hm-green"
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`py-2 text-sm font-medium ${location.pathname === link.path ? "text-hm-green" : "text-foreground hover:text-hm-green"}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={openSearch} className="text-muted-foreground hover:text-foreground hover:bg-accent">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground hover:bg-accent">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/login" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/register" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent">
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <>
                        <span className="text-lg font-medium mb-2">{link.name}</span>
                        <ul className="ml-4 space-y-2 mb-4">
                          {link.dropdown.map((subLink) => (
                            <li key={subLink.name}>
                              <Link 
                                to={subLink.path} 
                                className="text-muted-foreground hover:text-foreground"
                              >
                                {subLink.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link 
                        to={link.path} 
                        className={`text-lg font-medium ${location.pathname === link.path ? "text-hm-green" : "text-foreground"}`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild variant="outline" size="sm">
                    <Link to="/login" className="flex items-center gap-1 justify-center">
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link to="/register" className="flex items-center gap-1 justify-center">
                      <User className="h-4 w-4" />
                      Register
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <SearchPanel isOpen={isSearchOpen} onClose={closeSearch} />
    </header>
  );
};

export default Navbar;
