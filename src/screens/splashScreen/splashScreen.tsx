import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import globalStyles from "../../assets/styles/globalStyles";
import { colors } from "../../assets/styles/colors";
import spacing from "../../assets/styles/spacing";
import typography from "../../assets/styles/typography";
const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Simulate loading or fetch initial data
    const timer = setTimeout(() => {
      navigation.replace("Login"); // You could check auth state here
      navigation.replace("Start");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TFA</Text>
      <Text style={styles.subtitle}>The Finance App</Text>
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
    backgroundColor: colors.splashBackground,
    paddingTop: 112,
  },
  title: {
    fontSize: 64,
    fontWeight: 700,
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
    fontFamily: typography.fontFamily.regular,
    color: colors.white,
  },
});
