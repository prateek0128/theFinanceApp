import React, { useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Navigation from "./src/navigation/navigationStack/navigation";
import { colors } from "./src/assets/styles/colors";
import FlashMessage from "react-native-flash-message";
import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "./src/context/loginAuthContext";
import { ThemeProvider } from "./src/context/themeContext";
import ThemeToggleButton from "./src/components/themeToggleButton/themeToggleButton";
import { ThemeContext } from "./src/context/themeContext";
import { GoogleAuthProvider } from "./src/context/googleAuthContext";
import { FacebookAuthProvider } from "./src/context/facebookAuthContext";
import { AppleAuthProvider } from "./src/context/appleAuthContext";
export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    "Satoshi-Regular": require("./src/assets/fonts/SatoshiVariable/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./src/assets/fonts/SatoshiVariable/Satoshi-Medium.otf"),
    "Satoshi-Bold": require("./src/assets/fonts/SatoshiVariable/Satoshi-Bold.otf"),
    "Satoshi-Black": require("./src/assets/fonts/SatoshiVariable/Satoshi-Black.otf"),
    "CabinetGrotesk-Regular": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular.otf"),
    "CabinetGrotesk-Bold": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Bold.otf"),
    "Chillax-Medium": require("./src/assets/fonts/ChillaxVariable/Chillax-Medium.otf"),
  });
  return (
    <>
      <GoogleAuthProvider>
      <FacebookAuthProvider>
        <AppleAuthProvider>
          <AuthProvider>
            <ThemeProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <SafeAreaProvider>
                  <StatusBar
                    backgroundColor={
                      theme === "dark"
                        ? colors.darkPrimaryBackground
                        : colors.nonaryBackground
                    } // Android background color
                    barStyle={
                      theme === "dark" ? "light-content" : "dark-content"
                    } // iOS & Android text/icons
                    // translucent={true}
                  />
                  <Navigation />
                  <ThemeToggleButton />
                  <FlashMessage position="top" />
                </SafeAreaProvider>
              </GestureHandlerRootView>
            </ThemeProvider>
          </AuthProvider>
        </AppleAuthProvider>
      </FacebookAuthProvider>
      </GoogleAuthProvider>
    </>
  );
}
