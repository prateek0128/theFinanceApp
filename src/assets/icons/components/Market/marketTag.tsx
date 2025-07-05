import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fontFamily from "../../../styles/fontFamily";

const MarketTag = () => {
  return (
    <View style={styles.marketTagContainer}>
      <Text style={styles.marketTagText}>Market</Text>
    </View>
  );
};

export default MarketTag;

const styles = StyleSheet.create({
  marketTagContainer: {
    backgroundColor: "#D1FAE5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    alignSelf: "flex-start",
    gap: 8,
  },
  marketTagText: {
    color: "#047852",
    fontWeight: "600",
    fontSize: 14,
    fontFamily: fontFamily.textFont500,
  },
});
