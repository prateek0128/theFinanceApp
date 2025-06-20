import { apiClient } from "./apiUtility";

// Get Pinned News
export const getPinnedNews = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/pinned`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Pin News
export const pinNews = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/${newsId}/pin`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Unpin News
export const unpinNews = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/news/${newsId}/pin`);
    return response;
  } catch (error) {
    throw error;
  }
};
