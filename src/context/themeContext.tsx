import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Appearance } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // optional

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // get device default
  const [theme, setTheme] = useState<Theme>(
    colorScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const loadTheme = async () => {
      try {
        // const storedTheme = await AsyncStorage.getItem("theme");
        // if (storedTheme === "dark" || storedTheme === "light") {
        //   setTheme(storedTheme);
        // }
      } catch (e) {
        console.error("Failed to load theme:", e);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      // await AsyncStorage.setItem("theme", newTheme);
    } catch (e) {
      console.error("Failed to save theme:", e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
