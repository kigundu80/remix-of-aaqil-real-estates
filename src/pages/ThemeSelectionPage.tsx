
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPreview from "@/components/ColorPreview";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const ThemeSelectionPage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();

  const handleThemeToggle = () => {
    toggleDarkMode();
    const modeText = !isDarkMode ? "Dark" : "Light";
    
    toast({
      title: `${modeText} Theme Applied`,
      description: `${modeText} theme has been applied successfully.`,
    });
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Theme Settings</h1>
        <p className="text-muted-foreground max-w-2xl">
          Switch between light and dark mode for HM Property Consultants.
          Your preferences will be saved for future visits.
        </p>
        
        <div className="mt-8 flex flex-col items-center gap-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Current Theme: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ThemeToggle size="large" onToggle={handleThemeToggle} />
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full mt-8">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-1">
          <TabsTrigger value="preview">Color Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-6">
          <ColorPreview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThemeSelectionPage;
