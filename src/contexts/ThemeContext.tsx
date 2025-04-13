
import React, { createContext, useContext, useState, useEffect } from "react";

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
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Try to get the theme from local storage
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });
  
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Try to get the dark mode setting from local storage
    const savedMode = localStorage.getItem("dark-mode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Update CSS variables when theme changes
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
  }, [theme]);

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Save dark mode setting to local storage
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
    localStorage.removeItem("app-theme");
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
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
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
