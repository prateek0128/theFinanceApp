import React, { useState } from "react";
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
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
} from "../../../assets/icons/components/welcome";
const WelcomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const appleIcon = require("../../../assets/images/welcome/appleIcon.png");
  const googleIcon = require("../../../assets/images/welcome/appleIcon.png");
  const facebookIcon = require("../../../assets/images/welcome/appleIcon.png");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Welcome to FinSimply</Text>
          <Text style={styles.headerText}>
            Your Every Day Financial News App
          </Text>
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
        <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.buttonContainers}>
          <SocialLoginButton
            text="Continue as a Guest !"
            onPress={() => navigation.navigate("Login")}
            backgroundColor={colors.tertiaryBackground}
          />
        </View>
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.alreadyLinkText}>Already have an account?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLinkText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  headerContainer: {
    gap: 6,
    marginBottom: 80,
  },
  innerContainer: {
    padding: 20,
    //justifyContent: "center", []
    paddingTop: 150,
    flexGrow: 1,
  },
  headerTitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.titleFont,
    fontSize: 36,
    textAlign: "center",
  },
  headerText: {
    color: colors.primaryText,
    fontFamily: fontFamily.textFont400,
    fontSize: 16,
    textAlign: "center",
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
  inlineLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 64,
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
});
