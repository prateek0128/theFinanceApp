// components/SocialLoginButton.tsx
import React from "react";
import { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";

interface SocialLoginButtonProps {
  IconComponent?: React.ComponentType<{
    width?: number;
    height?: any;
  }>;
  text: string;
  backgroundColor?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  IconComponent,
  text,
  onPress,
  backgroundColor,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);

  const buttonBackgroundColor = backgroundColor
    ? backgroundColor
    : theme === "dark"
    ? colors.darkQuaternaryBackground
    : colors.denaryBackground;

  const borderColor =
    theme === "dark" ? colors.primaryBorderColor : colors.darkPrimaryText;

  const textColor =
    theme === "dark" ? colors.darkPrimaryText : colors.primaryBorderColor;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonBackgroundColor,
          borderColor,
          opacity: disabled ? 0.5 : 1, // dim when disabled
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {IconComponent && <IconComponent width={24} height={24} />}
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.denaryBackground,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.quaternaryBorderColor,
    gap: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
  },
});
