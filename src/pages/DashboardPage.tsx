
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { HeartIcon, GridIcon, UserIcon, ImageIcon, LogOutIcon } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import PropertyCard from "@/components/PropertyCard";
import { PropertyType } from "@/types/property";
import { useToast } from "@/hooks/use-toast";

// Sample saved properties - would come from an API in a real app
const savedProperties: PropertyType[] = [
  {
    id: "2",
    category: "land",
    title: "Commercial Plot in Entebbe",
    description: "Prime commercial plot in Entebbe",
    location: "Entebbe, Uganda",
    price: 350000000,
    size: "1.2 Acres",
    images: ["https://images.unsplash.com/photo-1592595896616-c37162298647?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"],
    features: [],
    featured: true,
    status: 'available',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    category: "land",
    title: "Waterfront Land in Mukono",
    description: "Beautiful waterfront property",
    location: "Mukono, Uganda",
    price: 280000000,
    size: "0.8 Acres",
    images: ["https://images.unsplash.com/photo-1575997759258-91792eaaf87b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bGFrZSUyMGxhbmR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"],
    features: [],
    featured: true,
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

const DashboardPage = () => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userProperties, setUserProperties] = useState<PropertyType[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    
    if (!isLoggedIn || isLoggedIn !== "true") {
      navigate("/login");
      return;
    }
    
    // Get user info from localStorage
    // In a real app, this would come from an API
    const storedName = localStorage.getItem("userName") || "User";
    const storedEmail = localStorage.getItem("userEmail") || "user@example.com";
    
    setUserName(storedName);
    setUserEmail(storedEmail);
    
    // Get saved properties
    // In a real app, this would be an API call
    setUserProperties(savedProperties);
  }, [navigate]);

  const handleProfileUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 1500);
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    
    // Redirect to homepage
    navigate("/");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleImagesUploaded = (images: File[]) => {
    // In a real app, this would upload the images to a server
    console.log("Images to upload:", images);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-gray-600">Manage your account and properties</p>
            </div>
            <Button 
              variant="outline"
              className="flex items-center gap-2 mt-4 md:mt-0"
              onClick={handleLogout}
            >
              <LogOutIcon className="h-4 w-4" />
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="profile">
            <TabsList className="grid w-full max-w-xl grid-cols-3 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center gap-2">
                <HeartIcon className="h-4 w-4" />
                <span>Saved Properties</span>
              </TabsTrigger>
              <TabsTrigger value="uploads" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Uploads</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your account information here.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="flex flex-col items-center mb-6">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="" alt={userName} />
                        <AvatarFallback className="text-3xl bg-hm-green text-white">
                          {userName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">Change Photo</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          defaultValue={userName.split(" ")[0]} 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          defaultValue={userName.split(" ")[1] || ""} 
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue={userEmail} 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        defaultValue="+256 700 000 000" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">About Me</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself" 
                        rows={4} 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                          </svg>
                          Updating...
                        </div>
                      ) : (
                        "Update Profile"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="saved">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Properties</CardTitle>
                  <CardDescription>Properties you've saved for future reference.</CardDescription>
                </CardHeader>
                <CardContent>
                  {userProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {userProperties.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HeartIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-bold text-gray-700 mb-2">No saved properties</h3>
                      <p className="text-gray-500 mb-4">
                        You haven't saved any properties yet.
                      </p>
                      <Button asChild>
                        <a href="/properties">Browse Properties</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="uploads">
              <Card>
                <CardHeader>
                  <CardTitle>Property Image Uploads</CardTitle>
                  <CardDescription>Upload images of properties you're interested in or want to share.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ImageUploader 
                    onImagesUploaded={handleImagesUploaded}
                    maxImages={10}
                    label="Upload Property Images"
                    description="Share images of properties you're interested in (PNG, JPG or JPEG, max 5MB each)"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DashboardPage;
