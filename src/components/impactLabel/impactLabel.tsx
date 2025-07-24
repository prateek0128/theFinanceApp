import React, { useState, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";
import {
  ImpactArrowGreen,
  ImpactArrowRed,
} from "../../assets/icons/components/homepage";
import { ThemeContext } from "../../context/themeContext";
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
  const { theme, toggleTheme } = useContext(ThemeContext);
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
        <Text
          style={[
            styles.impactLabelText,
            {
              color: theme == "light" ? colors.octodenaryText : colors.white,
            },
          ]}
        >{`${label}`}</Text>
        <Text
          style={[
            styles.impactLabelValue,
            {
              color: theme == "light" ? colors.octodenaryText : colors.white,
            },
          ]}
        >{`:`}</Text>
        <Text
          style={[
            styles.impactLabelValue,
            {
              color: theme == "light" ? colors.octodenaryText : colors.white,
            },
          ]}
        >{`${value}/10`}</Text>
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
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  impactColonText: {
    fontSize: 14,
    fontFamily: fontFamily.Inter500,
  },
  impactLabelValue: {
    fontSize: 14,
    fontFamily: fontFamily.Inter700,
  },
});
