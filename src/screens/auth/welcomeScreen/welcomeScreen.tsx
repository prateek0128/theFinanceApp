import React, { useState, useContext, useEffect } from "react";
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
import {
  useNavigation,
  NavigationProp,
  DarkTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import fontFamily from "../../../assets/styles/fontFamily";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
  AppleIconWhite,
} from "../../../assets/icons/components/welcome";
import { ThemeContext } from "../../../context/themeContext";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
// Fix redirect on iOS
WebBrowser.maybeCompleteAuthSession();

// Your Google OAuth client ID
// const CLIENT_ID =
//   "828693204724-nsceevot9v42pfjml3eit3kjg9e1e1li.apps.googleusercontent.com";
const CLIENT_ID =
  "261759290639-eavcf9en1gjmi3c7b71g4g86ost2qth2.apps.googleusercontent.com";
const WelcomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // Automatically fetch Google's OAuth 2.0 discovery doc
  const discovery = AuthSession.useAutoDiscovery("https://accounts.google.com");
  // Create the auth request
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["openid", "profile", "email"],
      redirectUri: AuthSession.makeRedirectUri({
        useProxy: true,
      }),
    },
    discovery
  );
  // Listen for response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("Access token:", authentication?.accessToken);

      // You can now fetch user info from Google
      getUserInfo(authentication?.accessToken);
    }
  }, [response]);
  // Fetch user's profile info
  async function getUserInfo(token: string | undefined) {
    if (!token) return;
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = await res.json();
    console.log("User info:", user);
  }
  console.log("Redirect URI:", AuthSession.makeRedirectUri({ useProxy: true }));
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
      <ScrollView
        contentContainerStyle={[
          styles.innerContainer,
          {
            backgroundColor:
              theme === "dark"
                ? colors.darkPrimaryBackground
                : colors.nonaryBackground,
          },
        ]}
      >
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerTitle,
              {
                color:
                  theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.secondaryText,
              },
            ]}
          >
            Welcome to FinSimply
          </Text>
          <Text
            style={[
              styles.headerText,
              {
                color:
                  theme === "dark"
                    ? colors.darkPrimaryText
                    : colors.primaryText,
              },
            ]}
          >
            Your Every Day Financial News App
          </Text>
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
            onPress={() => promptAsync({ useProxy: true })}
          />
          <SocialLoginButton
            IconComponent={FacebookIcon}
            text="Continue with Facebook"
            onPress={() => console.log("Facebook pressed")}
          />
        </View>
        {/* <View style={styles.orDivider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View> */}
        {/* <View style={styles.buttonContainers}>
          <SocialLoginButton
            text="Continue as a Guest !"
            onPress={() => navigation.navigate("ChooseYourInterests")}
            backgroundColor={
              theme === "dark"
                ? colors.darkTertiaryBackground
                : colors.tertiaryBackground
            }
          />
        </View> */}
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity>
            <Text
              style={[
                styles.alreadyLinkText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.secondaryText,
                },
              ]}
            >
              Already have an account?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={[
                styles.loginLinkText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.primaryText,
                },
              ]}
            >
              LOG IN
            </Text>
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
    //backgroundColor: colors.nonaryBackground,
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
    fontFamily: fontFamily.Cabinet700,
    fontSize: 36,
    textAlign: "center",
  },
  headerText: {
    color: colors.primaryText,
    fontFamily: fontFamily.Satoshi400,
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
    fontFamily: fontFamily.Satoshi500,
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
    fontFamily: fontFamily.Satoshi400,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontSize: 14,
    color: colors.secondaryText,
    fontFamily: fontFamily.Cabinet700,
  },
});
