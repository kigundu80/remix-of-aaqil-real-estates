
import AuthForm from "@/components/AuthForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (formData: FormData) => {
    // In a real app, this would be an API call to register the user
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    
    // Simple validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, always succeed
    console.log("Registration attempt:", { firstName, lastName, email, phone });
    
    // Simulate successful registration
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", `${firstName} ${lastName}`);
    
    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">
          <AuthForm type="register" onSubmit={handleRegister} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegisterPage;
