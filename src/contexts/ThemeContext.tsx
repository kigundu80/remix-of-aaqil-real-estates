
import * as React from "react";

type Theme = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  card: string;
  border: string;
};

const defaultTheme: Theme = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  accent: "hsl(var(--accent))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  card: "hsl(var(--card))",
  border: "hsl(var(--border))",
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    // Try to get the theme from local storage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem("app-theme");
      return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
    }
    return defaultTheme;
  });

  React.useEffect(() => {
    // Update CSS variables when theme changes
    if (typeof window !== 'undefined') {
      Object.entries(theme).forEach(([key, value]) => {
        if (key === "primary") {
          document.documentElement.style.setProperty("--primary", extractHsl(value));
        } else if (key === "secondary") {
          document.documentElement.style.setProperty("--secondary", extractHsl(value));
        } else if (key === "accent") {
          document.documentElement.style.setProperty("--accent", extractHsl(value));
        } else if (key === "background") {
          document.documentElement.style.setProperty("--background", extractHsl(value));
        } else if (key === "foreground") {
          document.documentElement.style.setProperty("--foreground", extractHsl(value));
        } else if (key === "card") {
          document.documentElement.style.setProperty("--card", extractHsl(value));
        } else if (key === "border") {
          document.documentElement.style.setProperty("--border", extractHsl(value));
        }
      });

      // Save theme to local storage
      localStorage.setItem("app-theme", JSON.stringify(theme));
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("app-theme");
    }
  };

  // Helper function to extract HSL values from a string
  const extractHsl = (hslString: string) => {
    // If it's already in HSL format with var(), extract just the variable part
    if (hslString.includes("var(--")) {
      return hslString.replace("hsl(var(--", "").replace("))", "");
    }
    
    // If it's a direct HSL value, return as is
    if (hslString.startsWith("hsl(")) {
      return hslString.replace("hsl(", "").replace(")", "");
    }
    
    // Default fallback if format is unexpected
    return hslString;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
