import * as Facebook from "expo-auth-session/providers/facebook";
import Constants from "expo-constants";

export function useFacebookLogin() {
  const facebookAppId = Constants?.expoConfig?.extra?.facebookAppId ?? "";

  const [requestFacebook, responseFacebook, promptAsyncFacebook] =
    Facebook.useAuthRequest({
      clientId: facebookAppId,
    });

  return { requestFacebook, responseFacebook, promptAsyncFacebook };
}
