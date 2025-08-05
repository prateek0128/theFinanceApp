// src/api/apiClient.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const apiUrl = "http://localhost:8080/api/v1";
//const baseURL = "https://rationally-joint-swift.ngrok-free.app";
const baseURL = "https://83a70704cc61.ngrok-free.app";
//const baseURL = "https://marketbriefs.co.in";
const apiUrl = `${baseURL}/api/v1`;
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
