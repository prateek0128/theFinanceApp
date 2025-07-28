import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";

export function useGoogleLogin() {
  const facebookAppId = Constants?.expoConfig?.extra?.facebookAppId ?? "";

  const [requestGoogle, responseGoogle, promptAsyncGoogle] =
    Google.useAuthRequest({
      iosClientId:
        "367090103963-h643bf3uqjoesfmlcmae3uqe5rs51jch.apps.googleusercontent.com",
      androidClientId:
        "367090103963-ef9c4a8oq4qmbmte4nkskisf773qnc2n.apps.googleusercontent.com",
      webClientId:
        "367090103963-1eek4b10kodood727g6t6hh1seap8h3v.apps.googleusercontent.com",
    });

  return { requestGoogle, responseGoogle, promptAsyncGoogle };
}
