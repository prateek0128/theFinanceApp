// src/api/apiClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = "http://localhost:8080/api/v1";
//const apiUrl = "https://f3cf-2401-4900-1c64-d372-e4ef-eb25-4f3a-81ae.ngrok-free.app";
// Create a basic axios instance without interceptors
export const apiClient = async () => {
  const token = await AsyncStorage.getItem("authToken");
  return axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
