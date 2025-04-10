
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
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, always succeed
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
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <AuthForm type="login" onSubmit={handleLogin} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
