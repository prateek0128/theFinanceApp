import { apiClient } from "./apiUtility";

// Get News Feed
export const getNewsFeed = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/news?limit=20");
    return response;
  } catch (error) {
    throw error;
  }
};
//Get Business Standard News
export const getBusinessStandardNews = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/news?source=BusinessStandard&limit=10");
    return response;
  } catch (error) {
    throw error;
  }
};
//Get Filtered Source News
export const getFilteredSourceNews = async () => {
  const client = await apiClient();
  try {
    const response = await client.get("/news?limit=20");
    return response;
  } catch (error) {
    throw error;
  }
};

//Get News by ID
export const getNewsByID = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/${newsId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get High-Impact News
export const getHighImpactNews = async (selectedTag: string, limit: number) => {
  const client = await apiClient();
  try {
    const response = await client.get(
      `/news/high-impact?threshold=7.0&limit=${limit}?category=${selectedTag}`
    );
    // const response = await client.get(
    //   `/news/high-impact?threshold=7.0?category=${selectedTag}`
    // );
    return response;
  } catch (error) {
    throw error;
  }
};

//Get High-Impact News with Source Filter
export const getHighImpactNewsById = async (newsId: any) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/high-impact/${newsId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get News Count
export const getNewsCount = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/count`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get ML Stats
export const getMLStats = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/ml-stats`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get Detailed News
export const getDetailedNews = async (newsId: string) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/detailed?id=${newsId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get Detailed News List
export const getDetailedNewsList = async (newsId: string) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/detailed-list?limit=10`);
    return response;
  } catch (error) {
    throw error;
  }
};

//Get Raw News
export const getRawNews = async (newsId: string) => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/raw?limit=10`);
    return response;
  } catch (error) {
    throw error;
  }
};
