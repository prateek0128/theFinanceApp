// components/SocialLoginButton.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import typography from "../../assets/styles/typography";

interface SocialLoginButtonProps {
  icon?: ImageSourcePropType;
  text: string;
  onPress?: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  icon,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SocialLoginButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.tertiaryBackground,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.primaryBorderColor,
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
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});
