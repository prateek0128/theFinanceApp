import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Button from "../../../components/button/button";
import {
  BackArrow,
  BackArrowWhite,
} from "../../../assets/icons/components/logIn";
import { RootStackParamList } from "../../../types/navigation";
import { ThemeContext } from "../../../context/themeContext";

const { width } = Dimensions.get("window");
const CIRCLE_SIZE = width * 0.14;

const OTPSection = ({
  isFocusOTP,
  setIsFocusOTP,
  showOTPInputs,
  setShowOTPInputs,
  input,
  setInput,
  otp,
  setOtp,
  handleVerifyOTP,
}: any) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const inputs = useRef<Array<TextInput | null>>([]);
  const { theme } = useContext(ThemeContext);

  const handleResendOTP = () => {
    // TODO: Replace this with your actual resend OTP API
    console.log("OTP resent!");
    if (Platform.OS === "android") {
      ToastAndroid.show("OTP resent successfully!", ToastAndroid.SHORT);
    }
  };

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5) {
        inputs.current[index + 1]?.focus();
      } else {
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputs.current[index - 1]?.focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleContinue = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP:", enteredOtp);
    navigation.navigate("Login");
  };
  const isOtpComplete = otp.every((digit: any) => digit !== "");
  return (
    <View style={styles.otpContainer}>
      <View style={[styles.topContainer]}>
        <TouchableOpacity onPress={() => setShowOTPInputs(false)}>
          {theme === "dark" ? <BackArrowWhite /> : <BackArrow />}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowOTPInputs(false)}>
          <Text style={styles.emailText}>Change E-mail</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containContainer}>
        <Text
          style={[
            styles.heading,
            {
              color:
                theme === "dark" ? colors.darkPrimaryText : colors.primaryText,
            },
          ]}
        >
          Enter authentication code
        </Text>
        <Text
          style={[
            styles.paragraph,
            {
              color:
                theme === "dark" ? colors.darkSenaryText : colors.primaryText,
            },
          ]}
        >
          Enter the 6-digit code we have sent to the e-mail{" "}
          <Text style={styles.emailHighlight}>{input}</Text>
        </Text>
      </View>

      <View style={styles.otpBoxesContainer}>
        {otp.map((digit: any, index: any) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            onFocus={() => setIsFocusOTP(true)}
            onBlur={() => setIsFocusOTP(false)}
            keyboardType="number-pad"
            maxLength={1}
            style={[
              styles.circleInput,
              {
                borderColor: isFocusOTP
                  ? colors.sexdenaryText
                  : colors.nonaryBorder,
                backgroundColor:
                  theme === "dark"
                    ? colors.octodenaryText
                    : colors.primaryBackground,
                color:
                  theme == "dark" ? colors.darkPrimaryText : colors.primaryText,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        {
          <Button
            title="Continue"
            onPress={handleVerifyOTP}
            buttonStyle={{
              backgroundColor:
                theme === "dark"
                  ? colors.tertiaryButtonColor
                  : colors.sexdenaryText,
              paddingVertical: 16,
              paddingHorizontal: 32,
              borderRadius: 12,
            }}
            disabled={showOTPInputs && !isOtpComplete}
            textStyle={{
              fontFamily: fontFamily.Inter500,
              fontSize: 16,
              color: colors.white,
            }}
          />
        }
        {/* Resend Section */}
        <View style={styles.resendContainer}>
          <TouchableOpacity onPress={handleResendOTP}>
            <Text
              style={[
                styles.resendText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkSeptanaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OTPSection;

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 60,
  },
  emailText: {
    fontSize: 16,
    color: colors.sexdenaryText,
    fontFamily: fontFamily.Inter400,
  },
  containContainer: {
    gap: 24,
    marginTop: 70,
  },
  heading: {
    fontSize: 24,
    color: colors.octonaryText,
    fontFamily: fontFamily.Inter500,
    textAlign: "center",
    fontWeight: "700",
  },
  paragraph: {
    fontSize: 16,
    color: colors.octonaryText,
    fontFamily: fontFamily.Inter400,
    textAlign: "center",
  },
  emailHighlight: {
    color: colors.octodenaryText,
    fontWeight: "700",
  },
  otpBoxesContainer: {
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 40,
  },
  circleInput: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#007AFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
    color: "#000",
    backgroundColor: "#F2F2F2",
  },
  resendContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resendText: {
    fontFamily: fontFamily.Inter500,
  },
  timerText: {
    color: colors.octonaryText,
    fontFamily: fontFamily.Inter400,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
  },
});
