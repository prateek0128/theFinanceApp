import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";
const ImpactLabel = ({
  label,
  value,
  selected,
  onPress,
  backgroundColor,
  textColor,
  //borderColor,
  borderWidth,
  variant = "contained", //contained or outlined
}: any) => {
  return (
    <View
      style={[
        styles.impactLabelContainer,
        {
          backgroundColor: backgroundColor,
          borderColor: textColor && textColor,
          borderWidth: variant === "outlined" ? 1 : undefined,
        },
      ]}
    >
      <Text style={[styles.impactLabelText, { color: textColor }]}>
        {`${label} : ${value}`}
      </Text>
    </View>
  );
};
export default ImpactLabel;

const styles = StyleSheet.create({
  impactLabelContainer: {
    //backgroundColor: colors.quattuordenaryBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    // borderWidth: 1,
    gap: 8,
  },
  impactLabelText: {
    // color: colors.tridenaryText,
    fontSize: 14,
    fontFamily: fontFamily.Satoshi500,
  },
});
