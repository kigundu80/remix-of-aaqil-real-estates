
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Lock, Shield } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const VIP_CREDENTIALS = {
  username: "Kiggundu Aaqil Akram",
  email: "karmaramak@gmail.com",
  password: "@kigundu1409"
};

const VIPLoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Authenticate against hardcoded VIP credentials
    setTimeout(() => {
      if (
        username.trim() === VIP_CREDENTIALS.username &&
        email.trim() === VIP_CREDENTIALS.email &&
        password === VIP_CREDENTIALS.password
      ) {
        // Store VIP authentication state
        localStorage.setItem("isVipAdmin", "true");
        localStorage.setItem("vipAdminName", VIP_CREDENTIALS.username);
        localStorage.setItem("vipAdminEmail", VIP_CREDENTIALS.email);
        
        toast({
          title: "VIP Access Granted",
          description: "Welcome to the VIP Admin Panel, Kiggundu Aaqil Akram",
        });
        
        navigate("/vip-admin");
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid VIP credentials. This attempt has been logged.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <Toaster />
      <Card className="w-full max-w-md border-gray-800 bg-black/50 backdrop-blur-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">VIP Access Only</CardTitle>
          <CardDescription className="text-gray-400">
            This area is restricted to authorized developer personnel only.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-300">Developer Username</Label>
              <Input
                id="username"
                placeholder="Enter developer username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Developer Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter developer email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Developer Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter developer password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-900 border-gray-700 text-white"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Authenticate
                  </div>
                )}
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>Unauthorized access attempts will be logged and reported.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VIPLoginPage;
