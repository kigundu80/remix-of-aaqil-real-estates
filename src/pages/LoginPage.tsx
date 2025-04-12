
import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Check if theme is light or dark based on background color
  const isDarkTheme = theme.background.includes("222.2") || theme.background.includes("240");

  // Toggle theme between light and dark
  const toggleTheme = () => {
    if (isDarkTheme) {
      // Switch to light theme
      setTheme({
        primary: "hsl(122 61% 34%)",
        secondary: "hsl(20 35% 38%)",
        accent: "hsl(45 100% 51%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        card: "hsl(0 0% 100%)",
        border: "hsl(214.3 31.8% 91.4%)",
      });
    } else {
      // Switch to dark theme
      setTheme({
        primary: "hsl(122 61% 34%)",
        secondary: "hsl(20 35% 38%)",
        accent: "hsl(45 100% 51%)",
        background: "hsl(222.2 84% 4.9%)",
        foreground: "hsl(210 40% 98%)",
        card: "hsl(222.2 84% 4.9%)",
        border: "hsl(217.2 32.6% 17.5%)",
      });
    }
  };

  const handleLogin = (formData: FormData) => {
    // In a real app, this would be an API call to authenticate the user
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const isAdmin = formData.get("isAdmin") === "true";
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Handle admin login attempt
    if (isAdmin) {
      // For demo purposes, show approval request toast
      toast({
        title: "Admin login requested",
        description: "An approval request has been sent. Please wait for confirmation.",
        duration: 5000,
      });
      
      // Simulate admin approval process after 3 seconds
      setTimeout(() => {
        // For demo purposes, always approve
        toast({
          title: "Admin access granted",
          description: "Your admin login has been approved.",
          duration: 5000,
        });
        
        // Store admin status and redirect to admin
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        navigate("/admin");
      }, 3000);
      
      return;
    }
    
    // Regular user login
    console.log("Login attempt:", { email });
    
    // Simulate successful login
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle theme"
            className="rounded-full"
          >
            {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
        
        <div className="w-full max-w-md px-4">
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
