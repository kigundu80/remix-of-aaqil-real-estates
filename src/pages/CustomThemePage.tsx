
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Palette, Swatch } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import ColorPreview from "@/components/ColorPreview";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

const CustomThemePage = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { toast } = useToast();
  
  // Predefined color palettes
  const presetPalettes = {
    green: [
      { name: "Primary", value: "#2E7D32", foreground: "#FFFFFF" },
      { name: "Secondary", value: "#795548", foreground: "#FFFFFF" },
      { name: "Accent", value: "#FFC107", foreground: "#000000" },
    ],
    purple: [
      { name: "Primary", value: "#9b87f5", foreground: "#FFFFFF" },
      { name: "Secondary", value: "#7E69AB", foreground: "#FFFFFF" },
      { name: "Accent", value: "#FEC6A1", foreground: "#000000" },
    ],
    blue: [
      { name: "Primary", value: "#0EA5E9", foreground: "#FFFFFF" },
      { name: "Secondary", value: "#403E43", foreground: "#FFFFFF" },
      { name: "Accent", value: "#F97316", foreground: "#000000" },
    ]
  };

  // Active palette and custom colors state
  const [activePalette, setActivePalette] = useState<"green" | "purple" | "blue">("green");
  const [customColors, setCustomColors] = useState<Record<string, ColorOption>>({
    primary: { name: "Primary", value: "#2E7D32", foreground: "#FFFFFF" },
    secondary: { name: "Secondary", value: "#795548", foreground: "#FFFFFF" },
    accent: { name: "Accent", value: "#FFC107", foreground: "#000000" },
  });
  const [selectedTab, setSelectedTab] = useState("presets");

  const handlePaletteChange = (palette: "green" | "purple" | "blue") => {
    setActivePalette(palette);
    
    // Update the custom colors based on the selected palette
    const updatedColors = {
      primary: presetPalettes[palette][0],
      secondary: presetPalettes[palette][1],
      accent: presetPalettes[palette][2],
    };
    
    setCustomColors(updatedColors);
    
    // Preview would happen here, but for now just toast
    toast({
      title: "Theme Preview",
      description: `${palette.charAt(0).toUpperCase() + palette.slice(1)} theme palette selected.`,
    });
  };

  const handleColorChange = (key: string, value: string) => {
    setCustomColors({
      ...customColors,
      [key]: {
        ...customColors[key],
        value
      }
    });
  };

  const applyCustomTheme = () => {
    // In a real implementation, this would update CSS variables
    // For now, we'll just show a toast
    toast({
      title: "Theme Applied",
      description: `Custom theme has been applied. Note: This is a preview, actual theme update would require backend integration.`,
      duration: 3000,
    });
    
    // For demo purposes, store the selected colors in localStorage
    localStorage.setItem("custom-theme", JSON.stringify({
      colors: customColors,
      palette: activePalette
    }));
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Custom Theme Settings</h1>
        <p className="text-muted-foreground max-w-2xl">
          Customize the colors and theme of your HM Property Consultants admin panel.
        </p>
      </div>

      <Tabs 
        defaultValue="presets" 
        value={selectedTab} 
        onValueChange={setSelectedTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="presets">
            <Palette className="mr-2 h-4 w-4" />
            Color Presets
          </TabsTrigger>
          <TabsTrigger value="custom">
            <Swatch className="mr-2 h-4 w-4" />
            Custom Colors
          </TabsTrigger>
        </TabsList>
        
        {/* Theme Presets */}
        <TabsContent value="presets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-8">
                <div>
                  <Label className="mb-2 block">Select Theme Palette</Label>
                  <ToggleGroup 
                    type="single" 
                    value={activePalette}
                    onValueChange={(value) => value && handlePaletteChange(value as any)}
                    className="justify-start"
                  >
                    <ToggleGroupItem value="green" className="flex gap-2 items-center">
                      <span className="w-4 h-4 rounded-full bg-hm-green"></span>
                      Green (Default)
                    </ToggleGroupItem>
                    <ToggleGroupItem value="purple" className="flex gap-2 items-center">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#9b87f5" }}></span>
                      Purple
                    </ToggleGroupItem>
                    <ToggleGroupItem value="blue" className="flex gap-2 items-center">
                      <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "#0EA5E9" }}></span>
                      Blue
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div>
                  <Label className="mb-2 block">Preview</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {presetPalettes[activePalette].map((color) => (
                      <div key={color.name} className="flex flex-col items-center space-y-1.5">
                        <div 
                          className="w-full h-16 rounded-md flex items-center justify-center" 
                          style={{ backgroundColor: color.value, color: color.foreground }}
                        >
                          {color.name}
                        </div>
                        <p className="text-xs text-center text-muted-foreground">{color.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={applyCustomTheme}>Apply Theme</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Custom Colors */}
        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom Theme Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8">
                <div className="space-y-4">
                  {Object.entries(customColors).map(([key, color]) => (
                    <div key={key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                      <Label htmlFor={`color-${key}`} className="md:col-span-1">{color.name}</Label>
                      <div className="md:col-span-2">
                        <Input
                          id={`color-${key}`}
                          type="color"
                          value={color.value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="h-10 cursor-pointer"
                        />
                      </div>
                      <div 
                        className={cn(
                          "h-10 rounded-md flex items-center justify-center", 
                          key === "accent" ? "text-black" : "text-white"
                        )} 
                        style={{ backgroundColor: color.value }}
                      >
                        {color.value}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedTab("presets");
                      handlePaletteChange(activePalette);
                    }}
                  >
                    Reset to Preset
                  </Button>
                  <Button onClick={applyCustomTheme}>
                    Apply Custom Colors
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12">
        <ColorPreview />
      </div>
    </div>
  );
};

export default CustomThemePage;
