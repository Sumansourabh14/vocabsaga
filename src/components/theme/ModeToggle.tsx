import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme-provider";
import { useState } from "react";

type Theme = "light" | "dark";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const themes: Theme[] = ["light", "dark"];
  const [currentThemeIndex, setCurrentThemeIndex] = useState(
    themes.indexOf(theme as Theme)
  );

  const handleToggle = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextIndex);
    setTheme(themes[nextIndex]);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="relative flex items-center justify-center cursor-pointer"
      aria-label={`Current theme: ${themes[currentThemeIndex]}. Click to switch to next theme.`}
    >
      <Sun className="h-[1rem] w-[1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1rem] w-[1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
