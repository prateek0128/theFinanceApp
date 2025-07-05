import React, { useContext } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          {
            color:
              theme === "dark" ? colors.darkPrimaryText : colors.nonaryText,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.tridenaryBackground,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.nonaryText,
    fontSize: 16,
    fontFamily: fontFamily.Satoshi900,
  },
});

export default Button;
