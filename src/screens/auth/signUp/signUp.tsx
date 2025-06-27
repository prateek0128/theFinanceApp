import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import fontFamily from "../../../assets/styles/fontFamily";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { TextInput as RNTextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import Button from "../../../components/button/button";
import InputTextField from "../../../components/inputTextField/inputTextField";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
} from "../../../assets/icons/components/welcome";
const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
  });
  const [input, setInput] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpInputs = useRef<Array<RNTextInput | null>>([]);
  const otpValue = "1111";
  const [isValid, setIsValid] = useState(false);
  const appleIcon = require("../../../assets/images/welcome/appleIcon.png");
  const googleIcon = require("../../../assets/images/welcome/googleIcon.png");

  const handleSendOTP = () => {
    if (input.trim() === "") {
      showMessage({
        message: "Please enter your phone or email.",
        type: "success", // can be "danger", "info", "warning"
        backgroundColor: colors.primary, // optional: customize color
        color: "#fff", // text color
      });
      return;
    }
    if (!isValid) {
      showMessage({
        message: "Please enter a valid phone number or email.",
        type: "danger", // can be "danger", "info", "warning"
        backgroundColor: colors.primary, // optional: customize color
        color: "#fff", // text color
      });
      return;
    }
    setShowOTPInputs(true); // Show OTP inputs

    showMessage({
      message: "OTP sent",
      description: `We’ve sent it to your phone number`,
      type: "success", // can be "danger", "info", "warning"
      backgroundColor: colors.primary, // optional: customize color
      color: "#fff", // text color
    });
  };
  const handleSignUp = () => {
    if (otp.some((digit) => digit === "")) {
      showMessage({
        message: "Please enter all OTP digits.",
        type: "danger", // can be "danger", "info", "warning"
        backgroundColor: colors.primary, // optional: customize color
        color: "#fff", // text color
      });
      return;
    }
    const otpString = otp.join("");
    if (otpString !== otpValue) {
      showMessage({
        message: "Invalid OTP. Please try again.",
        type: "danger", // can be "danger", "info", "warning"
        backgroundColor: colors.primary, // optional: customize color
        color: "#fff", // text color
      });
      return;
    } else {
      showMessage({
        message: "OTP verified successfully!",
        type: "success", // can be "danger", "info", "warning"
        backgroundColor: colors.primary, // optional: customize color
        color: "#fff", // text color
      });
      navigation.navigate("Home"); // Navigate to home screen on successful verification
    }
    console.log("OTP entered:", otpString);
  };
  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input if value entered
    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };
  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };
  const validateInput = (text: string) => {
    const isNumeric = /^\d+$/.test(text);

    // Improved regex for realistic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (isNumeric) {
      const trimmed = text.slice(0, 10); // Only allow max 10 digits
      setInput(trimmed);
      setIsValid(trimmed.length === 10); // Valid only if exactly 10 digits
    } else {
      setInput(text);
      setIsValid(emailRegex.test(text));
    }
  };
  const handleEditPress = () => {
    setShowOTPInputs(false);
    setOtp(["", "", "", ""]);

    //setIsValid(false);
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>

        <View style={styles.headingContainer}>
          <Text style={styles.subtitle}>Sign up</Text>
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>Phone Number or Email</Text>
          {showOTPInputs && (
            <TouchableOpacity onPress={handleEditPress}>
              <MaterialIcons
                name="edit"
                size={18}
                color={colors.primaryText}
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>
        <InputTextField
          placeholder="TFA@application"
          keyboardType="email-address"
          autoCapitalize="none"
          value={input}
          onChangeText={validateInput}
          editable={!showOTPInputs} // <-- disable input when OTP inputs are shown
        />
        {/* {showOTPInputs && (
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  otpInputs.current[index] = ref;
                }}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOTPChange(index, value)}
                onKeyPress={({ nativeEvent }) =>
                  handleOTPKeyPress(index, nativeEvent.key)
                }
                returnKeyType="next"
                blurOnSubmit={false}
              />
            ))}
          </View>

        )} */}
        {showOTPInputs && (
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <InputTextField
                key={index}
                ref={(ref: any) => {
                  otpInputs.current[index] = ref;
                }}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOTPChange(index, value)}
                onKeyPress={({ nativeEvent }) =>
                  handleOTPKeyPress(index, nativeEvent.key)
                }
                returnKeyType="next"
                blurOnSubmit={false}
              />
            ))}
          </View>
        )}
        <Button
          title={showOTPInputs ? "Sign Up" : "Send OTP"}
          onPress={showOTPInputs ? handleSignUp : handleSendOTP}
          disabled={!isValid || (showOTPInputs && !isOtpComplete)}
        />
        {/* <TouchableOpacity
          style={[
            styles.button,
            (!isValid || (showOTPInputs && !isOtpComplete)) && { opacity: 0.5 },
          ]}
          onPress={showOTPInputs ? handleSignUp : handleSendOTP}
          disabled={!isValid || (showOTPInputs && !isOtpComplete)}
        >
          <Text style={styles.buttonText}>
            {showOTPInputs ? "Sign Up" : "Send OTP"}
          </Text>
        </TouchableOpacity> */}
        {/* <View style={styles.inlineLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.alreadyLinkText}>Already have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLinkText}>Log In</Text>
          </TouchableOpacity>
        </View> */}
        {/* Icons row */}
        {/* <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => console.log("Google pressed")}>
            <FontAwesome
              name="google"
              size={32}
              color="#DB4437"
              style={styles.icon}
            />
        
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log("Facebook pressed")}>
            <FontAwesome
              name="apple"
              size={32}
              color="#4267B2"
              style={styles.icon}
            />
   
          </TouchableOpacity>
        </View> */}
        <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainers}>
          <SocialLoginButton
            IconComponent={AppleIcon}
            text="Continue with Apple"
            onPress={() => console.log("Apple pressed")}
          />
          <SocialLoginButton
            IconComponent={GoogleIcon}
            text="Continue with Google"
            onPress={() => console.log("Google pressed")}
          />
          <SocialLoginButton
            IconComponent={FacebookIcon}
            text="Continue with Facebook"
            onPress={() => console.log("Facebook pressed")}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  innerContainer: {
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    color: colors.primaryText,
    // fontFamily: fontFamily.secondary,
    fontSize: 32,
    fontWeight: 600,
    marginBottom: 80,
    textAlign: "left",
  },
  subtitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.titleFont,
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 36,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    gap: 10,
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
  },
  infoText: {
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
    fontSize: 14,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
    fontWeight: "500",
  },
  button: {
    backgroundColor: colors.primaryButtonColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inlineLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  alreadyLinkText: {
    textAlign: "center",
    fontWeight: 300,
    fontSize: 14,
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontWeight: 600,
    fontSize: 16,
    color: colors.primary,
    //  fontFamily: fontFamily.secondary,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 20, // if using React Native >= 0.71
  },
  icon: {
    marginHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    color: colors.primaryText,
    // fontFamily: fontFamily.textFont500,
  },
  buttonContainers: {
    gap: 16,
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryBorderColor,
    marginHorizontal: 8,
  },
  orText: {
    fontSize: 12,
    color: colors.secondaryBorderColor,
    fontFamily: fontFamily.textFont500,
  },
});
