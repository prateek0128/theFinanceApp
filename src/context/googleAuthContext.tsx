import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

type GoogleAuthContextType = {
  userInfoGoogle: any;
  googleToken: {
    accessToken?: string;
    idToken?: string;
  } | null;
  promptGoogleLogin: () => void;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | null>(null);

export const GoogleAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfoGoogle, setUserInfoGoogle] = useState<any>(null);
  const [googleToken, setGoogleToken] = useState<{
    accessToken?: string;
    idToken?: string;
  } | null>(null);

  const isExpoGo = Constants.appOwnership === "expo";
  const redirectUri = AuthSession.makeRedirectUri({
    // native: "fb743854988102436://",
    useProxy: true,
  } as any);

  const finalRedirectUri = isExpoGo
    ? `https://auth.expo.io/@prateek2812/marketBriefs`
    : redirectUri;
  console.log("Final Redirect URI:", finalRedirectUri);
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "367090103963-h643bf3uqjoesfmlcmae3uqe5rs51jch.apps.googleusercontent.com",
    androidClientId:
      "367090103963-ef9c4a8oq4qmbmte4nkskisf773qnc2n.apps.googleusercontent.com",
    webClientId:
      "367090103963-1eek4b10kodood727g6t6hh1seap8h3v.apps.googleusercontent.com",
    redirectUri: finalRedirectUri,
    // responseType: "id_token",
    scopes: ["profile", "email"], // crucial for ID token
    // usePKCE: false,
  });

  useEffect(() => {
    if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
      return;
    }
    if (response?.type === "success") {
      const { authentication } = response;
      // Store tokens
      setGoogleToken({
        accessToken: authentication?.accessToken,
        idToken: authentication?.idToken,
      });
      // Fetch user info
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then((res) => res.json())
        .then(setUserInfoGoogle)
        .catch((err) => console.error("Failed to fetch user info", err));
    }
  }, [response]);

  const promptGoogleLogin = async () => {
    try {
      const result = await promptAsync();
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

  return (
    <GoogleAuthContext.Provider
      value={{ userInfoGoogle, googleToken, promptGoogleLogin }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context)
    throw new Error("useGoogleAuth must be used within GoogleAuthProvider");
  return context;
};
