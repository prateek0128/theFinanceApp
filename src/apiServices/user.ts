import { apiClient } from "./apiUtility";

// Get User Profile
export const getUserProfile = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/user/profile");
    return response;
  } catch (error) {
    throw error;
  }
};

// Update User Profile
export const updateUserProfile = async () => {
  const client = await apiClient();
  try {
    const response = await client.put("/user/profile");
    return response;
  } catch (error) {
    throw error;
  }
};

// Update User Interest
export const updateUserInterest = async (interestsData: any) => {
  const client = await apiClient();
  try {
    const response = await client.put("/user/interests", interestsData);
    return response;
  } catch (error) {
    throw error;
  }
};
