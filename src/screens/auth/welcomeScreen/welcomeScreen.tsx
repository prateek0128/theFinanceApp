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
import * as Google from "expo-auth-session/providers/google";
import {
  GoogleSignin,
  isSuccessResponse,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { showMessage } from "react-native-flash-message";
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
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "367090103963-h643bf3uqjoesfmlcmae3uqe5rs51jch.apps.googleusercontent.com",
    androidClientId:
      "367090103963-ef9c4a8oq4qmbmte4nkskisf773qnc2n.apps.googleusercontent.com",
    webClientId:
      "367090103963-1eek4b10kodood727g6t6hh1seap8h3v.apps.googleusercontent.com",
    // optionally add:
    // expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com'
  });
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;

      // You get accessToken & idToken here:
      console.log("Access token:", authentication?.accessToken);
      console.log("ID token:", authentication?.idToken);

      // Fetch user info (optional)
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then((res) => res.json())
        .then((userInfo) => {
          console.log("User Info:", userInfo);
          // userInfo contains name, email, picture etc.
          navigation.navigate("TellUsSomething", {
            name: userInfo.name,
            email: userInfo.email,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user info", err);
        });
    }
  }, [response]);

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
            onPress={() => promptAsync()}
            // disabled={!request}
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
