export const handleGoogleLogin = (responseGoogle: any, navigation: any) => {
  const { authentication } = responseGoogle;
  if (!authentication) {
    console.error("Google authentication is null.");
    return;
  }
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
