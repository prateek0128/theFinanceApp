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
import { MaterialIcons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import Button from "../../../components/button/button";
import InputTextField from "../../../components/inputTextField/inputTextField";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
  AppleIconWhite,
} from "../../../assets/icons/components/welcome";
import { sendOTP } from "../../../apiServices/auth";
import { AuthContext } from "../../../context/authContext";
import { ThemeContext } from "../../../context/themeContext";
import showToast from "../../../Utilis/showToast";
import { AxiosError } from "axios";
const SignUpScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { user, isLoggedIn, login, logout, isLoading } =
    useContext(AuthContext);
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
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
      showToast(response.data.message, "success");
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

    //setIsValid(false);
  };
  const AppleColored = () => {
    return theme === "dark" ? <AppleIconWhite /> : <AppleIcon />;
  };
  const isOtpComplete = otp.every((digit) => digit !== "");
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark"
              ? colors.darkPrimaryBackground
              : colors.nonaryBackground,
        },
      ]}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.headingContainer}>
          <Text
            style={[
              styles.subtitle,
              {
                color:
                  theme === "dark"
                    ? colors.darkSecondaryText
                    : colors.secondaryText,
              },
            ]}
          >
            Sign up
          </Text>
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
            Phone Number or Email
          </Text>
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
        {/* Icons row */}
        <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainers}>
          <SocialLoginButton
            IconComponent={theme === "dark" ? AppleIconWhite : AppleIcon}
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
    backgroundColor: colors.nonaryBackground,
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
    fontFamily: fontFamily.Cabinet700,
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
    // fontFamily: fontFamily.Satoshi500,
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
    fontFamily: fontFamily.Satoshi500,
  },
});
