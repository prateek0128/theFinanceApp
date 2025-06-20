import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/navigation/index";
import { colors } from "./src/assets/styles/colors";
import FlashMessage from "react-native-flash-message";
export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor={colors.primaryBackground} // Android background color
        //@ts-ignore
        barStyle="dark" // iOS & Android text/icons
        translucent={true}
      />
      <Navigation />
      <FlashMessage position="top" />
    </>
  );
}
