
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (data: FormData) => void;
}

const AuthForm = ({ type, onSubmit }: AuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData(e.currentTarget);
      onSubmit(formData);
      
      toast({
        title: type === "login" ? "Logged in successfully!" : "Registration successful!",
        description: type === "login" ? 
          "Welcome back to HM Property Consultants." : 
          "Your account has been created. You can now browse properties and save favorites.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">
          {type === "login" ? "Sign in" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill in your details to create an account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "register" && (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
            </>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              {type === "login" && (
                <Link to="/forgot-password" className="text-sm text-hm-green hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          
          {type === "register" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {type === "login" ? "Signing in..." : "Creating account..."}
              </div>
            ) : (
              <>{type === "login" ? "Sign in" : "Create account"}</>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="mt-2 text-center text-sm">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="text-hm-green font-semibold hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-hm-green font-semibold hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
