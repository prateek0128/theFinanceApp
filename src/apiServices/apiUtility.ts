// src/api/apiClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "https://api.example.com"; // Replace with your actual API URL
const token = await AsyncStorage.getItem("authToken"); // or whatever key you're using
// Create a basic axios instance without interceptors
export const apiClient = async () => {
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
