
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  foreground: string;
}

interface ThemePresetsProps {
  activePalette: "green" | "purple" | "blue";
  presetPalettes: Record<string, ColorOption[]>;
  handlePaletteChange: (palette: "green" | "purple" | "blue") => void;
  applyCustomTheme: () => void;
}

const ThemePresets: React.FC<ThemePresetsProps> = ({
  activePalette,
  presetPalettes,
  handlePaletteChange,
  applyCustomTheme,
}) => {
  return (
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
  );
};

export default ThemePresets;
