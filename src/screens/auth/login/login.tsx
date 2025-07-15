import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ToastAndroid,
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
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";
import InputTextField from "../../../components/inputTextField/inputTextField";
import Button from "../../../components/button/button";
import { verifyOTP, sendOTP } from "../../../apiServices/auth";
import showToast from "../../../utilis/showToast";
import { AuthContext } from "../../../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../../context/themeContext";
import axios, { AxiosError } from "axios";
import { ContinousBaseGesture } from "react-native-gesture-handler/lib/typescript/handlers/gestures/gesture";
import OTPSection from "./otpSection";
const LoginScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, isLoggedIn, login, logout, isLoading } =
    useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<Array<RNTextInput | null>>([]);
  const [isValid, setIsValid] = useState(false);
  const [isFocusOTP, setIsFocusOTP] = useState(false);
  const handleSendOTP = async () => {
    if (input.trim() === "") {
      showToast("Please enter your phone or email.", "warning");
      return;
    }
    if (!isValid) {
      showToast("Please enter a valid phone number or email.", "warning");
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
      console.log("OTPResponse", response.data);
      console.log("OTPResponseMessage", response.data.message);
      showToast("OTP sent successfully to your email.", "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("OTP Error:", errorMessage);
      showToast(errorMessage, "danger");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.some((digit) => digit === "")) {
      showToast("Please enter all OTP digits.", "warning");
      return;
    }
    const loginData = {
      identifier: input,
      identifier_type: inputType,
      otp: otp.join(""),
    };
    try {
      await login(loginData); // throws if OTP invalid
      navigation.navigate("ChooseYourInterests");
      showToast("OTP verified successfully!", "success");
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("OTP Error:", errorMessage);
      showToast(errorMessage, "danger");
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
    setOtp(["", "", "", "", "", ""]);
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[globalStyles.pageContainerWithBackground(theme)]}
    >
      {showOTPInputs == false ? (
        <View style={styles.innerLogInContainer}>
          <View style={styles.containerLogIn}>
            <View style={styles.headingContainer}>
              <Text style={[globalStyles.title(theme)]}>Log In</Text>
            </View>
            {/* <Text style={styles.infoText}>
            Use only your WhatsApp number to login
          </Text> */}
            <View style={styles.formContainer}>
              <View style={styles.formFieldContainer}>
                <View style={styles.labelRow}>
                  <Text
                    style={[
                      styles.label,
                      {
                        color:
                          theme === "dark"
                            ? colors.white
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    Email
                  </Text>
                </View>
                <InputTextField
                  placeholder="Enter your email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={input}
                  onChangeText={validateInput}
                  editable={!showOTPInputs}
                  autoComplete="email"
                />
              </View>
            </View>
          </View>
          <View style={styles.containerLogInButton}>
            <Button
              title={"Log in"}
              onPress={handleSendOTP}
              // disabled={!isValid || (showOTPInputs && !isOtpComplete)}
              disabled={!isValid}
            />
            <View style={styles.inlineLinkContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={[
                    styles.alreadyLinkText,
                    {
                      color:
                        theme === "dark"
                          ? colors.white
                          : colors.darkUndenaryBackground,
                    },
                  ]}
                >
                  Don't have an account?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={[
                    styles.loginLinkText,
                    {
                      color:
                        theme === "dark"
                          ? colors.vigenaryText
                          : colors.sexdenaryText,
                    },
                  ]}
                >
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <OTPSection
          isFocusOTP={isFocusOTP}
          setIsFocusOTP={setIsFocusOTP}
          showOTPInputs={showOTPInputs}
          setShowOTPInputs={setShowOTPInputs}
          input={input}
          setInput={setInput}
          otp={otp}
          setOtp={setOtp}
          handleVerifyOTP={handleVerifyOTP}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  innerContainer: {
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
    fontFamily: fontFamily.Inter500,
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
    fontFamily: fontFamily.Inter500,
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
    fontFamily: fontFamily.Inter400,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.Cabinet700,
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
    // fontFamily: fontFamily.Satoshi500,
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
  containerLogInButton: {
    gap: 40,
    position: "absolute",
    bottom: 80,
    left: 20,
    width: "100%",
  },
  containerLogIn: {
    gap: 10,
    marginBottom: 300,
  },
});
