
import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        <div className="w-full max-w-md px-4">
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
