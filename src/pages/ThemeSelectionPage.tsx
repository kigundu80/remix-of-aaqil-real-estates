
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorPreview from "@/components/ColorPreview";
import ThemeCustomizer from "@/components/ThemeCustomizer";
import { Paintbrush } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ThemeSelectionPage = () => {
  const { setTheme, resetTheme } = useTheme();
  const { toast } = useToast();

  // Predefined themes
  const themes = {
    default: {
      name: "Default",
      description: "The default HM Property Consultants theme with green and gold accents",
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
      }
    },
    forest: {
      name: "Forest",
      description: "Deep greens with earthy tones",
      colors: {
        primary: "hsl(150, 80%, 20%)",
        secondary: "hsl(30, 60%, 30%)",
        accent: "hsl(60, 80%, 60%)",
        background: "hsl(120, 10%, 95%)",
        foreground: "hsl(150, 20%, 20%)",
        card: "hsl(120, 5%, 100%)",
        border: "hsl(150, 20%, 80%)",
      }
    },
    coastal: {
      name: "Coastal",
      description: "Calming blues and sandy neutrals",
      colors: {
        primary: "hsl(200, 70%, 40%)",
        secondary: "hsl(180, 40%, 60%)",
        accent: "hsl(40, 80%, 60%)",
        background: "hsl(200, 10%, 98%)",
        foreground: "hsl(200, 20%, 20%)",
        card: "hsl(0, 0%, 100%)",
        border: "hsl(200, 20%, 90%)",
      }
    },
    modern: {
      name: "Modern",
      description: "Sleek grays with bold accent colors",
      colors: {
        primary: "hsl(220, 50%, 40%)",
        secondary: "hsl(240, 10%, 30%)",
        accent: "hsl(340, 80%, 50%)",
        background: "hsl(220, 10%, 98%)",
        foreground: "hsl(220, 10%, 20%)",
        card: "hsl(0, 0%, 100%)",
        border: "hsl(220, 10%, 90%)",
      }
    }
  };

  const applyTheme = (themeKey: keyof typeof themes) => {
    setTheme(themes[themeKey].colors);
    toast({
      title: "Theme Applied",
      description: `${themes[themeKey].name} theme has been applied successfully.`,
    });
  };

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center justify-center mb-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Theme Customization</h1>
        <p className="text-muted-foreground max-w-2xl">
          Choose from predefined themes or create your own custom color scheme for HM Property Consultants.
          Your preferences will be saved for future visits.
        </p>
      </div>

      <Tabs defaultValue="predefined" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="predefined">Predefined Themes</TabsTrigger>
          <TabsTrigger value="preview">Color Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="predefined" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(themes).map(([key, theme]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{theme.name}</CardTitle>
                  <CardDescription>{theme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap">
                    {Object.entries(theme.colors).slice(0, 5).map(([colorKey, value]) => (
                      <div 
                        key={colorKey}
                        className="h-8 w-8 rounded-full border"
                        style={{ backgroundColor: value }}
                        title={colorKey}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => applyTheme(key as keyof typeof themes)} 
                    variant={key === 'default' ? 'outline' : 'default'}
                    className="w-full"
                  >
                    {key === 'default' ? 'Reset to Default' : `Apply ${theme.name}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle>Custom Theme</CardTitle>
                <CardDescription>Create your own color scheme</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center py-10">
                <Paintbrush className="h-10 w-10 text-muted-foreground" />
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => document.getElementById('theme-customizer-button')?.click()}
                >
                  Customize Colors
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <ColorPreview />
        </TabsContent>
      </Tabs>

      <ThemeCustomizer />
    </div>
  );
};

export default ThemeSelectionPage;
