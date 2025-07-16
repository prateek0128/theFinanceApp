import { apiClient } from "./apiUtility";

// Get All Roles
export const getAllRoles = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/roles");
    return response;
  } catch (error) {
    throw error;
  }
};

// Get All Goals
export const getAllGoals = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/goals");
    return response;
  } catch (error) {
    throw error;
  }
};
// Get All Interests
export const getAllInterests = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/interests");
    return response;
  } catch (error) {
    throw error;
  }
};

// Post Submit Onboarding
export const submitOnboarding = async () => {
  const client = await apiClient();
  try {
    const response = await client.post("/onboarding/selection");
    return response;
  } catch (error) {
    throw error;
  }
};
