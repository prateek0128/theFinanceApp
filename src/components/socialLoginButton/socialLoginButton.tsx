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
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  IconComponent,
  text,
  onPress,
  backgroundColor,
}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme === "dark"
            ? colors.darkSecondaryBackground
            : colors.denaryBackground,
          borderColor:
            theme === "dark" ? "transparent" : colors.darkPrimaryText,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* <Image source={icon} style={styles.icon} resizeMode="contain" /> */}
      {IconComponent && <IconComponent width={24} height={24} />}
      <Text
        style={[
          styles.text,
          {
            color:
              theme === "dark"
                ? colors.darkPrimaryText
                : colors.primaryBorderColor,
          },
        ]}
      >
        {text}
      </Text>
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
    //color: colors.primaryBorderColor,
    fontFamily: fontFamily.textFont500,
    fontSize: 16,
  },
});
