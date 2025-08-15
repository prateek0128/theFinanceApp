import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
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
    scheme: "marketBriefs",
    useProxy: true,
  } as any);

  const finalRedirectUri = isExpoGo
    ? `https://auth.expo.io/@prateek2812/marketBriefs`
    : redirectUri;
  console.log("Final Redirect URI:", finalRedirectUri);
  console.log("Redirect URI:", redirectUri);
  //@ts-ignore
  console.log(AuthSession.makeRedirectUri({ useProxy: true }));
  const [request, response, promptAsync] = Google.useAuthRequest({
    // iosClientId:
    //   "1030825305394-hc58lnam3pc57elggvs3d9hjkpeut4ql.apps.googleusercontent.com",
    // androidClientId:
    //   "1030825305394-ntfuoou9uu4mpvsuhsq01ma72kp0sl62.apps.googleusercontent.com",
    // webClientId:
    //  "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com",
    clientId:
      "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com",
    redirectUri: finalRedirectUri,
    scopes: ["openid", "profile", "email"],
    responseType: "id_token", //Don't use 'code'
    //@ts-ignore
    useProxy: true,
    usePKCE: false,
    extraParams: { prompt: "select_account" },
  });

  useEffect(() => {
    if (response?.type === "error") {
      console.error("Google Auth Error:", response.error);
      return;
    }
    if (response?.type === "success") {
      const { authentication, params } = response;
      // Store tokens
      setGoogleToken({
        accessToken: authentication?.accessToken,
        idToken: params?.id_token,
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
    console.log("Google Login Request:", request);
    try {
      //@ts-ignore
      const result = await promptAsync({
        //@ts-ignore
        useProxy: false,
        showInRecents: true,
      });
      if (result.type === "success") {
        console.log("Google login successful:", result);
        // Handle successful login
      } else {
        console.log("Google login cancelled or failed:", result);
      }
    } catch (error) {
      console.error("Error during Google login:", error);
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
