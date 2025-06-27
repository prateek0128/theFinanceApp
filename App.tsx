import { StyleSheet, Text, View, StatusBar } from "react-native";
import Navigation from "./src/navigation/navigationStack/navigation";
import { colors } from "./src/assets/styles/colors";
import FlashMessage from "react-native-flash-message";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    "Satoshi-Regular": require("./src/assets/fonts/SatoshiVariable/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./src/assets/fonts/SatoshiVariable/Satoshi-Medium.otf"),
    "Satoshi-Bold": require("./src/assets/fonts/SatoshiVariable/Satoshi-Bold.otf"),
    "Satoshi-Black": require("./src/assets/fonts/SatoshiVariable/Satoshi-Black.otf"),
    "CabinetGrotesk-Regular": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular.otf"),
    "CabinetGrotesk-Bold": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Bold.otf"),
    "Chillax-Medium": require("./src/assets/fonts/ChillaxVariable/Chillax-Medium.otf"),
  });
  if (!fontsLoaded) return <AppLoading />;
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar
            backgroundColor={colors.primaryBackground} // Android background color
            barStyle="dark-content" // iOS & Android text/icons
            // translucent={true}
          />
          <Navigation />
          <FlashMessage position="top" />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </>
  );
}
