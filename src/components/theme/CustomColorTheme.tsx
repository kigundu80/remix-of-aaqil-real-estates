
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

interface CustomColorThemeProps {
  customColors: Record<string, ColorOption>;
  handleColorChange: (key: string, value: string) => void;
  applyCustomTheme: () => void;
  resetToPreset: () => void;
}

const CustomColorTheme: React.FC<CustomColorThemeProps> = ({
  customColors,
  handleColorChange,
  applyCustomTheme,
  resetToPreset,
}) => {
  return (
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
            <Button variant="outline" onClick={resetToPreset}>
              Reset to Preset
            </Button>
            <Button onClick={applyCustomTheme}>
              Apply Custom Colors
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomColorTheme;
