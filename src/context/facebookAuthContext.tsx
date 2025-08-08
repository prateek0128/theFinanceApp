import React, { createContext, useContext, useEffect, useState } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import { Alert } from "react-native";

type FacebookUserInfo = {
  id: string;
  name: string;
  email: string;
  picture: { data: { url: string } };
};

type FacebookAuthContextType = {
  userInfoFacebook: FacebookUserInfo | null;
  promptFacebookLogin: () => void;
};

const FacebookAuthContext = createContext<FacebookAuthContextType | null>(null);

export const FacebookAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfoFacebook, setUserInfoFacebook] =
    useState<FacebookUserInfo | null>(null);

  const facebookAppId = Constants?.expoConfig?.extra?.facebookAppId ?? "";
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: facebookAppId,
  });

  const promptFacebookLogin = () => {
    promptAsync();
  };

  useEffect(() => {
    const handleFacebookLogin = async () => {
      try {
        if (response?.type === "success" && response.authentication) {
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
      value={{ userInfoFacebook, promptFacebookLogin }}
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
