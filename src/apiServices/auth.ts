import { apiClient } from "./apiUtility";

// Send OTP
export const sendOTP = async (sendOTPData: any) => {
  const client = await apiClient();
  // try {
    const response = await client.post("/auth/send-otp", sendOTPData);
    return response;
  // } catch (error) {
  //   console.log("otp error axios",error)
  //   throw error;
  // }
};

// Verify OTP
export const verifyOTP = async (verifyOTPData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/auth/verify-otp", verifyOTPData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Apple Sign In
export const appleSignIn = async (signinData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/auth/apple-signin", signinData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Refresh Token
export const refreshToken = async (refreshData: any) => {
  const client = await apiClient();
  try {
    const response = await client.post("/auth/refresh", refreshData);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Guest Token
export const getGuestToken = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/auth/guest");
    return response;
  } catch (error) {
    throw error;
  }
};
