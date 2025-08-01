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
import { useFacebookLogin } from "../facebookLogIn/facebookLogIn";
import { useGoogleLogin } from "../googleLogin/googleLogin";
WebBrowser.maybeCompleteAuthSession();
const WelcomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { requestGoogle, responseGoogle, promptAsyncGoogle } = useGoogleLogin();
  const { promptAsyncFacebook, responseFacebook, requestFacebook } =
    useFacebookLogin();
  const [userInfoApple, setUserInfoApple] = useState<any>(null);
  const [userInfoGoogle, setUserInfoGoogle] = useState<any>(null);
  const [userInfoFacebook, setUserInfoFacebook] = useState<any>(null);
 
  useEffect(() => {
    if (responseGoogle?.type === "success") {
      handleGoogleLogin(responseGoogle);
    }
  }, [responseGoogle]);
  
  const handleGoogleLogin = (responseGoogle: any) => {
    const { authentication } = responseGoogle;

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
        navigation.navigate("TellUsSomething", {});
      })
      .catch((err) => {
        console.error("Failed to fetch user info", err);
      });
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      console.log("Apple Auth Response:", credential);

      // Optionally save user info or navigate
      navigation.navigate("TellUsSomething", {
        name: credential.fullName?.givenName ?? "User",
        email: credential.email ?? "No email provided",
      });
    } catch (error: any) {
      if (error.code === "ERR_CANCELED") {
        console.log("User canceled Apple Sign In.");
      } else {
        console.error("Apple Sign In Error:", error);
      }
    }
  };
  const handleFacebookPrompt = async () => {
    try {
      const result = await promptAsyncFacebook();
      if (result.type === "success") {
        console.log("Facebook login successful:", result);
        // Handle successful login
      } else {
        console.log("Facebook login cancelled or failed:", result);
      }
    } catch (error) {
      console.error("Error during Facebook login:", error);
    }
  };
  useEffect(() => {
    if (
      responseFacebook &&
      responseFacebook?.type === "success" &&
      responseFacebook.authentication
    ) {
      handleFacebookLogin(responseFacebook);
    }
  }, [responseFacebook]);
  const handleFacebookLogin = async (responseFacebook: any) => {
    // Fetch user info from Facebook
    try {
      if (!responseFacebook.authentication) {
        console.error("Facebook authentication is null.");
        Alert.alert("Error", "Facebook authentication failed.");
        return;
      }
      const userInfoResponse = await fetch(
        `https://graph.facebook.com/me?access_token=${responseFacebook.authentication.accessToken}&fields=id,name,email,picture.type(large)`
      );
      const userInfo = await userInfoResponse.json();
      console.log("Facebook User Info:", userInfo);
      setUserInfoFacebook(userInfo);
      // Check if userInfo contains the expected fields
      if (!userInfo.name || !userInfo.email || !userInfo.picture) {
        console.error("Incomplete user info from Facebook:", userInfo);
        Alert.alert(
          "Error",
          "Failed to fetch complete Facebook user information."
        );
        return;
      }
      // Log the user info
      console.log("User Info:", userInfo);
      // Optionally save user info or navigate
      console.log("Navigating to TellUsSomething with user info:", {
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture.data.url,
      });
      navigation.navigate("TellUsSomething", {});
    } catch (error) {
      console.error("Error fetching Facebook user info:", error);
      Alert.alert("Error", "Failed to fetch Facebook user information.");
    }
  };
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
            onPress={handleAppleLogin}
          />
          <SocialLoginButton
            IconComponent={GoogleIcon}
            text="Continue with Google"
            onPress={() => promptAsyncGoogle()}
            // disabled={!requestGoogle}
          />
          <SocialLoginButton
            IconComponent={FacebookIcon}
            text="Continue with Facebook"
            //disabled={!requestFacebook}
            onPress={handleFacebookPrompt}
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
