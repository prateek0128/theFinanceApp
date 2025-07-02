import { apiClient } from "./apiUtility";

// Add Reaction
export const addReaction = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/${newsId}/reaction`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Toggle Like
export const toggleLike = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/${newsId}/like`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check Like Status
export const checkLikeStatus = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/${newsId}/like`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Add Comments
export const addComments = async (newsId: any, comments: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/${newsId}/comments`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Comments
export const getComments = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/${newsId}/comments`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Delete Comments
export const deleteComments = async (commentId: any) => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/news/comments/${commentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check User Like
export const checkUserLikeStatus = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/${newsId}/user-like`);
    return response;
  } catch (error) {
    throw error;
  }
};
