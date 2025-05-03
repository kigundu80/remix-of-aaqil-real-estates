
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import ColorPreview from "@/components/ColorPreview";
import ThemeTabs from "@/components/theme/ThemeTabs";

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

const CustomThemePage = () => {
  const { isDarkMode } = useTheme();
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

  const resetToPreset = () => {
    setSelectedTab("presets");
    handlePaletteChange(activePalette);
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Custom Theme Settings</h1>
        <p className="text-muted-foreground max-w-2xl">
          Customize the colors and theme of your HM Property Consultants admin panel.
        </p>
      </div>

      <ThemeTabs 
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        activePalette={activePalette}
        presetPalettes={presetPalettes}
        customColors={customColors}
        handlePaletteChange={handlePaletteChange}
        handleColorChange={handleColorChange}
        applyCustomTheme={applyCustomTheme}
        resetToPreset={resetToPreset}
      />

      <div className="mt-12">
        <ColorPreview />
      </div>
    </div>
  );
};

export default CustomThemePage;
