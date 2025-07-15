import React, { forwardRef, useContext, useState } from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
interface InputTextFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

// 👇 Wrap component in forwardRef

const InputTextField = forwardRef<TextInput, InputTextFieldProps>(
  ({ style, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <TextInput
        ref={ref}
        style={[
          styles.defaultInput,
          style,
          {
            color: theme === "dark" ? colors.darkPrimaryText : colors.black,
            borderColor: isFocused
              ? colors.sexdenaryText
              : theme === "dark"
              ? colors.quaternaryBorderColor
              : colors.quaternaryBorderColor,
          },
        ]}
        placeholderTextColor={
          theme === "dark"
            ? colors.darkTertiaryText
            : colors.secondaryBorderColor
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  defaultInput: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.quaternaryBorderColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
    gap: 10,
    fontFamily: fontFamily.Inter400,
  },
});

export default InputTextField;
