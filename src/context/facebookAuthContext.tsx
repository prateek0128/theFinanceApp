import React, { createContext, useContext, useEffect, useState } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
type FacebookUserInfo = {
  id: string;
  name: string;
  email: string;
  picture: { data: { url: string } };
};

type FacebookAuthContextType = {
  userInfoFacebook: FacebookUserInfo | null;
  promptFacebookLogin: () => void;
  facebookAccessToken: string | null;
};

const FacebookAuthContext = createContext<FacebookAuthContextType | null>(null);

export const FacebookAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfoFacebook, setUserInfoFacebook] =
    useState<FacebookUserInfo | null>(null);
  const [facebookAccessToken, setFacebookAccessToken] = useState<string | null>(
    null
  );
  const facebookAppId = Constants?.expoConfig?.extra?.facebookAppId ?? "";
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: facebookAppId,
    scopes: ["public_profile", "email"],
    extraParams: {
      auth_type: "reauthenticate",
      auth_nonce: String(Date.now()),
    },
  });

  const promptFacebookLogin = async () => {
    try {
      let accessToken = "";

      // Safe check for accessToken from previous session
      if (response?.type === "success" && "authentication" in response) {
        accessToken = response.authentication?.accessToken ?? "";
      }

      const logoutUrl = `https://www.facebook.com/logout.php?next=${encodeURIComponent(
        "https://www.facebook.com"
      )}&access_token=${accessToken}`;

      // 1. Logout to force account switch
      await WebBrowser.openAuthSessionAsync(
        logoutUrl,
        "https://www.facebook.com"
      );
      // 2. Show Facebook login screen
      await promptAsync({
        //@ts-ignore
        useProxy: false,
        showInRecents: true,
      });
    } catch (error) {
      console.error("Facebook login failed:", error);
      Alert.alert("Error", "Failed to login with Facebook.");
    }
    // promptAsync();
  };

  // const promptFacebookLogin = async () => {
  //   try {
  //     await promptAsync({
  //       //@ts-ignore
  //       useProxy: false,
  //       showInRecents: true,
  //       // @ts-ignore
  //       ephemeralSession: true, // opens in incognito so cookies are not reused
  //     });
  //   } catch (error) {
  //     console.error("Facebook login failed:", error);
  //     Alert.alert("Error", "Failed to login with Facebook.");
  //   }
  // };
  useEffect(() => {
    const handleFacebookLogin = async () => {
      try {
        if (response?.type === "success" && response.authentication) {
          setFacebookAccessToken(response.authentication.accessToken);
          const res = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,email,picture.type(large)`
          );
          const userInfo = await res.json();

          if (!userInfo.name || !userInfo.email || !userInfo.picture) {
            console.error("Incomplete user info from Facebook:", userInfo);
            Alert.alert(
              "Error",
              "Failed to fetch complete Facebook user information."
            );
            return;
          }

          setUserInfoFacebook(userInfo);
        } else if (response && response.type !== "success") {
          console.log("Facebook login cancelled or failed:", response);
        }
      } catch (error) {
        console.error("Error fetching Facebook user info:", error);
        Alert.alert("Error", "Failed to fetch Facebook user information.");
      }
    };

    handleFacebookLogin();
  }, [response]);

  return (
    <FacebookAuthContext.Provider
      value={{ userInfoFacebook, facebookAccessToken, promptFacebookLogin }}
    >
      {children}
    </FacebookAuthContext.Provider>
  );
};

export const useFacebookAuth = () => {
  const context = useContext(FacebookAuthContext);
  if (!context)
    throw new Error("useFacebookAuth must be used within FacebookAuthProvider");
  return context;
};
