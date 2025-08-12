import { useState, useEffect } from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";

GoogleSignin.configure({
  webClientId:
    "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  offlineAccess: true,
  iosClientId:
    "1030825305394-hc58lnam3pc57elggvs3d9hjkpeut4ql.apps.googleusercontent.com",
  profileImageSize: 120,
});

const userData = {
  idToken:
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImJhNjNiNDM2ODM2YTkzOWI3OTViNDEyMmQzZjRkMGQyMjVkMWM3MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxMDMwODI1MzA1Mzk0LW50ZnVvb3U5dXU0bXB2c3Voc3EwMW1hNzJrcDBzbDYyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTAzMDgyNTMwNTM5NC1pNXJqaDhjY2FpZGZiYms0ZjcxaTI4ZjEzNjEycGR2MC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNDI3NDY5OTg2ODk1NTYwMzMxMyIsImVtYWlsIjoicy5yb25pdDI4MTJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJSb25pdCBTaW5naCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJcFJlY01GWEtlaEZwdU9WSVRsMDVsWTI1dV9DT01fWFRSMGxDVFRnYk5kYzRhQ1k4PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlJvbml0IiwiZmFtaWx5X25hbWUiOiJTaW5naCIsImlhdCI6MTc1NDkwNjM4NiwiZXhwIjoxNzU0OTA5OTg2fQ.AAtHsOW70-6vgHRbuUpsvHrVAlCbHVowwAnpgOx9cB-c6tkzwWSDeZP0hiPPYvCk_9kEDcRj3U_gBJsAZ_M8zbFjrIl3lvVyxTojti8wctPL9qFd9I31RBGKWRHagk7jBGxPN0CCgEBy4ScZriruiKpA2WWCPdWh7UGQCd-bDZFVqf44DXz9I6a5RQ21KGBxtDWJeKOKezIcEQDnbOkjjRaG_cUdUtzpuCZ1fm5gHKJJcWt1XXzBQlxNHkjzOIuYlnNDMKLyqd95glifZ0k2SOjydK-SLfabl5ZchouZxFlwX63qzvK5lajLD5xDGJONzEXtWw-O5vJKGfWTGGrbLg",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
    "profile",
    "https://www.googleapis.com/auth/drive.readonly",
    "email",
  ],
  serverAuthCode:
    "4/0AVMBsJjQWak6AMOtQYxvbb86sl60A3iIqmvAhfeAdyRaFEhvZZL0FFFbnLNXa1gekFLhyQ",
  user: {
    email: "s.ronit2812@gmail.com",
    familyName: "Singh",
    givenName: "Ronit",
    id: "104274699868955603313",
    name: "Ronit Singh",
    photo:
      "https://lh3.googleusercontent.com/a/ACg8ocIpRecMFXKehFpuOVITl05lY25u_COM_XTR0lCTTgbNdc4aCY8=s96-c",
  },
};
export const useGoogleAuth = () => {
  const [googleUserInfo, setGoogleUserInfo] = useState<any>(null);
  const [idToken, setIdToken] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // Force the account chooser by signing out first
      await GoogleSignin.signOut(); // or await GoogleSignin.revokeAccess();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // Extract tokens
        const { idToken, accessToken } = await GoogleSignin.getTokens();

        const fullData = {
          ...response.data, // contains user info
          idToken,
          accessToken,
        };
        setIdToken(fullData.idToken);
        setAccessToken(fullData.accessToken);
        setGoogleUserInfo(response.data);
        return response.data;
      } else {
        console.log("Google sign in was cancelled by user");
        return null;
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("Sign in already in progress");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Play services not available or outdated");
            break;
          default:
            Alert.alert("Google sign in failed");
        }
      } else {
        Alert.alert("An unknown error occurred during Google sign in");
      }
      return null;
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setGoogleUserInfo(null);
    } catch (error) {
      console.error("Google sign out error:", error);
    }
  };

  return { googleUserInfo, idToken, accessToken, signIn, signOut };
};
