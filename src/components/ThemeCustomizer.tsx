
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Paintbrush, ChevronDown, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorSetting = {
  name: string;
  key: keyof ReturnType<typeof useTheme>["theme"];
  description: string;
};

const colorSettings: ColorSetting[] = [
  {
    name: "Primary",
    key: "primary",
    description: "Main brand color used for buttons and accents",
  },
  {
    name: "Secondary",
    key: "secondary",
    description: "Supporting color for secondary actions",
  },
  {
    name: "Accent",
    key: "accent",
    description: "Used for highlighting and special elements",
  },
  {
    name: "Background",
    key: "background",
    description: "Main page background",
  },
  {
    name: "Foreground",
    key: "foreground",
    description: "Text and content color",
  },
  {
    name: "Card",
    key: "card",
    description: "Card and container backgrounds",
  },
  {
    name: "Border",
    key: "border",
    description: "Border color for elements",
  },
];

const ThemeCustomizer = () => {
  const { theme, setTheme, resetTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Function to convert HSL to hex for the color picker
  const hslToHex = (hslValue: string): string => {
    // Simple conversion for demo purposes - in a real app you'd need a proper HSL to hex conversion
    // This is just a placeholder
    return "#2E7D32"; // Default color if conversion fails
  };

  // Function to convert hex to HSL for storage
  const hexToHsl = (hex: string, key: string): string => {
    // Simple conversion for demo purposes
    // In a real app, you'd implement a proper hex to HSL conversion
    // For now, we'll just return the current theme value
    return theme[key as keyof typeof theme];
  };

  const handleColorChange = (key: keyof typeof theme, value: string) => {
    setTheme({
      ...theme,
      [key]: hexToHsl(value, key),
    });
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground"
          title="Customize Theme"
        >
          <Paintbrush className="h-6 w-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" side="top">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium leading-none">Theme Customizer</h4>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              title="Reset to Default Theme"
              onClick={resetTheme}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {colorSettings.map((setting) => (
              <Collapsible key={setting.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="h-4 w-4 rounded-full" 
                      style={{ backgroundColor: hslToHex(theme[setting.key]) }}
                    />
                    <Label htmlFor={`color-${setting.key}`}>{setting.name}</Label>
                  </div>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Toggle {setting.name} options</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {setting.description}
                  </p>
                  <div>
                    <Label htmlFor={`color-${setting.key}`} className="sr-only">
                      {setting.name} color
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        id={`color-${setting.key}`}
                        value={hslToHex(theme[setting.key])}
                        onChange={(e) => handleColorChange(setting.key, e.target.value)}
                        className={cn(
                          "h-8 w-10 overflow-hidden p-0.5 bg-transparent"
                        )}
                      />
                      <Input 
                        type="text"
                        value={hslToHex(theme[setting.key])}
                        onChange={(e) => handleColorChange(setting.key, e.target.value)}
                        className="h-8"
                        placeholder="Enter color value"
                      />
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          <div className="pt-2 border-t">
            <Button 
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Apply Theme
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;
