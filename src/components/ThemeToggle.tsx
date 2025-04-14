
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

interface ThemeToggleProps {
  size?: "default" | "large";
  onToggle?: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  size = "default",
  onToggle
}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleClick = () => {
    toggleDarkMode();
    if (onToggle) {
      onToggle();
    }
  };

  const sizeClasses = size === "large" 
    ? "h-16 w-16 text-xl" 
    : "h-[1.2rem] w-[1.2rem]";

  return (
    <Button
      variant="ghost"
      size={size === "large" ? "lg" : "icon"}
      onClick={handleClick}
      title={isDarkMode ? "Switch to light theme" : "Switch to dark theme"}
      className={`rounded-full hover:bg-accent ${size === "large" ? "p-8" : ""}`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? (
        <Sun className={sizeClasses} />
      ) : (
        <Moon className={sizeClasses} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
