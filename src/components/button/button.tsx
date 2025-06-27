import React from "react";
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
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.octonaryBackground,
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
    fontFamily: fontFamily.textFont900,
  },
});

export default Button;
