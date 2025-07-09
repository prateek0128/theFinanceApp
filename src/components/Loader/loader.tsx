// components/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../assets/styles/colors";
import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

const Loader = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.center,
        {
          backgroundColor:
            theme === "dark"
              ? colors.darkPrimaryBackground
              : colors.primaryBackground,
        },
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
