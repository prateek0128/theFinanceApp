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
  let logoutTimeout: ReturnType<typeof setTimeout>;
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const [storedUser, storedExpiry] = await AsyncStorage.multiGet([
          "user",
          "tokenExpiry",
        ]);

        const userJson = storedUser[1];
        const expiry = storedExpiry[1];

        if (userJson && expiry) {
          const expiryTime = parseInt(expiry, 10);
          const currentTime = Date.now();

          if (currentTime < expiryTime) {
            const remainingTime = expiryTime - currentTime;
            const parsedUser: User = JSON.parse(userJson);

            setUser(parsedUser);
            setIsLoggedIn(true);
            scheduleAutoLogout(remainingTime);
          } else {
            await logout(); // token expired
          }
        }
      } catch (e) {
        console.error("Failed to load user:", e);
      } finally {
        setIsLoading(false);
      }
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
        console.log("Loginsuccessful=>", responseData.data);
        const user = responseData.data.user;
        const accesstoken = responseData.data.access_token;
        const expiresIn = responseData.data.expires_in;
        const expirationTimestamp = Date.now() + expiresIn;
        // AsyncStorage.setItem("authToken", accesstoken);
        // AsyncStorage.setItem("status", status);
        // AsyncStorage.setItem("message", responseData.message);
        // AsyncStorage.setItem("user", JSON.stringify(user));
        await AsyncStorage.multiSet([
          ["authToken", accesstoken],
          ["status", status],
          ["message", responseData.message],
          ["user", JSON.stringify(user)],
          ["tokenExpiry", expirationTimestamp.toString()],
        ]);
        setUser(user);
        setIsLoggedIn(true);
        // No return value needed
        // Start logout timer
        scheduleAutoLogout(expiresIn);
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
      if (logoutTimeout) clearTimeout(logoutTimeout);

      await AsyncStorage.multiRemove([
        "authToken",
        "status",
        "message",
        "user",
        "tokenExpiry",
      ]);
      setUser(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      setIsLoading(false);
    }
  };
  const scheduleAutoLogout = (expiresIn: number) => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(() => {
      logout();
    }, expiresIn);
  };
  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
