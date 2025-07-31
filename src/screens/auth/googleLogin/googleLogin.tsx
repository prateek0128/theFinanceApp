import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
export function useGoogleLogin() {
  // Determine if app is running in Expo Go
  const isExpoGo = Constants.appOwnership === "expo";

  // Use proxy URI in Expo Go, native URI otherwise
  const redirectUri = AuthSession.makeRedirectUri({
    native: "fb743854988102436://",
    // Do NOT include useProxy anymore; handled implicitly by URL
  });

  const finalRedirectUri = isExpoGo
    ? `https://auth.expo.io/@prateek2812/marketBriefs`
    : redirectUri;
  console.log("Redirect URI:", redirectUri);
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
