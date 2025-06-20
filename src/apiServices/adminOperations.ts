import { apiClient } from "./apiUtility";

// Trigger Scrape
export const triggerScrape = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/trigger-scrape`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get ETL Stats
export const getETLStats = async () => {
  const client = await apiClient();
  try {
    const response = await client.get(`/news/etl-stats`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Run ML Processing
export const runMLProcessing = async () => {
  const client = await apiClient();
  try {
    const response = await client.post(`/news/process-ml`);
    return response;
  } catch (error) {
    throw error;
  }
};
