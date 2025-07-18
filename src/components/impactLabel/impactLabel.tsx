import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";
import {
  ImpactArrowGreen,
  ImpactArrowRed,
} from "../../assets/icons/components/homepage";
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
  ImpactArrow,
}: any) => {
  return (
    <View
      style={[
        styles.impactLabelContainer,
        // {
        //   backgroundColor: backgroundColor,
        //   borderColor: textColor && textColor,
        //   borderWidth: variant === "outlined" ? 1 : undefined,
        // },
      ]}
    >
      {value >= 9 ? <ImpactArrowGreen /> : <ImpactArrowRed />}
      <View style={styles.impactLabelTextContainer}>
        <Text style={[styles.impactLabelText]}>{`${label}`}</Text>
        <Text style={[styles.impactLabelValue]}>{`:`}</Text>
        <Text style={[styles.impactLabelValue]}>{`${value}`}</Text>
      </View>
    </View>
  );
};
export default ImpactLabel;

const styles = StyleSheet.create({
  impactLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: colors.quattuordenaryBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    // borderWidth: 1,
    gap: 8,
  },
  impactLabelTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    //backgroundColor: colors.quattuordenaryBackground,
  },
  impactLabelText: {
    color: colors.octodenaryText,
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  impactColonText: {
    color: colors.octodenaryText,
    fontSize: 14,
    fontFamily: fontFamily.Inter500,
  },
  impactLabelValue: {
    color: colors.octodenaryText,
    fontSize: 14,
    fontFamily: fontFamily.Inter700,
  },
});
