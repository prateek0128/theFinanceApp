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
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import fontFamily from "../../../assets/styles/fontFamily";
import { TextInput as RNTextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";
import Button from "../../../components/button/button";
import InputTextField from "../../../components/inputTextField/inputTextField";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import OTPSection from "../login/otpSection";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
  AppleIconWhite,
} from "../../../assets/icons/components/welcome";
import { sendOTP } from "../../../apiServices/auth";
import { AuthContext } from "../../../context/loginAuthContext";
import { ThemeContext } from "../../../context/themeContext";
import showToast from "../../../utilis/showToast";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleAuth } from "../../../context/googleAuthContext";
import { useFacebookAuth } from "../../../context/facebookAuthContext";
import { useAppleAuth } from "../../../context/appleAuthContext";
const SignUpScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, isLoggedIn, login, logout, isLoading } =
    useContext(AuthContext);
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [isFocusOTP, setIsFocusOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<Array<RNTextInput | null>>([]);
  const [isValid, setIsValid] = useState(false);

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
    const otpData2 = {
      identifier: "s.ronit2812@gmail.com",
      identifier_type: "email",
    };
    try {
      const response = await sendOTP(otpData);
      console.log("OTPResponse", response.data.message);
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
      const onboardingRequired = await AsyncStorage.getItem(
        "onboardingRequired"
      );
      console.log("Onboarding Required:", onboardingRequired);
      if (Boolean(onboardingRequired) == true) {
        navigation.navigate("TellUsSomething", {});
      } else {
        navigation.navigate("BottomTabNavigator");
      }
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

  const handleSignUp = async () => {
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
      await login(loginData); // if OTP is invalid, this will throw
      navigation.navigate("TellUsSomething", {});
      showToast("OTP verified successfully!", "warning");
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
    setOtp(["", "", "", "", "", ""]);
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
  const { userInfoGoogle, promptGoogleLogin } = useGoogleAuth();
  const { userInfoFacebook, promptFacebookLogin } = useFacebookAuth();
  const { userInfoApple, promptAppleLogin } = useAppleAuth();
  useEffect(() => {
    if (userInfoGoogle) {
      console.log("LoggedInUser:", userInfoGoogle);
      navigation.navigate("TellUsSomething", {});
    }
  }, [userInfoGoogle]);

  useEffect(() => {
    if (userInfoFacebook) {
      console.log("FacebookUserInfo:", userInfoFacebook);
      navigation.navigate("TellUsSomething", {
        name: userInfoFacebook.name,
        email: userInfoFacebook.email,
        // picture: userInfoFacebook.picture.data.url,
      });
    }
  }, [userInfoFacebook]);
  useEffect(() => {
    if (userInfoApple) {
      console.log("Apple User:", userInfoApple);
      navigation.navigate("TellUsSomething", {
        name: userInfoApple.name,
        email: userInfoApple.email,
      });
    }
  }, [userInfoApple]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[globalStyles.pageContainerWithBackground(theme)]}
    >
      {showOTPInputs == false ? (
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={styles.headingContainer}>
            <Text style={[globalStyles.title(theme)]}>Sign up</Text>
          </View>
          <View style={styles.labelRow}>
            <Text
              style={[
                styles.label,
                {
                  color:
                    theme === "dark"
                      ? colors.darkSecondaryText
                      : colors.primaryText,
                },
              ]}
            >
              Email Address
            </Text>
          </View>
          <InputTextField
            placeholder="Enter your email address"
            keyboardType="email-address"
            autoCapitalize="none"
            value={input}
            onChangeText={validateInput}
            editable={!showOTPInputs} // <-- disable input when OTP inputs are shown
          />
          <Button
            title={showOTPInputs ? "Sign Up" : "Send OTP"}
            onPress={handleSendOTP}
            // disabled={!isValid || (showOTPInputs && !isOtpComplete)}
            disabled={!isValid}
            buttonStyle={{
              width: Platform.OS == "web" ? "60%" : "100%",
              alignSelf: "center",
            }}
          />
          <View style={styles.orDivider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.buttonContainers}>
            <SocialLoginButton
              IconComponent={theme === "dark" ? AppleIconWhite : AppleIcon}
              text="Continue with Apple"
              onPress={promptAppleLogin}
            />
            <SocialLoginButton
              IconComponent={GoogleIcon}
              text="Continue with Google"
              onPress={promptGoogleLogin}
              // disabled={!requestGoogle}
            />
            <SocialLoginButton
              IconComponent={FacebookIcon}
              text="Continue with Facebook"
              //disabled={!requestFacebook}
              onPress={promptFacebookLogin}
            />
          </View>
        </ScrollView>
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
          handleSendOTP={handleSendOTP}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexGrow: 1,
    width: Platform.OS == "web" ? "60%" : "100%",
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
    height: 60, // increased for better vertical spacing
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12, // rounded edges
    textAlign: "center",
    fontSize: 20,
    lineHeight: 24, // added to avoid text cut off
    paddingVertical: Platform.OS === "ios" ? 12 : 8, // vertical padding to center text
    color: colors.primaryText,

    fontFamily: fontFamily.Satoshi500, // or whatever you're using
  },

  buttonContainers: {
    gap: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: Platform.OS == "web" ? "60%" : "100%",
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
    fontFamily: fontFamily.Satoshi500,
  },
});
