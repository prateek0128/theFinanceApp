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
          const expiryTime = parseInt(expiry, 10); // seconds
          const currentTime = Math.floor(Date.now() / 1000); // seconds

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
  const loginData = {
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg4YjYwNjM3NDRmZTgyYzI4OWY1NTYxIiwidHlwZSI6ImFjY2VzcyIsImlzcyI6InRmYS1iYWNrZW5kIiwic3ViIjoiNjg4YjYwNjM3NDRmZTgyYzI4OWY1NTYxIiwiZXhwIjoxNzU0NjQwMzU4LCJuYmYiOjE3NTQ1NTM5NTgsImlhdCI6MTc1NDU1Mzk1OH0.GvIgsxHDaGsLqY-n5fjJk83OPFE1g6eIAQzP4hdcx8c",
    expires_in: 86400,
    onboarding_required: false,
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjg4YjYwNjM3NDRmZTgyYzI4OWY1NTYxIiwidHlwZSI6InJlZnJlc2giLCJpc3MiOiJ0ZmEtYmFja2VuZCIsInN1YiI6IjY4OGI2MDYzNzQ0ZmU4MmMyODlmNTU2MSIsImV4cCI6MTc1OTczNzk1OCwibmJmIjoxNzU0NTUzOTU4LCJpYXQiOjE3NTQ1NTM5NTh9.GrX2Lha69ozaXe9Xw2MToS8BDmCRApsHADUZDDunbW8",
    user: {
      created_at: 1753964643,
      email: "rajput.prateek28@gmail.com",
      id: "688b6063744fe82c289f5561",
      interests: ["Startups", "Crypto", "Mutual Funds"],
      name: "New User",
      onboarding_completed: true,
      phone: "",
    },
  };
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
        const onboardingRequired = responseData.data.onboarding_required;
        const sessionExpiresIn = responseData.data.expires_in;
        const accessTokenExpiry =
          Math.floor(Date.now() / 1000) + sessionExpiresIn;
        const refreshTokenExpiry =
          Math.floor(Date.now() / 1000) + 60 * 24 * 60 * 60; // 60 days in seconds
        await AsyncStorage.multiSet([
          ["authToken", accesstoken],
          ["status", status],
          ["message", responseData.message],
          ["user", JSON.stringify(user)],
          ["onboardingRequired", onboardingRequired.toString()],
          ["tokenExpiry", accessTokenExpiry.toString()],
          ["refreshToken", responseData.data.refresh_token],
          ["refreshTokenExpiry", refreshTokenExpiry.toString()],
        ]);
        setUser(user);
        setIsLoggedIn(true);
        // Start logout timer
        scheduleAutoLogout(refreshTokenExpiry);
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
        "onboardingRequired",
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
  const scheduleAutoLogout = (expiresInSeconds: number) => {
    if (logoutTimeout) clearTimeout(logoutTimeout);
    logoutTimeout = setTimeout(() => {
      logout();
    }, expiresInSeconds * 1000); // convert seconds to milliseconds
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
