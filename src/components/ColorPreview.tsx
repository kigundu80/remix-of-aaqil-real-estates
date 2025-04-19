
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ColorPreview: React.FC = () => {
  const { isDarkMode } = useTheme();

  const colorBlocks = [
    { name: "Primary", value: "bg-primary text-primary-foreground" },
    { name: "Secondary", value: "bg-secondary text-secondary-foreground" },
    { name: "Accent", value: "bg-accent text-accent-foreground" },
    { name: "Card", value: "bg-card text-card-foreground border border-border" },
    { name: "Destructive", value: "bg-destructive text-destructive-foreground" },
    { name: "Muted", value: "bg-muted text-muted-foreground" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Color Preview ({isDarkMode ? 'Dark' : 'Light'} Mode)</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {colorBlocks.map((color) => (
          <div key={color.name} className="space-y-1.5">
            <div className={cn("h-16 rounded-md flex items-center justify-center", color.value)}>
              {color.name}
            </div>
            <p className="text-xs text-center text-muted-foreground">{color.name}</p>
          </div>
        ))}
        <div className="space-y-2">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPreview;
