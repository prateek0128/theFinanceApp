import React, { createContext, useState, useEffect, ReactNode } from "react";
import { verifyOTP } from "../apiServices/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
  id: string;
  phone?: string;
  email?: string;
  created_at?: number;
}
interface AuthResponse {
  status: string;
  message: string;
  data: any;
}
// Define context value type
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

// Create context with default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
});

// Define props for provider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to load user:", e);
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);
  const login = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await verifyOTP(userData);
      console.log(response);
      const responseData = response.data as AuthResponse;
      const status = responseData.status;

      if (status === "success") {
        const user = responseData.data.user;
        const accesstoken = responseData.data.access_token;
        AsyncStorage.setItem("authToken", accesstoken);
        AsyncStorage.setItem("status", status);
        AsyncStorage.setItem("message", responseData.message);
        AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
        // No return value needed
      } else {
        console.error("Login failed:", responseData.message);
        setIsLoggedIn(false);
        throw new Error(responseData.message || "Invalid OTP");
      }
    } catch (e) {
      console.error("Login failed:", e);
      setIsLoggedIn(false);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Logout failed:", e);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
