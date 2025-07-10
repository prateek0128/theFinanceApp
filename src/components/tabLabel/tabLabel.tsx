import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { colors } from "../../assets/styles/colors";
const TabLabel = ({ label, selected, onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.tabLabelContainer,
          {
            backgroundColor: selected
              ? colors.quindenaryBackground // active color
              : colors.darkSenaryBackground, // default color
          },
        ]}
      >
        <Text
          style={[
            styles.labelText,
            {
              color: selected
                ? colors.darkSecondaryText // active text color
                : colors.darkSecondaryText, // default text color
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default TabLabel;

const styles = StyleSheet.create({
  tabLabelContainer: {
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 10,
    //backgroundColor: colors.quattuordenaryBackground,
  },
  labelText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 12,
    //color: colors.quattuordenaryText,
  },
});
