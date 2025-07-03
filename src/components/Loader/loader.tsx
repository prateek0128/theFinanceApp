// components/Loader.tsx
import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../../assets/styles/colors";

const Loader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);

export default Loader;

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
