import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";

const Tag = ({ backgroundColor, textColor, label }: any) => {
  return (
    <View
      style={[styles.marketTagContainer, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.marketTagText, { color: textColor }]}>{label}</Text>
    </View>
  );
};

export default Tag;

const styles = StyleSheet.create({
  marketTagContainer: {
    //backgroundColor: colors.quattuordenaryBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 100,
    gap: 8,
  },
  marketTagText: {
    // color: colors.tridenaryText,
    fontSize: 14,
    fontFamily: fontFamily.Satoshi500,
  },
});
