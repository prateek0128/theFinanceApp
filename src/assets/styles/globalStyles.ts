import { StyleSheet, TextStyle } from "react-native";
import { colors } from "./colors";
import fontFamily from "./fontFamily";

const globalStyles = {
  pageContainerWithBackground: (theme: string) => ({
    flex: 1,
    backgroundColor:
      theme === "dark" ? colors.octodenaryText : colors.primaryBackground,
    padding: 22,
  }),
  title: (theme: string): TextStyle => ({
    fontFamily: fontFamily.Inter700,
    fontSize: 32,
    marginBottom: 10,
    textAlign: "center",
    color: theme === "dark" ? colors.white : colors.septendenaryText,
  }),
};

export default globalStyles;
