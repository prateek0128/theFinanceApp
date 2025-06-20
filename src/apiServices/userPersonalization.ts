import { apiClient } from "./apiUtility";

// Get User Preferences
export const getUserPreferences = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/preferences`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Follow Items
export const followItems = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(`/preferences/follow`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Unfollow Items
export const unfollowItems = async () => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/preferences/unfollow`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Save Article
export const saveArticle = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/save`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Unsave Article
export const unsaveArticle = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.delete(`/news/save/${newsId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Saved Articles
export const getSavedArticle = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/saved?page=1&limit=20`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check Saved Status
export const checkSavedArticle = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/${newsId}/saved`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Record Article View
export const recordArticleView = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(`/history/record`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get View History
export const getViewHistory = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/history?page=1&limit=20`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Check View Status
export const checkViewStatus = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/history/${newsId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get Personalized News Feed
export const getPersonalizedNewsFeed = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(
      `news/personalized?page=1&limit=20&use_cache=true`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
