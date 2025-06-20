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
import typography from "../../../assets/styles/typography";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
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
          <Text style={styles.headerTitle}>Welcome to TFA</Text>
          <Text style={styles.headerText}>
            Your Every Day Financial News App
          </Text>
        </View>

        <View style={styles.buttonContainers}>
          <SocialLoginButton
            icon={appleIcon}
            text="Continue with Apple"
            onPress={() => console.log("Apple pressed")}
          />
          <SocialLoginButton
            icon={googleIcon}
            text="Continue with Google"
            onPress={() => console.log("Google pressed")}
          />
          <SocialLoginButton
            icon={facebookIcon}
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
            onPress={() => console.log("Guest pressed")}
          />
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
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
    fontSize: 36,
    fontWeight: 600,
    textAlign: "center",
  },
  headerText: {
    color: colors.primaryText,
    fontFamily: typography.fontFamily.secondary,
    fontSize: 16,
    fontWeight: 500,
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
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryBorderColor,
    fontFamily: typography.fontFamily.secondary,
  },
});
