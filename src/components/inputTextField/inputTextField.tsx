import React, { forwardRef, useContext } from "react";
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
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <TextInput
        ref={ref}
        style={[
          styles.defaultInput,
          style,
          {
            color: theme === "dark" ? colors.darkPrimaryText : colors.black,
            borderColor:
              theme === "dark"
                ? colors.darkPrimaryText
                : colors.quaternaryBorderColor,
          },
        ]}
        placeholderTextColor={
          theme === "dark"
            ? colors.darkPrimaryText
            : colors.secondaryBorderColor
        }
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
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.black,
    gap: 10,
    fontFamily: fontFamily.textFont500,
  },
});

export default InputTextField;
