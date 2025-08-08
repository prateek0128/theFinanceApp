import React, { createContext, useContext, useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { Alert } from "react-native";

type AppleUserInfo = {
  name: string;
  email: string;
};

type AppleAuthContextType = {
  userInfoApple: AppleUserInfo | null;
  promptAppleLogin: () => void;
};

const AppleAuthContext = createContext<AppleAuthContextType | null>(null);

export const AppleAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfoApple, setUserInfoApple] = useState<any>(null);
  const promptAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const name = credential.fullName?.givenName ?? "User";
      const email = credential.email ?? "No email provided";

      const userInfo: AppleUserInfo = { name, email };
      console.log("Apple Auth Response:", userInfo);

      setUserInfoApple(userInfo);
    } catch (error: any) {
      if (error.code === "ERR_CANCELED") {
        console.log("User canceled Apple Sign In.");
      } else {
        console.error("Apple Sign In Error:", error);
        Alert.alert("Error", "Apple Sign In failed.");
      }
    }
  };

  return (
    <AppleAuthContext.Provider value={{ userInfoApple, promptAppleLogin }}>
      {children}
    </AppleAuthContext.Provider>
  );
};

export const useAppleAuth = () => {
  const context = useContext(AppleAuthContext);
  if (!context)
    throw new Error("useAppleAuth must be used within AppleAuthProvider");
  return context;
};
