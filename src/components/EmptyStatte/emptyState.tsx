// components/EmptyState.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";

const EmptyState = ({ message }: { message: string }) => (
  <View style={styles.cardShadowWrapper}>
    <View style={styles.card}>
      <View style={styles.illustration}>
        {/* <Image
          source={{ uri: "https://i.imgur.com/j5qO6Fi.png" }}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        /> */}
      </View>
      <Text style={styles.text}>{message}</Text>
    </View>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  cardShadowWrapper: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    width: "88%",
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.tertiaryBorderColor,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.quinaryBackground,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: colors.tertiaryText,
    fontFamily: fontFamily.Satoshi500,
    textAlign: "center",
  },
});
