import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import globalStyles from "../../assets/styles/globalStyles";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { AuthContext } from "../../context/authContext";
const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        navigation.replace("BottomTabNavigator");
      } else {
        navigation.replace("Start"); // or "Login"
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, isLoading]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Market</Text>
      <Text style={styles.title}>Briefs</Text>
      {/* <Text style={styles.subtitle}>The Finance App</Text> */}
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.white,
    paddingTop: 112,
  },
  title: {
    fontSize: 64,
    fontWeight: 700,
    textAlign: "center",
    color: colors.black,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
    color: colors.white,
  },
});
