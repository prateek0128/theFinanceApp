import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import fontFamily from "../../../assets/styles/fontFamily";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import { TextInput as RNTextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import InputTextField from "../../../components/inputTextField/inputTextField";
import Button from "../../../components/button/button";
import { verifyOTP, sendOTP } from "../../../apiServices/auth";
import { AuthContext } from "../../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  const { user, isLoggedIn, login, logout, isLoading } =
    useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<Array<RNTextInput | null>>([]);
  const [isValid, setIsValid] = useState(false);

  const handleSendOTP = async () => {
    if (input.trim() === "") {
      showMessage({
        message: "Please enter your phone or email.",
        type: "success",
        backgroundColor: colors.primary,
        color: "#fff",
      });
      return;
    }
    if (!isValid) {
      showMessage({
        message: "Please enter a valid phone number or email.",
        type: "danger",
        backgroundColor: colors.primary,
        color: "#fff",
      });
      return;
    }
    setShowOTPInputs(true); // Show OTP inputs
    const otpData = {
      identifier: input,
      identifier_type: inputType,
    };
    console.log("otpData", otpData);
    try {
      const response = await sendOTP(otpData);
      console.log("OTPResponse", response);
      showMessage({
        message: "OTP sent",
        description: `We’ve sent it to your phone number`,
        type: "success",
        backgroundColor: colors.primary,
        color: "#fff",
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleVerifyOTP = async () => {
    if (otp.some((digit) => digit === "")) {
      showMessage({
        message: "Please enter all OTP digits.",
        type: "danger",
        backgroundColor: colors.primary,
        color: "#fff",
      });
      return;
    }
    const loginData = {
      identifier: input,
      identifier_type: inputType,
      otp: otp.join(""),
    };
    try {
      await login(loginData); // if OTP is invalid, this will throw
      navigation.navigate("ChooseYourInterests");
      showMessage({
        message: "OTP verified successfully!",
        type: "success",
        backgroundColor: colors.primary,
        color: "#fff",
      });
    } catch (e) {
      console.log(e);
      showMessage({
        message: "Failed to verify OTP. Please try again.",
        type: "danger",
        backgroundColor: colors.primary,
        color: "#fff",
      });
    }
  };
  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };
  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };
  // 👇🏼 1) keep your existing validateInput
  const validateInput = (text: string) => {
    const isNumeric = /^\d+$/.test(text);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (isNumeric) {
      const trimmed = text.slice(0, 10);
      setInput(trimmed);
      setIsValid(trimmed.length === 10); // Valid only if exactly 10 digits
      setInputType("phone");
    } else {
      setInput(text);
      setIsValid(emailRegex.test(text));
      setInputType("email");
    }
  };
  const handleEditPress = () => {
    setShowOTPInputs(false);
    setOtp(["", "", "", ""]);
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.subtitle}>Log In</Text>
        </View>

        {/* <Text style={styles.infoText}>
            Use only your WhatsApp number to login
          </Text> */}
        <View style={styles.formContainer}>
          <View style={styles.formFieldContainer}>
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
              placeholder="Enter phone number or email address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={input}
              onChangeText={validateInput}
              editable={!showOTPInputs}
              autoComplete="email"
            />
          </View>
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
            title={showOTPInputs ? "Verify OTP" : "Send OTP"}
            onPress={showOTPInputs ? handleVerifyOTP : handleSendOTP}
            disabled={!isValid || (showOTPInputs && !isOtpComplete)}
          />
        </View>
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.alreadyLinkText}>Don't have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.loginLinkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.septenaryBackground,
  },
  innerContainer: {
    padding: 20,
    justifyContent: "center",
    flexGrow: 1,
    gap: 64,
  },
  title: {
    color: colors.primaryText,
    // fontFamily: fontFamily.secondary,
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 80,
    textAlign: "left",
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: colors.primaryText,
    fontFamily: fontFamily.titleFont,
    fontSize: 40,
    marginBottom: 10,
    textAlign: "center",
  },
  formContainer: {
    gap: 20,
  },
  formFieldContainer: {
    gap: 6,
  },

  infoText: {
    color: colors.primaryText,
    // fontFamily: fontFamily.secondary,
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
    fontSize: 20,
    color: colors.octonaryText,
    fontFamily: fontFamily.titleFont,
  },
  input: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: colors.primaryText,
    // fontFamily: fontFamily.secondary,
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
    // marginTop: 16,
    marginBottom: 10,
  },
  alreadyLinkText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.textFont400,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.titleFont,
  },
  buttonContainers: {
    gap: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
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
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 20, // if using React Native >= 0.71
  },
  icon: {
    marginHorizontal: 10,
  },
});
