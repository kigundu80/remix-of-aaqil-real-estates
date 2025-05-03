
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Paintbrush } from "lucide-react";
import ThemePresets from "./ThemePresets";
import CustomColorTheme from "./CustomColorTheme";

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

interface ThemeTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  activePalette: "green" | "purple" | "blue";
  presetPalettes: Record<string, ColorOption[]>;
  customColors: Record<string, ColorOption>;
  handlePaletteChange: (palette: "green" | "purple" | "blue") => void;
  handleColorChange: (key: string, value: string) => void;
  applyCustomTheme: () => void;
  resetToPreset: () => void;
}

const ThemeTabs: React.FC<ThemeTabsProps> = ({
  selectedTab,
  setSelectedTab,
  activePalette,
  presetPalettes,
  customColors,
  handlePaletteChange,
  handleColorChange,
  applyCustomTheme,
  resetToPreset,
}) => {
  return (
    <Tabs 
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
          <Paintbrush className="mr-2 h-4 w-4" />
          Custom Colors
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="presets" className="space-y-4">
        <ThemePresets 
          activePalette={activePalette}
          presetPalettes={presetPalettes}
          handlePaletteChange={handlePaletteChange}
          applyCustomTheme={applyCustomTheme}
        />
      </TabsContent>
      
      <TabsContent value="custom" className="space-y-4">
        <CustomColorTheme 
          customColors={customColors}
          handleColorChange={handleColorChange}
          applyCustomTheme={applyCustomTheme}
          resetToPreset={resetToPreset}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ThemeTabs;
