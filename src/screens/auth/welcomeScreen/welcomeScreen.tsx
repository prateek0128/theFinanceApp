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
import showToast from "../../../utilis/showToast";
import { AxiosError } from "axios";

WebBrowser.maybeCompleteAuthSession();
const WelcomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { googleAccessToken, userInfoGoogle, promptGoogleLogin } =
    useGoogleAuth();
  // const { googleUserInfo, idToken, accessToken, signIn, signOut } =
  //   useGoogleAuth();
  const { facebookAccessToken, userInfoFacebook, promptFacebookLogin } =
    useFacebookAuth();
  const { userInfoApple, promptAppleLogin } = useAppleAuth();
  useEffect(() => {
    if (userInfoGoogle && googleAccessToken?.accessToken) {
      console.log("GoogleToken:", googleAccessToken);
      console.log("GoogleAccessToken:", googleAccessToken.accessToken);
      console.log("GoogleIDToken:", googleAccessToken.idToken);
      console.log("LoggedInUser:", userInfoGoogle);
      saveGoogleData(googleAccessToken.accessToken, userInfoGoogle.name);
      navigation.navigate("TellUsSomething", {});
    }
  }, [userInfoGoogle]);
  // const handleGoogleLogin = async () => {
  //   console.log("Idtoken", idToken);
  //   console.log("AccessToken", accessToken);
  //   const userData = await signIn();
  //   if (userData) {
  //     console.log("UserData", userData);
  //     console.log("Idtoken", userData.idToken);
  //     console.log("AccessToken", accessToken);
  //     saveGoogleData(accessToken ?? "", userData);
  //     // navigation.navigate("TellUsSomething", {
  //     //   name: userData.user.name,
  //     //   email: userData.user.email,
  //     // });
  //   }
  // };
  const saveGoogleData = async (token: string, userData: any) => {
    const signinData = {
      google_token: token,
      name: userData.user.name,
    };
    console.log("signinData=>", signinData);
    try {
      const response = await googleSignIn(signinData);
      // navigation.navigate("TellUsSomething", {
      //   name: userData.user.name,
      //   email: userData.user.email,
      // });
      console.log("Google data saved successfully", response.data);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.error("Error saving Google data:", errorMessage);
      showToast(errorMessage, "danger");
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
           // onPress={handleGoogleLogin}
            // disabled={!requestGoogle}
          />
          {/* <GoogleSigninButton
            style={{ width: 222, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogleLogin}
          ></GoogleSigninButton> */}
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
