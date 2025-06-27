import React, { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";

interface InputTextFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

// 👇 Wrap component in forwardRef
const InputTextField = forwardRef<TextInput, InputTextFieldProps>(
  ({ style, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={[styles.defaultInput, style]}
        placeholderTextColor="#999"
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
    color: "#000",
    gap: 10,
    fontFamily: fontFamily.textFont500,
  },
});

export default InputTextField;
