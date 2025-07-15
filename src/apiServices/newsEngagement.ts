import { apiClient } from "./apiUtility";

// Add Reaction
export const addReaction = async (newsId: any) => {
  const client = await apiClient();
  const response = await client.post(`/news/${newsId}/reaction`);
  return response;
};

// Toggle Like
export const toggleLike = async (newsId: any) => {
  const client = await apiClient();
  const response = await client.post(`/news/${newsId}/like`);
  return response;
};

// Check Like Status
export const checkLikeStatus = async (newsId: any) => {
  const client = await apiClient();
  const response = await client.get(`/news/${newsId}/like`);
  return response;
};

// Add Comments
export const addComments = async (newsId: any, comments: any) => {
  const client = await apiClient();
  const response = await client.post(`/news/${newsId}/comments`, comments);
  return response;
};

// Get Comments
export const getComments = async (newsId: any) => {
  const client = await apiClient();
  const response = await client.get(`/news/${newsId}/comments`);
  return response;
};

// Delete Comments
export const deleteComments = async (commentId: any) => {
  const client = await apiClient();
  const response = await client.delete(`/news/comments/${commentId}`);
  return response;
};

// Check User Like
export const checkUserLikeNewsStatus = async (newsId: any) => {
  const client = await apiClient();
  const response = await client.get(`/news/${newsId}/user-like`);
  return response;
};
