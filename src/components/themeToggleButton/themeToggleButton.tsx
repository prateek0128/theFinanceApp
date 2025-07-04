import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../context/themeContext";

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Text style={styles.text}>{theme === "dark" ? "🌙" : "☀️"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    left: 20,
    backgroundColor: "#4A90E2",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});

export default ThemeToggleButton;
