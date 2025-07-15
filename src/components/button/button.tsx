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

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle | ViewStyle[]; // for TouchableOpacity
  textStyle?: TextStyle | TextStyle[]; // for Text
};

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
      style={[
        styles.button,
        disabled && styles.disabledButton,
        buttonStyle, // allows caller to override/add styles
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          {
            color:
              theme === "dark" ? colors.darkPrimaryText : colors.nonaryText,
          },
          textStyle, // allows caller to override/add styles
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.sexdenaryText,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
    color: colors.white,
  },
});

export default Button;
