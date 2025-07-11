// src/api/apiClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const apiUrl = "http://localhost:8080/api/v1";
const apiUrl = "https://79d752f15cd2.ngrok-free.app/api/v1";
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
