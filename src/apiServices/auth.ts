import { apiClient } from "./apiUtility";

// Send OTP
export const sendOTP = async (sendOTPData: any) => {
  const client = await apiClient();
  const response = await client.post("/auth/send-otp", sendOTPData);
  return response;
};

// Verify OTP
export const verifyOTP = async (verifyOTPData: any) => {
  const client = await apiClient();
  const response = await client.post("/auth/verify-otp", verifyOTPData);
  return response;
};

//Google Sign In
export const googleSignIn = async (signinData: any) => {
  const client = await apiClient();
  const response = await client.post("/auth/google", signinData);
  return response;
};

// Apple Sign In
export const appleSignIn = async (signinData: any) => {
  const client = await apiClient();
  const response = await client.post("/auth/apple", signinData);
  return response;
};

// Refresh Token
export const refreshToken = async (refreshData: any) => {
  const client = await apiClient();
  const response = await client.post("/auth/refresh", refreshData);
  return response;
};

// Get Guest Token
export const getGuestToken = async () => {
  const client = await apiClient();
  const response = await client.get("/auth/guest");
  return response;
};

//Get Google OAuth Callback
export const googleOAuthCallback = async (authCode: string) => {
  const client = await apiClient();
  const response = await client.get(`/auth/google/callback?code=${authCode}`);
  return response;
};
