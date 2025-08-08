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
  Linking,
  Alert,
  Button,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  DarkTheme,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import * as AppleAuthentication from "expo-apple-authentication";
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
import { useGoogleAuth } from "../../../context/googleAuthContext";
import { useFacebookAuth } from "../../../context/facebookAuthContext";
import { useAppleAuth } from "../../../context/appleAuthContext";
import { googleSignIn } from "../../../apiServices/auth";
WebBrowser.maybeCompleteAuthSession();
const WelcomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { googleToken, userInfoGoogle, promptGoogleLogin } = useGoogleAuth();
  const { userInfoFacebook, promptFacebookLogin } = useFacebookAuth();
  const { userInfoApple, promptAppleLogin } = useAppleAuth();
  useEffect(() => {
    if (userInfoGoogle && googleToken?.accessToken) {
      console.log("GoogleToken:", googleToken);
      console.log("GoogleAccessToken:", googleToken.accessToken);
      console.log("GoogleIDToken:", googleToken.idToken);
      console.log("LoggedInUser:", userInfoGoogle);
      saveGoogleData(googleToken.accessToken, userInfoGoogle.name);
      navigation.navigate("TellUsSomething", {});
    }
  }, [userInfoGoogle]);
  const saveGoogleData = async (accessToken: string, userName: string) => {
    const signinData = {
      google_token: accessToken,
      name: userName,
    };
    try {
      const response = await googleSignIn(signinData);
      console.log("Google data saved successfully");
    } catch (error) {
      console.error("Error saving Google data:", error);
    }
  };
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
      <ScrollView contentContainerStyle={[styles.innerContainer]}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.headerTitle,
              {
                color:
                  theme === "dark"
                    ? colors.darkSecondaryText
                    : colors.septendenaryText,
              },
            ]}
          >
            Welcome to MarketBrief's
          </Text>
          <Text
            style={[
              styles.headerText,
              {
                color:
                  theme === "dark"
                    ? colors.darkSecondaryText
                    : colors.septendenaryText,
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
            // onPress={() => {
            //   Linking.openURL(
            //     "https://www.facebook.com/v19.0/dialog/oauth?client_id=743854988102436&redirect_uri=https://de6e612422bc.ngrok-free.app/app_redirect1&scope=email,public_profile"
            //   );
            // }}
          />
        </View>
        <View style={styles.inlineLinkContainer}>
          <TouchableOpacity>
            <Text
              style={[
                styles.alreadyLinkText,
                {
                  color:
                    theme === "dark"
                      ? colors.darkSecondaryText
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
                      ? colors.sexdenaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 6,
    marginBottom: 80,
  },
  innerContainer: {
    paddingTop: 110,
    flex: 1,
  },
  headerTitle: {
    color: colors.secondaryText,
    fontFamily: fontFamily.Inter700,
    fontSize: 24,
    textAlign: "center",
  },
  headerText: {
    color: colors.primaryText,
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
    textAlign: "center",
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
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  alreadyLinkText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.secondaryText,
    fontFamily: fontFamily.Inter400,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontSize: 16,
    color: colors.sexdenaryText,
    fontFamily: fontFamily.Inter500,
  },
});
