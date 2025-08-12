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
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: "", // specifies a hosted domain restriction
  forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: "", // [Android] specifies an account name on the device that should be used
  iosClientId:
    "1030825305394-hc58lnam3pc57elggvs3d9hjkpeut4ql.apps.googleusercontent.com", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
  openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
WebBrowser.maybeCompleteAuthSession();
const WelcomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const { googleAccessToken, userInfoGoogle, promptGoogleLogin } =
  //   useGoogleAuth();
  const { googleUserInfo, idToken, accessToken, signIn, signOut } =
    useGoogleAuth();
  const { facebookAccessToken, userInfoFacebook, promptFacebookLogin } =
    useFacebookAuth();
  const { userInfoApple, promptAppleLogin } = useAppleAuth();
  // useEffect(() => {
  //   if (userInfoGoogle && googleAccessToken?.accessToken) {
  //     console.log("GoogleToken:", googleAccessToken);
  //     console.log("GoogleAccessToken:", googleAccessToken.accessToken);
  //     console.log("GoogleIDToken:", googleAccessToken.idToken);
  //     console.log("LoggedInUser:", userInfoGoogle);
  //     saveGoogleData(googleAccessToken.accessToken, userInfoGoogle.name);
  //     navigation.navigate("TellUsSomething", {});
  //   }
  // }, [userInfoGoogle]);
  const handleGoogleLogin = async () => {
    const userData = await signIn();
    if (userData) {
      console.log("UserData", userData);
      console.log("Idtoken", idToken);
      console.log("AccessToken", accessToken);
      saveGoogleData(idToken ?? "", userData);
      navigation.navigate("TellUsSomething", {
        name: userData.user.name,
        email: userData.user.email,
      });
    }
  };
  const saveGoogleData = async (accessToken: string, userData: any) => {
    const signinData = {
      google_token: accessToken,
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
            //onPress={promptGoogleLogin}
            onPress={handleGoogleLogin}
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
